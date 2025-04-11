
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import RoomGallery from "../components/RoomGallery";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


export default function RoomDetails() {
  const { id } = useParams();
  const { rooms } = useContext(RoomContext);
  const { user } = useContext(AuthContext);
  const room = rooms.find(r => r._id === id);

  if (!room) return <div className="p-8 text-center">Room not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
    <Navbar />
    <h1 className="text-3xl font-bold mb-6 mt-8">{room.roomName}</h1>
<div className="mb-6">
  <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
    Back to Home
  </a>
</div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
        
          <RoomGallery room={room} />
          <div className="mt-5 text-gray-400">
             <p>To book this room please make sure you are <a href="/login" className="text-blue-500 hover:underline"> log in</a> </p>
          </div>
         
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 text-sm">{room.roomDescription || "No description available."}</p>
          </div>
          
          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <h2 className=" text-center text-3xl font-semibold mb-4 text-gray-800">All stays include</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Private swimming pool</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>King-size bed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Beach, sea and island views</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Large bathroom with Cebu marble accents</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>WiFi, TV, sound system, safe</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Private deck</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>In-room refreshments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Access to wellness facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>24/7 concierge service</span>
                </li>
              </ul>
            </div>
          </div>
        
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
            <p className="text-2xl text-amber-700 font-bold">
              ${room.roomPrice?.toLocaleString()} <span className="text-lg text-gray-600">/ night</span>
            </p>

            {user && <Link to={`/booking/${room._id}/${user._id}`} >
               <button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium">
              Book Now
            </button>
            </Link>}
           
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}