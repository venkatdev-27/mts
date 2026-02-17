import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Search } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Registration {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    mobile?: string;
    course?: string;
    createdAt?: string;
}

const Registrations: React.FC = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const response = await api.get('/register');
                setRegistrations(response.data.data);
            } catch (error) {
                console.error("Error fetching registrations", error);
                toast.error("Failed to fetch registrations");
            } finally {
                setLoading(false);
            }
        };

        fetchRegistrations();
    }, []);

    const query = searchTerm.trim().toLowerCase();

    const toSafeString = (value?: string) => (value ?? '').toString().trim();

    const filteredRegistrations = registrations.filter((reg) => {
        const firstName = toSafeString(reg.firstName).toLowerCase();
        const lastName = toSafeString(reg.lastName).toLowerCase();
        const email = toSafeString(reg.email).toLowerCase();
        const course = toSafeString(reg.course).toLowerCase();
        const fullName = `${firstName} ${lastName}`.trim();

        return (
            firstName.includes(query) ||
            lastName.includes(query) ||
            fullName.includes(query) ||
            email.includes(query) ||
            course.includes(query)
        );
    });

    const formatDate = (value?: string) => {
        if (!value) return 'N/A';
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return 'N/A';
        return parsed.toLocaleDateString();
    };

    return (
        <div>
            <Toaster position="top-right" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Registrations</h1>
                    <p className="text-slate-500 mt-1">Manage student enrollments</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search students, courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 font-semibold text-slate-700">Student Name</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Mobile</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Course</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Loading registrations...</td>
                                </tr>
                            ) : filteredRegistrations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No registrations found.</td>
                                </tr>
                            ) : (
                                filteredRegistrations.map((reg) => (
                                    <tr key={reg._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">
                                                {`${toSafeString(reg.firstName)} ${toSafeString(reg.lastName)}`.trim() || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{toSafeString(reg.email) || 'N/A'}</td>
                                        <td className="px-6 py-4 text-slate-600 font-mono text-sm">{toSafeString(reg.mobile) || 'N/A'}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                {toSafeString(reg.course) || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 text-sm">
                                            {formatDate(reg.createdAt)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                                Active
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Registrations;
