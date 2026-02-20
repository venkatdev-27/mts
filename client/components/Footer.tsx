import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden text-white pt-16 pb-8 border-t border-slate-700 bg-[radial-gradient(circle_at_15%_20%,rgba(20,184,166,0.22),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(99,102,241,0.2),transparent_36%),linear-gradient(160deg,#020617_0%,#0b1120_48%,#111827_100%)]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:42px_42px]"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent"></div>
      <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[620px] h-[280px] bg-primary-500/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img
                src="/models/logo.png"
                alt="Maruthi Tech Solutions"
                className="h-[5.5rem] w-auto sm:h-[6.5rem] md:h-[8rem] object-contain"
              />
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


          {/* Top Courses */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Top Courses</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/courses" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">Full Stack Development</Link>
              </li>
              <li>
                <Link to="/courses" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">Python for Developers</Link>
              </li>
              <li>
                <Link to="/courses" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">Data Science & AI/ML</Link>
              </li>
              <li>
                <Link to="/courses" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">React Frontend Mastery</Link>
              </li>
              <li>
                <Link to="/courses" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">nodejs Backend Development</Link>
              </li>
              <li>
                <Link to="/courses" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">Mobile App Development</Link>
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
              <li   className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-primary-400">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="ml-3 text-slate-400 text-sm">+91 6309616945</span>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-primary-400">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="ml-3 text-slate-400 text-sm">info.maruthitechsolutions@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Maruthi Tech Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-slate-500 hover:text-white text-xs transition-colors">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
