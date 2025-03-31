import React, { useState } from 'react';
import Logo from '../assets/Logo 2.png';

const Navbar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null); 

  return (
    <div className="text-[#2e2e2e] text-sm font-sans relative z-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-black">
        <div className="flex items-center space-x-4">
          <button>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <span>Menu</span>
          <svg className="w-5 h-5 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
          </svg>
        </div>

        {/* Logo */}
        <a href="/">
          <img  src={Logo} alt="Hotel Logo" className="h-14" />
        </a>
        

        <div className="flex items-center space-x-4">
          <a href="/reserve" className="bg-black text-white px-4 py-2 rounded">Reserve</a>
        </div>
      </div>

      {/* Wrapper for nav and submenu */}
      <div
        className="w-full"
        onMouseLeave={() => setActiveSubmenu(null)}
      >
        {/* Main Navigation */}
        <div className="flex items-center justify-center px-6 py-3 border-b border-black space-x-6 text-[14px] bg-white">
        <a href="/">
          <span  className="font-semibold tracking-widest">ARAW SA PARAISO</span>
        </a>
          

          {/* Accommodation w/ submenu */}
          <div
            onMouseEnter={() => setActiveSubmenu("accommodation")}
            className="relative"
          >
            <a  className="hover:underline">Accommodation</a>
          </div>

          {/* Experiences w/ submenu */}
          <div
            onMouseEnter={() => setActiveSubmenu("experiences")}
            className="relative"
          >
            <a href="/experiences" className="hover:underline">Experiences</a>
          </div>

          <a href="/dining" className="hover:underline">Dining</a>
          <a href="/wellness" className="hover:underline">Wellness</a>
          <a href="/celebrations" className="hover:underline">Celebrations</a>
          <a href="/contact-us" className="hover:underline">Contact Us</a>
        </div>

        {/* Submenu: Accommodation */}
        {activeSubmenu === "accommodation" && (
          <div
            className="flex items-center justify-center px-6 py-3 border-b border-black space-x-6 text-[14px] bg-white transition-all duration-200"
            onMouseEnter={() => setActiveSubmenu("accommodation")}
          >
            <a href="/villas" className="hover:underline">Villas</a>
            <a href="/casitas" className="hover:underline">Casitas</a>
        
          </div>
        )}

        {/* Submenu: Experiences */}
        {activeSubmenu === "experiences" && (
          <div
            className="flex items-center justify-center px-6 py-3 border-b border-black space-x-6 text-[14px] bg-white transition-all duration-200"
            onMouseEnter={() => setActiveSubmenu("experiences")}
          >
            <a href="/experiences#scuba-diving" className="hover:underline">Scuba diving</a>
            <a href="/experiences#kite" className="hover:underline">Kite & Surf Centre</a>
            <a href="/experiences#cruises" className="hover:underline">Cruises</a>
            <a href="/experiences#pearl" className="hover:underline">Golden South Sea Pearl Journey</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
