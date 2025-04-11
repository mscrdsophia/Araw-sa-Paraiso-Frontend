import React, { useState, useEffect, useContext, useRef } from 'react';
import Logo from '../assets/Logo 2.png';
import User from '../assets/images/user.png';
import { AuthContext } from '../context/auth.context';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);
  
  // Refs for menu and submenu containers
  const menuRef = useRef(null);
  const submenuRef = useRef(null);

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

  // Handle mouse leave for the combined menu and submenu area
  const handleMouseLeave = (e) => {
    if (isMobileView) return;
    
    // Check if we're leaving to a non-child element
    const relatedTarget = e.relatedTarget;
    if (
      !menuRef.current?.contains(relatedTarget) && 
      !submenuRef.current?.contains(relatedTarget)
    ) {
      setActiveSubmenu(null);
    }
  };

  const handleReserveClick = () => {
    const route = Math.random() < 0.5 ? "/villas" : "/casitas";
    window.location.href = route;
  };

  return (
    <div className="text-[#2e2e2e] text-sm font-sans relative z-50 bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-black">
        {/* Mobile menu button */}
        <button onClick={toggleMobileMenu} className="md:hidden">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {isLoggedIn ? (
          <div className="flex items-center space-x-2">
            <img src={User} alt="User" className="w-5 h-5" />
            <Link to={`/accounts/${user._id}`}>
              <span className="text-sm hidden md:inline">{user?.firstName}</span>
            </Link>
          </div>
        ) : (
          <a href="/login" className="flex items-center space-x-2">
            <img src={User} alt="Login" className="w-5 h-5" />
            <span className="text-sm hidden md:inline">Login</span>
          </a>
        )}

        <div className="flex-1 flex justify-center md:flex-none">
          <a href="/">
            <img src={Logo} alt="Hotel Logo" className="h-10 md:h-14" />
          </a>
        </div>

        <div className="flex items-center space-x-4">
  <button 
    onClick={handleReserveClick}
    className="bg-black text-white px-3 py-1 md:px-4 md:py-2 rounded text-xs md:text-sm"
  >
    Reserve
  </button>
</div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && isMobileView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobileMenu}></div>
      )}

      <div
        className={`w-full ${isMobileView ? 'fixed top-0 left-0 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out' : ''} ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:bg-transparent`}
        onMouseLeave={handleMouseLeave}
        ref={menuRef}
      >
        {isMobileView && (
          <button onClick={toggleMobileMenu} className="absolute top-4 right-4 p-2 md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Mobile user section */}
        {isMobileView && (
          <div className="px-4 pt-12 pb-4 border-b border-gray-200">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2 text-lg">
                <Link to={`/accounts/${user._id}`}>
                  <img src={User} alt="User" className="w-6 h-6" />
                  <span>{user?.firstName}</span>
                </Link>
              </div>
            ) : (
              <a href="/login" className="flex items-center space-x-2 text-lg">
                <img src={User} alt="Login" className="w-6 h-6" />
                <span>Login</span>
              </a>
            )}
          </div>
        )}

        {/* Main Navigation */}
        <div className={`flex ${isMobileView ? 'flex-col items-start px-4 py-4 space-y-4' : 'items-center justify-center px-6 py-3 border-b border-black space-x-6'} text-[14px] bg-white`}>
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

          <a className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Dining</a>
          <a className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Wellness</a>
          <a className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Celebrations</a>
          <a className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Contact Us</a>
        </div>

        {/* Submenu: Accommodation */}
        {(activeSubmenu === "accommodation" || (isMobileView && activeSubmenu === "accommodation")) && (
          <div
            className={`flex ${isMobileView ? 'flex-col items-start px-6 py-2 space-y-2' : 'items-center justify-center px-6 py-3 border-b border-black space-x-6'} text-[14px] bg-white transition-all duration-200`}
            ref={submenuRef}
          >
            <a href="/villas" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Villas</a>
            <a href="/casitas" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Casitas</a>
          </div>
        )}

        {/* Submenu: Experiences */}
        {(activeSubmenu === "experiences" || (isMobileView && activeSubmenu === "experiences")) && (
          <div
            className={`flex ${isMobileView ? 'flex-col items-start px-6 py-2 space-y-2' : 'items-center justify-center px-6 py-3 border-b border-black space-x-6'} text-[14px] bg-white transition-all duration-200`}
            ref={submenuRef}
          >
            <a href="/scuba-diving" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Scuba diving</a>
            <a href="/kite-surf" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Kite & Surf Centre</a>
            <a href="/cruises" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Cruises</a>
            <a href="/pearl-journey" className={`hover:underline ${isMobileView ? 'py-2 text-lg w-full' : ''}`}>Golden South Sea Pearl Journey</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;