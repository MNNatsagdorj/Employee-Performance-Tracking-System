import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Loader2, Save, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Skeleton } from '@/components/common/Skeleton'
import { useToast } from '@/stores/toastStore'
import api from '@/lib/mockApi'
import { Project, User } from '@/types'

interface FormErrors {
  project?: string
  title?: string
  description?: string
  storyPoint?: string
  difficulty?: string
  dueDate?: string
  assignTo?: string
}

const STORY_POINTS = [1, 2, 3, 5, 8, 13]
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const

export function CreateTaskPage() {
  const navigate = useNavigate()
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const [formData, setFormData] = useState({
    projectId: '',
    title: '',
    description: '',
    storyPoint: '',
    difficulty: '' as typeof DIFFICULTIES[number] | '',
    dueDate: '',
    assignToId: '',
  })

  // Fetch projects
  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get('/projects')
      return response.data
    },
  })

  // Fetch employees (using mock users)
  const { data: employees, isLoading: employeesLoading } = useQuery<User[]>({
    queryKey: ['employees'],
    queryFn: async () => {
      const response = await api.get('/user/me')
      // Mock: return array of users (in real app would be /api/employees)
      const currentUser = response.data
      return [
        currentUser,
        { id: 'user-2', name: 'Michael Chen', email: 'michael.chen@company.com', role: 'employee' as const },
        { id: 'user-3', name: 'Emily Davis', email: 'emily.davis@company.com', role: 'manager' as const },
        { id: 'user-4', name: 'James Wilson', email: 'james.wilson@company.com', role: 'employee' as const },
      ]
    },
  })

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.projectId) {
      newErrors.project = 'Project is required'
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required'
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    }

    if (!formData.storyPoint) {
      newErrors.storyPoint = 'Story point is required'
    }

    if (!formData.difficulty) {
      newErrors.difficulty = 'Difficulty is required'
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required'
    } else {
      const dueDate = new Date(formData.dueDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (dueDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past'
      }
    }

    if (!formData.assignToId) {
      newErrors.assignTo = 'Assignee is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Validation Error', 'Please fix the errors in the form')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    console.log('Creating task with data:', {
      projectId: formData.projectId,
      title: formData.title,
      description: formData.description,
      storyPoint: parseInt(formData.storyPoint),
      difficulty: formData.difficulty,
      dueDate: formData.dueDate,
      assignToId: formData.assignToId,
      status: 'todo',
      priority: formData.difficulty === 'Hard' ? 'high' : formData.difficulty === 'Medium' ? 'medium' : 'low',
    })

    setTimeout(() => {
      setIsSubmitting(false)
      toast.success('Task Created!', `${formData.title} has been created successfully`)
      navigate('/tasks')
    }, 1500)
  }

  const handleCancel = () => {
    navigate('/tasks')
  }

  const selectedProject = projects?.find(p => p.id === formData.projectId)
  const selectedEmployee = employees?.find(e => e.id === formData.assignToId)

  const isLoading = projectsLoading || employeesLoading

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/tasks')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tasks
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Create New Task</h1>
        <p className="text-muted-foreground mt-1">
          Fill in the details to create a new task
        </p>
      </div>

      {/* Form Card */}
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
          <CardDescription>
            Enter the task information and assignment details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Selection */}
            <div className="space-y-2">
              <label htmlFor="project" className="text-sm font-medium">
                Project *
              </label>
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <>
                  <select
                    id="project"
                    value={formData.projectId}
                    onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                    disabled={isSubmitting}
                    className={`flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${
                      errors.project ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="">Select a project...</option>
                    {projects?.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                  {errors.project && (
                    <p className="text-xs text-red-600">{errors.project}</p>
                  )}
                  {selectedProject && (
                    <p className="text-xs text-muted-foreground">
                      {selectedProject.description}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Task Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Task Title *
              </label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Implement user authentication flow"
                disabled={isSubmitting}
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-xs text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the task in detail..."
                disabled={isSubmitting}
                rows={5}
                className={`flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
                  errors.description ? 'border-red-500' : ''
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-600">{errors.description}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {formData.description.length} characters
              </p>
            </div>

            {/* Story Point and Difficulty */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Story Point */}
              <div className="space-y-2">
                <label htmlFor="storyPoint" className="text-sm font-medium">
                  Story Point *
                </label>
                <select
                  id="storyPoint"
                  value={formData.storyPoint}
                  onChange={(e) => setFormData({ ...formData, storyPoint: e.target.value })}
                  disabled={isSubmitting}
                  className={`flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${
                    errors.storyPoint ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select story point...</option>
                  {STORY_POINTS.map((point) => (
                    <option key={point} value={point}>
                      {point} {point === 1 ? 'point' : 'points'}
                    </option>
                  ))}
                </select>
                {errors.storyPoint && (
                  <p className="text-xs text-red-600">{errors.storyPoint}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Fibonacci scale for estimation
                </p>
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Difficulty *
                </label>
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setFormData({ ...formData, difficulty: diff })}
                      disabled={isSubmitting}
                      className="relative"
                    >
                      <Badge
                        className={`cursor-pointer transition-all ${
                          formData.difficulty === diff
                            ? 'ring-2 ring-primary ring-offset-2'
                            : 'opacity-60 hover:opacity-100'
                        } ${
                          diff === 'Easy'
                            ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                            : diff === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                        }`}
                      >
                        {diff}
                      </Badge>
                    </button>
                  ))}
                </div>
                {errors.difficulty && (
                  <p className="text-xs text-red-600">{errors.difficulty}</p>
                )}
              </div>
            </div>

            {/* Due Date and Assign To */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Due Date */}
              <div className="space-y-2">
                <label htmlFor="dueDate" className="text-sm font-medium">
                  Due Date *
                </label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  disabled={isSubmitting}
                  className={errors.dueDate ? 'border-red-500' : ''}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.dueDate && (
                  <p className="text-xs text-red-600">{errors.dueDate}</p>
                )}
              </div>

              {/* Assign To */}
              <div className="space-y-2">
                <label htmlFor="assignTo" className="text-sm font-medium">
                  Assign To *
                </label>
                {isLoading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <>
                    <select
                      id="assignTo"
                      value={formData.assignToId}
                      onChange={(e) => setFormData({ ...formData, assignToId: e.target.value })}
                      disabled={isSubmitting}
                      className={`flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${
                        errors.assignTo ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Select an employee...</option>
                      {employees?.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name} - {employee.role}
                        </option>
                      ))}
                    </select>
                    {errors.assignTo && (
                      <p className="text-xs text-red-600">{errors.assignTo}</p>
                    )}
                    {selectedEmployee && (
                      <p className="text-xs text-muted-foreground">
                        {selectedEmployee.email}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Summary Card */}
            {formData.title && formData.projectId && (
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <h3 className="text-sm font-medium mb-2">Task Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Project:</span>
                    <span className="font-medium">{selectedProject?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Title:</span>
                    <span className="font-medium line-clamp-1">{formData.title}</span>
                  </div>
                  {formData.storyPoint && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Story Points:</span>
                      <Badge variant="outline">{formData.storyPoint}</Badge>
                    </div>
                  )}
                  {formData.difficulty && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <Badge>{formData.difficulty}</Badge>
                    </div>
                  )}
                  {formData.assignToId && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Assigned to:</span>
                      <span className="font-medium">{selectedEmployee?.name}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none sm:w-32"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="flex-1 sm:flex-none sm:min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Task
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

