import { useQuery } from '@tanstack/react-query'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Calendar, User, ArrowLeft, Clock, Tag, Plus, LayoutGrid } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Avatar } from '@/components/common/Avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/common/Table'
import api from '@/lib/mockApi'
import { Task } from '@/types'
import { formatDate, getStatusColor, getPriorityColor } from '@/lib/utils'

export function Tasks() {
  const navigate = useNavigate()

  const { data: tasks } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get('/tasks')
      return response.data
    },
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all your assigned tasks
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/tasks/board')} variant="outline" size="lg">
            <LayoutGrid className="h-4 w-4" />
            Board View
          </Button>
          <Button onClick={() => navigate('/tasks/create')} size="lg">
            <Plus className="h-4 w-4" />
            Create Task
          </Button>
        </div>
      </div>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
          <CardDescription>
            A list of all your tasks across different projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Story Points</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Assignee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks?.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Link
                      to={`/tasks/${task.id}`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {task.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {task.projectName}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{task.storyPoints}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(task.dueDate)}
                  </TableCell>
                  <TableCell>
                    {task.assignedTo && (
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={task.assignedTo.avatar}
                          alt={task.assignedTo.name}
                          fallback={task.assignedTo.name[0]}
                          className="h-6 w-6"
                        />
                        <span className="text-sm">{task.assignedTo.name}</span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export function TaskDetail() {
  const { id } = useParams<{ id: string }>()

  const { data: task } = useQuery<Task>({
    queryKey: ['task', id],
    queryFn: async () => {
      const response = await api.get(`/tasks/${id}`)
      return response.data
    },
  })

  if (!task) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/tasks">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tasks
        </Button>
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{task.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{task.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Due Date:</span>
                  </div>
                  <p className="font-medium">{formatDate(task.dueDate)}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Story Points:</span>
                  </div>
                  <p className="font-medium">{task.storyPoints} points</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Assigned To:</span>
                  </div>
                  {task.assignedTo && (
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={task.assignedTo.avatar}
                        alt={task.assignedTo.name}
                        fallback={task.assignedTo.name[0]}
                        className="h-8 w-8"
                      />
                      <div>
                        <p className="font-medium text-sm">{task.assignedTo.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {task.assignedTo.email}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Base Score:</span>
                  </div>
                  <p className="font-medium">{task.baseScore} points</p>
                </div>
              </div>

              {task.tags && task.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button>Assign Task</Button>
                <Button variant="outline">Mark Complete</Button>
                <Button variant="outline">Edit</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
              <CardDescription>Task activity history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {task.completedAt && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400">
                        <div className="h-2 w-2 rounded-full bg-current" />
                      </div>
                      <div className="w-px flex-1 bg-border mt-2" />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium text-sm">Completed</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(task.completedAt)}
                      </p>
                    </div>
                  </div>
                )}

                {task.assignedAt && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                        <div className="h-2 w-2 rounded-full bg-current" />
                      </div>
                      <div className="w-px flex-1 bg-border mt-2" />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium text-sm">Assigned</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(task.assignedAt)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      <div className="h-2 w-2 rounded-full bg-current" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Created</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(task.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

