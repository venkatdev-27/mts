import React from 'react';
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

  return (
    <div className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-primary-200 h-full overflow-hidden max-w-[350px] mx-auto w-full hover:-translate-y-1">
      {/* Image Container - Balanced height */}
      <div className="relative h-40 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent z-10"></div>
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={imageSrc}
          alt={project.title}
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-white/95 text-primary-700 shadow-sm backdrop-blur-md">
            {project.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-white/95 text-slate-800 shadow-sm backdrop-blur-md">
            <Star className="w-3 h-3 mr-1 text-yellow-500 fill-yellow-500" />
            {meta.rating}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 z-20">
          <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-white/95 text-slate-800 shadow-sm backdrop-blur-md">
            <Clock3 className="w-3 h-3 mr-1 text-primary-600" />
            {meta.durationLabel}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div>
          {/* Title - Reduced size */}
          <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
            {project.title}
          </h3>
          {/* Description - Reduced size */}
          <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">
            {project.description}
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
        <div className="pt-3 mt-1 border-t border-slate-50">
          <Link
            to={`/projects/${project.id}`}
            className="w-full flex items-center justify-center px-3 py-2 bg-slate-50 text-slate-700 rounded-lg text-xs font-bold hover:bg-primary-600 hover:text-white transition-all duration-300 group-hover:shadow-md"
          >
            View Details
            <ArrowRight className="ml-1.5 h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
