import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'New Cars', href: '/new-cars' },
    { name: 'Used Cars', href: '/used-cars' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'About Me', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            {/* Ben Fortier Custom Logo */}
            <svg width="32" height="32" viewBox="0 0 100 100" className="text-yellow-500">
              {/* Outer circle */}
              <circle cx="50" cy="50" r="45" fill="currentColor" stroke="#000" strokeWidth="2"/>
              {/* Inner circle */}
              <circle cx="50" cy="50" r="35" fill="#000" stroke="currentColor" strokeWidth="2"/>
              {/* Wheel spokes/design */}
              <g fill="currentColor">
                {/* Center circle */}
                <circle cx="50" cy="50" r="8"/>
                {/* Spokes */}
                <rect x="48" y="20" width="4" height="15" rx="2"/>
                <rect x="48" y="65" width="4" height="15" rx="2"/>
                <rect x="20" y="48" width="15" height="4" rx="2"/>
                <rect x="65" y="48" width="15" height="4" rx="2"/>
                {/* Diagonal spokes */}
                <rect x="32" y="32" width="4" height="12" rx="2" transform="rotate(45 34 38)"/>
                <rect x="64" y="32" width="4" height="12" rx="2" transform="rotate(-45 66 38)"/>
                <rect x="32" y="56" width="4" height="12" rx="2" transform="rotate(-45 34 62)"/>
                <rect x="64" y="56" width="4" height="12" rx="2" transform="rotate(45 66 62)"/>
              </g>
            </svg>
            <span className="text-xl font-bold text-yellow-500">Ben Fortier</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-yellow-500 ${
                  isActive(item.href)
                    ? 'text-yellow-500 border-b-2 border-yellow-500 pb-1'
                    : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-white hover:text-yellow-500 hover:bg-gray-800 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-yellow-500 bg-gray-800'
                      : 'text-white hover:text-yellow-500 hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;