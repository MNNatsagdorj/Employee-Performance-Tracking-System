import { User, Project, Task, ScoreReport, DashboardStats, Team } from '@/types'

// ============================================
// USERS WITH HIERARCHICAL ROLES
// ============================================

export const mockUsers: User[] = [
  // OWNER
  {
    id: 'user-1',
    name: 'David Park',
    email: 'david.park@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    role: 'OWNER',
    position: 'CEO & Founder',
    status: 'active',
    monthlyScore: 0,
    monthlyTarget: 0
  },
  
  // TEAM MANAGERS
  {
    id: 'user-2',
    name: 'Emily Chen',
    email: 'emily.chen@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    role: 'TEAM_MANAGER',
    position: 'Backend Team Lead',
    teamId: 'team-1',
    status: 'active',
    monthlyScore: 45,
    monthlyTarget: 50
  },
  {
    id: 'user-3',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    role: 'TEAM_MANAGER',
    position: 'Frontend Team Lead',
    teamId: 'team-2',
    status: 'active',
    monthlyScore: 42,
    monthlyTarget: 50
  },
  {
    id: 'user-4',
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    role: 'TEAM_MANAGER',
    position: 'QA Team Lead',
    teamId: 'team-3',
    status: 'active',
    monthlyScore: 38,
    monthlyTarget: 50
  },
  
  // PROJECT MANAGERS
  {
    id: 'user-5',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'PM',
    position: 'Senior Project Manager',
    teamId: 'team-1',
    status: 'active',
    monthlyScore: 48,
    monthlyTarget: 50
  },
  {
    id: 'user-6',
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    role: 'PM',
    position: 'Project Manager',
    teamId: 'team-2',
    status: 'active',
    monthlyScore: 44,
    monthlyTarget: 50
  },
  
  // DEVELOPERS - Backend Team
  {
    id: 'user-7',
    name: 'Robert Taylor',
    email: 'robert.taylor@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    role: 'DEVELOPER',
    position: 'Senior Backend Developer',
    teamId: 'team-1',
    status: 'active',
    monthlyScore: 50,
    monthlyTarget: 50
  },
  {
    id: 'user-8',
    name: 'Jennifer Lee',
    email: 'jennifer.lee@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
    role: 'DEVELOPER',
    position: 'Backend Developer',
    teamId: 'team-1',
    status: 'active',
    monthlyScore: 45,
    monthlyTarget: 50
  },
  {
    id: 'user-9',
    name: 'Daniel Kim',
    email: 'daniel.kim@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel',
    role: 'DEVELOPER',
    position: 'Backend Developer',
    teamId: 'team-1',
    status: 'active',
    monthlyScore: 42,
    monthlyTarget: 50
  },
  
  // DEVELOPERS - Frontend Team
  {
    id: 'user-10',
    name: 'Amanda Martinez',
    email: 'amanda.martinez@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda',
    role: 'DEVELOPER',
    position: 'Senior Frontend Developer',
    teamId: 'team-2',
    status: 'active',
    monthlyScore: 47,
    monthlyTarget: 50
  },
  {
    id: 'user-11',
    name: 'Christopher Brown',
    email: 'christopher.brown@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher',
    role: 'DEVELOPER',
    position: 'Frontend Developer',
    teamId: 'team-2',
    status: 'active',
    monthlyScore: 44,
    monthlyTarget: 50
  },
  {
    id: 'user-12',
    name: 'Jessica Davis',
    email: 'jessica.davis@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    role: 'DEVELOPER',
    position: 'Frontend Developer',
    teamId: 'team-2',
    status: 'active',
    monthlyScore: 40,
    monthlyTarget: 50
  },
  
  // DEVELOPERS - QA Team
  {
    id: 'user-13',
    name: 'Kevin Anderson',
    email: 'kevin.anderson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin',
    role: 'DEVELOPER',
    position: 'QA Engineer',
    teamId: 'team-3',
    status: 'active',
    monthlyScore: 41,
    monthlyTarget: 50
  },
  {
    id: 'user-14',
    name: 'Michelle Garcia',
    email: 'michelle.garcia@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michelle',
    role: 'DEVELOPER',
    position: 'QA Engineer',
    teamId: 'team-3',
    status: 'active',
    monthlyScore: 39,
    monthlyTarget: 50
  }
]

