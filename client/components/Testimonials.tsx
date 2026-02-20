import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Ravi Kumar",
        role: "Full Stack Developer",
        content: "The AI course was a game changer. The mentors explained complex concepts in such a simple way. I landed a job at a top MNC within 2 months of completion!",
        rating: 5,
        image: "https://png.pngtree.com/png-clipart/20240816/original/pngtree-cheerful-indian-student-smiling-and-pointing-side-ward-with-png-image_15786841.png"
    },
    {
        id: 2,
        name: "Priya",
        role: "Data Scientist",
        content: "MTS provides real-time project experience which is missing in other institutes. The hands-on training helped me crack my interview easily.",
        rating: 5,
        image: "https://images.pexels.com/photos/31868218/pexels-photo-31868218.jpeg?cs=srgb&dl=pexels-prachi-rakesh-phadtare-2151819036-31868218.jpg&fm=jpg"
    },
    {
        id: 3,
        name: "Siva KUmar",
        role: "Student",
        content: "I was struggling with my final year project. The team at MTS not only helped me complete it but also taught me how to present it. Highly recommended!",
        rating: 5,
        image: "https://i.pinimg.com/736x/5a/ab/f8/5aabf84d67477f77d3bb8f0fe4cfcd17.jpg"
    },
    {
        id: 4,
        name: "Sneha Reddy",
        role: "Software Engineer",
        content: "Best place to learn React and Node.js. The syllabus is updated with current industry trends. The support team is always available to clear doubts.",
        rating: 4,
        image: "https://www.globalindian.com/youth//wp-content/uploads/2022/05/Sneha-Shahi-min.jpg"
    },
    {
        id: 5,
        name: "Karthik N",
        role: "Cloud Engineer",
        content: "The devops training was practical and to the point. I learned Docker and Kubernetes which are essential for my career growth.",
        rating: 5,
        image: "https://st4.depositphotos.com/13187390/27263/i/450/depositphotos_272633644-stock-photo-indian-collage-student-bag.jpg"
    },
    {
        id: 6,
        name: "Anjali Gupta",
        role: "UI/UX Designer",
        content: "The design principles taught here are top-notch. I built a strong portfolio that impressed my recruiters. Thank you MTS!",
        rating: 5,
        image: "https://news.northeastern.edu/wp-content/uploads/2025/09/Anjali-New-Headshot_1400.jpg?w=287&h=287&crop=1"
    },
    {
        id: 7,
        name: "Vikram Singh",
        role: "Python Developer",
        content: "From zero coding knowledge to a Python developer. The journey was amazing. The mentors are very patient and knowledgeable.",
        rating: 5,
        image: "https://static.vecteezy.com/system/resources/thumbnails/006/859/348/small/young-boy-indian-student-portrait-photo.jpg"
    },
    {
        id: 8,
        name: "Meera Shaik",
        role: "Web Developer",
        content: "Excellent infrastructure and supportive faculties. The placement assistance is genuine and they help you until you get placed.",
        rating: 4,
        image: "https://thumbs.dreamstime.com/b/portrait-good-looking-happy-young-teenager-muslim-islamic-asian-university-girl-muslim-girl-student-portrait-159184226.jpg"
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    // Responsive logic: 1 card for mobile (<768px), 2 cards for desktop (>=768px)
    const isMobile = viewportWidth < 768;
    const cardsToShow = isMobile ? 1 : 2;
    const maxIndex = testimonials.length - cardsToShow;

    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Autoplay
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 4000); // 4 seconds slide

        return () => clearInterval(interval);
    }, [maxIndex, currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    return (
        <section className="py-20 bg-white text-slate-900 overflow-hidden relative border-t border-slate-100">
            {/* Background Decor - Subtle light bloblings */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-50 pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-teal-50 blur-[100px]" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-50 blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-teal-600 font-bold tracking-wider uppercase text-sm">Success Stories</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold mt-2 text-slate-900">What Our Students Say</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto mt-4 rounded-full" />
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Carousel Track */}
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex"
                            animate={{ x: `-${currentIndex * (100 / cardsToShow)}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    style={{ minWidth: `${100 / cardsToShow}%` }}
                                    className="p-4"
                                >
                                    <div className="bg-white border border-slate-100 p-8 rounded-2xl h-full flex flex-col relative shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        <Quote className="absolute top-6 right-6 text-slate-100 w-10 h-10" />

                                        <div className="flex items-center gap-4 mb-6">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-14 h-14 rounded-full object-cover border-2 border-teal-500 shadow-sm"
                                            />
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900">{testimonial.name}</h3>
                                                <p className="text-sm text-teal-600 font-medium">{testimonial.role}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}`}
                                                />
                                            ))}
                                        </div>

                                        <p className="text-slate-600 italic leading-relaxed flex-grow">
                                            "{testimonial.content}"
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white hover:bg-slate-50 border border-slate-200 p-3 rounded-full text-slate-700 shadow-md transition-all hidden md:block"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white hover:bg-slate-50 border border-slate-200 p-3 rounded-full text-slate-700 shadow-md transition-all hidden md:block"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-teal-500" : "bg-slate-300 hover:bg-slate-400"}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
