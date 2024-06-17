import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from '../Users'
import CreateUser from '../CreateUser'
import UpdateUser from '../UpdateUser'
import Login from './Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/view' element={<Users />}></Route>
          <Route path='/create' element={<CreateUser />}></Route>
          <Route path='/update/:id' element={<UpdateUser />}></Route>
          <Route path='/' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
