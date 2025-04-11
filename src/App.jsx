import { Routes, Route } from 'react-router-dom'
import "./index.css"
import HomePage from "./components/HomePage"
import Casitas from "./accomodation/casitas"
import Villas from './accomodation/villas'
import RoomDetails from "./pages/RoomDetails";
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Booking from "./pages/Booking"
import AccPage from './pages/AccPage'
import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <Route path="/booking/:roomId/:userId" element={<Booking />} />
    <Route path="/accounts/:userId" element={<AccPage />} />
  </Routes>
   
  <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
  </div>
  )
}

export default App
