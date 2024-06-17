
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateUser() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/getUser/' + id)
            .then(result => {
                setName(result.data.name);
                setEmail(result.data.email);
                setAge(result.data.age);
                setImage(result.data.image);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('age', age);
        if (e.target.image.files[0]) {
            formData.append('image', e.target.image.files[0]);
        }

        axios.put("http://localhost:3001/updateUser/" + id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(result => {
            console.log(result);
            navigate('/view');
        })
        .catch(err => console.log(err));
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleUpdate}>
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder='Enter Name' className='form-control' 
                        value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder='Enter Email' className='form-control' 
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" placeholder='Enter Age' className='form-control' 
                        value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    g<div className='mb-2'>
                        <label htmlFor="image">Image</label>
                        <input type="file" id="image" className='form-control' />
                        {image && (
                            <div className="mt-2">
                                <img src={`http://localhost:3001/public/Images/${image}`} alt="Current" width="100" />
                            </div>
                        )}
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from 'axios'

// function UpdateUser() {
//     const { id } = useParams()
//     const [name, setName] = useState()
//     const [email, setEmail] = useState()
//     const [age, setAge] = useState()
//     const [image, setImage] = useState(null);
//     const navigate = useNavigate()

//     useEffect(() => {
//         axios.get('http://localhost:3001/getUser/' + id)
//             .then(result => {
//                 console.log(result)
//                 setName(result.data.name)
//                 setEmail(result.data.email)
//                 setAge(result.data.age)
//                 setImage(result.data.image);

//             })
//             .catch(err => console.log(err))
//     }, [])

//     // const Update = (e)=>{
//     //     e.preventDefault();
//     //     axios.put("http://localhost:3001/updateUser/"+id, {name, email, age})
//     //     .then(result=>{ console.log(result)
//     //         navigate('/')
//     //     })
//     //     .catch(err=> console.log(err))
//     //   }
//     const Update = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('email', email);
//         formData.append('age', age);
//         if (e.target.image.files[0]) {
//             formData.append('image', e.target.image.files[0]);
//         }

//         axios.put("http://localhost:3001/updateUser/" + id, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         })
//         .then(result => {
//             console.log(result);
//             navigate('/');
//         })
//         .catch(err => console.log(err));
//     };

//     return (
//         <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
//             <div className='w-50 bg-white rounded p-3'>
//                 <form onSubmit={Update}>
                    
//                     <h2>Update User</h2>
//                     <div className='mb-2'>
//                         <label htmlFor="">Name</label>
//                         <input type="text" placeholder='Enter Name' className='form-control' 
//                         value={name}  onChange={(e) => setName(e.target.value)}
//                         />
//                     </div>
//                     <div className='mb-2'>
//                         <label htmlFor="">Email</label>
//                         <input type="text" placeholder='Enter Email' className='form-control' 
//                         value={email}  onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className='mb-2'>
//                         <label htmlFor="">Age</label>
//                         <input type="text" placeholder='Enter Age' className='form-control' 
//                         value={age}  onChange={(e) => setAge(e.target.value)}
//                         />
//                           </div>
//                         <div className='mb-2'>
//                         <label htmlFor="image">Image</label>
//                         <input type="file" id="image" className='form-control' />
//                         {image && (
//                             <div className="mt-2">
//                                 <img src={`http://localhost:3001/public/Images/${image}`} alt="Current" width="100" />
//                             </div>
//                         )}
//                     </div>
                    
//                     <button className='btn btn-success'>Update</button>
//                 </form>
//             </div>
//         </div>
//     )
// }


// export default UpdateUser;