import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Applicants from './Pages/Applicants'
import Notification from './Pages/Notification'
import AdminSide from './Pages/AdminSide'
import LoginPage from './Pages/LoginPage'



export default function App() {
  return (

    <Routes>
      <Route path="/applicants" element={<Applicants/>}/> 
      <Route path="/notification" element={<Notification/>}/>
      <Route path="/admin" element={<AdminSide/>}/>
      <Route path="/" element={<LoginPage/>}/>
    </Routes>


    
  )
}
