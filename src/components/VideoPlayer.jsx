import React, { useRef, useEffect, useState } from 'react';
import videoSource from '../assets/video/video.mp4';

function LocalVideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => setShowPlayButton(true);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is in viewport
            video.play().catch(error => {
              console.log('Autoplay prevented:', error);
              setShowPlayButton(true);
            });
          } else {
            // Video is out of viewport
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // When 50% of the video is visible
      }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play().then(() => setShowPlayButton(false));
    } else {
      video.pause();
    }
  };

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-black flex justify-center items-center">
      <video 
        ref={videoRef}
        controls={isPlaying}
        className="w-full h-full object-contain"
        poster="/path-to-thumbnail.jpg"
        muted // Required for autoplay in most browsers
        playsInline // For iOS compatibility
        loop // Optional: if you want the video to loop
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Custom play button for when autoplay fails */}
      {showPlayButton && (
        <button 
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center w-full h-full"
          aria-label="Play video"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 md:w-10 md:h-10 text-white" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}

export default LocalVideoPlayer;