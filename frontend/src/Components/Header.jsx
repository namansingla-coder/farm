import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-white text-2xl font-bold">Farm Disease Detection</h1>
        
        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link to="/" className="text-white font-medium hover:underline">Home</Link>
          <Link to="/potato-detection" className="text-white font-medium hover:underline">Potato Detection</Link>
          <Link to="/poultry-detection" className="text-white font-medium hover:underline">Poultry Detection</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;