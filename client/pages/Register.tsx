import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, ChevronDown, User, Mail, Phone, BookOpen, Sparkles, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { courseAPI } from '../services/api';
import { defaultUICourses, toUICourses } from '../lib/courseHelpers';

const REGISTER_TESTIMONIALS = [
    { initial: 'A', name: 'Ananya Sharma', role: 'MERN Developer @ TechNova', content: 'The MERN course gave me production-level confidence. I built real modules and cracked interviews quickly.' },
    { initial: 'P', name: 'Pranav Rao', role: 'Frontend Engineer @ PixelWorks', content: 'React learning was structured and practical. Every sprint improved my UI skills and code quality.' },
    { initial: 'R', name: 'Rohit Menon', role: 'Backend Engineer @ CodeCraft', content: 'Java backend sessions were direct and strong. I understood API design, validation, and service architecture clearly.' },
    { initial: 'S', name: 'Sunita Patel', role: 'Data Analyst @ DataInsight', content: 'Power BI and Tableau modules were very practical. I can now create dashboards that teams actually use.' },
    { initial: 'V', name: 'Vivek Iyer', role: 'Python Developer @ ByteWorks', content: 'Python full stack training covered end-to-end flow. From database to deployment, everything was hands-on.' },
    { initial: 'H', name: 'Hema Nair', role: 'AI Engineer @ DeepLogic', content: 'AI/ML classes focused on real datasets and evaluation. I finally learned how models are built and deployed.' },
    { initial: 'K', name: 'Karthik Srinivasan', role: 'Mobile App Developer @ AppGenius', content: 'App development track improved my architecture thinking. I shipped features with cleaner code and better UX.' },
    { initial: 'D', name: 'Deepika Reddy', role: 'Software Trainee @ TechZen', content: 'The web developer bootcamp was clear and fast-paced. It helped me build a strong portfolio for placements.' },
    { initial: 'N', name: 'Nikhil Gupta', role: 'Full Stack Intern @ BrightCode', content: 'Mentor reviews were the biggest value for me. I learned how to write maintainable code under real constraints.' },
    { initial: 'L', name: 'Lakshmi Venkat', role: 'Data Science Associate @ Analytix', content: 'Data science modules improved my analysis workflow. EDA, model basics, and storytelling were explained well.' },
    { initial: 'M', name: 'Manish Desai', role: 'Software Engineer @ InnoTech', content: 'The curriculum is placement-oriented and disciplined. Weekly checkpoints kept me consistent and job-ready.' },
    { initial: 'T', name: 'Tanvi Joshi', role: 'Junior Developer @ CloudFlow', content: 'I joined with basic coding knowledge and left with confidence to handle complete project tasks independently.' },
];

