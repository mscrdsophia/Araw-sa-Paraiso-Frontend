import { useState } from "react";
import { Link } from "react-router-dom";

export default function RoomCollection({ 
  rooms, 
  title, 
  fallbackDescription = "Experience luxury amidst nature.",
  basePath = "/rooms"
}) {
  const [currentImageIndices, setCurrentImageIndices] = useState({});

  const handleNextImage = (roomId, imageCount) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % imageCount
    }));
  };

  const handlePrevImage = (roomId, imageCount) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + imageCount) % imageCount
    }));
  };

  return (
    
    <section className="mb-16">
      {title && <h2 className="text-3xl font-bold mb-8 text-gray-800">{title}</h2>}
      
      {rooms?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
          {rooms.map(room => {
            const currentIndex = currentImageIndices[room._id] || 0;
            const hasMultipleImages = room.image?.length > 1;
            
            return (
              <div 
                key={room._id} 
                className="rounded-lg overflow-hidden  transition-transform hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-[400px] md:h-[500px]">
                  <img 
                    src={room.image?.[currentIndex] || "/default-room.jpg"} 
                    alt={room.roomName} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/default-room.jpg";
                    }}
                  />
                  
                  {hasMultipleImages && (
                    <>
                      <button 
                        onClick={() => handlePrevImage(room._id, room.image.length)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition"
                        aria-label="Previous image"
                      >
                        &#8249;
                      </button>
                      <button 
                        onClick={() => handleNextImage(room._id, room.image.length)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition"
                        aria-label="Next image"
                      >
                        &#8250;
                      </button>
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                        {room.image.map((_, index) => (
                          <span 
                            key={index}
                            className={`inline-block h-2 w-2 rounded-full ${index === currentIndex ? 'bg-amber-600' : 'bg-white/60'}`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <div className=" flex flex-col p-6 ">
                  <h3 className="text-2xl font-serif font-medium mb-2 text-gray-800">
                    {room.roomName}
                  </h3>
                  <p className="text-gray-600 italic mb-4">
                    {room.shortDescription || fallbackDescription}
                  </p>
                  
                  {/* <Link 
                    to={`${basePath}/${room._id}`} 
                    className="mt-2 inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded transition font-medium"
                  >
                    View Details
                  </Link> */}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-xl text-gray-600">No rooms available at this time</p>
        </div>
      )}
    </section>
  );
}