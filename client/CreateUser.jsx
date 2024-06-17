import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";



function CreateUser() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    // const [image, setImage] = useState()
    const navigate = useNavigate()
    const [file, setFile] = useState()

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };



    const Submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('age', age);
        formData.append('image', file);

        axios.post("http://localhost:3001/createUser", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(result => {
                console.log(result);
                navigate('/view');
            })
            .catch(err => console.log(err));
    }
    //     e.preventDefault();
    // //     const formdata = new FormData()
    // // formdata.append('file', file)
    //     axios.post("http://localhost:3001/createUser",{ name, email, age })
    //     // axios.post("http://localhost:3001/createUser",formdata,{ name, email, age, image })
    //         .then(result => {
    //             console.log(result)
    //             navigate('/')
    //         })
    //         .catch(err => console.log(err))

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Submit}>
                    <h2>Add User</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter Name' className='form-control'
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder='Enter Email' className='form-control'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Age</label>
                        <input type="text" placeholder='Enter Age' className='form-control'
                            onChange={(e) => setAge(e.target.value)}
                        />

                        <div>

                            <div className='mb-2'>
                                <label>Image</label>
                                <input type="file" onChange={handleFileChange} className='form-control' />
                            </div>
                            {/* <input type="file" onChange={e => setFile(e.target.files[0])} />
                            <button >Upload</button>
                            <br />
                            <img src={`http://localhost:3001/Images/` + image} alt='' 
                            //  onChange={(e) => setImage(e.target.value)}
                            /> */}
                        </div>

                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    )
}
export default CreateUser;