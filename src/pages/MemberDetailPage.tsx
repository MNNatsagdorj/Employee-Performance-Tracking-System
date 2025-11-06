import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Avatar } from '@/components/common/Avatar'
import { Progress } from '@/components/common/Progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/common/Table'
import { Modal } from '@/components/common/Modal'
import {
  ArrowLeft,
  Mail,
  Shield,
  Clipboard,
  Code,
  Crown,
  Calendar,
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  Edit
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts'
import api from '@/lib/mockApi'
import { User, Task } from '@/types'
import { formatDate, getRoleColor, getStatusColor, getDifficultyColor } from '@/lib/utils'

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'OWNER':
      return <Crown className="h-5 w-5" />
    case 'TEAM_MANAGER':
      return <Shield className="h-5 w-5" />
    case 'PM':
      return <Clipboard className="h-5 w-5" />
    case 'DEVELOPER':
      return <Code className="h-5 w-5" />
    default:
      return <Shield className="h-5 w-5" />
  }
}

const getRoleLabel = (role: string) => {
  switch (role) {
    case 'OWNER':
      return 'Owner (사장)'
    case 'TEAM_MANAGER':
      return 'Team Manager (팀장)'
    case 'PM':
      return 'Project Manager'
    case 'DEVELOPER':
      return 'Developer'
    default:
      return role
  }
}

export function MemberDetailPage() {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Fetch user details
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await api.get<User>(`/users/${userId}`)
      return response.data
    },
    enabled: !!userId
  })

  // Fetch user tasks
  const { data: tasks } = useQuery({
    queryKey: ['user-tasks', userId],
    queryFn: async () => {
      const response = await api.get<Task[]>('/tasks', {
        params: { assigneeId: userId }
      })
      return response.data
    },
    enabled: !!userId
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/members')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="h-8 w-64 bg-muted animate-pulse rounded" />
            <div className="h-4 w-96 bg-muted animate-pulse rounded mt-2" />
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-lg text-muted-foreground">User not found</p>
        <Button onClick={() => navigate('/members')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Button>
      </div>
    )
  }

  // Calculate task statistics
  const taskStats = {
    total: tasks?.length || 0,
    completed: tasks?.filter(t => t.status === 'COMPLETED').length || 0,
    inProgress: tasks?.filter(t => t.status === 'IN_PROGRESS').length || 0,
    review: tasks?.filter(t => t.status === 'REVIEW').length || 0,
    todo: tasks?.filter(t => t.status === 'TODO').length || 0,
  }

  // Mock performance data for chart
  const performanceData = [
    { month: 'Jan', score: 35, target: 50 },
    { month: 'Feb', score: 42, target: 50 },
    { month: 'Mar', score: 38, target: 50 },
    { month: 'Apr', score: 45, target: 50 },
    { month: 'May', score: user.monthlyScore || 50, target: user.monthlyTarget || 50 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/members')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Button>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar
              src={user.avatar}
              fallback={getInitials(user.name)}
              className="h-24 w-24"
            />
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <Badge className={getRoleColor(user.role)}>
                  {getRoleIcon(user.role)}
                  <span className="ml-2">{getRoleLabel(user.role)}</span>
                </Badge>
                <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                  {user.status}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-2">{user.position}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {user.email}
              </div>
            </div>
            <Button onClick={() => setIsEditModalOpen(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Score</p>
                <p className="text-2xl font-bold mt-2">{user.monthlyScore || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  / {user.monthlyTarget || 50} target
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-950">
                <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <Progress 
              value={((user.monthlyScore || 0) / (user.monthlyTarget || 50)) * 100} 
              className="mt-3 h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold mt-2">{taskStats.total}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {taskStats.completed} completed
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-950">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold mt-2">{taskStats.inProgress}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Active tasks
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-950">
                <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold mt-2">
                  {taskStats.total > 0 ? Math.round((taskStats.completed / taskStats.total) * 100) : 0}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-950">
                <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
          <CardDescription>
            Monthly score progression over the last 5 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  name="Actual Score"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#22c55e"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#22c55e', r: 4 }}
                  name="Target Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Tasks ({taskStats.total})</CardTitle>
          <CardDescription>All tasks assigned to this member</CardDescription>
        </CardHeader>
        <CardContent>
          {tasks && tasks.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Story Points</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {task.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{task.projectName}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(task.difficulty)}>
                          {task.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">SP {task.storyPoints}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {formatDate(task.dueDate)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/tasks/${task.id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No tasks assigned yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Member Profile"
        description="Update member information and role"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              defaultValue={user.name}
              className="w-full px-3 py-2 rounded-md border bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              defaultValue={user.email}
              className="w-full px-3 py-2 rounded-md border bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Position</label>
            <input
              type="text"
              defaultValue={user.position}
              className="w-full px-3 py-2 rounded-md border bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                defaultValue={user.role}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                <option value="OWNER">Owner</option>
                <option value="TEAM_MANAGER">Team Manager</option>
                <option value="PM">Project Manager</option>
                <option value="DEVELOPER">Developer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                defaultValue={user.status}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Monthly Target</label>
              <input
                type="number"
                defaultValue={user.monthlyTarget || 50}
                className="w-full px-3 py-2 rounded-md border bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Current Score</label>
              <input
                type="number"
                defaultValue={user.monthlyScore || 0}
                className="w-full px-3 py-2 rounded-md border bg-background"
                readOnly
                disabled
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                // TODO: Implement update logic
                console.log('Update member profile')
                setIsEditModalOpen(false)
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

