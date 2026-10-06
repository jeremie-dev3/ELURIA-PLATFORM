import React from 'react';
import { ProjectOpportunity } from '../../types/eluria/project';

interface ProjectCardProps {
  project: ProjectOpportunity;
  onSelectProject: (projectId: string) => void;
}

export function ProjectCard({ project, onSelectProject }: ProjectCardProps) {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-5 shadow-sm transition hover:border-slate-700">
      <div>
        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg bg-slate-900">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <span className="absolute left-3 top-3 rounded bg-amber-500 px-2.5 py-1 text-xs font-semibold text-slate-950">
            {project.status}
          </span>
        </div>

        <span className="text-xs font-medium uppercase tracking-wider text-amber-400">
          {project.sector}
        </span>
        <h3 className="mt-1 text-lg font-bold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-slate-400">{project.summary}</p>
      </div>

      <div className="mt-5 border-t border-slate-800/80 pt-4">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-slate-500">Minimum Investment</span>
            <div className="font-semibold text-white">{project.minimumInvestment}</div>
          </div>
          <div>
            <span className="text-slate-500">Funding Target</span>
            <div className="font-semibold text-white">{project.targetRaise}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelectProject(project.id)}
          className="mt-4 w-full rounded-lg bg-amber-500 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          View Project Details &rarr;
        </button>
      </div>
    </div>
  );
}