import { Routes, Route } from 'react-router-dom'
import "./index.css"
import HomePage from "./components/HomePage"
import Casitas from "./accomodation/casitas"
import Villas from './accomodation/villas'
import RoomDetails from "./pages/RoomDetails";
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import DatePicker from "./pages/DatePicker"
import AccPage from './pages/AccPage'
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
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<LogIn />} />
    <Route path="/booking/:roomId/:userId" element={<DatePicker />} />
    <Route path="/accounts" element={<AccPage />} />
  </Routes>
   
    
  </div>
  )
}

export default App
