import React from 'react';
import { services } from '../data/services';
import { BookOpen, Code, FileText, CheckCircle, Brain, Smartphone, Cpu, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  // Extended services for the page
  const allServices = [
    ...services,
    { id: '5', title: 'AI & Machine Learning', description: 'Advanced projects using Python, TensorFlow, and NLP to solve real-world problems with data intelligence.', iconName: 'Brain' },
    { id: '6', title: 'App Development', description: 'Native and Cross-platform mobile app creation using Flutter and React Native for Android and iOS.', iconName: 'Smartphone' },
    { id: '7', title: 'IoT Solutions', description: 'Hardware integration and real-time IoT projects using Arduino, Raspberry Pi and Cloud sensors.', iconName: 'Cpu' },
    { id: '8', title: 'Full Stack', description: 'Comprehensive training and development in MERN, MEAN, and Python Django stacks for scalable web apps.', iconName: 'Layers' },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen': return BookOpen;
      case 'Code': return Code;
      case 'CheckCircle': return CheckCircle;
      case 'FileText': return FileText;
      case 'Brain': return Brain;
      case 'Smartphone': return Smartphone;
      case 'Cpu': return Cpu;
      default: return Layers;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">Our Educational Services</h1>
          <p className="mt-4 text-xl text-slate-500">
            We offer more than just project code. We offer a complete learning ecosystem for engineering students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {allServices.map((service) => {
            const Icon = getIcon(service.iconName);
            return (
              <div key={service.id} className="relative p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="absolute top-0 right-0 -mt-3 -mr-3 w-24 h-24 bg-primary-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl"></div>
                <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-xl text-primary-600 mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 h-[4.5em]">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-primary-700 to-primary-900 rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="mb-6 md:mb-0 relative z-10">
             <h2 className="text-2xl font-bold text-white mb-2">Need a custom service?</h2>
             <p className="text-primary-100">Contact us to discuss your specific requirements.</p>
          </div>
          <Link to="/contact" className="relative z-10 bg-white text-primary-800 hover:bg-slate-50 px-8 py-3.5 rounded-xl font-bold transition-colors shadow-lg">
             Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;