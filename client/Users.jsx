
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/view')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/' + id)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success mb-3'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    {user.image && (
                                        <img
                                            src={`http://localhost:3001/public/Images/${user.image}`}
                                            alt={user.name}
                                            width="50"
                                        />
                                    )}
                                </td>
                                <td>
                                    <Link to={`/update/${user._id}`} className='btn btn-success me-2'>Update</Link>
                                    <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from 'axios'

// function Users() {
//     const [users, setUsers] = useState([])

//     useEffect(() => {
//         axios.get('http://localhost:3001')
//             .then(result => setUsers(result.data))
//             .catch(err => console.log(err))
//     }, [])


//     const handleDelete = (id) => {
//         axios.delete('http://localhost:3001/deleteUser/' + id)
//             .then(res => {
//                 console.log(res)
//                 window.location.reload()
//             })
//             .catch(err => console.log(err))
//     }

//     return (
//         <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
//             <div className='w-50 bg-white rounded p-3'>
//                 <Link to="/create" className='btn btn-success'>Add +</Link>
//                 <table className='table'>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Age</th>
//                             <th>Image</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             users.map((user) => {
                                
//                                 return <tr>
//                                      <tr key={user._id}></tr>
//                                     <td>{user.name}</td>
//                                     <td>{user.email}</td>
//                                     <td>{user.age}</td>
//                                     <td>
//                                             {user.image && <img src={`http://localhost:3001/public/Images/${user.image}`} alt={user.name} width="50" />}
//                                         </td>
                                    
//                                     <td>
//                                         <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link>
//                                         <button className='btn btn-danger' onClick={(e) => handleDelete(user._id)}>Delete</button>
//                                     </td>
//                                 </tr>
//                             })
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }
// export default Users;