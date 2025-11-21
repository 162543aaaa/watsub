import React, { useState } from 'react';
import { Project, Task, AIProjectProposal, TaskStatus, TaskCategory } from './types';
import { INITIAL_PROJECTS, INITIAL_TASKS } from './constants';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { KanbanBoard } from './components/KanbanBoard';
import { TaskTableView } from './components/TaskTableView';
import { AIModal } from './components/AIModal';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  
  const [view, setView] = useState<'dashboard' | 'internal' | 'external' | 'project'>('dashboard');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Helper to handle view navigation
  const handleViewChange = (newView: 'dashboard' | 'internal' | 'external' | 'project', projectId?: string) => {
    setView(newView);
    if (newView === 'project' && projectId) {
      setActiveProjectId(projectId);
    } else {
      setActiveProjectId(null);
    }
  };

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

    const today = new Date();
    const addDays = (d: number) => new Date(new Date().setDate(today.getDate() + d)).toISOString().split('T')[0];

    const newTasks: Task[] = proposal.tasks.map((t, index) => ({
      id: Math.random().toString(36).substring(2, 9),
      projectId: newProjectId,
      title: t.title,
      description: t.description,
      priority: t.priority,
      status: TaskStatus.TODO,
      createdAt: new Date().toISOString(),
      category: proposal.category, // Use proposed category
      assignee: t.assignee,
      startDate: addDays(1), // Mock start date
      dueDate: t.estimatedDays ? addDays(1 + t.estimatedDays) : addDays(3), // Mock end date based on estimate
    }));

    setProjects(prev => [...prev, newProject]);
    setTasks(prev => [...prev, ...newTasks]);
    
    // Switch to the project view newly created
    handleViewChange('project', newProjectId);
  };

  const handleMoveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => {
       if (t.id === taskId) {
           const updates: Partial<Task> = { status: newStatus };
           if (newStatus === TaskStatus.DONE) {
               updates.completedDate = new Date().toISOString().split('T')[0];
           }
           return { ...t, ...updates };
       }
       return t;
    }));
  };

  const renderContent = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard projects={projects} tasks={tasks} />;
      case 'internal':
        return (
          <TaskTableView 
            title="งานภายใน (Internal Projects)" 
            tasks={tasks.filter(t => t.category === TaskCategory.INTERNAL)} 
            projects={projects}
          />
        );
      case 'external':
        return (
            <TaskTableView 
              title="งานภายนอก (External Client Work)" 
              tasks={tasks.filter(t => t.category === TaskCategory.EXTERNAL)} 
              projects={projects}
            />
          );
      case 'project':
        if (activeProject) {
          return (
            <KanbanBoard 
              project={activeProject}
              tasks={tasks.filter(t => t.projectId === activeProject.id)}
              onMoveTask={handleMoveTask}
            />
          );
        }
        return <div>Project not found</div>;
      default:
        return <Dashboard projects={projects} tasks={tasks} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        projects={projects} 
        activeProjectId={activeProjectId}
        activeView={view}
        onSelectView={(v, pid) => handleViewChange(v === 'dashboard' || v === 'internal' || v === 'external' ? v : 'project', pid)}
        onOpenAIModal={() => setIsAIModalOpen(true)}
      />

      <main className="ml-64 flex-1 min-h-screen overflow-hidden">
        {renderContent()}
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