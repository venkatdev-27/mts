import React from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, LogOut, FolderKanban, MessageSquare } from 'lucide-react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

const AdminLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10 border-r border-slate-800">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                        MTS Admin
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        to="/"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/')
                            ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link
                        to="/courses"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/courses')
                            ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <BookOpen className="w-5 h-5" />
                        Courses
                    </Link>
                    <Link
                        to="/registrations"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/registrations')
                            ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <Users className="w-5 h-5" />
                        Registrations
                    </Link>
                    <Link
                        to="/projects"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/projects')
                            ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <FolderKanban className="w-5 h-5" />
                        Projects
                    </Link>
                    <Link
                        to="/support"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/support')
                            ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <MessageSquare className="w-5 h-5" />
                        Support
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
