"use client";

import React from "react";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const Navbar = ({ onLoginClick }) => {
  return (
    <nav className="bg-blue-800 text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo and Brand Name */}
          <div className="flex items-center space-x-3">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span
              className={`text-4xl font-bold italic text-white drop-shadow-md ${dancingScript.className}`}
            >
              Smart Finance
            </span>
          </div>

          {/* Right: Navigation Links */}
          <div className="flex items-center space-x-8">
            <a
              href="#hero"
              className="hover:text-blue-300 transition-colors scroll-smooth"
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-blue-300 transition-colors scroll-smooth"
            >
              About Us
            </a>
            <a
              href="#cta"
              className="hover:text-blue-300 transition-colors scroll-smooth"
            >
              Get Started
            </a>
            <a
              href="#contact"
              className="hover:text-blue-300 transition-colors scroll-smooth"
            >
              Contact Us
            </a>

            {/* Login Button */}
            <button
              onClick={onLoginClick}
              className="bg-white text-blue-800 px-4 py-1.5 rounded-md font-semibold hover:bg-blue-100 transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
