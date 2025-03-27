import React from 'react';
import videoSource from '/video.mp4';

function LocalVideoPlayer() {
  return (
    <div className=" relative aspect-video overflow-hidden flex justify-center items-center">
      <video 
        controls 
        className="w-300 h-200"
        poster="/path-to-thumbnail.jpg" // Optional thumbnail
      >
        <source src={videoSource} type="video/mp4" />
      </video>
    </div>
  );
}

export default LocalVideoPlayer;