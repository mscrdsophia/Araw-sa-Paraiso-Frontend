import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import "./index.css"
import HomePage from "./components/HomePage"
import Casitas from "./accomodation/casitas"
import Villas from './accomodation/villas'
import RoomDetails from "./pages/RoomDetails";
import NotFound from './pages/NotFound'
import "./App.css"

function App() {
  


  return (
  <div>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/casitas" element={<Casitas />} />
    <Route path="/villas" element={<Villas />} />
    <Route path="/rooms/:id" element={<RoomDetails />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
   
    
  </div>
  )
}

export default App
