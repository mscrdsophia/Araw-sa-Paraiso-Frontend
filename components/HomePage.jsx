import { Router } from "react-router-dom";
import Navbar from "./navbar";
import HeroCarousel from "./HeroCarousel";
import VideoPlayer from "/components/VideoPlayer";



function homePage() {
  return (
    <div>
      <Navbar />
      <VideoPlayer />
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-light text-amber-800 tracking-widest mb-4">
          ARAW SA PARAISO
        </h1>
        <h2 className="text-xl md:text-2xl font-serif italic text-amber-600 mb-12">
          "Where Sunshine Meets Comfort"
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
          Escape to <span className="font-semibold text-amber-800">Araw sa Paraiso</span>, a tranquil haven where golden sunrises greet you and warm hospitality feels like home. Nestled in a serene location, our hotel blends modern comfort with the vibrant energy of tropical living. Whether you're here to unwind by the pool, explore local gems, or simply relax in your cozy, sunlit room, every moment at Araw sa Paraiso is designed to rejuvenate your mind, body, and spirit.
        </p>
      </div>
      <HeroCarousel />
    </div>
  );
}

export default homePage;