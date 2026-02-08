import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2, ChevronRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-2.5 rounded-xl shadow-lg group-hover:shadow-primary-500/30 transition-all duration-300">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-slate-900 leading-none">
                  Maruthi<span className="text-primary-600">Tech</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">Solutions</span>
              </div>
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
                to="/contact"
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-md shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-primary-600 hover:bg-primary-50 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-x-0 top-[72px] bg-white border-b border-slate-100 shadow-xl transition-all duration-300 origin-top transform ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0'} overflow-hidden`}>
        <div className="px-4 pt-2 pb-6 flex flex-col h-full bg-white">
          <div className="space-y-1 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${isActive(link.path)
                    ? 'text-primary-700 bg-primary-50 border border-primary-100'
                    : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                  }`}
              >
                {link.name}
                {isActive(link.path) && <div className="w-1.5 h-1.5 rounded-full bg-primary-600"></div>}
              </Link>
            ))}
          </div>

          <div className="mt-auto px-1 pb-2">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full px-4 py-4 text-base font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-lg shadow-primary-500/30 transition-all active:scale-[0.98]"
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5 opacity-90" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;