export default function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const initialCourse = location.state?.course || '';

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        course: initialCourse
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [courseOptions, setCourseOptions] = useState<string[]>(defaultUICourses.map((course) => course.title));
    const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonialIndex((prev) => (prev + 1) % REGISTER_TESTIMONIALS.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchCourseOptions = async () => {
            try {
                const data = await courseAPI.getAllCourses();
                if (Array.isArray(data) && data.length > 0) {
                    const normalized = toUICourses(data);
                    setCourseOptions(normalized.map((course) => course.title));
                }
            } catch (error) {
                console.error('Error loading courses for registration:', error);
            }
        };

        fetchCourseOptions();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/register', formData);
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData({ firstName: '', lastName: '', email: '', mobile: '', course: '' });
                // Optional: redirect to home after success
                // navigate('/'); 
            }, 3000);
        } catch (error) {
            console.error("Registration failed", error);
            alert("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans">

            {/* Left Side - Visual & Testimonial (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-600 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                <div className="relative z-10">
                    <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
                            Start your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Learning Journey</span> today.
                        </h1>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            Join thousands of students who are mastering new skills and transforming their careers with our industry-leading courses.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
                    >
                        {(() => {
                            const active = REGISTER_TESTIMONIALS[activeTestimonialIndex];
                            return (
                                <>
                                    <div className="flex items-center gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-slate-100 italic mb-4">"{active.content}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center font-bold text-white">
                                            {active.initial}
                                        </div>
                                        <div>
                                            <div className="font-bold">{active.name}</div>
                                            <div className="text-xs text-slate-400">{active.role}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-4">
                                        {REGISTER_TESTIMONIALS.map((_, idx) => (
                                            <span
                                                key={idx}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeTestimonialIndex ? 'w-6 bg-cyan-300' : 'w-1.5 bg-white/30'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            );
                        })()}
                    </motion.div>
                </div>

                <div className="relative z-10 text-sm text-slate-500">
                    © 2026 MTS Learning. All rights reserved.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-slate-50 lg:bg-white overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="lg:hidden mb-8">
                        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back
                        </Link>
                    </div>

                    {!submitted ? (
                        <>
                            <div className="text-center lg:text-left">
                                <h2 className="text-3xl font-bold text-slate-900">Registration</h2>
                                <p className="mt-2 text-slate-500">Register to get started with your selected course.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">First Name</label>
                                        <div className={`relative group transition-all duration-300 ${focusedField === 'firstName' ? 'scale-[1.02]' : ''}`}>
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className={`h-5 w-5 transition-colors ${focusedField === 'firstName' ? 'text-primary-600' : 'text-slate-400'}`} />
                                            </div>
                                            <input
                                                type="text"
                                                name="firstName"
                                                required
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('firstName')}
                                                onBlur={() => setFocusedField(null)}
                                                className={`w-full pl-10 pr-4 py-3 bg-white border ${focusedField === 'firstName' ? 'border-primary-500 ring-4 ring-primary-500/10' : 'border-slate-200'} rounded-xl focus:outline-none transition-all placeholder:text-slate-300 text-slate-900 font-medium`}
                                                placeholder="First name"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Last Name</label>
                                        <div className={`relative group transition-all duration-300 ${focusedField === 'lastName' ? 'scale-[1.02]' : ''}`}>
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className={`h-5 w-5 transition-colors ${focusedField === 'lastName' ? 'text-primary-600' : 'text-slate-400'}`} />
                                            </div>
                                            <input
                                                type="text"
                                                name="lastName"
                                                required
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('lastName')}
                                                onBlur={() => setFocusedField(null)}
                                                className={`w-full pl-10 pr-4 py-3 bg-white border ${focusedField === 'lastName' ? 'border-primary-500 ring-4 ring-primary-500/10' : 'border-slate-200'} rounded-xl focus:outline-none transition-all placeholder:text-slate-300 text-slate-900 font-medium`}
                                                placeholder="Last name"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Email Address</label>
                                    <div className={`relative group transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.01]' : ''}`}>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className={`h-5 w-5 transition-colors ${focusedField === 'email' ? 'text-primary-600' : 'text-slate-400'}`} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`w-full pl-10 pr-4 py-3 bg-white border ${focusedField === 'email' ? 'border-primary-500 ring-4 ring-primary-500/10' : 'border-slate-200'} rounded-xl focus:outline-none transition-all placeholder:text-slate-300 text-slate-900 font-medium`}
                                            placeholder="Enter email address"
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Phone Number</label>
                                    <div className={`relative group transition-all duration-300 ${focusedField === 'mobile' ? 'scale-[1.01]' : ''}`}>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className={`h-5 w-5 transition-colors ${focusedField === 'mobile' ? 'text-primary-600' : 'text-slate-400'}`} />
                                        </div>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            required
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('mobile')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`w-full pl-10 pr-4 py-3 bg-white border ${focusedField === 'mobile' ? 'border-primary-500 ring-4 ring-primary-500/10' : 'border-slate-200'} rounded-xl focus:outline-none transition-all placeholder:text-slate-300 text-slate-900 font-medium`}
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Interested Course</label>
                                    <div className={`relative group transition-all duration-300 ${focusedField === 'course' ? 'scale-[1.01]' : ''}`}>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <BookOpen className={`h-5 w-5 transition-colors ${focusedField === 'course' ? 'text-primary-600' : 'text-slate-400'}`} />
                                        </div>
                                        <select
                                            name="course"
                                            required
                                            value={formData.course}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('course')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`w-full pl-10 pr-10 py-3 bg-white border ${focusedField === 'course' ? 'border-primary-500 ring-4 ring-primary-500/10' : 'border-slate-200'} rounded-xl focus:outline-none transition-all text-slate-900 appearance-none cursor-pointer font-medium`}
                                        >
                                            <option value="" disabled>Select a Course</option>
                                            {courseOptions.map((courseTitle) => (
                                                <option key={courseTitle} value={courseTitle}>{courseTitle}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <ChevronDown className={`h-5 w-5 transition-colors ${focusedField === 'course' ? 'text-primary-600' : 'text-slate-400'}`} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start pt-2">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            name="terms"
                                            type="checkbox"
                                            required
                                            className="w-4 h-4 border border-slate-300 rounded bg-white text-primary-600 focus:ring-3 focus:ring-primary-300 cursor-pointer"
                                        />
                                    </div>
                                    <label htmlFor="terms" className="ml-2 text-sm text-slate-600">
                                        I agree to the <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-500 hover:underline">Terms of Service</Link> and <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-500 hover:underline">Privacy Policy</Link>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Register
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-3xl p-8 shadow-2xl text-center border border-slate-100"
                        >
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="text-3xl font-extrabold text-slate-900 mb-3">Welcome MTS!</h3>
                            <p className="text-slate-500 mb-8 max-w-xs mx-auto text-lg">Your registration was successful. We'll be in touch with you shortly.</p>
                            <button
                                onClick={() => navigate('/')}
                                className="w-full px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                Return to Home
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