// Current user - Developer from Backend Team
export const currentUser: User = mockUsers[7] // Robert Taylor

// ============================================
// TEAMS
// ============================================

export const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Backend Engineering Team',
    description: 'Responsible for server-side development, APIs, and database management',
    managerId: 'user-2',
    managerName: 'Emily Chen',
    pmId: 'user-5',
    pmName: 'Sarah Johnson',
    members: ['user-7', 'user-8', 'user-9'],
    projectsCount: 2,
    totalScore: 137,
    createdAt: '2024-01-15'
  },
  {
    id: 'team-2',
    name: 'Frontend Engineering Team',
    description: 'Handles client-side development, UI/UX implementation, and responsive design',
    managerId: 'user-3',
    managerName: 'Michael Rodriguez',
    pmId: 'user-6',
    pmName: 'James Wilson',
    members: ['user-10', 'user-11', 'user-12'],
    projectsCount: 2,
    totalScore: 131,
    createdAt: '2024-01-15'
  },
  {
    id: 'team-3',
    name: 'Quality Assurance Team',
    description: 'Ensures product quality through testing, automation, and quality standards',
    managerId: 'user-4',
    managerName: 'Lisa Wang',
    members: ['user-13', 'user-14'],
    projectsCount: 1,
    totalScore: 80,
    createdAt: '2024-02-01'
  }
]

// ============================================
// PROJECTS
// ============================================

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Customer Portal Redesign',
    description: 'Complete overhaul of the customer-facing portal with modern UI/UX',
    teamId: 'team-1',
    teamName: 'Backend Engineering Team',
    progress: 67,
    status: 'in-progress',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    members: [mockUsers[6], mockUsers[7], mockUsers[8], mockUsers[4]],
    tasksCount: 24,
    completedTasksCount: 16
  },
  {
    id: 'proj-2',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android platforms',
    teamId: 'team-2',
    teamName: 'Frontend Engineering Team',
    progress: 45,
    status: 'in-progress',
    startDate: '2024-09-15',
    endDate: '2025-01-15',
    members: [mockUsers[9], mockUsers[10], mockUsers[11], mockUsers[5]],
    tasksCount: 32,
    completedTasksCount: 14
  },
  {
    id: 'proj-3',
    name: 'API Microservices Migration',
    description: 'Migrate monolithic API to microservices architecture',
    teamId: 'team-1',
    teamName: 'Backend Engineering Team',
    progress: 89,
    status: 'in-progress',
    startDate: '2024-08-01',
    endDate: '2024-11-30',
    members: [mockUsers[6], mockUsers[7], mockUsers[4]],
    tasksCount: 18,
    completedTasksCount: 16
  },
  {
    id: 'proj-4',
    name: 'Data Analytics Dashboard',
    description: 'Business intelligence dashboard with real-time analytics',
    teamId: 'team-2',
    teamName: 'Frontend Engineering Team',
    progress: 23,
    status: 'planning',
    startDate: '2024-11-01',
    endDate: '2025-02-28',
    members: [mockUsers[9], mockUsers[5]],
    tasksCount: 15,
    completedTasksCount: 3
  }
]

// ============================================
// TASKS WITH NEW STATUS TYPES
// ============================================

