import React from 'react';
import HeroSection from '../components/HeroSection';
import Testimonials from '../components/Testimonials';
import { services } from '../data/services';
import { BookOpen, Award, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <HeroSection />

      {/* Services Preview */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
            <h2 className="text-sm text-primary-600 font-bold tracking-widest uppercase mb-3">What We Offer</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
              Comprehensive Educational Support
            </p>
            <p className="text-lg text-slate-500 leading-relaxed">
              We provide end-to-end guidance for students, from choosing the right technology to final project execution and documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              // Map icon name to component
              const Icon = index === 0 ? BookOpen : index === 1 ? Zap : index === 2 ? CheckCircle : Users;

              return (
                <div key={service.id} className="bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 group cursor-default">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary-600 transition-colors duration-300 border border-slate-100">
                    <Icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <Link to="/services" className="inline-flex items-center text-primary-600 font-bold hover:text-primary-700 hover:underline">
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>


      <Testimonials />

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
            <div className="mb-12 lg:mb-0">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-50 border border-secondary-100 mb-6">
                <span className="text-xs font-bold text-secondary-700 uppercase tracking-wide">Why Choose Us</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-6 leading-tight">
                Empowering Students with <span className="text-primary-600">Real Skills</span>
              </h2>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                We don't just provide projects; we provide knowledge. Our mentorship approach ensures you understand every line of code and concept.
              </p>

              <div className="space-y-6">
                {[
                  { title: 'Industry Experts', desc: 'Learn from professionals with years of real-time experience.' },
                  { title: '100% Practical', desc: 'Hands-on approach to learning technologies.' },
                  { title: 'On-Time Delivery', desc: 'We value your academic deadlines strictly.' },
                  { title: 'Post-Project Support', desc: 'Guidance for viva, documentation, and explanation.' },
                  { title: 'Best Price Guaranteed', desc: 'Affordable pricing for custom projects without compromising on quality.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary-50 text-primary-600 border border-primary-100">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-5">
                      <h4 className="text-lg leading-6 font-bold text-slate-900">{item.title}</h4>
                      <p className="mt-2 text-base text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-secondary-500 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-lg"></div>
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Team collaboration"
                className="relative rounded-3xl shadow-2xl w-full border border-white/20"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;