import React, { useState, useMemo, useEffect } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectCategory, Project } from '../types';
import { Filter, Search } from 'lucide-react';
import { projectAPI } from '../services/api';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const data = await projectAPI.getAllProjects(selectedCategory);
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [selectedCategory]);

  const categories = ['All', ...Object.values(ProjectCategory)];

  // No longer needed as filtering is done server-side
  const filteredProjects = projects;

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">Our Projects</h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-500">
            Explore our diverse range of academic and technical projects.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
              <p className="mt-4 text-slate-600">Loading projects...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-red-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 text-red-500">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{error}</h3>
            <p className="mt-2 text-slate-500">Please try again later.</p>
          </div>
        ) : (
          <>
            {/* Filter Section */}
            <div className="mb-10 overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex space-x-2 md:justify-center px-1 min-w-max">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center whitespace-nowrap ${selectedCategory === cat
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20 transform scale-105'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                  >
                    {selectedCategory === cat && <Filter className="w-3 h-3 mr-2" />}
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-slate-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4 text-slate-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No projects found.</h3>
                <p className="mt-2 text-slate-500">Try selecting a different category or clear filters.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;