export const mockTasks: Task[] = [
  // AVAILABLE tasks (no assignee yet)
  {
    id: 'task-1',
    title: 'Implement Redis caching layer',
    description: 'Add Redis caching for frequently accessed database queries to improve performance',
    projectId: 'proj-1',
    projectName: 'Customer Portal Redesign',
    teamId: 'team-1',
    createdBy: 'user-5',
    status: 'AVAILABLE',
    priority: 'high',
    difficulty: 'Hard',
    storyPoints: 8,
    baseScore: 16,
    createdAt: '2024-11-05',
    dueDate: '2024-11-20',
    tags: ['backend', 'performance']
  },
  {
    id: 'task-2',
    title: 'Create responsive navigation menu',
    description: 'Build a mobile-first navigation component with hamburger menu and smooth transitions',
    projectId: 'proj-2',
    projectName: 'Mobile App Development',
    teamId: 'team-2',
    createdBy: 'user-6',
    status: 'AVAILABLE',
    priority: 'medium',
    difficulty: 'Medium',
    storyPoints: 5,
    baseScore: 10,
    createdAt: '2024-11-06',
    dueDate: '2024-11-18',
    tags: ['frontend', 'ui/ux']
  },
  {
    id: 'task-3',
    title: 'Setup database connection pooling',
    description: 'Configure connection pooling for PostgreSQL to optimize database connections',
    projectId: 'proj-3',
    projectName: 'API Microservices Migration',
    teamId: 'team-1',
    createdBy: 'user-5',
    status: 'AVAILABLE',
    priority: 'high',
    difficulty: 'Medium',
    storyPoints: 5,
    baseScore: 10,
    createdAt: '2024-11-07',
    dueDate: '2024-11-22',
    tags: ['backend', 'database']
  },
  
  // TODO tasks (assigned but not started)
  {
    id: 'task-4',
    title: 'Implement user authentication flow',
    description: 'Create secure login, registration, and password reset functionality using OAuth 2.0',
    projectId: 'proj-1',
    projectName: 'Customer Portal Redesign',
    teamId: 'team-1',
    createdBy: 'user-5',
    assignedTo: mockUsers[7],
    assigneeId: 'user-8',
    status: 'TODO',
    priority: 'urgent',
    difficulty: 'Hard',
    storyPoints: 8,
    baseScore: 16,
    createdAt: '2024-10-15',
    assignedAt: '2024-10-16',
    dueDate: '2024-11-12',
    tags: ['backend', 'security']
  },
  {
    id: 'task-5',
    title: 'Design dashboard wireframes',
    description: 'Create low-fidelity wireframes for the analytics dashboard',
    projectId: 'proj-4',
    projectName: 'Data Analytics Dashboard',
    teamId: 'team-2',
    createdBy: 'user-6',
    assignedTo: mockUsers[10],
    assigneeId: 'user-11',
    status: 'TODO',
    priority: 'medium',
    difficulty: 'Easy',
    storyPoints: 3,
    baseScore: 6,
    createdAt: '2024-11-01',
    assignedAt: '2024-11-02',
    dueDate: '2024-11-15',
    tags: ['frontend', 'design']
  },
  
  // IN_PROGRESS tasks
  {
    id: 'task-6',
    title: 'API rate limiting implementation',
    description: 'Implement rate limiting middleware for all public APIs to prevent abuse',
    projectId: 'proj-3',
    projectName: 'API Microservices Migration',
    teamId: 'team-1',
    createdBy: 'user-5',
    assignedTo: currentUser,
    assigneeId: 'user-7',
    status: 'IN_PROGRESS',
    priority: 'high',
    difficulty: 'Medium',
    storyPoints: 5,
    baseScore: 10,
    createdAt: '2024-10-18',
    assignedAt: '2024-10-20',
    dueDate: '2024-11-10',
    tags: ['backend', 'security']
  },
  {
    id: 'task-7',
    title: 'Create data visualization components',
    description: 'Build reusable chart components using Recharts for analytics dashboard',
    projectId: 'proj-4',
    projectName: 'Data Analytics Dashboard',
    teamId: 'team-2',
    createdBy: 'user-6',
    assignedTo: mockUsers[9],
    assigneeId: 'user-10',
    status: 'IN_PROGRESS',
    priority: 'high',
    difficulty: 'Hard',
    storyPoints: 8,
    baseScore: 16,
    createdAt: '2024-11-01',
    assignedAt: '2024-11-02',
    dueDate: '2024-11-16',
    tags: ['frontend', 'data-viz']
  },
  
  // REVIEW tasks
  {
    id: 'task-8',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment pipeline using GitHub Actions',
    projectId: 'proj-2',
    projectName: 'Mobile App Development',
    teamId: 'team-2',
    createdBy: 'user-6',
    assignedTo: mockUsers[10],
    assigneeId: 'user-11',
    status: 'REVIEW',
    priority: 'medium',
    difficulty: 'Medium',
    storyPoints: 5,
    baseScore: 10,
    createdAt: '2024-10-12',
    assignedAt: '2024-10-13',
    dueDate: '2024-11-08',
    tags: ['devops', 'automation']
  },
  {
    id: 'task-9',
    title: 'Write API documentation',
    description: 'Create comprehensive API documentation using Swagger/OpenAPI',
    projectId: 'proj-3',
    projectName: 'API Microservices Migration',
    teamId: 'team-1',
    createdBy: 'user-5',
    assignedTo: mockUsers[8],
    assigneeId: 'user-9',
    status: 'REVIEW',
    priority: 'medium',
    difficulty: 'Easy',
    storyPoints: 3,
    baseScore: 6,
    createdAt: '2024-10-25',
    assignedAt: '2024-10-26',
    dueDate: '2024-11-09',
    tags: ['documentation']
  },
  
  // COMPLETED tasks
  {
    id: 'task-10',
    title: 'Design responsive dashboard layout',
    description: 'Create mobile-first responsive design for main dashboard with data visualizations',
    projectId: 'proj-1',
    projectName: 'Customer Portal Redesign',
    teamId: 'team-1',
    createdBy: 'user-5',
    assignedTo: currentUser,
    assigneeId: 'user-7',
    status: 'COMPLETED',
    priority: 'high',
    difficulty: 'Medium',
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
    id: 'task-11',
    title: 'Database optimization and indexing',
    description: 'Analyze and optimize slow queries, add necessary indexes',
    projectId: 'proj-3',
    projectName: 'API Microservices Migration',
    teamId: 'team-1',
    createdBy: 'user-5',
    assignedTo: mockUsers[7],
    assigneeId: 'user-8',
    status: 'COMPLETED',
    priority: 'high',
    difficulty: 'Hard',
    storyPoints: 8,
    baseScore: 16,
    finalScore: 14,
    delayPenalty: -2,
    createdAt: '2024-09-25',
    assignedAt: '2024-09-26',
    completedAt: '2024-10-12',
    dueDate: '2024-10-08',
    tags: ['database', 'performance']
  }
]

