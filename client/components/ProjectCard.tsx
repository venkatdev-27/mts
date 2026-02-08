import React from 'react';
import { Project } from '../types';
import { ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group flex flex-col bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-primary-100 h-full overflow-hidden">
      {/* Image Container - Height reduced for mobile */}
      <div className="relative h-28 sm:h-48 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={project.imageUrl}
          alt={project.title}
        />
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20">
          <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-wide bg-white/95 text-primary-700 shadow-sm backdrop-blur-md">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content Container - Padding reduced for mobile */}
      <div className="flex-1 p-3 sm:p-5 flex flex-col justify-between">
        <div>
          {/* Title - Text size adjusted */}
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-1 sm:mb-2 leading-tight group-hover:text-primary-600 transition-colors line-clamp-2">
            {project.title}
          </h3>
          {/* Description - Hidden on very small screens if needed, or clamped */}
          <p className="text-slate-500 mb-2 sm:mb-4 text-sm sm:text-base line-clamp-2 sm:line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Tags - Smaller gap and font size */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {project.technologies.slice(0, 2).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs sm:text-xs lg:text-sm font-medium bg-slate-50 text-slate-600 border border-slate-100"
              >
                <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 text-slate-400" />
                {tech}
              </span>
            ))}
            {project.technologies.length > 2 && (
              <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs sm:text-xs lg:text-sm font-medium bg-slate-50 text-slate-500 border border-slate-100">
                +{project.technologies.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Footer Button - Compact sizing */}
        <div className="mt-auto pt-2 sm:pt-4 border-t border-slate-50">
          <Link
            to={`/projects/${project.id}`}
            className="w-full flex items-center justify-center px-2 py-1.5 sm:px-4 sm:py-2 bg-primary-50 text-primary-700 rounded-lg text-xs sm:text-sm lg:text-base font-bold hover:bg-primary-600 hover:text-white transition-all duration-300"
          >
            Enquire <span className="hidden sm:inline">&nbsp;Now</span>
            <ArrowRight className="ml-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};