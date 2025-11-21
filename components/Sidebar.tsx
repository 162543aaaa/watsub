import React from 'react';
import { Project } from '../types';
import { LayoutDashboard, FolderKanban, Plus, Command } from 'lucide-react';

interface SidebarProps {
  projects: Project[];
  activeProjectId: string | null;
  onSelectProject: (id: string | null) => void;
  onOpenAIModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  projects, 
  activeProjectId, 
  onSelectProject,
  onOpenAIModal
}) => {
  
  const getColorClass = (color: string) => {
    const map: Record<string, string> = {
      indigo: 'bg-indigo-500',
      emerald: 'bg-emerald-500',
      amber: 'bg-amber-500',
      rose: 'bg-rose-500',
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
    };
    return map[color] || 'bg-slate-500';
  };

  return (
    <div className="w-64 bg-white h-screen border-r border-slate-200 flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 flex items-center gap-2 border-b border-slate-100">
        <div className="bg-brand-600 p-1.5 rounded-lg">
            <Command className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl text-slate-800 tracking-tight">PlanAI</span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3">
        <div className="mb-6">
          <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Overview</h3>
          <button 
            onClick={() => onSelectProject(null)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeProjectId === null 
                ? 'bg-brand-50 text-brand-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Projects</h3>
          </div>
          <div className="space-y-1">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeProjectId === project.id 
                    ? 'bg-brand-50 text-brand-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${getColorClass(project.color)}`} />
                <span className="truncate">{project.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={onOpenAIModal}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-slate-200 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>
    </div>
  );
};
