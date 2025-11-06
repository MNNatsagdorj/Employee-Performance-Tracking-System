import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  currentUser,
  mockUsers,
  mockTeams,
  mockProjects,
  mockTasks,
  mockDashboardStats,
  mockScoreReport
} from './mockData'

// Create axios instance
export const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

// Create mock adapter
const mock = new MockAdapter(api, { delayResponse: 500 })

// ============================================
// AUTH ENDPOINTS
// ============================================

mock.onPost('/auth/login').reply((config) => {
  const { email, password } = JSON.parse(config.data)
  
  if (email && password) {
    return [200, { user: currentUser, token: 'mock-jwt-token' }]
  }
  return [401, { message: 'Invalid credentials' }]
})

mock.onGet('/user/me').reply(200, currentUser)

// ============================================
// USERS / ROLES ENDPOINTS
// ============================================

// Get all users
mock.onGet('/users').reply((config) => {
  const params = config.params || {}
  let filteredUsers = [...mockUsers]
  
  // Filter by role
  if (params.role) {
    filteredUsers = filteredUsers.filter(u => u.role === params.role)
  }
  
  // Filter by team
  if (params.teamId) {
    filteredUsers = filteredUsers.filter(u => u.teamId === params.teamId)
  }
  
  // Filter by status
  if (params.status) {
    filteredUsers = filteredUsers.filter(u => u.status === params.status)
  }
  
  return [200, filteredUsers]
})

// Get user by ID
mock.onGet(/\/users\/[\w-]+/).reply((config) => {
  const id = config.url?.split('/').pop()
  const user = mockUsers.find(u => u.id === id)
  return user ? [200, user] : [404, { message: 'User not found' }]
})

// Update user role
mock.onPatch(/\/users\/[\w-]+\/role/).reply((config) => {
  const id = config.url?.split('/')[2]
  const { role } = JSON.parse(config.data)
  const user = mockUsers.find(u => u.id === id)
  
  if (user) {
    user.role = role
    return [200, user]
  }
  return [404, { message: 'User not found' }]
})

// Update user team
mock.onPatch(/\/users\/[\w-]+\/team/).reply((config) => {
  const id = config.url?.split('/')[2]
  const { teamId } = JSON.parse(config.data)
  const user = mockUsers.find(u => u.id === id)
  
  if (user) {
    user.teamId = teamId
    return [200, user]
  }
  return [404, { message: 'User not found' }]
})

// Get employees (developers only)
mock.onGet('/employees').reply(200, mockUsers.filter(u => u.role === 'DEVELOPER'))

// ============================================
// TEAMS ENDPOINTS
// ============================================

// Get all teams
mock.onGet('/teams').reply((config) => {
  const params = config.params || {}
  let teamsWithDetails = mockTeams.map(team => ({
    ...team,
    memberDetails: mockUsers.filter(u => team.members.includes(u.id))
  }))
  
  // Filter by manager
  if (params.managerId) {
    teamsWithDetails = teamsWithDetails.filter(t => t.managerId === params.managerId)
  }
  
  return [200, teamsWithDetails]
})

// Get team by ID
mock.onGet(/\/teams\/[\w-]+/).reply((config) => {
  const id = config.url?.split('/').pop()
  const team = mockTeams.find(t => t.id === id)
  
  if (team) {
    const teamWithDetails = {
      ...team,
      memberDetails: mockUsers.filter(u => team.members.includes(u.id)),
      projects: mockProjects.filter(p => p.teamId === id)
    }
    return [200, teamWithDetails]
  }
  return [404, { message: 'Team not found' }]
})

// Create team
mock.onPost('/teams').reply((config) => {
  const newTeam = JSON.parse(config.data)
  const team = {
    ...newTeam,
    id: `team-${Date.now()}`,
    createdAt: new Date().toISOString(),
    projectsCount: 0,
    totalScore: 0
  }
  mockTeams.push(team)
  return [201, team]
})

