import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../Components/Header'
import Home from '../Pages/Home'
import About from '../Pages/About'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp'
import PrivateRouter from '../Components/PrivateRouter'
import Profile from '../Pages/Profile'
import AdminHome from '../Pages/AdminHome'
import EditAdmin from '../Pages/editAdmin'

function AppRoutes() {
  return (
    <div>
              <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route element={<PrivateRouter/>}>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path='/admin' element={<AdminHome/>}/>
        <Route path='/editAdmin/:id' element={<EditAdmin/>}/>
      </Routes>
      </BrowserRouter>
      

    </div>
  )
}

export default AppRoutes
