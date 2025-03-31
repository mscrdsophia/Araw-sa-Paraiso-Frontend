import { useContext, useState } from "react";
import { RoomContext } from "../context/RoomContext";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

function Casitas() {
  const { rooms, loading, error } = useContext(RoomContext);
  const [currentImageIndices, setCurrentImageIndices] = useState({});

  if (loading) return (
    <div className="p-4 text-center min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-xl">Loading casitas...</div>
    </div>
  );
  
  if (error) return (
    <div className="p-4 text-red-500 min-h-screen flex items-center justify-center">
      Error: {error}
    </div>
  );

  const casitas = rooms.filter(room => 
    room.roomType?.toLowerCase().includes("casita") ||
    room.roomName?.toLowerCase().includes("casita")
  );

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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Navbar />
      
      {/* Overview Section */}
      <section className="mb-12 pt-6">
        <h1 className="text-center text-4xl md:text-5xl font-bold mb-6 mt-10 text-amber-800">
          Araw sa Paraiso Casitas
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Araw sa Paraiso's Casitas offer luxury accommodation with direct beach access via sandy footpaths, 
            magnificent views of the turquoise sea from the hillside, or seclusion within the forest canopy.
          </p>
          
          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">All stays include</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Daily breakfast</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Daily scheduled wellness class</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Non-motorised watersports equipment</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Daily afternoon tea at Clubhouse</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Morning snorkeling trip</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Complimentary WiFi</span>
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
            <p className="text-sm text-gray-500 mt-4 italic">
              *Some activities require advance booking or are first come, first serve
            </p>
          </div>
        </div>
      </section>

      {/* Casitas Collection */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Casitas Collection</h2>
        
        {casitas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {casitas.map(room => {
              const currentIndex = currentImageIndices[room._id] || 0;
              const hasMultipleImages = room.image?.length > 1;
              
              return (
                <div 
                  key={room._id} 
                  className="rounded-lg overflow-hidden  transition-transform hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative h-[400px] md:h-[500px]">
                    <img 
                      src={room.image?.[currentIndex] || "/default-casita.jpg"} 
                      alt={room.roomName} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/default-casita.jpg";
                      }}
                      loading="lazy"
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
                  
                  <div className="flex  flex-col p-6 ">
                    <h3 className="text-2xl font-serif font-medium mb-2 text-gray-800">
                      {room.roomName}
                    </h3>
                    <p className="text-gray-600 italic mb-4">
                      {room.shortDescription}
                    </p>
                    
                    {/* <Link 
                      to={`/casitas/${room._id}`} 
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
            <p className="text-xl text-gray-600">No casitas available at this time</p>
            <p className="mt-2 text-gray-500">Please check back later or contact us for availability</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Casitas;