import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Avatar } from '@/components/common/Avatar'
import { Input } from '@/components/common/Input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/common/Table'
import { Modal } from '@/components/common/Modal'
import { Plus, CheckCircle, Clock, AlertCircle, Calendar, Target, User } from 'lucide-react'
import { useToast } from '@/stores/toastStore'
import api from '@/lib/mockApi'
import { Project, Task, User as UserType } from '@/types'
import { formatDate, getDifficultyColor } from '@/lib/utils'

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

const storyPointOptions = [1, 2, 3, 5, 8, 13]
const difficultyOptions = ['Easy', 'Medium', 'Hard'] as const

export function ProjectAssignmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string>('')
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [storyPoints, setStoryPoints] = useState(3)
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium')
  const [dueDate, setDueDate] = useState('')
  const [assigneeId, setAssigneeId] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const queryClient = useQueryClient()
  const { addToast } = useToast()

  // Fetch projects
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get<Project[]>('/projects')
      return response.data
    }
  })

  // Fetch developers
  const { data: developers } = useQuery({
    queryKey: ['developers'],
    queryFn: async () => {
      const response = await api.get<UserType[]>('/employees')
      return response.data
    }
  })

  // Fetch tasks created by PM
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['pm-tasks'],
    queryFn: async () => {
      const response = await api.get<Task[]>('/tasks', {
        params: { createdBy: 'user-5' } // Current PM
      })
      return response.data
    }
  })

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: async (taskData: any) => {
      const response = await api.post('/tasks', taskData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pm-tasks'] })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      addToast({
        type: 'success',
        title: 'Task Created',
        message: assigneeId 
          ? 'Task has been assigned to developer' 
          : 'Task is available for developers to claim'
      })
      setIsModalOpen(false)
      resetForm()
    },
    onError: () => {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to create task'
      })
    }
  })

  const resetForm = () => {
    setSelectedProject('')
    setTaskTitle('')
    setTaskDescription('')
    setStoryPoints(3)
    setDifficulty('Medium')
    setDueDate('')
    setAssigneeId('')
    setErrors({})
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!selectedProject) newErrors.project = 'Project is required'
    if (!taskTitle.trim()) newErrors.title = 'Task title is required'
    if (!taskDescription.trim()) newErrors.description = 'Description is required'
    if (!dueDate) newErrors.dueDate = 'Due date is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    const project = projects?.find(p => p.id === selectedProject)
    const assignedUser = developers?.find(d => d.id === assigneeId)

    const taskData = {
      title: taskTitle,
      description: taskDescription,
      projectId: selectedProject,
      projectName: project?.name || '',
      teamId: project?.teamId,
      createdBy: 'user-5', // Current PM
      assigneeId: assigneeId || undefined,
      assignedTo: assignedUser || undefined,
      storyPoints,
      difficulty,
      dueDate,
      baseScore: storyPoints * 2,
      priority: 'medium' as const,
      status: assigneeId ? 'TODO' : 'AVAILABLE'
    }

    createTaskMutation.mutate(taskData)
  }

  // Group tasks by status
  const tasksByStatus = {
    AVAILABLE: tasks?.filter(t => t.status === 'AVAILABLE') || [],
    TODO: tasks?.filter(t => t.status === 'TODO') || [],
    IN_PROGRESS: tasks?.filter(t => t.status === 'IN_PROGRESS') || [],
    REVIEW: tasks?.filter(t => t.status === 'REVIEW') || [],
    COMPLETED: tasks?.filter(t => t.status === 'COMPLETED') || []
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Project Assignment</h1>
          <p className="text-muted-foreground mt-1">
            Create tasks, assign to developers, and manage project breakdown
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available</p>
                <p className="text-2xl font-bold mt-2">{tasksByStatus.AVAILABLE.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                <Target className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">To Do</p>
                <p className="text-2xl font-bold mt-2">{tasksByStatus.TODO.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-950">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold mt-2">{tasksByStatus.IN_PROGRESS.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-950">
                <AlertCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Review</p>
                <p className="text-2xl font-bold mt-2">{tasksByStatus.REVIEW.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-950">
                <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold mt-2">{tasksByStatus.COMPLETED.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-950">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tasks ({tasks?.length || 0})</CardTitle>
          <CardDescription>
            Tasks you've created and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Story Points</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasksLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : tasks && tasks.length > 0 ? (
                  tasks.map((task) => (
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
                          <Badge variant="outline">
                            <User className="h-3 w-3 mr-1" />
                            Available
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">SP {task.storyPoints}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(task.difficulty)}>
                          {task.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(task.dueDate)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            task.status === 'COMPLETED' ? 'default' :
                            task.status === 'IN_PROGRESS' ? 'secondary' :
                            'outline'
                          }
                        >
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No tasks created yet. Click "Create Task" to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          resetForm()
        }}
        title="Create New Task"
        description="Break down your project into manageable tasks"
      >
        <div className="space-y-4">
          {/* Project Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Project <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-3 py-2 rounded-md border bg-background"
            >
              <option value="">Select a project</option>
              {projects?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            {errors.project && (
              <p className="text-sm text-red-500 mt-1">{errors.project}</p>
            )}
          </div>

          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Task Title <span className="text-red-500">*</span>
            </label>
            <Input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g., Implement user authentication"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Provide detailed requirements..."
              rows={4}
              className="w-full px-3 py-2 rounded-md border bg-background resize-none"
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Story Points */}
          <div>
            <label className="block text-sm font-medium mb-2">Story Points</label>
            <div className="flex gap-2">
              {storyPointOptions.map((points) => (
                <Button
                  key={points}
                  variant={storyPoints === points ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStoryPoints(points)}
                >
                  {points}
                </Button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium mb-2">Difficulty</label>
            <div className="flex gap-2">
              {difficultyOptions.map((diff) => (
                <Button
                  key={diff}
                  variant={difficulty === diff ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDifficulty(diff)}
                  className={difficulty === diff ? getDifficultyColor(diff) : ''}
                >
                  {diff}
                </Button>
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Due Date <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            {errors.dueDate && (
              <p className="text-sm text-red-500 mt-1">{errors.dueDate}</p>
            )}
          </div>

          {/* Assign To (Optional) */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Assign To (Optional)
            </label>
            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              className="w-full px-3 py-2 rounded-md border bg-background"
            >
              <option value="">Leave available for developers to claim</option>
              {developers?.map((dev) => (
                <option key={dev.id} value={dev.id}>
                  {dev.name} - {dev.position}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              If not assigned, task will be available for developers to take ownership
            </p>
          </div>

          {/* Summary */}
          <div className="p-4 rounded-lg bg-muted/50 border">
            <h4 className="font-medium mb-2">Task Summary</h4>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground">Base Score:</span>{' '}
                <span className="font-medium">{storyPoints * 2} points</span>
              </p>
              <p>
                <span className="text-muted-foreground">Assignment:</span>{' '}
                <span className="font-medium">
                  {assigneeId ? 'Assigned' : 'Available for claim'}
                </span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setIsModalOpen(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleSubmit}
              disabled={createTaskMutation.isPending}
            >
              {createTaskMutation.isPending ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

