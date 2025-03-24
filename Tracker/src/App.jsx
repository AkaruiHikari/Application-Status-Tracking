import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import StartPage from './Pages/Start'
import Applicants from './Pages/Applicants'
import Notification from './Pages/Notification'



export default function App() {
  return (

    <Routes>
      <Route path="/" element={<StartPage/>}/> 
      <Route path="/applicants" element={<Applicants/>}/> 
      <Route path="/notification" element={<Notification/>}/>

    </Routes>


    
  )
}
