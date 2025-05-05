import React from "react";
import Link from "next/link";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white pt-8 pb-4 mt-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3 mb-6 md:mb-0">
          <img
            src="/logo.jpg"
            alt="Smart Finance Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span
            className={`text-2xl font-bold italic text-white drop-shadow-md ${dancingScript.className}`}
          >
            Smart Finance
          </span>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6 mb-6 md:mb-0">
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="w-6 h-6 hover:text-blue-300 transition duration-300" />
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="w-6 h-6 hover:text-blue-300 transition duration-300" />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-6 h-6 hover:text-blue-300 transition duration-300" />
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-300 text-center md:text-right">
          &copy; 2025 Smart Finance Advisor. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
