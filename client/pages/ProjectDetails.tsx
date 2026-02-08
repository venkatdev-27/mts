import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Tag, ExternalLink } from 'lucide-react';
import { projectAPI } from '../services/api';
import { Project } from '../types';

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setIsLoading(true);
                if (id) {
                    const data = await projectAPI.getProjectById(id);
                    setProject(data);
                }
            } catch (err) {
                setError('Failed to load project details');
                console.error('Error fetching project:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 pt-28 pb-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
                    <p className="mt-4 text-slate-600">Loading project details...</p>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-slate-50 pt-28 pb-16 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Project not found</h2>
                    <p className="mt-2 text-slate-600">{error || 'The project you are looking for does not exist.'}</p>
                    <button
                        onClick={() => navigate('/projects')}
                        className="mt-6 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    // Split description into lines for special formatting
    const descriptionLines = project.description.split('\n');

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/projects')}
                    className="mb-6 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                </button>

                {/* Project Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="relative h-64 md:h-96">
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                            <span className="inline-block px-3 py-1 bg-white/90 text-primary-700 rounded-md text-sm font-bold mb-3">
                                {project.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                                {project.title}
                            </h1>
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Project Description</h2>
                            <div className="prose prose-slate max-w-none">
                                {descriptionLines.map((line, index) => {
                                    // Highlight lines 7-8 as requested
                                    if (index >= 6 && index <= 7) {
                                        return (
                                            <p key={index} className="text-slate-700 text-lg leading-relaxed bg-yellow-50 p-3 rounded-md border-l-4 border-yellow-400">
                                                {line || project.description}
                                            </p>
                                        );
                                    }
                                    return line ? (
                                        <p key={index} className="text-slate-700 text-lg leading-relaxed">
                                            {line}
                                        </p>
                                    ) : null;
                                })}
                                {/* If description doesn't have multiple lines, show it with special formatting */}
                                {descriptionLines.length === 1 && (
                                    <p className="text-slate-700 text-lg leading-relaxed bg-primary-50 p-4 rounded-md border-l-4 border-primary-400">
                                        {project.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Technologies Used */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Technologies Used</h2>
                            <div className="flex flex-wrap gap-3">
                                {project.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors"
                                    >
                                        <Tag className="w-4 h-4 mr-2 text-primary-600" />
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="border-t pt-6">
                            <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 md:p-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Interested in this project?</h3>
                                <p className="text-slate-600 mb-4">
                                    Get in touch with us to learn more or to start working on a similar project.
                                </p>
                                <button
                                    onClick={() => navigate('/contact')}
                                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
                                >
                                    Enquire Now
                                    <ExternalLink className="ml-2 h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
