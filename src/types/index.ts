export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'employee';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  members: User[];
  tasksCount: number;
  completedTasksCount: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  assignedTo?: User;
  status: 'todo' | 'in-progress' | 'review' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  storyPoints: number;
  baseScore: number;
  finalScore?: number;
  delayPenalty?: number;
  createdAt: string;
  assignedAt?: string;
  completedAt?: string;
  dueDate: string;
  tags?: string[];
}

export interface ScoreReport {
  userId: string;
  userName: string;
  month: string;
  totalScore: number;
  targetScore: number;
  tasks: ScoreTask[];
}

export interface ScoreTask {
  taskId: string;
  taskTitle: string;
  baseScore: number;
  delayPenalty: number;
  finalScore: number;
  completedDate: string;
  dueDate: string;
  daysLate: number;
}

export interface DashboardStats {
  monthlyScore: number;
  targetScore: number;
  completedTasks: number;
  pendingTasks: number;
  averageScore: number;
  productivity: number;
}

