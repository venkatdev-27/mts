import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        content: "The mentorship I received was invaluable. They didn't just give me the code; they explained every concept in depth. I was able to answer every question in my viva with confidence.",
        author: "Priya Sharma",
        role: "Final Year B.Tech Student",
        initials: "PS",
        color: "bg-blue-500",
        rating: 5
    },
    {
        id: 2,
        content: "We outsourced our department's final year project guidance to them. The professionalism and technical quality were outstanding. Best UI/UX designs I've seen in student projects.",
        author: "Dr. Rajesh Kumar",
        role: "Assistant Professor, CS Department",
        initials: "RK",
        color: "bg-emerald-500",
        rating: 5
    },
    {
        id: 3,
        content: "I was struggling with my AI project documentation and implementation. Their team helped me build a stunning sophisticated web app that won the best project award at my college.",
        author: "Arun Patel",
        role: "M.Tech Scholar",
        initials: "AP",
        color: "bg-purple-500",
        rating: 5
    }
];

const Testimonials: React.FC = () => {
    return (
        <section className="py-20 bg-slate-50 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Testimonials</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Trusted by Students & <span className="text-primary-600">Faculty</span>
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Don't just take our word for it. Here's what the academic community has to say about our guidance and project quality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative group hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                                <Quote className="w-5 h-5 text-white" />
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                                ))}
                            </div>

                            <blockquote className="text-slate-600 mb-8 leading-relaxed italic">
                                "{testimonial.content}"
                            </blockquote>

                            <div className="flex items-center border-t border-slate-100 pt-6">
                                <div className={`w-12 h-12 rounded-full ${testimonial.color} text-white flex items-center justify-center font-bold text-lg shadow-md`}>
                                    {testimonial.initials}
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-base font-bold text-slate-900">{testimonial.author}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
