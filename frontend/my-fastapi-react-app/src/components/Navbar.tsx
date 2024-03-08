import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex justify-center space-x-4">
        <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
        <li><Link to="/services" className="hover:text-gray-300">Services</Link></li>
        <li><Link to="/portfolio" className="hover:text-gray-300">Portfolio</Link></li>
        <li><Link to="/testimonials" className="hover:text-gray-300">Testimonials</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
