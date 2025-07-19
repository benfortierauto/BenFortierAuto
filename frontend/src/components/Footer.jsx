import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { contactInfo } from '../data/mock';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-yellow-500" />
              <span className="text-xl font-bold text-yellow-500">Ben Fortier</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your dedicated car sales expert, committed to finding your perfect vehicle with transparency and unparalleled service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-yellow-500 font-semibold text-lg">Quick Links</h3>
            <nav className="space-y-2">
              <Link to="/new-cars" className="block text-white hover:text-yellow-500 transition-colors text-sm">
                New Cars
              </Link>
              <Link to="/used-cars" className="block text-white hover:text-yellow-500 transition-colors text-sm">
                Used Cars
              </Link>
              <Link to="/reviews" className="block text-white hover:text-yellow-500 transition-colors text-sm">
                Reviews
              </Link>
              <Link to="/about" className="block text-white hover:text-yellow-500 transition-colors text-sm">
                About Me
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-yellow-500 font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-white text-sm">{contactInfo.phone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-white text-sm">{contactInfo.email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-white text-sm">{contactInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h3 className="text-yellow-500 font-semibold text-lg">Business Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-white text-sm">{contactInfo.hours.weekdays}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-white text-sm">{contactInfo.hours.saturday}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-white text-sm">{contactInfo.hours.sunday}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Ben Fortier. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;