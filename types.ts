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

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  color: string; // Tailwind color class fragment like 'blue', 'red', 'emerald'
}

export interface AIProjectProposal {
  name: string;
  description: string;
  tasks: {
    title: string;
    description: string;
    priority: Priority;
  }[];
}
