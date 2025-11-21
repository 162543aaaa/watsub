import React from 'react';
import { Project, Task, TaskStatus, Priority } from '../types';
import { MoreHorizontal, Calendar, AlertCircle } from 'lucide-react';

interface KanbanBoardProps {
  project: Project;
  tasks: Task[];
  onMoveTask: (taskId: string, newStatus: TaskStatus) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ project, tasks, onMoveTask }) => {
  
  const columns = [
    { id: TaskStatus.TODO, title: 'To Do', color: 'bg-slate-100', borderColor: 'border-slate-200' },
    { id: TaskStatus.IN_PROGRESS, title: 'In Progress', color: 'bg-blue-50', borderColor: 'border-blue-200' },
    { id: TaskStatus.DONE, title: 'Done', color: 'bg-emerald-50', borderColor: 'border-emerald-200' },
  ];

  const getPriorityColor = (priority: Priority) => {
    switch(priority) {
      case Priority.HIGH: return 'text-rose-600 bg-rose-50 border-rose-100';
      case Priority.MEDIUM: return 'text-amber-600 bg-amber-50 border-amber-100';
      case Priority.LOW: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="h-full flex flex-col p-8 max-w-full overflow-hidden">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>
          <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide bg-${project.color}-100 text-${project.color}-700`}>
            Active
          </span>
        </div>
        <p className="text-slate-500 max-w-2xl">{project.description}</p>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-6 h-full min-w-[800px]">
          {columns.map(column => {
            const columnTasks = tasks.filter(t => t.status === column.id);
            
            return (
              <div key={column.id} className="w-1/3 flex flex-col bg-slate-50/50 rounded-xl border border-slate-200/60 h-full">
                <div className={`p-4 border-b ${column.borderColor} flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-t-xl`}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-700">{column.title}</h3>
                    <span className="text-xs font-medium text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-100">
                      {columnTasks.length}
                    </span>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide">
                  {columnTasks.map(task => (
                    <div 
                      key={task.id} 
                      className="group bg-white p-4 rounded-lg border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all cursor-pointer relative"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {/* Quick move actions */}
                          {task.status !== TaskStatus.TODO && (
                             <button onClick={() => onMoveTask(task.id, TaskStatus.TODO)} title="Move to Todo" className="w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-500" />
                          )}
                          {task.status !== TaskStatus.IN_PROGRESS && (
                             <button onClick={() => onMoveTask(task.id, TaskStatus.IN_PROGRESS)} title="Move to In Progress" className="w-2 h-2 rounded-full bg-blue-300 hover:bg-blue-500" />
                          )}
                          {task.status !== TaskStatus.DONE && (
                             <button onClick={() => onMoveTask(task.id, TaskStatus.DONE)} title="Move to Done" className="w-2 h-2 rounded-full bg-emerald-300 hover:bg-emerald-500" />
                          )}
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-slate-800 text-sm mb-1 leading-tight">{task.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3">{task.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-400 border-t border-slate-50 pt-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Today</span>
                        </div>
                        {task.description && task.description.length > 50 && (
                          <div className="flex items-center gap-1 ml-auto">
                             <AlertCircle className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {columnTasks.length === 0 && (
                     <div className="h-full flex flex-col items-center justify-center text-slate-300 text-sm border-2 border-dashed border-slate-200 rounded-lg min-h-[100px]">
                        No tasks
                     </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
