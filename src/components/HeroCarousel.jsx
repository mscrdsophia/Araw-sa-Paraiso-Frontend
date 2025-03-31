import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

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

  const onOpenModal = (img) => {
    setSelectedImage(img);
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);

  return (
    <div className="px-4 py-8">
      {/* Background blur effect when modal is open */}
      <div className={`fixed inset-0 z-40 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>

      <Swiper
        spaceBetween={24}
        slidesPerView={'auto'}
        freeMode={true}
        pagination={{
          clickable: true,
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
              className="w-[300px] h-[300px] object-cover rounded-lg shadow-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal with custom styles */}
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: 'custom-overlay',
          modal: 'custom-modal',
          closeButton: 'custom-close-button',
        }}
      >
        <img
          src={selectedImage}
          alt="Enlarged"
          className="max-w-full max-h-[80vh] rounded-lg"
        />
      </Modal>
    </div>
  );
};

export default ImageGallery;