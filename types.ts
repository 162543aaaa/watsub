export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export enum TaskCategory {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL'
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  createdAt: string;
  
  // New fields based on user request
  category: TaskCategory;
  assignee?: string; // User name or role
  link?: string; // External link
  startDate?: string; // ISO Date
  dueDate?: string; // Expected finish date
  completedDate?: string; // Actual finish date
  publishDate?: string; // Publish date
  notes?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  color: string; 
}

export interface AIProjectProposal {
  name: string;
  description: string;
  category: TaskCategory;
  tasks: {
    title: string;
    description: string;
    priority: Priority;
    assignee?: string;
    estimatedDays?: number;
  }[];
}