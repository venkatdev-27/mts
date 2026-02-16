import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, IndianRupee, Star, Users, BookOpen, CheckCircle2, Award } from 'lucide-react';
import { courseAPI } from '../services/api';
import { defaultUICourses, toUICourses, UICourse } from '../lib/courseHelpers';

const CourseDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [course, setCourse] = useState<UICourse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCourse = async () => {
            if (!id) {
                setIsLoading(false);
                return;
            }

            try {
                const data = await courseAPI.getAllCourses();
                if (Array.isArray(data) && data.length > 0) {
                    const normalized = toUICourses(data);
                    const matched = normalized.find((item) => item.id === id);
                    if (matched) {
                        setCourse(matched);
                        setIsLoading(false);
                        return;
                    }
                }
            } catch (error) {
                console.error('Error loading course details:', error);
            }

            const fallback = defaultUICourses.find((item) => item.id === id);
            setCourse(fallback ?? null);
            setIsLoading(false);
        };

        loadCourse();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
                    <h1 className="text-2xl font-extrabold text-slate-900">Loading course details...</h1>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
                    <h1 className="text-2xl font-extrabold text-slate-900">Course not found</h1>
                    <p className="mt-2 text-slate-500">The course you selected is not available.</p>
                    <button
                        onClick={() => navigate('/courses')}
                        className="mt-6 inline-flex items-center px-5 py-2.5 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    const discount = Math.round(((course.price - course.discountedPrice) / course.price) * 100);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate('/courses')}
                    className="mb-6 inline-flex items-center text-slate-700 hover:text-slate-900 font-semibold"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Courses
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                            <img src={course.image} alt={course.title} className="w-full h-[280px] sm:h-[380px] object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-800">{course.category}</span>
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-400 text-slate-900">{course.level}</span>
                                </div>
                                <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">{course.title}</h1>
                                <p className="mt-3 text-slate-200 text-sm sm:text-base max-w-3xl">{course.summary}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                            <div className="flex items-center gap-2 mb-4">
                                <BookOpen className="w-5 h-5 text-primary-600" />
                                <h2 className="text-2xl font-extrabold text-slate-900">Course Overview</h2>
                            </div>
                            <p className="text-slate-600 mb-6">Real course summary based on this syllabus.</p>
                            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 sm:p-6">
                                <p className="max-w-[350px] sm:max-w-none mx-auto sm:mx-0 text-sm sm:text-base text-slate-700 leading-relaxed line-clamp-[15] sm:line-clamp-none">
                                    {course.overviewParagraph}
                                </p>
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:sticky lg:top-24">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">Course Price</span>
                                    <span className="px-2 py-1 rounded-md bg-red-100 text-red-700 text-xs font-bold">{discount}% OFF</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-extrabold text-slate-900 inline-flex items-center">
                                        <IndianRupee className="w-5 h-5 mr-1" />
                                        {course.discountedPrice.toLocaleString()}
                                    </span>
                                    <span className="text-slate-400 line-through text-sm">{course.price.toLocaleString()}</span>
                                </div>

                                <div className="space-y-3 pt-3 border-t border-slate-100">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 inline-flex items-center"><Calendar className="w-4 h-4 mr-2" />Duration</span>
                                        <span className="font-semibold text-slate-900">{course.durationMonths} Months</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 inline-flex items-center"><BookOpen className="w-4 h-4 mr-2" />Training Hours</span>
                                        <span className="font-semibold text-slate-900">{course.totalHours} Hours</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 inline-flex items-center"><Star className="w-4 h-4 mr-2 text-yellow-500" />Rating</span>
                                        <span className="font-semibold text-slate-900">{course.rating}/5</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 inline-flex items-center"><Users className="w-4 h-4 mr-2" />Learners</span>
                                        <span className="font-semibold text-slate-900">{course.students.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 inline-flex items-center"><Award className="w-4 h-4 mr-2" />Mentor</span>
                                        <span className="font-semibold text-slate-900">{course.author}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">Placement Assistance</span>
                                        <span className={`font-semibold ${course.placementAssistance ? 'text-emerald-700' : 'text-slate-500'}`}>
                                            {course.placementAssistance ? 'Included' : 'Not Included'}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/register', { state: { course: course.title } })}
                                    className="w-full mt-4 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-sm transition-colors"
                                >
                                    Enroll in This Course
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h3 className="font-bold text-slate-900 mb-3">Top Skills You Build</h3>
                            <div className="flex flex-wrap gap-2">
                                {course.skills.map((skill) => (
                                    <span key={skill} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-100">
                                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
