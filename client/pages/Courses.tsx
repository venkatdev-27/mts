import React, { useEffect, useState } from 'react';
import { Star, Users, Clock, ArrowRight } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { courseAPI } from '../services/api';
import { defaultUICourses, toUICourses, UICourse } from '../lib/courseHelpers';
import { Loader } from '@/components/animate-ui/icons/loader';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';

const Courses: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'Elite' | 'Premium'>('Elite');
    const [allCourses, setAllCourses] = useState<UICourse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await courseAPI.getAllCourses();
                if (Array.isArray(data) && data.length > 0) {
                    setAllCourses(toUICourses(data));
                } else {
                    setAllCourses(defaultUICourses);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
                setAllCourses(defaultUICourses);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const filteredCourses = allCourses.filter(course => course.category === activeTab);

    const tabs = ['Elite', 'Premium'];

    return (
        <div className="bg-slate-50 min-h-screen pt-28 pb-16 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight mb-4">Featured Courses</h1>
                    <p className="text-lg text-slate-500">
                        Explore our comprehensive course catalog and find the perfect match for your career goals.
                    </p>
                </div>

                {isLoading && (
                    <div className="mb-8 flex items-center justify-center rounded-xl border border-slate-200 bg-white py-10">
                        <AnimateIcon animateOnHover animation="spin" animate>
                            <Loader className="text-slate-700" size={34} />
                        </AnimateIcon>
                    </div>
                )}

                {/* Custom Tab Navigation */}
                <div className="grid grid-cols-2 sm:flex sm:justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-md mx-auto sm:max-w-none">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-2 sm:px-8 py-3 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 transform ${activeTab === tab
                                ? 'bg-slate-900 text-white shadow-lg scale-105'
                                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                                }`}
                        >
                            {tab} Courses
                        </button>
                    ))}
                </div>

                {/* Courses Grid (No Sidebar) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? null : filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            onClick={() => navigate(`/courses/${course.id}`)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    navigate(`/courses/${course.id}`);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden flex flex-col group h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                        >

                            {/* Card Image Section */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>

                                {/* Level Badge */}
                                <div className="absolute top-4 right-4">
                                    <span className="bg-cyan-100 text-cyan-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        {course.level}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                {/* Title */}
                                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug line-clamp-2 min-h-[3.5rem]">
                                    {course.title}
                                </h3>

                                {/* Mobile Technologies (2 lines) */}
                                <p className="text-slate-500 text-xs mb-3 line-clamp-2 sm:hidden min-h-[2.5rem]">
                                    {course.skills.slice(0, 6).join(', ')}
                                </p>

                                {/* Desktop Summary */}
                                <p className="hidden sm:block text-slate-500 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
                                    {course.summary}
                                </p>

                                {/* Stats Row */}
                                <div className="flex items-center gap-3 mb-6 text-xs sm:text-sm">
                                    <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
                                        <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                                        <span className="font-bold">{course.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                        <Users className="w-3.5 h-3.5" />
                                        <span className="font-medium">{course.students}</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span className="font-medium">{course.durationMonths} M / {course.totalHours} H</span>
                                    </div>
                                </div>

                                {course.placementAssistance && (
                                    <p className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-2 py-1 mb-4">
                                        Placement Assistance Included
                                    </p>
                                )}

                                <div className="mt-auto pt-5 border-t border-slate-100">
                                    {/* Price Row */}
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-extrabold text-slate-900">₹{course.discountedPrice.toLocaleString()}</span>
                                            <span className="text-sm text-slate-400 line-through font-medium">₹{course.price.toLocaleString()}</span>
                                        </div>
                                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                            {Math.round(((course.price - course.discountedPrice) / course.price) * 100)}% OFF
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/courses/${course.id}`);
                                            }}
                                            className="py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition-colors inline-flex items-center justify-center gap-1"
                                        >
                                            Details
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate('/register', { state: { course: course.title } });
                                            }}
                                            className="py-3 px-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-[0.98]"
                                        >
                                            Enroll
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;
