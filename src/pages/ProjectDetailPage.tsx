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
  Calendar,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  UserPlus,
  FolderKanban,
  TrendingUp,
  Target
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import api from '@/lib/mockApi'
import { Project, Task } from '@/types'
import { formatDate, getStatusColor, getDifficultyColor } from '@/lib/utils'

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false)

  // Fetch project details
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const response = await api.get<Project>(`/projects/${projectId}`)
      return response.data
    },
    enabled: !!projectId
  })

  // Fetch project tasks
  const { data: tasks } = useQuery({
    queryKey: ['project-tasks', projectId],
    queryFn: async () => {
      const response = await api.get<Task[]>('/tasks', {
        params: { projectId }
      })
      return response.data
    },
    enabled: !!projectId
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/projects')}>
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

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-lg text-muted-foreground">Project not found</p>
        <Button onClick={() => navigate('/projects')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
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
    todo: tasks?.filter(t => t.status === 'TODO' || t.status === 'AVAILABLE').length || 0,
  }

  // Prepare pie chart data
  const chartData = [
    { name: 'Completed', value: taskStats.completed, color: '#22c55e' },
    { name: 'In Progress', value: taskStats.inProgress, color: '#3b82f6' },
    { name: 'Review', value: taskStats.review, color: '#a855f7' },
    { name: 'To Do', value: taskStats.todo, color: '#6b7280' },
  ].filter(item => item.value > 0)

  const getDaysRemaining = () => {
    const end = new Date(project.endDate)
    const now = new Date()
    const diff = end.getTime() - now.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  const daysRemaining = getDaysRemaining()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/projects')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-muted-foreground mt-1">{project.description}</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => setIsAddMemberModalOpen(true)}
              className="flex-1 sm:flex-none"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
            <Button
              onClick={() => setIsEditModalOpen(true)}
              className="flex-1 sm:flex-none"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold mt-2">{project.progress}%</p>
                <Progress value={project.progress} className="mt-2 h-2" />
              </div>
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-950">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
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
                <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                <p className="text-2xl font-bold mt-2">{project.members?.length || 0}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-950">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Days Remaining</p>
                <p className="text-2xl font-bold mt-2">
                  {daysRemaining > 0 ? daysRemaining : 'Overdue'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Until {formatDate(project.endDate)}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                daysRemaining < 0
                  ? 'bg-red-100 dark:bg-red-950'
                  : daysRemaining < 7
                  ? 'bg-orange-100 dark:bg-orange-950'
                  : 'bg-green-100 dark:bg-green-950'
              }`}>
                <Calendar className={`h-6 w-6 ${
                  daysRemaining < 0
                    ? 'text-red-600 dark:text-red-400'
                    : daysRemaining < 7
                    ? 'text-orange-600 dark:text-orange-400'
                    : 'text-green-600 dark:text-green-400'
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Info & Chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Project Information */}
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>Basic project details and timeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </div>

            {project.teamName && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Team</p>
                <Link to={`/teams/${project.teamId}`} className="text-primary hover:underline">
                  {project.teamName}
                </Link>
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Timeline</p>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate(project.startDate)} → {formatDate(project.endDate)}</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Completion Rate</p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">{project.progress}%</span>
                <span className="text-sm text-muted-foreground">
                  {project.completedTasksCount} / {project.tasksCount} tasks
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
            <CardDescription>Current status of all project tasks</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                No tasks yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({project.members?.length || 0})</CardTitle>
          <CardDescription>People working on this project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {project.members?.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <Avatar
                  src={member.avatar}
                  fallback={getInitials(member.name)}
                  className="h-10 w-10"
                />
                <div>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Project Tasks ({taskStats.total})</CardTitle>
          <CardDescription>All tasks related to this project</CardDescription>
        </CardHeader>
        <CardContent>
          {tasks && tasks.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Assigned To</TableHead>
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
                        {task.assignedTo ? (
                          <div className="flex items-center gap-2">
                            <Avatar
                              src={task.assignedTo.avatar}
                              fallback={getInitials(task.assignedTo.name)}
                              className="h-8 w-8"
                            />
                            <span className="text-sm">{task.assignedTo.name}</span>
                          </div>
                        ) : (
                          <Badge variant="outline">Unassigned</Badge>
                        )}
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
              <FolderKanban className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No tasks in this project yet</p>
              <Button className="mt-4" onClick={() => navigate('/project-assignment')}>
                Create First Task
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Project Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Project"
        description="Update project information"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Project Name</label>
            <input
              type="text"
              defaultValue={project.name}
              className="w-full px-3 py-2 rounded-md border bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              defaultValue={project.description}
              rows={3}
              className="w-full px-3 py-2 rounded-md border bg-background resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                defaultValue={project.status}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Progress (%)</label>
              <input
                type="number"
                defaultValue={project.progress}
                min="0"
                max="100"
                className="w-full px-3 py-2 rounded-md border bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <input
                type="date"
                defaultValue={project.startDate}
                className="w-full px-3 py-2 rounded-md border bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <input
                type="date"
                defaultValue={project.endDate}
                className="w-full px-3 py-2 rounded-md border bg-background"
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
                console.log('Update project')
                setIsEditModalOpen(false)
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Member Modal */}
      <Modal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        title="Add Team Member"
        description="Add a member to this project"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select User</label>
            <select className="w-full px-3 py-2 rounded-md border bg-background">
              <option value="">Choose a user...</option>
              <option value="1">John Doe - Developer</option>
              <option value="2">Jane Smith - Designer</option>
              <option value="3">Bob Johnson - QA</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Role in Project</label>
            <input
              type="text"
              placeholder="e.g., Frontend Developer, QA Lead"
              className="w-full px-3 py-2 rounded-md border bg-background"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsAddMemberModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                // TODO: Implement add member logic
                console.log('Add member to project')
                setIsAddMemberModalOpen(false)
              }}
            >
              Add Member
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

