import React from 'react';
import { Target, TrendingUp, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-primary-900 pt-32 pb-16 sm:pt-36 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">About Us</h1>
          <p className="mt-4 text-xl text-primary-200 max-w-2xl mx-auto">
            Maruthi Tech Solutions is dedicated to empowering the next generation of engineers.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <div className="prose prose-lg text-gray-500 space-y-4">
              <p>
                Founded with a vision to bridge the gap between academic theory and practical industry application, Maruthi Tech Solutions has emerged as a trusted partner for B.Tech and Degree students.
              </p>
              <p>
                We specialize in guiding students through their academic projects, offering real-time insights into technologies like Web Development, Machine Learning, Data Science, and IoT.
              </p>
              <p>
                Our team consists of industry veterans and passionate educators who believe that every student has the potential to innovate if given the right guidance.
              </p>
            </div>
          </div>
          <div className="relative">
             <div className="absolute top-4 left-4 w-full h-full bg-primary-100 rounded-lg transform translate-x-2 translate-y-2 z-0"></div>
             <img 
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80" 
               alt="Team working together" 
               className="relative z-10 rounded-lg shadow-xl w-full"
             />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To provide high-quality, practical technical education and project guidance that enhances employability.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become the leading educational technology partner for students across the nation.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600">
              Integrity, Innovation, Quality, and Student-Centricity are at the core of everything we do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;