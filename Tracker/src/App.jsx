import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import StartPage from './Pages/Start'



export default function App() {
  return (

    <Routes>
      <Route path="/" element={<StartPage/>}/> 
    </Routes>


    
  )
}
