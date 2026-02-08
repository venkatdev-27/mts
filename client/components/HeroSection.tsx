import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-white pt-28 pb-12 lg:pt-32 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 text-center lg:text-left z-10 relative">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 border border-primary-100 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary-600 mr-2"></span>
              <span className="text-xs font-semibold text-primary-700 uppercase tracking-wide">Premium Educational Projects</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4 sm:mb-6 leading-tight">
              Innovate Your <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                Engineering Career
              </span>
            </h1>
            
            <p className="text-base sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Maruthi Tech Solutions bridges the gap between academic theory and industry reality. We provide high-quality, real-time projects with complete mentorship.
            </p>
            
            <div className="flex flex-row gap-3 justify-center lg:justify-start">
              <Link
                to="/projects"
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white bg-primary-600 rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:shadow-primary-600/40 transform hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
              >
                Explore Projects
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                to="/contact"
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-slate-700 bg-white border-2 border-slate-100 rounded-xl hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 transition-all duration-300 whitespace-nowrap"
              >
                Contact Mentors
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-4 sm:space-x-8 text-slate-400">
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-500 mr-1.5 sm:mr-2" />
                <span className="text-xs sm:text-sm font-medium">IEEE Standards</span>
              </div>
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-500 mr-1.5 sm:mr-2" />
                <span className="text-xs sm:text-sm font-medium">Real-time Code</span>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="lg:col-span-6 mt-10 lg:mt-0 relative px-4 sm:px-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary-900/10 border border-slate-100">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-transparent mix-blend-overlay z-10"></div>
              <img
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                alt="Students collaborating"
              />
            </div>
            
            {/* Floating Badge - Hidden on mobile to save space/reduce clutter */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:block z-20">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Admissions Open</p>
                  <p className="text-sm font-bold text-slate-900">Batch 2024-25</p>
                </div>
              </div>
            </div>
            
             {/* Decorative Elements */}
             <div className="absolute -top-12 -right-12 w-32 h-32 sm:w-64 sm:h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
             <div className="absolute -bottom-12 -left-12 w-32 h-32 sm:w-64 sm:h-64 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HeroSection;