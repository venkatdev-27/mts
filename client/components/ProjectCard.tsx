import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { ArrowRight, Clock3, Star, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { resolveImageUrl } from '../lib/resolveImageUrl';
import { getProjectMeta } from '../lib/projectMeta';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const imageSrc = resolveImageUrl(project.imageUrl);
  const meta = getProjectMeta(project);
  const [isCompactMobile, setIsCompactMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 359px)');
    const updateView = () => setIsCompactMobile(mediaQuery.matches);

    updateView();
    mediaQuery.addEventListener('change', updateView);
    return () => mediaQuery.removeEventListener('change', updateView);
  }, []);

  const descriptionText = isCompactMobile
    ? (() => {
        const maxLength = 95;
        if (project.description.length <= maxLength) {
          return project.description.replace(/[.,;:!?]+$/, '');
        }
        return `${project.description
          .slice(0, maxLength)
          .trim()
          .replace(/[.,;:!?]+$/, '')}...`;
      })()
    : project.description;

  return (
    <div className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-primary-200 h-full overflow-hidden max-w-[350px] mx-auto w-full hover:-translate-y-1">
      {/* Image Container - Balanced height */}
      <div className="relative h-40 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={imageSrc}
          alt={project.title}
        />
      </div>

      {/* Content Container */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-primary-50 text-primary-700 border border-primary-100">
            {project.category}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
            <Star className="w-3 h-3 mr-1 text-amber-500 fill-amber-500" />
            {meta.rating}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-slate-50 text-slate-700 border border-slate-200">
            <Clock3 className="w-3 h-3 mr-1 text-primary-600" />
            {meta.durationLabel}
          </span>
        </div>
        <div>
          {/* Title - Reduced size */}
          <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-primary-600 transition-colors [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
            {project.title}
          </h3>
          {/* Description - Reduced size */}
          <p className="text-slate-500 text-sm leading-relaxed [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden">
            {descriptionText}
          </p>
        </div>

        {/* Tags - Compact */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-100"
            >
              <Tag className="w-2.5 h-2.5 mr-1 text-slate-400" />
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-50 text-slate-500 border border-slate-100">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Footer Button - Compact */}
        <div className="pt-3 mt-1 border-t border-slate-50 flex justify-center">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center justify-center h-8 px-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white md:bg-none md:bg-slate-50 md:text-slate-700 rounded-full text-xs font-bold md:hover:bg-primary-600 md:hover:text-white transition-all duration-300 shadow-lg shadow-primary-500/30 md:shadow-none md:hover:shadow-md active:scale-95"
          >
            View Details
            <ArrowRight className="ml-1.5 h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
