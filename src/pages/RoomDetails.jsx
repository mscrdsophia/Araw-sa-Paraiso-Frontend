// src/pages/RoomDetails.jsx
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import RoomGallery from "../components/RoomGallery";
import Navbar from "../components/navbar";

export default function RoomDetails() {
  const { id } = useParams();
  const { rooms } = useContext(RoomContext);
  const room = rooms.find(r => r._id === id);

  if (!room) return <div className="p-8 text-center">Room not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
    <Navbar />
      <h1 className="text-3xl font-bold mb-6 mt-8 ">{room.roomName}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <RoomGallery room={room} />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{room.roomDescription || "No description available."}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {room.amenities?.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-amber-600 mr-2">✓</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
            <p className="text-2xl text-amber-700 font-bold">
              ${room.roomPrice?.toLocaleString()} <span className="text-lg text-gray-600">/ night</span>
            </p>
            <button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}