import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Avatar } from '@/components/common/Avatar'
import { Modal } from '@/components/common/Modal'
import { CheckCircle, Clock, AlertCircle, Calendar, Target, Code, ArrowRight } from 'lucide-react'
import { useToast } from '@/stores/toastStore'
import { useAuthStore } from '@/stores/authStore'
import api from '@/lib/mockApi'
import { Task } from '@/types'
import { formatDate, getDifficultyColor, getDaysUntil } from '@/lib/utils'

export function DeveloperTasksPage() {
  const [activeTab, setActiveTab] = useState<'available' | 'my-tasks'>('available')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const queryClient = useQueryClient()
  const { addToast } = useToast()
  const { user } = useAuthStore()

  // Fetch available tasks
  const { data: availableTasks, isLoading: availableLoading } = useQuery({
    queryKey: ['available-tasks'],
    queryFn: async () => {
      const response = await api.get<Task[]>('/tasks', {
        params: { status: 'AVAILABLE' }
      })
      return response.data
    }
  })

  // Fetch my tasks
  const { data: myTasks, isLoading: myTasksLoading } = useQuery({
    queryKey: ['my-tasks', user?.id],
    queryFn: async () => {
      const response = await api.get<Task[]>('/tasks', {
        params: { assigneeId: user?.id }
      })
      return response.data
    },
    enabled: !!user
  })

  // Take task mutation
  const takeTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const response = await api.post(`/tasks/${taskId}/take`, {
        userId: user?.id
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['available-tasks'] })
      queryClient.invalidateQueries({ queryKey: ['my-tasks'] })
      addToast({
        type: 'success',
        title: 'Task Claimed',
        message: 'You have successfully taken ownership of this task'
      })
      setIsModalOpen(false)
      setSelectedTask(null)
    },
    onError: () => {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to claim task. It may have been taken by someone else.'
      })
    }
  })

  // Update task status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: string }) => {
      const response = await api.patch(`/tasks/${taskId}/status`, { status })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-tasks'] })
      addToast({
        type: 'success',
        title: 'Status Updated',
        message: 'Task status has been updated successfully'
      })
    }
  })

  // Submit task for review mutation
  const submitForReviewMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const response = await api.post(`/tasks/${taskId}/submit`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-tasks'] })
      addToast({
        type: 'success',
        title: 'Submitted for Review',
        message: 'Your task has been submitted to PM for review'
      })
    }
  })

  const handleTakeTask = () => {
    if (selectedTask) {
      takeTaskMutation.mutate(selectedTask.id)
    }
  }

  const handleStartTask = (taskId: string) => {
    updateStatusMutation.mutate({ taskId, status: 'IN_PROGRESS' })
  }

  const handleSubmitForReview = (taskId: string) => {
    submitForReviewMutation.mutate(taskId)
  }

  // Group my tasks by status
  const myTasksByStatus = {
    TODO: myTasks?.filter(t => t.status === 'TODO') || [],
    IN_PROGRESS: myTasks?.filter(t => t.status === 'IN_PROGRESS') || [],
    REVIEW: myTasks?.filter(t => t.status === 'REVIEW') || [],
    COMPLETED: myTasks?.filter(t => t.status === 'COMPLETED') || []
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Developer Tasks</h1>
        <p className="text-muted-foreground mt-1">
          Browse available tasks or manage your assigned work
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('available')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'available'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Available Tasks
          {availableTasks && availableTasks.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {availableTasks.length}
            </Badge>
          )}
        </button>
        <button
          onClick={() => setActiveTab('my-tasks')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'my-tasks'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          My Tasks
          {myTasks && myTasks.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {myTasks.length}
            </Badge>
          )}
        </button>
      </div>

      {/* Available Tasks Tab */}
      {activeTab === 'available' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Available Tasks</p>
                    <p className="text-2xl font-bold mt-2">{availableTasks?.length || 0}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-950">
                    <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Story Points</p>
                    <p className="text-2xl font-bold mt-2">
                      {availableTasks?.reduce((sum, t) => sum + t.storyPoints, 0) || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-950">
                    <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Potential Score</p>
                    <p className="text-2xl font-bold mt-2">
                      {availableTasks?.reduce((sum, t) => sum + t.baseScore, 0) || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-950">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Available Tasks Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableLoading ? (
              [...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="h-32 bg-muted animate-pulse rounded" />
                  </CardContent>
                </Card>
              ))
            ) : availableTasks && availableTasks.length > 0 ? (
              availableTasks.map((task) => {
                const daysUntil = getDaysUntil(task.dueDate)
                const isOverdue = daysUntil < 0
                const isUrgent = daysUntil <= 3 && daysUntil >= 0

                return (
                  <Card
                    key={task.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedTask(task)
                      setIsModalOpen(true)
                    }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg line-clamp-2">{task.title}</CardTitle>
                        <Badge variant="secondary">SP {task.storyPoints}</Badge>
                      </div>
                      <CardDescription className="line-clamp-2 mt-2">
                        {task.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Project */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Project</p>
                        <p className="text-sm font-medium">{task.projectName}</p>
                      </div>

                      {/* Difficulty & Score */}
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Difficulty</p>
                          <Badge className={getDifficultyColor(task.difficulty)}>
                            {task.difficulty}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Base Score</p>
                          <p className="text-sm font-bold">{task.baseScore} pts</p>
                        </div>
                      </div>

                      {/* Due Date */}
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span
                          className={
                            isOverdue
                              ? 'text-red-600 font-medium'
                              : isUrgent
                              ? 'text-orange-600 font-medium'
                              : 'text-muted-foreground'
                          }
                        >
                          Due {formatDate(task.dueDate)}
                        </span>
                      </div>

                      <Button className="w-full" size="sm">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <Card className="col-span-full">
                <CardContent className="p-12 text-center">
                  <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Available Tasks</h3>
                  <p className="text-muted-foreground">
                    All tasks are currently assigned. Check back later for new opportunities!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* My Tasks Tab */}
      {activeTab === 'my-tasks' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">To Do</p>
                    <p className="text-2xl font-bold mt-2">{myTasksByStatus.TODO.length}</p>
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
                    <p className="text-2xl font-bold mt-2">{myTasksByStatus.IN_PROGRESS.length}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-950">
                    <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">In Review</p>
                    <p className="text-2xl font-bold mt-2">{myTasksByStatus.REVIEW.length}</p>
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
                    <p className="text-2xl font-bold mt-2">{myTasksByStatus.COMPLETED.length}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-950">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Tasks List */}
          {myTasksLoading ? (
            <Card>
              <CardContent className="p-12 text-center">
                Loading your tasks...
              </CardContent>
            </Card>
          ) : myTasks && myTasks.length > 0 ? (
            <div className="space-y-4">
              {Object.entries(myTasksByStatus).map(([status, tasks]) => {
                if (tasks.length === 0) return null

                return (
                  <Card key={status}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {status === 'TODO' && <Clock className="h-5 w-5 text-blue-600" />}
                        {status === 'IN_PROGRESS' && <Code className="h-5 w-5 text-purple-600" />}
                        {status === 'REVIEW' && <AlertCircle className="h-5 w-5 text-orange-600" />}
                        {status === 'COMPLETED' && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {status.replace('_', ' ')} ({tasks.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {tasks.map((task) => {
                          const daysUntil = getDaysUntil(task.dueDate)
                          const isOverdue = daysUntil < 0

                          return (
                            <div
                              key={task.id}
                              className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h4 className="font-semibold">{task.title}</h4>
                                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {task.description}
                                  </p>
                                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                                    <Badge variant="secondary">SP {task.storyPoints}</Badge>
                                    <Badge className={getDifficultyColor(task.difficulty)}>
                                      {task.difficulty}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                      {task.projectName}
                                    </span>
                                    <span
                                      className={`text-sm ${
                                        isOverdue ? 'text-red-600 font-medium' : 'text-muted-foreground'
                                      }`}
                                    >
                                      Due {formatDate(task.dueDate)}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  {status === 'TODO' && (
                                    <Button
                                      size="sm"
                                      onClick={() => handleStartTask(task.id)}
                                      disabled={updateStatusMutation.isPending}
                                    >
                                      Start
                                    </Button>
                                  )}
                                  {status === 'IN_PROGRESS' && (
                                    <Button
                                      size="sm"
                                      onClick={() => handleSubmitForReview(task.id)}
                                      disabled={submitForReviewMutation.isPending}
                                    >
                                      Submit for Review
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Tasks Assigned</h3>
                <p className="text-muted-foreground mb-4">
                  Check out the "Available Tasks" tab to find work you can take on!
                </p>
                <Button onClick={() => setActiveTab('available')}>
                  Browse Available Tasks
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedTask(null)
          }}
          title="Task Details"
          description="Review task requirements before claiming"
        >
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{selectedTask.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedTask.projectName}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <p className="text-sm text-muted-foreground">{selectedTask.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Story Points</label>
                <Badge variant="secondary" className="text-base">
                  SP {selectedTask.storyPoints}
                </Badge>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Base Score</label>
                <p className="text-lg font-bold">{selectedTask.baseScore} points</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Difficulty</label>
                <Badge className={getDifficultyColor(selectedTask.difficulty)}>
                  {selectedTask.difficulty}
                </Badge>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <p className="text-sm">{formatDate(selectedTask.dueDate)}</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 border">
              <p className="text-sm">
                By claiming this task, it will be added to your task list and you'll be responsible
                for completing it before the due date.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setIsModalOpen(false)
                  setSelectedTask(null)
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleTakeTask}
                disabled={takeTaskMutation.isPending}
              >
                {takeTaskMutation.isPending ? 'Taking...' : 'Take This Task'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

