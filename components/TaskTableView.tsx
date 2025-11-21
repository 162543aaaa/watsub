import React from 'react';
import { Task, Project, TaskStatus, Priority, TaskCategory } from '../types';
import { ExternalLink, Calendar, UserCircle } from 'lucide-react';

interface TaskTableViewProps {
  title: string;
  tasks: Task[];
  projects: Project[];
}

export const TaskTableView: React.FC<TaskTableViewProps> = ({ title, tasks, projects }) => {

  const getProjectName = (id: string) => projects.find(p => p.id === id)?.name || 'Unknown Project';
  
  const calculateRemainingDays = (dueDate?: string, status?: TaskStatus) => {
    if (!dueDate || status === TaskStatus.DONE) return '-';
    const diff = new Date(dueDate).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return days > 0 ? `${days} days` : days === 0 ? 'Due today' : `Overdue ${Math.abs(days)} days`;
  };

  const getPriorityBadge = (priority: Priority) => {
    const styles = {
      [Priority.HIGH]: 'bg-rose-100 text-rose-700 border-rose-200',
      [Priority.MEDIUM]: 'bg-amber-100 text-amber-700 border-amber-200',
      [Priority.LOW]: 'bg-slate-100 text-slate-700 border-slate-200',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${styles[priority]}`}>
        {priority}
      </span>
    );
  };

  const getStatusBadge = (status: TaskStatus) => {
    const styles = {
      [TaskStatus.DONE]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      [TaskStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-700 border-blue-200',
      [TaskStatus.TODO]: 'bg-slate-100 text-slate-600 border-slate-200',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${styles[status]}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  // Format date to short string YYYY-MM-DD
  const fd = (dateStr?: string) => dateStr ? new Date(dateStr).toLocaleDateString('th-TH') : '-';

  return (
    <div className="p-8 h-full flex flex-col animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="text-slate-500 mt-1 text-sm">Task list view with detailed tracking information.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-md px-3 py-1 text-sm text-slate-600">
          {tasks.length} items
        </div>
      </div>

      <div className="flex-1 overflow-auto border border-slate-200 rounded-xl shadow-sm bg-white">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-slate-50 sticky top-0 z-10 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="p-3 border-b border-slate-200">Category</th>
              <th className="p-3 border-b border-slate-200">Project</th>
              <th className="p-3 border-b border-slate-200 min-w-[200px]">Task / Link</th>
              <th className="p-3 border-b border-slate-200">Assignee</th>
              <th className="p-3 border-b border-slate-200">Start Date</th>
              <th className="p-3 border-b border-slate-200 text-blue-600">Expected End</th>
              <th className="p-3 border-b border-slate-200 text-emerald-600">Actual End</th>
              <th className="p-3 border-b border-slate-200 text-purple-600">Publish Date</th>
              <th className="p-3 border-b border-slate-200">Remaining</th>
              <th className="p-3 border-b border-slate-200">Priority</th>
              <th className="p-3 border-b border-slate-200">Status</th>
              <th className="p-3 border-b border-slate-200 min-w-[150px]">Note</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-slate-50 transition-colors group">
                {/* Category */}
                <td className="p-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                    task.category === TaskCategory.INTERNAL ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {task.category === TaskCategory.INTERNAL ? 'INTERNAL' : 'EXTERNAL'}
                  </span>
                </td>

                {/* Project */}
                <td className="p-3 font-medium text-slate-900 max-w-[150px] truncate" title={getProjectName(task.projectId)}>
                  {getProjectName(task.projectId)}
                </td>

                {/* Task / Link */}
                <td className="p-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{task.title}</span>
                    {task.link && (
                      <a href={task.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-blue-500 hover:underline mt-0.5">
                        <ExternalLink className="w-3 h-3" /> Link
                      </a>
                    )}
                  </div>
                </td>

                {/* Assignee */}
                <td className="p-3">
                  {task.assignee ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-bold">
                        {task.assignee.charAt(0)}
                      </div>
                      <span className="text-xs">{task.assignee}</span>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs italic">Unassigned</span>
                  )}
                </td>

                {/* Dates */}
                <td className="p-3 font-mono text-xs text-slate-500">{fd(task.startDate)}</td>
                <td className="p-3 font-mono text-xs text-slate-900">{fd(task.dueDate)}</td>
                <td className="p-3 font-mono text-xs text-emerald-600">{fd(task.completedDate)}</td>
                <td className="p-3 font-mono text-xs text-purple-600">{fd(task.publishDate)}</td>

                {/* Remaining Days */}
                <td className="p-3">
                  <span className={`text-xs font-medium ${
                    calculateRemainingDays(task.dueDate, task.status).includes('Overdue') ? 'text-rose-600' : 'text-slate-600'
                  }`}>
                    {calculateRemainingDays(task.dueDate, task.status)}
                  </span>
                </td>

                {/* Priority */}
                <td className="p-3">{getPriorityBadge(task.priority)}</td>

                {/* Status */}
                <td className="p-3">{getStatusBadge(task.status)}</td>

                {/* Note */}
                <td className="p-3 text-xs text-slate-500 max-w-[200px] truncate" title={task.notes}>
                  {task.notes || '-'}
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={12} className="p-8 text-center text-slate-400">
                  No tasks found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};