// ============================================
// DASHBOARD STATS
// ============================================

export const mockDashboardStats: DashboardStats = {
  monthlyScore: 50,
  targetScore: 50,
  completedTasks: 12,
  pendingTasks: 8,
  averageScore: 9.5,
  productivity: 100
}

// ============================================
// SCORE REPORT
// ============================================

export const mockScoreReport: ScoreReport = {
  userId: 'user-7',
  userName: 'Robert Taylor',
  month: 'November 2024',
  totalScore: 50,
  targetScore: 50,
  tasks: [
    {
      taskId: 'task-10',
      taskTitle: 'Design responsive dashboard layout',
      baseScore: 10,
      delayPenalty: 0,
      finalScore: 10,
      completedDate: '2024-10-20',
      dueDate: '2024-10-22',
      daysLate: 0
    },
    {
      taskId: 'task-15',
      taskTitle: 'Implement payment gateway integration',
      baseScore: 15,
      delayPenalty: -3,
      finalScore: 12,
      completedDate: '2024-10-28',
      dueDate: '2024-10-25',
      daysLate: 3
    },
    {
      taskId: 'task-16',
      taskTitle: 'Code review and refactoring',
      baseScore: 12,
      delayPenalty: 0,
      finalScore: 12,
      completedDate: '2024-11-02',
      dueDate: '2024-11-03',
      daysLate: 0
    },
    {
      taskId: 'task-17',
      taskTitle: 'Bug fixes for mobile view',
      baseScore: 8,
      delayPenalty: 0,
      finalScore: 8,
      completedDate: '2024-11-05',
      dueDate: '2024-11-06',
      daysLate: 0
    },
    {
      taskId: 'task-18',
      taskTitle: 'Performance optimization',
      baseScore: 10,
      delayPenalty: -2,
      finalScore: 8,
      completedDate: '2024-11-06',
      dueDate: '2024-11-04',
      daysLate: 2
    }
  ]
}