// Update team
mock.onPut(/\/teams\/[\w-]+/).reply((config) => {
  const id = config.url?.split('/').pop()
  const updates = JSON.parse(config.data)
  const teamIndex = mockTeams.findIndex(t => t.id === id)
  
  if (teamIndex !== -1) {
    mockTeams[teamIndex] = { ...mockTeams[teamIndex], ...updates }
    return [200, mockTeams[teamIndex]]
  }
  return [404, { message: 'Team not found' }]
})

// Delete team
mock.onDelete(/\/teams\/[\w-]+/).reply((config) => {
  const id = config.url?.split('/').pop()
  const teamIndex = mockTeams.findIndex(t => t.id === id)
  
  if (teamIndex !== -1) {
    mockTeams.splice(teamIndex, 1)
    return [200, { message: 'Team deleted successfully' }]
  }
  return [404, { message: 'Team not found' }]
})

// ============================================
// PROJECTS ENDPOINTS
// ============================================

// Get all projects
mock.onGet('/projects').reply((config) => {
  const params = config.params || {}
  let filteredProjects = [...mockProjects]
  
  // Filter by team
  if (params.teamId) {
    filteredProjects = filteredProjects.filter(p => p.teamId === params.teamId)
  }
  
  // Filter by status
  if (params.status) {
    filteredProjects = filteredProjects.filter(p => p.status === params.status)
  }
  
  return [200, filteredProjects]
})

// Get project by ID
mock.onGet(/\/projects\/[\w-]+/).reply((config) => {
  const id = config.url?.split('/').pop()
  const project = mockProjects.find(p => p.id === id)
  return project ? [200, project] : [404, { message: 'Project not found' }]
})

// Create project
mock.onPost('/projects').reply((config) => {
  const newProject = JSON.parse(config.data)
  const project = {
    ...newProject,
    id: `proj-${Date.now()}`,
    progress: 0,
    tasksCount: 0,
    completedTasksCount: 0
  }
  mockProjects.push(project)
  return [201, project]
})

// ============================================
// TASKS ENDPOINTS
// ============================================

// Get all tasks
mock.onGet('/tasks').reply((config) => {
  const params = config.params || {}
  let filteredTasks = [...mockTasks]
  
  // Filter by status
  if (params.status) {
    filteredTasks = filteredTasks.filter(t => t.status === params.status)
  }
  
  // Filter by team
  if (params.teamId) {
    filteredTasks = filteredTasks.filter(t => t.teamId === params.teamId)
  }
  
  // Filter by project
  if (params.projectId) {
    filteredTasks = filteredTasks.filter(t => t.projectId === params.projectId)
  }
  
  // Filter by assignee
  if (params.assigneeId) {
    filteredTasks = filteredTasks.filter(t => t.assigneeId === params.assigneeId)
  }
  
  // Filter by creator (PM)
  if (params.createdBy) {
    filteredTasks = filteredTasks.filter(t => t.createdBy === params.createdBy)
  }
  
  // Get available tasks (for developers to pick)
  if (params.available === 'true') {
    filteredTasks = filteredTasks.filter(t => t.status === 'AVAILABLE')
  }
  
  return [200, filteredTasks]
})

// Get task by ID
mock.onGet(/\/tasks\/[\w-]+/).reply((config) => {
  const id = config.url?.split('/').pop()
  if (id === 'upcoming') return [200, []] // Skip the upcoming endpoint
  
  const task = mockTasks.find(t => t.id === id)
  return task ? [200, task] : [404, { message: 'Task not found' }]
})

// Get upcoming tasks
mock.onGet('/tasks/upcoming').reply(200, 
  mockTasks
    .filter(t => t.status !== 'COMPLETED')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5)
)

