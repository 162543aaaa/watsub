import { Project, Task, TaskStatus, Priority, TaskCategory } from "./types";

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Overhaul the company homepage and product pages.',
    createdAt: new Date().toISOString(),
    color: 'indigo'
  },
  {
    id: '2',
    name: 'Client Marketing Campaign',
    description: 'Social media and ad deliverables for Client X.',
    createdAt: new Date().toISOString(),
    color: 'emerald'
  }
];

const today = new Date();
const addDays = (days: number) => new Date(new Date().setDate(today.getDate() + days)).toISOString().split('T')[0];

export const INITIAL_TASKS: Task[] = [
  // Internal Tasks (Project 1)
  {
    id: 't1',
    projectId: '1',
    title: 'Draft new copy',
    description: 'Write compelling headlines.',
    status: TaskStatus.DONE,
    priority: Priority.HIGH,
    createdAt: addDays(-10),
    category: TaskCategory.INTERNAL,
    assignee: 'Alex M.',
    startDate: addDays(-5),
    dueDate: addDays(0),
    completedDate: addDays(-1),
    notes: 'Approved by CEO'
  },
  {
    id: 't2',
    projectId: '1',
    title: 'Develop Hero Component',
    description: 'Code the main banner in React.',
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.HIGH,
    createdAt: addDays(-2),
    category: TaskCategory.INTERNAL,
    assignee: 'Sarah K.',
    startDate: addDays(-1),
    dueDate: addDays(3),
    link: 'https://figma.com/file/xyz'
  },
  
  // External Tasks (Project 2)
  {
    id: 't3',
    projectId: '2',
    title: 'Facebook Ads Artwork',
    description: 'Create 5 variations of banner ads.',
    status: TaskStatus.TODO,
    priority: Priority.MEDIUM,
    createdAt: addDays(-1),
    category: TaskCategory.EXTERNAL,
    assignee: 'Design Team',
    startDate: addDays(1),
    dueDate: addDays(5),
    publishDate: addDays(10)
  },
  {
    id: 't4',
    projectId: '2',
    title: 'Monthly Report Generation',
    description: 'Compile analytics from last month.',
    status: TaskStatus.TODO,
    priority: Priority.LOW,
    createdAt: addDays(0),
    category: TaskCategory.EXTERNAL,
    assignee: 'Account Mgr',
    dueDate: addDays(7),
  }
];