import React, { useState, useEffect } from 'react';
import Logo from '../assets/Logo 2.png';

const Navbar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveSubmenu(null); // Reset submenu when toggling
  };

  const handleSubmenuClick = (menu) => {
    if (isMobileView) {
      setActiveSubmenu(activeSubmenu === menu ? null : menu);
    }
  };

  return (
    <div className="text-[#2e2e2e] text-sm font-sans relative z-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-black">
        <div className="flex items-center space-x-4">
          <button onClick={toggleMobileMenu} className="md:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <span className="hidden md:inline">Menu</span>
          <svg className="w-5 h-5 ml-4 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
          </svg>
        </div>

        {/* Logo */}
        <a href="/">
          <img src={Logo} alt="Hotel Logo" className="h-10 md:h-14" />
        </a>

        <div className="flex items-center space-x-4">
          <a href="/reserve" className="bg-black text-white px-3 py-1 md:px-4 md:py-2 rounded text-xs md:text-sm">
            Reserve
          </a>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && isMobileView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobileMenu}></div>
      )}

      {/* Wrapper for nav and submenu */}
      <div
        className={`w-full ${isMobileView ? 'fixed top-0 left-0 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out' : ''} ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:bg-transparent`}
        onMouseLeave={() => !isMobileView && setActiveSubmenu(null)}
      >
        {/* Close button for mobile */}
        {isMobileView && (
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 p-2 md:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Main Navigation */}
        <div className={`flex ${isMobileView ? 'flex-col items-start px-4 py-8 space-y-4' : 'items-center justify-center px-6 py-3 border-b border-black space-x-6'} text-[14px] bg-white`}>
          <a href="/" className={`${isMobileView ? 'w-full py-2 text-lg' : ''}`}>
            <span className="font-semibold tracking-widest">ARAW SA PARAISO</span>
          </a>

          {/* Accommodation w/ submenu */}
          <div
            className={`relative ${isMobileView ? 'w-full' : ''}`}
            onMouseEnter={() => !isMobileView && setActiveSubmenu("accommodation")}
          >
            <button
              onClick={() => handleSubmenuClick("accommodation")}
              className={`${isMobileView ? 'w-full text-left py-2 flex justify-between items-center text-lg' : 'hover:underline'}`}
            >
              Accommodation
              {isMobileView && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>

          {/* Experiences w/ submenu */}
          <div
            className={`relative ${isMobileView ? 'w-full' : ''}`}
            onMouseEnter={() => !isMobileView && setActiveSubmenu("experiences")}
          >
            <button
              onClick={() => handleSubmenuClick("experiences")}
              className={`${isMobileView ? 'w-full text-left py-2 flex justify-between items-center text-lg' : 'hover:underline'}`}
            >
              Experiences
              {isMobileView && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>

          <a href="/dining" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Dining</a>
          <a href="/wellness" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Wellness</a>
          <a href="/celebrations" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Celebrations</a>
          <a href="/contact-us" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Contact Us</a>
        </div>

        {/* Submenu: Accommodation */}
        {(activeSubmenu === "accommodation" || (isMobileView && activeSubmenu === "accommodation")) && (
          <div
            className={`flex ${isMobileView ? 'flex-col items-start px-6 py-2 space-y-2' : 'items-center justify-center px-6 py-3 border-b border-black space-x-6'} text-[14px] bg-white transition-all duration-200`}
            onMouseEnter={() => !isMobileView && setActiveSubmenu("accommodation")}
          >
            <a href="/villas" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Villas</a>
            <a href="/casitas" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Casitas</a>
          </div>
        )}

        {/* Submenu: Experiences */}
        {(activeSubmenu === "experiences" || (isMobileView && activeSubmenu === "experiences")) && (
          <div
            className={`flex ${isMobileView ? 'flex-col items-start px-6 py-2 space-y-2' : 'items-center justify-center px-6 py-3 border-b border-black space-x-6'} text-[14px] bg-white transition-all duration-200`}
            onMouseEnter={() => !isMobileView && setActiveSubmenu("experiences")}
          >
            <a href="/experiences#scuba-diving" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Scuba diving</a>
            <a href="/experiences#kite" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Kite & Surf Centre</a>
            <a href="/experiences#cruises" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Cruises</a>
            <a href="/experiences#pearl" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Golden South Sea Pearl Journey</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;