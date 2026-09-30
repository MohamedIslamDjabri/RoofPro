import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/40">
      <div>
        {/* Project Image */}
        <div className="relative h-60 w-full overflow-hidden bg-surface-container-high">
          <Image
            src={project.image}
            alt={project.imageAlt || project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-md bg-primary-container/90 text-on-primary font-label-caps text-xs font-bold backdrop-blur-sm shadow">
              {project.service}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-surface-container-lowest/90 text-on-surface font-label-caps text-xs font-bold backdrop-blur-sm shadow">
            {project.city}, {project.state}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-secondary font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            <span>{project.projectType}</span>
          </div>

          <h3 className="font-headline-sm text-title-md font-bold text-primary-container group-hover:text-secondary transition-colors line-clamp-2">
            {project.title}
          </h3>

          <p className="font-body-md text-body-sm text-on-surface-variant line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
            {project.areaSqFt && (
              <div className="p-2 rounded-lg bg-surface-container-low">
                <span className="text-on-surface-variant block text-[10px] uppercase font-bold">Roof Area</span>
                <span className="font-bold text-primary-container">{project.areaSqFt}</span>
              </div>
            )}
            {project.completionTime && (
              <div className="p-2 rounded-lg bg-surface-container-low">
                <span className="text-on-surface-variant block text-[10px] uppercase font-bold">Timeline</span>
                <span className="font-bold text-secondary">{project.completionTime}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-6 pt-0 mt-2">
        <Link
          href={`/contact?type=estimate&service=${encodeURIComponent(project.service)}&city=${encodeURIComponent(project.city)}`}
          className="w-full py-2.5 px-4 rounded-lg bg-surface-container hover:bg-primary-container text-primary-container hover:text-on-primary font-label-md text-xs font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <span>Request Similar Quote in {project.city}</span>
          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