// Create task (PM creates task)
mock.onPost('/tasks').reply((config) => {
  const newTask = JSON.parse(config.data)
  const task = {
    ...newTask,
    id: `task-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: newTask.assigneeId ? 'TODO' : 'AVAILABLE'
  }
  mockTasks.push(task)
  return [201, task]
})

// Take task (Developer claims available task)
mock.onPost(/\/tasks\/[\w-]+\/take/).reply((config) => {
  const id = config.url?.split('/')[2]
  const { userId } = JSON.parse(config.data)
  const task = mockTasks.find(t => t.id === id)
  
  if (task && task.status === 'AVAILABLE') {
    task.assigneeId = userId
    task.assignedTo = mockUsers.find(u => u.id === userId)
    task.status = 'TODO'
    task.assignedAt = new Date().toISOString()
    return [200, task]
  }
  
  if (task && task.status !== 'AVAILABLE') {
    return [400, { message: 'Task is not available' }]
  }
  
  return [404, { message: 'Task not found' }]
})

// Update task status
mock.onPatch(/\/tasks\/[\w-]+\/status/).reply((config) => {
  const id = config.url?.split('/')[2]
  const { status } = JSON.parse(config.data)
  const task = mockTasks.find(t => t.id === id)
  
  if (task) {
    task.status = status
    if (status === 'COMPLETED') {
      task.completedAt = new Date().toISOString()
    }
    return [200, task]
  }
  return [404, { message: 'Task not found' }]
})

// Submit task for review
mock.onPost(/\/tasks\/[\w-]+\/submit/).reply((config) => {
  const id = config.url?.split('/')[2]
  const task = mockTasks.find(t => t.id === id)
  
  if (task) {
    task.status = 'REVIEW'
    return [200, task]
  }
  return [404, { message: 'Task not found' }]
})

// Approve task (PM approves)
mock.onPost(/\/tasks\/[\w-]+\/approve/).reply((config) => {
  const id = config.url?.split('/')[2]
  const { score, penalty } = JSON.parse(config.data)
  const task = mockTasks.find(t => t.id === id)
  
  if (task) {
    task.status = 'COMPLETED'
    task.finalScore = score
    task.delayPenalty = penalty || 0
    task.completedAt = new Date().toISOString()
    return [200, task]
  }
  return [404, { message: 'Task not found' }]
})

// ============================================
// DASHBOARD ENDPOINTS
// ============================================

mock.onGet('/dashboard/stats').reply((config) => {
  const params = config.params || {}
  
  // Can filter stats by team, user, etc.
  if (params.userId) {
    const userTasks = mockTasks.filter(t => t.assigneeId === params.userId)
    const completed = userTasks.filter(t => t.status === 'COMPLETED')
    const pending = userTasks.filter(t => t.status !== 'COMPLETED')
    const totalScore = completed.reduce((sum, t) => sum + (t.finalScore || 0), 0)
    
    return [200, {
      monthlyScore: totalScore,
      targetScore: 50,
      completedTasks: completed.length,
      pendingTasks: pending.length,
      averageScore: completed.length > 0 ? totalScore / completed.length : 0,
      productivity: (totalScore / 50) * 100
    }]
  }
  
  return [200, mockDashboardStats]
})

// ============================================
// SCORE ENDPOINTS
// ============================================

mock.onGet('/score/report').reply((config) => {
  const params = config.params || {}
  
  if (params.userId) {
    const user = mockUsers.find(u => u.id === params.userId)
    if (!user) return [404, { message: 'User not found' }]
    
    const userTasks = mockTasks.filter(t => 
      t.assigneeId === params.userId && t.status === 'COMPLETED'
    )
    
    return [200, {
      userId: user.id,
      userName: user.name,
      month: 'November 2024',
      totalScore: user.monthlyScore || 0,
      targetScore: user.monthlyTarget || 50,
      tasks: userTasks.map(t => ({
        taskId: t.id,
        taskTitle: t.title,
        baseScore: t.baseScore,
        delayPenalty: t.delayPenalty || 0,
        finalScore: t.finalScore || t.baseScore,
        completedDate: t.completedAt || '',
        dueDate: t.dueDate,
        daysLate: 0
      }))
    }]
  }
  
  return [200, mockScoreReport]
})

export default api
