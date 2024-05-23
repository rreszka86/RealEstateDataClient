import { useState } from 'react'
import { Route, Routes, Navigate } from "react-router-dom"
import Register from "./components/Register"
import Login from './components/Login'
import Index from "./components/Index"
import Main from "./components/Main"
import AuthGuard from './components/AuthGuard'

function App() {
  const token = localStorage.getItem("jwtToken")

  return(
    <Routes>
      
      {/* {token && <Route path='/' element={<Navigate replace to='/main' />}/>}
      {token && <Route path='/register' element={<Navigate replace to='/main' />}/>}
      {token && <Route path='/login' element={<Navigate replace to='/main' />}/>} */}
      
      <Route path='/' element={<Index/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/main' element={<AuthGuard/>}/>
    </Routes>
  )
}

export default App
