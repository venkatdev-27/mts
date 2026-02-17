import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Courses', path: '/courses' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-1.5 md:py-2' : 'bg-white py-1.5 md:py-2 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-[4.5rem] md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={() => setIsOpen(false)}>
              <img
                src="/models/logo.png"
                alt="Maruthi Tech Solutions"
                className="h-11 w-auto sm:h-[5rem] md:h-[6rem] object-contain"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.path)
                  ? 'text-primary-700 bg-primary-50'
                  : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pl-4 ml-4 border-l border-slate-200">
              <Link
                to="/register"
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-md shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-primary-600 hover:bg-primary-50 focus:outline-none transition-colors"
              aria-label="Open main menu"
            >
              <Menu className="block h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer */}
        <div className={`absolute top-0 right-0 h-auto w-[80%] max-w-sm bg-white shadow-2xl rounded-bl-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col p-6">
            {/* Header with Close Button */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-slate-900">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${isActive(link.path)
                    ? 'text-primary-700 bg-primary-50 border border-primary-100'
                    : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                    }`}
                >
                  {link.name}
                  {isActive(link.path) && <div className="w-1.5 h-1.5 rounded-full bg-primary-600"></div>}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full px-4 py-3.5 text-base font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-lg shadow-primary-500/30 transition-all active:scale-[0.98]"
              >
                Get Started
                <ChevronRight className="ml-2 h-5 w-5 opacity-90" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
