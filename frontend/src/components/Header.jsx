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
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="flex flex-col items-center">
              {/* Custom Logo - Replace with your provided logo */}
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-2 border-yellow-500">
                <div className="w-4 h-4 bg-yellow-200 rounded-full relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-0.5 w-0.5 h-1 bg-yellow-600"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-0.5 w-0.5 h-1 bg-yellow-600"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-0.5 w-1 h-0.5 bg-yellow-600"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-0.5 w-1 h-0.5 bg-yellow-600"></div>
                </div>
              </div>
            </div>
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