import React, { useState, useEffect } from 'react';
import { Project, Task, AIProjectProposal, TaskStatus } from './types';
import { INITIAL_PROJECTS, INITIAL_TASKS } from './constants';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { KanbanBoard } from './components/KanbanBoard';
import { AIModal } from './components/AIModal';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Derived state
  const activeProject = projects.find(p => p.id === activeProjectId);

  const handleProjectCreated = (proposal: AIProjectProposal) => {
    const newProjectId = Math.random().toString(36).substring(2, 9);
    const colors = ['indigo', 'emerald', 'blue', 'rose', 'purple', 'amber'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newProject: Project = {
      id: newProjectId,
      name: proposal.name,
      description: proposal.description,
      createdAt: new Date().toISOString(),
      color: randomColor
    };

    const newTasks: Task[] = proposal.tasks.map(t => ({
      id: Math.random().toString(36).substring(2, 9),
      projectId: newProjectId,
      title: t.title,
      description: t.description,
      priority: t.priority,
      status: TaskStatus.TODO,
      createdAt: new Date().toISOString()
    }));

    setProjects(prev => [...prev, newProject]);
    setTasks(prev => [...prev, ...newTasks]);
    setActiveProjectId(newProjectId);
  };

  const handleMoveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, status: newStatus } : t
    ));
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        projects={projects} 
        activeProjectId={activeProjectId} 
        onSelectProject={setActiveProjectId}
        onOpenAIModal={() => setIsAIModalOpen(true)}
      />

      <main className="ml-64 flex-1 min-h-screen">
        {activeProject ? (
          <KanbanBoard 
            project={activeProject}
            tasks={tasks.filter(t => t.projectId === activeProject.id)}
            onMoveTask={handleMoveTask}
          />
        ) : (
          <Dashboard 
            projects={projects}
            tasks={tasks}
          />
        )}
      </main>

      <AIModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
};

export default App;
