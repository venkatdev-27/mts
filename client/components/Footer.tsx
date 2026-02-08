import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
               <div className="bg-primary-600 p-2 rounded-lg">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">Maruthi<span className="text-primary-400">Tech</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Empowering students with real-time projects, mentorship, and cutting-edge technology training for a brighter career future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-primary-600 hover:text-white transition-all">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-primary-600 hover:text-white transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/maruthitechsolutions" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-primary-600 hover:text-white transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-400 hover:text-primary-400 text-sm transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-primary-400 text-sm transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span> About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-primary-400 text-sm transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span> Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-primary-400 text-sm transition-colors flex items-center">
                   <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span> Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Top Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">Web Development</Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">AI & Machine Learning</Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">IoT Systems</Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">IEEE Standards</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-primary-400 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="ml-3 text-slate-400 text-sm leading-snug">Gandhi nagar, Vijayawada, India</span>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-primary-400">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="ml-3 text-slate-400 text-sm">+91 6309616945</span>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-primary-400">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="ml-3 text-slate-400 text-sm">info.maruthitechsolutions.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Maruthi Tech Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;