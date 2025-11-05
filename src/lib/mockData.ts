import { User, Project, Task, ScoreReport, DashboardStats } from '@/types'

export const currentUser: User = {
  id: 'user-1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  role: 'employee'
}

export const mockUsers: User[] = [
  currentUser,
  {
    id: 'user-2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    role: 'employee'
  },
  {
    id: 'user-3',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    role: 'manager'
  },
  {
    id: 'user-4',
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    role: 'employee'
  }
]

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Customer Portal Redesign',
    description: 'Complete overhaul of the customer-facing portal with modern UI/UX',
    progress: 67,
    status: 'in-progress',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    tasksCount: 24,
    completedTasksCount: 16
  },
  {
    id: 'proj-2',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android platforms',
    progress: 45,
    status: 'in-progress',
    startDate: '2024-09-15',
    endDate: '2025-01-15',
    members: [mockUsers[1], mockUsers[3]],
    tasksCount: 32,
    completedTasksCount: 14
  },
  {
    id: 'proj-3',
    name: 'API Microservices Migration',
    description: 'Migrate monolithic API to microservices architecture',
    progress: 89,
    status: 'in-progress',
    startDate: '2024-08-01',
    endDate: '2024-11-30',
    members: [mockUsers[0], mockUsers[3]],
    tasksCount: 18,
    completedTasksCount: 16
  },
  {
    id: 'proj-4',
    name: 'Data Analytics Dashboard',
    description: 'Business intelligence dashboard with real-time analytics',
    progress: 23,
    status: 'planning',
    startDate: '2024-11-01',
    endDate: '2025-02-28',
    members: [mockUsers[2]],
    tasksCount: 15,
    completedTasksCount: 3
  }
]

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Implement user authentication flow',
    description: 'Create secure login, registration, and password reset functionality using OAuth 2.0',
    projectId: 'proj-1',
    projectName: 'Customer Portal Redesign',
    assignedTo: currentUser,
    status: 'in-progress',
    priority: 'high',
    storyPoints: 8,
    baseScore: 12,
    createdAt: '2024-10-15',
    assignedAt: '2024-10-16',
    dueDate: '2024-11-10',
    tags: ['backend', 'security']
  },
  {
    id: 'task-2',
    title: 'Design responsive dashboard layout',
    description: 'Create mobile-first responsive design for main dashboard with data visualizations',
    projectId: 'proj-1',
    projectName: 'Customer Portal Redesign',
    assignedTo: currentUser,
    status: 'completed',
    priority: 'high',
    storyPoints: 5,
    baseScore: 10,
    finalScore: 10,
    delayPenalty: 0,
    createdAt: '2024-10-10',
    assignedAt: '2024-10-11',
    completedAt: '2024-10-20',
    dueDate: '2024-10-22',
    tags: ['frontend', 'ui/ux']
  },
  {
    id: 'task-3',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment pipeline using GitHub Actions',
    projectId: 'proj-2',
    projectName: 'Mobile App Development',
    assignedTo: mockUsers[1],
    status: 'review',
    priority: 'medium',
    storyPoints: 5,
    baseScore: 8,
    createdAt: '2024-10-12',
    assignedAt: '2024-10-13',
    dueDate: '2024-11-05',
    tags: ['devops', 'automation']
  },
  {
    id: 'task-4',
    title: 'API rate limiting implementation',
    description: 'Implement rate limiting middleware for all public APIs to prevent abuse',
    projectId: 'proj-3',
    projectName: 'API Microservices Migration',
    assignedTo: currentUser,
    status: 'todo',
    priority: 'urgent',
    storyPoints: 3,
    baseScore: 6,
    createdAt: '2024-10-18',
    dueDate: '2024-11-08',
    tags: ['backend', 'security']
  },
  {
    id: 'task-5',
    title: 'Database optimization and indexing',
    description: 'Analyze and optimize slow queries, add necessary indexes',
    projectId: 'proj-3',
    projectName: 'API Microservices Migration',
    assignedTo: mockUsers[3],
    status: 'completed',
    priority: 'high',
    storyPoints: 5,
    baseScore: 10,
    finalScore: 8,
    delayPenalty: -2,
    createdAt: '2024-09-25',
    assignedAt: '2024-09-26',
    completedAt: '2024-10-12',
    dueDate: '2024-10-08',
    tags: ['database', 'performance']
  },
  {
    id: 'task-6',
    title: 'Create data visualization components',
    description: 'Build reusable chart components using D3.js for analytics dashboard',
    projectId: 'proj-4',
    projectName: 'Data Analytics Dashboard',
    assignedTo: currentUser,
    status: 'in-progress',
    priority: 'medium',
    storyPoints: 8,
    baseScore: 12,
    createdAt: '2024-11-01',
    assignedAt: '2024-11-02',
    dueDate: '2024-11-15',
    tags: ['frontend', 'data-viz']
  }
]

export const mockDashboardStats: DashboardStats = {
  monthlyScore: 37,
  targetScore: 50,
  completedTasks: 8,
  pendingTasks: 12,
  averageScore: 9.2,
  productivity: 74
}

export const mockScoreReport: ScoreReport = {
  userId: 'user-1',
  userName: 'Sarah Johnson',
  month: 'November 2024',
  totalScore: 37,
  targetScore: 50,
  tasks: [
    {
      taskId: 'task-2',
      taskTitle: 'Design responsive dashboard layout',
      baseScore: 10,
      delayPenalty: 0,
      finalScore: 10,
      completedDate: '2024-10-20',
      dueDate: '2024-10-22',
      daysLate: 0
    },
    {
      taskId: 'task-7',
      taskTitle: 'Implement payment gateway integration',
      baseScore: 15,
      delayPenalty: -3,
      finalScore: 12,
      completedDate: '2024-10-28',
      dueDate: '2024-10-25',
      daysLate: 3
    },
    {
      taskId: 'task-8',
      taskTitle: 'Write API documentation',
      baseScore: 8,
      delayPenalty: 0,
      finalScore: 8,
      completedDate: '2024-11-02',
      dueDate: '2024-11-03',
      daysLate: 0
    },
    {
      taskId: 'task-9',
      taskTitle: 'Bug fixes for mobile view',
      baseScore: 5,
      delayPenalty: -1,
      finalScore: 4,
      completedDate: '2024-11-05',
      dueDate: '2024-11-04',
      daysLate: 1
    },
    {
      taskId: 'task-10',
      taskTitle: 'Code review and refactoring',
      baseScore: 3,
      delayPenalty: 0,
      finalScore: 3,
      completedDate: '2024-11-06',
      dueDate: '2024-11-07',
      daysLate: 0
    }
  ]
}

