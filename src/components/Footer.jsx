import React from 'react';

const Footer = () => {
  return (
    <footer className=" text-black py-8 px-4 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-300 transition">Home</a></li>
              <li><a href="#" className="hover:text-gray-300 transition">About</a></li>
              <li><a href="#" className="hover:text-gray-300 transition">Projects</a></li>
              <li><a href="#" className="hover:text-gray-300 transition">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Email: example@practice.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Location: Virtual</li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/mscrdsophia/Araw-sa-Paraiso-Frontend" className="hover:text-gray-300 transition">Github</a>
              <a href="https://www.linkedin.com/in/sophia-mascardo-1036542b4/" className="hover:text-gray-300 transition">LinkedIn</a>
            </div>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Disclaimer: This website is a personal project created for educational and practice purposes only. 
            All images used are either original creations, sourced from Aman, or obtained from free stock photo 
            providers like Google and Pinterest. No copyright infringement is intended.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            © {new Date().getFullYear()} Practice Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;