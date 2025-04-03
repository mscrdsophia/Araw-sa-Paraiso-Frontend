import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function RoomCollection({ 
  rooms, 
  title, 
  fallbackDescription = "Experience luxury amidst nature.",
  basePath = "/rooms"
}) {
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance to trigger image change
  const minSwipeDistance = 50;

  const handleNextImage = (roomId, imageCount, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndices(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % imageCount
    }));
  };

  const handlePrevImage = (roomId, imageCount, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndices(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + imageCount) % imageCount
    }));
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (roomId, imageCount) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentImageIndices(prev => ({
        ...prev,
        [roomId]: ((prev[roomId] || 0) + 1) % imageCount
      }));
    } else if (isRightSwipe) {
      setCurrentImageIndices(prev => ({
        ...prev,
        [roomId]: ((prev[roomId] || 0) - 1 + imageCount) % imageCount
      }));
    }
    
    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className="mb-16 px-4 sm:px-6">
      {title && <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">{title}</h2>}
      
      {rooms?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {rooms.map(room => {
            const currentIndex = currentImageIndices[room._id] || 0;
            const hasMultipleImages = room.image?.length > 1;
            
            return (
              <div key={room._id} className="rounded-lg overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-1">
                <Link 
                  to={`/rooms/${room._id}`}
                  className="block"
                >
                  <div 
                    className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] group"
                    onTouchStart={hasMultipleImages ? handleTouchStart : null}
                    onTouchMove={hasMultipleImages ? handleTouchMove : null}
                    onTouchEnd={hasMultipleImages ? () => handleTouchEnd(room._id, room.image.length) : null}
                  >
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
                        {/* Desktop navigation buttons */}
                        <button 
                          onClick={(e) => handlePrevImage(room._id, room.image.length, e)}
                          className="hidden sm:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition opacity-0 group-hover:opacity-100"
                          aria-label="Previous image"
                        >
                          &#8249;
                        </button>
                        <button 
                          onClick={(e) => handleNextImage(room._id, room.image.length, e)}
                          className="hidden sm:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition opacity-0 group-hover:opacity-100"
                          aria-label="Next image"
                        >
                          &#8250;
                        </button>

                        {/* Mobile navigation buttons (always visible) */}
                        <button 
                          onClick={(e) => handlePrevImage(room._id, room.image.length, e)}
                          className="sm:hidden absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md"
                          aria-label="Previous image"
                        >
                          &#8249;
                        </button>
                        <button 
                          onClick={(e) => handleNextImage(room._id, room.image.length, e)}
                          className="sm:hidden absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md"
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
                  
                  <div className="flex flex-col p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-serif font-medium mb-2 text-gray-800">
                      {room.roomName}
                    </h3>
                    <p className="text-gray-600 italic mb-2 sm:mb-4">
                      {room.shortDescription || fallbackDescription}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-lg sm:text-xl text-gray-600">No rooms available at this time</p>
        </div>
      )}
      <Footer />
    </section>
  );
}