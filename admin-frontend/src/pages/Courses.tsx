import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Plus, Edit2, Trash2,  X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Course {
    _id: string;
    title: string;
    image: string;
    price: number;
    discountedPrice: number;
    category: 'Elite' | 'Premium';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    author: string;
    rating: number;
    students: number;
    duration: string;
    skills: string[];
    overviewParagraph: string;
}

const Courses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        image: '',
        price: 0,
        discountedPrice: 0,
        category: 'Elite',
        level: 'Beginner',
        author: '',
        rating: 4.5,
        students: 0,
        duration: '',
        skills: [] as string[],
        overviewParagraph: ''
    });

    const fetchCourses = async () => {
        try {
            const response = await api.get('/courses');
            setCourses(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching courses", error);
            toast.error("Failed to fetch courses");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                skills: formData.skills
                    .map((skill) => skill.trim())
                    .filter((skill) => skill.length > 0),
                overviewParagraph: formData.overviewParagraph.trim(),
            };

            if (editingCourse) {
                await api.put(`/courses/${editingCourse._id}`, payload);
                toast.success("Course updated successfully");
            } else {
                await api.post('/courses', payload);
                toast.success("Course created successfully");
            }
            fetchCourses();
            setIsModalOpen(false);
            resetForm();
        } catch (error) {
            console.error("Error saving course", error);
            toast.error("Failed to save course");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this course?")) {
            try {
                await api.delete(`/courses/${id}`);
                toast.success("Course deleted");
                fetchCourses();
            } catch (error) {
                console.error("Error deleting course", error);
                toast.error("Failed to delete course");
            }
        }
    };

    const handleEdit = (course: Course) => {
        setEditingCourse(course);
        setFormData({
            title: course.title,
            image: course.image,
            price: course.price,
            discountedPrice: course.discountedPrice,
            category: course.category,
            level: course.level,
            author: course.author,
            rating: course.rating,
            students: course.students,
            duration: course.duration,
            skills: course.skills || [],
            overviewParagraph: course.overviewParagraph || ''
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingCourse(null);
        setFormData({
            title: '',
            image: '',
            price: 0,
            discountedPrice: 0,
            category: 'Elite',
            level: 'Beginner',
            author: '',
            rating: 4.5,
            students: 0,
            duration: '',
            skills: [],
            overviewParagraph: ''
        });
    };

    return (
        <div>
            <Toaster position="top-right" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Courses</h1>
                    <p className="text-slate-500 mt-1">Manage your course catalog</p>
                </div>

                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Add New Course
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div key={course._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group">
                        <div className="relative h-48 overflow-hidden">
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                {course.category}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 min-h-[3.5rem]">{course.title}</h3>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-2xl font-bold text-slate-900">₹{course.discountedPrice?.toLocaleString()}</span>
                                <span className="text-sm text-slate-400 line-through">₹{course.price?.toLocaleString()}</span>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleEdit(course)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(course._id)}
                                    className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900">{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                                    <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Course Title" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Author</label>
                                    <input type="text" required value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Instructor Name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Price (₹)</label>
                                    <input type="number" required value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Discounted Price (₹)</label>
                                    <input type="number" required value={formData.discountedPrice} onChange={e => setFormData({ ...formData, discountedPrice: Number(e.target.value) })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value as any })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none">
                                        <option value="Elite">Elite</option>
                                        <option value="Premium">Premium</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Level</label>
                                    <select value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value as any })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none">
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
                                    <input type="text" required value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="e.g. 3 M" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Students Count</label>
                                    <input type="number" required value={formData.students} onChange={e => setFormData({ ...formData, students: Number(e.target.value) })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                                    <input type="text" required value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="https://..." />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Top Skills (comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.skills.join(', ')}
                                        onChange={e =>
                                            setFormData({
                                                ...formData,
                                                skills: e.target.value.split(',').map((skill) => skill.trim()).filter(Boolean),
                                            })
                                        }
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                        placeholder="React, Node.js, MongoDB"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Course Overview</label>
                                    <textarea
                                        rows={5}
                                        value={formData.overviewParagraph}
                                        onChange={e => setFormData({ ...formData, overviewParagraph: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                        placeholder="Describe what students will learn in this course..."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-colors">Save Course</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;
