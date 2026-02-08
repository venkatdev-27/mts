import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { projectAPI } from '../services/api';
import { Project, PROJECT_CATEGORIES } from '../types';

const ProjectManagement: React.FC = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState<Partial<Project>>({
        id: '',
        title: '',
        category: '',
        description: '',
        imageUrl: '',
        technologies: [],
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 7;

    useEffect(() => {
        fetchProjects(currentPage);
    }, [currentPage]);

    const fetchProjects = async (page: number) => {
        try {
            setIsLoading(true);
            const response: any = await projectAPI.getAllProjects(undefined, page, limit); // Pass undefined category

            // Handle paginated response
            if (response.projects) {
                setProjects(response.projects);
                setTotalPages(response.totalPages);
            } else {
                // Fallback for non-paginated API (if used)
                setProjects(response);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            alert('Failed to load projects');
        } finally {
            setIsLoading(false);
        }
    };

    // ... handle submit and delete need minor updates to refresh current page?
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProject) {
                await projectAPI.updateProject(editingProject.id, formData);
                toast.success('Project updated successfully!');
            } else {
                await projectAPI.createProject(formData);
                toast.success('Project created successfully!');
            }
            setShowModal(false);
            setEditingProject(null);
            resetForm();
            fetchProjects(currentPage);
        } catch (error) {
            console.error('Error saving project:', error);
            toast.error('Failed to save project');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            await projectAPI.deleteProject(id);
            toast.success('Project deleted successfully!');
            fetchProjects(currentPage);
        } catch (error) {
            console.error('Error deleting project:', error);
            toast.error('Failed to delete project');
        }
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setFormData({
            id: project.id,
            title: project.title,
            category: project.category,
            description: project.description,
            imageUrl: project.imageUrl,
            technologies: project.technologies,
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            id: '',
            title: '',
            category: '',
            description: '',
            imageUrl: '',
            technologies: [],
        });
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
            {/* Header */}
            <header className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700 sticky top-0 z-30 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button onClick={() => navigate('/dashboard')} className="mr-4 text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-full">
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Project Management</h1>
                        </div>
                        <button
                            onClick={() => { setEditingProject(null); resetForm(); setShowModal(true); }}
                            className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95 group"
                        >
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                            Add Project
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-slate-400">Loading projects...</p>
                    </div>
                ) : (
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-700">
                                <thead className="bg-slate-800/80 text-slate-400">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider w-20">S.No</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Project ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-slate-800/20 divide-y divide-slate-700/50">
                                    {projects.map((project, index) => (
                                        <tr key={project.id} className="hover:bg-slate-700/30 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                                                {(currentPage - 1) * limit + index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-mono text-xs font-medium bg-slate-900 text-slate-300 px-2 py-1 rounded border border-slate-700 group-hover:border-slate-600 transition-colors">
                                                    {project.id}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-slate-200">{project.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${project.category.includes('Web') ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                    project.category.includes('App') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                        project.category.includes('AI') ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                                            'bg-slate-700/50 text-slate-400 border-slate-600'
                                                    }`}>
                                                    {project.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => handleEdit(project)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-blue-400 hover:text-white hover:bg-blue-500/20 transition-all duration-200 border border-transparent hover:border-blue-500/30"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                        <span className="text-xs">Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(project.id)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-400 hover:text-white hover:bg-red-500/20 transition-all duration-200 border border-transparent hover:border-red-500/30"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        <span className="text-xs">Delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="bg-slate-800/80 px-6 py-4 border-t border-slate-700 flex items-center justify-between">
                            <div className="text-sm text-slate-500">
                                Page <span className="font-medium text-white">{currentPage}</span> of <span className="font-medium text-white">{totalPages}</span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all
                                        ${currentPage === 1
                                            ? 'border-slate-700 text-slate-600 cursor-not-allowed bg-slate-800/50'
                                            : 'border-slate-600 text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white hover:border-slate-500'}`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all
                                        ${currentPage === totalPages
                                            ? 'border-slate-700 text-slate-600 cursor-not-allowed bg-slate-800/50'
                                            : 'border-slate-600 text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white hover:border-slate-500'}`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                        {projects.length === 0 && (
                            <div className="text-center py-12 text-slate-500">
                                No projects found.
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity animate-in fade-in duration-200">
                    <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl transform transition-all scale-100">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    {editingProject ? <Edit className="w-6 h-6 text-blue-400" /> : <Plus className="w-6 h-6 text-blue-400" />}
                                    {editingProject ? 'Edit Project' : 'Add New Project'}
                                </h2>
                                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white hover:bg-slate-700/50 p-2 rounded-full transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Project ID</label>
                                    <input
                                        type="text"
                                        value={formData.id}
                                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        disabled={!!editingProject}
                                        placeholder="e.g. MTS-001"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        placeholder="Project Title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Category</label>
                                    <div className="relative">
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                                            required
                                        >
                                            <option value="" className="text-slate-500">Select category</option>
                                            {PROJECT_CATEGORIES.map((cat) => (
                                                <option key={cat} value={cat} className="bg-slate-800 py-2">{cat}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y min-h-[100px]"
                                        rows={4}
                                        required
                                        placeholder="Describe the project..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Image URL</label>
                                    <input
                                        type="url"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        placeholder="https://..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">
                                        Technologies (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.technologies?.join(', ')}
                                        onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(',').map(t => t.trim()) })}
                                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="React, Node.js, MongoDB"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-6 border-t border-slate-700 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-6 py-2.5 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-700 hover:text-white transition-all font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 font-bold inline-flex items-center gap-2"
                                    >
                                        <Save className="w-5 h-5" />
                                        {editingProject ? 'Update Project' : 'Create Project'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectManagement;
