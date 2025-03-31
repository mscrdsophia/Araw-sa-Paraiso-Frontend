import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import "./index.css"
import HomePage from "./components/HomePage"
import Casitas from "./accomodation/casitas"
import "./App.css"

function App() {
  


  return (
  <div>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/casitas" element={<Casitas />} />
  </Routes>
   
    
  </div>
  )
}

export default App
