import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';

// Import your images
import Image1 from '../assets/images/image1.jpg';
import Image2 from '../assets/images/image2.jpg';
import Image3 from '../assets/images/image3.webp';
import Image4 from '../assets/images/image4.webp';
import Image5 from '../assets/images/image5.jpg';
import Image6 from '../assets/images/image6.jpg';
import Image7 from '../assets/images/image7.jpg';
import Image8 from '../assets/images/image8.jpg';
import Image9 from '../assets/images/image9.webp';

const ImageGallery = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onOpenModal = (img) => {
    setSelectedImage(img);
    setOpen(true);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };
  
  const onCloseModal = () => {
    setOpen(false);
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  };

  return (
    <div className="px-4 md:px-8 py-6 md:py-12">
      <Swiper
        spaceBetween={isMobile ? 12 : 24}
        slidesPerView={'auto'}
        freeMode={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[FreeMode, Pagination]}
        className="w-full"
      >
        {[Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9].map((img, index) => (
          <SwiperSlide
            key={index}
            className="!w-auto cursor-pointer"
            onClick={() => onOpenModal(img)}
          >
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              className={`${isMobile ? 'w-[200px] h-[200px]' : 'w-[300px] h-[300px]'} object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Modal Implementation */}
      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm" 
            onClick={onCloseModal}
            aria-hidden="true"
          />
          
          {/* Modal Content */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative z-10 max-w-[95vw]">
              <button
                onClick={onCloseModal}
                className="absolute -top-12 right-0 bg-white rounded-full p-2 z-50 hover:bg-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={selectedImage}
                alt="Enlarged"
                className={`${isMobile ? 'max-h-[70vh]' : 'max-h-[80vh]'} max-w-full rounded-lg object-contain`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;