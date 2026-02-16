import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Project {
    _id: string;
    id: string;
    title: string;
    category: string;
    description: string;
    imageUrl: string;
    technologies: string[];
}

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        category: 'Web Development',
        description: '',
        imageUrl: '',
        technologies: ''
    });

    const normalizeImageUrlInput = (rawUrl: string) => {
        const value = rawUrl.trim();
        if (!value) return value;
        if (value.startsWith('//')) return `https:${value}`;
        if (/^www\./i.test(value)) return `https://${value}`;
        return value;
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please upload a valid image file');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            if (typeof result === 'string') {
                setFormData((prev) => ({ ...prev, imageUrl: result }));
                toast.success('Image uploaded');
            }
        };
        reader.readAsDataURL(file);
    };

    const fetchProjects = async () => {
        try {
            const response = await api.get('/projects');
            setProjects(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching projects", error);
            toast.error("Failed to fetch projects");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const projectData = {
            ...formData,
            imageUrl: normalizeImageUrlInput(formData.imageUrl),
            technologies: formData.technologies.split(',').map(t => t.trim())
        };

        try {
            if (editingProject) {
                await api.put(`/projects/${editingProject.id}`, projectData);
                toast.success("Project updated successfully");
            } else {
                await api.post('/projects', projectData);
                toast.success("Project created successfully");
            }
            fetchProjects();
            setIsModalOpen(false);
            resetForm();
        } catch (error) {
            console.error("Error saving project", error);
            toast.error("Failed to save project");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this project?")) {
            try {
                await api.delete(`/projects/${id}`);
                toast.success("Project deleted");
                fetchProjects();
            } catch (error) {
                console.error("Error deleting project", error);
                toast.error("Failed to delete project");
            }
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
            technologies: project.technologies.join(', ')
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingProject(null);
        setFormData({
            id: '',
            title: '',
            category: 'Web Development',
            description: '',
            imageUrl: '',
            technologies: ''
        });
    };

    return (
        <div>
            <Toaster position="top-right" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
                    <p className="text-slate-500 mt-1">Manage student projects portfolio</p>
                </div>

                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Add New Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-all">
                        <div className="relative h-48 overflow-hidden">
                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                {project.category}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{project.title}</h3>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-2">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.technologies.map((tech, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3 mt-auto">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
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
                            <h2 className="text-2xl font-bold text-slate-900">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Project ID</label>
                                    <input type="text" required value={formData.id} onChange={e => setFormData({ ...formData, id: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="e.g. prj-001" disabled={!!editingProject} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                                    <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Project Title" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none">
                                        <option value="Web Development">Web Development</option>
                                        <option value="App Development">App Development</option>
                                        <option value="Full Stack">Full Stack</option>
                                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Technologies (comma separated)</label>
                                    <input type="text" required value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="React, Node.js, MongoDB" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                                    <input type="text" required value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="https://..." />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Upload Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
                                    />
                                    <p className="mt-2 text-xs text-slate-500">You can paste an image URL or upload a file.</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                                    <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none h-32" placeholder="Project description..." />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-colors">Save Project</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
