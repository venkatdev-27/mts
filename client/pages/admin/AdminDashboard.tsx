import React, { useEffect, useState } from 'react';
import { Users, BookOpen, TrendingUp } from 'lucide-react';
import api from '../../api/axios';

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalStudents: 0,
        pendingRegistrations: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [coursesRes, registrationsRes] = await Promise.all([
                    api.get('/courses'),
                    api.get('/register')
                ]);

                setStats({
                    totalCourses: coursesRes.data.length,
                    totalStudents: registrationsRes.data.data.length,
                    pendingRegistrations: registrationsRes.data.data.length // Simplified for now
                });
            } catch (error) {
                console.error("Error fetching stats", error);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        { title: 'Total Students', value: stats.totalStudents, icon: Users, color: 'bg-blue-500', bg: 'bg-blue-50 text-blue-600' },
        { title: 'Active Courses', value: stats.totalCourses, icon: BookOpen, color: 'bg-teal-500', bg: 'bg-teal-50 text-teal-600' },
        { title: 'New Registrations', value: stats.pendingRegistrations, icon: TrendingUp, color: 'bg-purple-500', bg: 'bg-purple-50 text-purple-600' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {cards.map((card, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${card.bg}`}>
                                <card.icon className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold text-slate-900">{card.value}</span>
                        </div>
                        <h3 className="text-slate-500 font-medium">{card.title}</h3>
                    </div>
                ))}
            </div>

            {/* Recent Activity or Charts could go here */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Welcome to MTS Admin Panel</h2>
                <p className="text-slate-500">
                    Use the sidebar to manage courses and view student registrations.
                    You can add, edit, or delete courses from the 'Courses' section.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;
