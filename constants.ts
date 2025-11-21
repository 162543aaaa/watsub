import { Project, Task, TaskStatus, Priority } from "./types";

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Overhaul the company homepage and product pages with new branding.',
    createdAt: new Date().toISOString(),
    color: 'indigo'
  },
  {
    id: '2',
    name: 'Mobile App Launch',
    description: 'Prepare marketing assets and store listings for iOS and Android.',
    createdAt: new Date().toISOString(),
    color: 'emerald'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    projectId: '1',
    title: 'Draft new copy',
    description: 'Write compelling headlines for the hero section.',
    status: TaskStatus.DONE,
    priority: Priority.HIGH,
    createdAt: new Date().toISOString()
  },
  {
    id: 't2',
    projectId: '1',
    title: 'Select imagery',
    description: 'Find stock photos or schedule photoshoot.',
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.MEDIUM,
    createdAt: new Date().toISOString()
  },
  {
    id: 't3',
    projectId: '1',
    title: 'Develop Hero Component',
    description: 'Code the main banner in React.',
    status: TaskStatus.TODO,
    priority: Priority.HIGH,
    createdAt: new Date().toISOString()
  },
  {
    id: 't4',
    projectId: '2',
    title: 'App Store Screenshots',
    description: 'Design 5 screenshots for the store listing.',
    status: TaskStatus.TODO,
    priority: Priority.HIGH,
    createdAt: new Date().toISOString()
  }
];
