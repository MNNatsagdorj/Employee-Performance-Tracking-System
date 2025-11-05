import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  currentUser,
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

// Mock endpoints
mock.onPost('/auth/login').reply((config) => {
  const { email, password } = JSON.parse(config.data)
  
  if (email && password) {
    return [200, { user: currentUser, token: 'mock-jwt-token' }]
  }
  return [401, { message: 'Invalid credentials' }]
})

mock.onGet('/user/me').reply(200, currentUser)

mock.onGet('/dashboard/stats').reply(200, mockDashboardStats)

mock.onGet('/projects').reply(200, mockProjects)

mock.onGet(/\/projects\/\w+/).reply((config) => {
  const id = config.url?.split('/').pop()
  const project = mockProjects.find(p => p.id === id)
  return project ? [200, project] : [404, { message: 'Project not found' }]
})

mock.onGet('/tasks').reply(200, mockTasks)

mock.onGet(/\/tasks\/\w+/).reply((config) => {
  const id = config.url?.split('/').pop()
  const task = mockTasks.find(t => t.id === id)
  return task ? [200, task] : [404, { message: 'Task not found' }]
})

mock.onGet('/tasks/upcoming').reply(200, 
  mockTasks
    .filter(t => t.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5)
)

mock.onGet('/score/report').reply(200, mockScoreReport)

export default api

