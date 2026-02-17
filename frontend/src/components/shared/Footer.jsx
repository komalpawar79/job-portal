import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-10">
      <div className="container mx-auto text-center">
        
        <p className="text-gray-700 text-sm">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>

        <div className="mt-3 flex justify-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-800 transition">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 transition">
            Terms
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 transition">
            Contact
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="mt-4 flex justify-center space-x-5">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition text-xl">
            <FaFacebookF />
          </a>
          <a href="#" className="text-gray-600 hover:text-pink-600 transition text-xl">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-400 transition text-xl">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-700 transition text-xl">
            <FaLinkedinIn />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
