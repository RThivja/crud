const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
const multer = require('multer')
const path = require('path')
const app = express()
app.use(cors())
app.use(express.json())
// app.use(express.static('public'))
app.use('/public', express.static(path.join(__dirname, 'public'))); // Serve static files

// db Connection
mongoose.connect("mongodb+srv://diyadivya079:AJlao1jTLjGzyX6q@cluster0.axlaqmd.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")

// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, 'public/Images')
//     },
//     filename: (req,file, cb)=>{
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage
// })

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// view User
app.get('/view', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});


//  Get id   
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});


// Update User
app.put('/updateUser/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;
    const updateData = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
    };
    if (req.file) {
        updateData.image = req.file.filename;
    }
    UserModel.findByIdAndUpdate(id, updateData, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});
// app.put('/updateUser/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndUpdate({ _id: id }, {
//         name: req.body.name,
//         email: req.body.email,
//         age: req.body.age
//     })
//         .then(users => res.json(users))
//         .catch(err => res.json(err))

// })


// Create User
app.post("/createUser", upload.single('image'), (req, res) => {
    const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        image: req.file ? req.file.filename : null
    });
    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.json(err));
});
// app.post("/createUser",upload.single('file'), (req, res) => {
//     UserModel.create({image: req.file.filename})
//         .then(users => res.json(users))
//         .catch(err => res.json(err))
// })
// app.post("/createUser", (req, res) => {
//     UserModel.create(req.body)
//         .then(users => res.json(users))
//         .catch(err => res.json(err))
// })


// Delete User    
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(res => res.json(res))
        .catch(err => res.json(err))

})


const LoginSchema = new mongoose. Schema({
    email: String,
    password: String
    })
    const LoginModel = mongoose.model("login", LoginSchema)


    app.post("/", (req, res) => {
        const { email, password } = req.body;
        LoginModel.findOne({ email: email })
          .then(user => {
            if (user) {
              if (user.password === password) {
                res.json("Login Successfully");
              } else {
                res.json("The password is incorrect");
              }
            } else {
              res.json("No record existed");
            }
          })
          .catch(err => res.status(500).json("Server Error"));
      });



// Server Working port number
app.listen(3001, () => {
    console.log("Server is Running")
})