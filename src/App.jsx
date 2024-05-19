import { useState } from 'react'
import { Route, Routes, Navigate } from "react-router-dom"
import Register from "./components/Register"
import Login from './components/Login'
import Index from "./components/Index"

function App() {
  return(
    <Routes>
      <Route path='/' element={<Index/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default App
