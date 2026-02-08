import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FolderKanban, MessageSquare, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('admin_user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
            {/* Header */}
            <header className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center px-4 py-2 border border-red-500/30 rounded-lg shadow-sm text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all duration-200"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white">Welcome, Admin!</h2>
                    <p className="mt-2 text-slate-400">Manage your projects and support messages from here.</p>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Projects Card */}
                    <Link
                        to="/projects"
                        className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <FolderKanban className="w-24 h-24" />
                        </div>
                        <div className="flex items-center mb-4 relative z-10">
                            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                                <FolderKanban className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="ml-4 text-xl font-semibold text-white">Project Management</h3>
                        </div>
                        <p className="text-slate-400 relative z-10">Create, edit, and delete projects. Manage all your project listings.</p>
                        <div className="mt-6 flex items-center text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                            Manage Projects <span className="ml-2">→</span>
                        </div>
                    </Link>

                    {/* Support Card */}
                    <Link
                        to="/support"
                        className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <MessageSquare className="w-24 h-24" />
                        </div>
                        <div className="flex items-center mb-4 relative z-10">
                            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                                <MessageSquare className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h3 className="ml-4 text-xl font-semibold text-white">Support Management</h3>
                        </div>
                        <p className="text-slate-400 relative z-10">View and manage contact form submissions and support messages.</p>
                        <div className="mt-6 flex items-center text-emerald-400 font-medium group-hover:translate-x-1 transition-transform">
                            View Messages <span className="ml-2">→</span>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
