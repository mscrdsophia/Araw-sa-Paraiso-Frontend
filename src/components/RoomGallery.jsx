// src/components/RoomGallery.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoomGallery({ room }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % room.image.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + room.image.length) % room.image.length);
  };

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <img
        src={room.image[currentIndex]}
        alt={room.roomName}
        className="w-full h-full object-cover cursor-pointer"
        onClick={() => navigate(`/rooms/${room._id}`)}
      />
      
      {room.image.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md"
          >
            &larr;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md"
          >
            &rarr;
          </button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {room.image.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-amber-600' : 'bg-white/60'}`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}