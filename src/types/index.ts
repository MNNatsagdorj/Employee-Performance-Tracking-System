export type UserRole = 'OWNER' | 'TEAM_MANAGER' | 'PM' | 'DEVELOPER';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  position?: string;
  teamId?: string;
  monthlyScore?: number;
  monthlyTarget?: number;
  status?: 'active' | 'inactive';
}

export interface Team {
  id: string;
  name: string;
  description: string;
  managerId: string; // Team Manager
  managerName?: string;
  pmId?: string; // Project Manager (optional)
  pmName?: string;
  members: string[]; // Developer IDs
  memberDetails?: User[];
  projectsCount?: number;
  totalScore?: number;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  teamId?: string;
  teamName?: string;
  progress: number;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  members: User[];
  tasksCount: number;
  completedTasksCount: number;
}

export type TaskStatus = 'AVAILABLE' | 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED' | 'BLOCKED';

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  teamId?: string;
  createdBy: string; // PM who created the task
  assignedTo?: User;
  assigneeId?: string; // optional until developer picks it
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  difficulty: 'Easy' | 'Medium' | 'Hard';
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

