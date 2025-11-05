import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Calendar, User, List } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Avatar } from '@/components/common/Avatar'
import { cn } from '@/lib/utils'

interface Task {
  id: number
  title: string
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED'
  storyPoint: number
  assignee: string
  due: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

const mockTasks: Task[] = [
  { id: 1, title: 'API Setup', status: 'TODO', storyPoint: 5, assignee: 'John', due: '2025-02-10', difficulty: 'Medium' },
  { id: 2, title: 'UI Login', status: 'IN_PROGRESS', storyPoint: 3, assignee: 'Alice', due: '2025-02-12', difficulty: 'Easy' },
  { id: 3, title: 'Database Schema', status: 'TODO', storyPoint: 8, assignee: 'Bob', due: '2025-02-08', difficulty: 'Hard' },
  { id: 4, title: 'Authentication Flow', status: 'IN_PROGRESS', storyPoint: 5, assignee: 'Carol', due: '2025-02-15', difficulty: 'Medium' },
  { id: 5, title: 'Code Review', status: 'REVIEW', storyPoint: 2, assignee: 'David', due: '2025-02-11', difficulty: 'Easy' },
  { id: 6, title: 'Deploy to Production', status: 'REVIEW', storyPoint: 3, assignee: 'Emma', due: '2025-02-09', difficulty: 'Medium' },
  { id: 7, title: 'User Dashboard', status: 'COMPLETED', storyPoint: 8, assignee: 'Frank', due: '2025-02-01', difficulty: 'Hard' },
  { id: 8, title: 'Fix Bug #123', status: 'COMPLETED', storyPoint: 1, assignee: 'Grace', due: '2025-02-05', difficulty: 'Easy' },
  { id: 9, title: 'API Documentation', status: 'TODO', storyPoint: 3, assignee: 'Henry', due: '2025-02-14', difficulty: 'Easy' },
  { id: 10, title: 'Performance Optimization', status: 'IN_PROGRESS', storyPoint: 5, assignee: 'Iris', due: '2025-02-13', difficulty: 'Hard' },
]

const columns = [
  { id: 'TODO', title: 'To Do', status: 'TODO' as const },
  { id: 'IN_PROGRESS', title: 'In Progress', status: 'IN_PROGRESS' as const },
  { id: 'REVIEW', title: 'Review', status: 'REVIEW' as const },
  { id: 'COMPLETED', title: 'Completed', status: 'COMPLETED' as const },
]

const getDifficultyColor = (difficulty: string) => {
  const colors = {
    Easy: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800',
    Medium: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    Hard: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800',
  }
  return colors[difficulty as keyof typeof colors] || colors.Medium
}

const isOverdue = (dueDate: string): boolean => {
  const today = new Date()
  const due = new Date(dueDate)
  return due < today
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

interface TaskCardProps {
  task: Task
}

function TaskCard({ task }: TaskCardProps) {
  const overdue = isOverdue(task.due)

  return (
    <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 border-l-primary/20 hover:border-l-primary">
      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {task.title}
        </h3>

        {/* Story Point & Difficulty */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs font-semibold">
            SP {task.storyPoint}
          </Badge>
          <Badge className={cn('text-xs font-medium border', getDifficultyColor(task.difficulty))}>
            {task.difficulty}
          </Badge>
        </div>

        {/* Footer: Avatar and Due Date */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <Avatar
              fallback={getInitials(task.assignee)}
              className="h-6 w-6 text-xs"
            />
            <span className="text-xs text-muted-foreground">{task.assignee}</span>
          </div>

          <div className={cn(
            'flex items-center gap-1 text-xs',
            overdue ? 'text-red-600 dark:text-red-400 font-medium' : 'text-muted-foreground'
          )}>
            <Calendar className="h-3 w-3" />
            {formatDate(task.due)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface KanbanColumnProps {
  column: typeof columns[0]
  tasks: Task[]
}

function KanbanColumn({ column, tasks }: KanbanColumnProps) {
  const columnTasks = tasks.filter(task => task.status === column.status)

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
            {column.title}
          </h2>
          <Badge variant="secondary" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
            {columnTasks.length}
          </Badge>
        </div>
      </div>

      {/* Column Content */}
      <div className="flex-1 space-y-3 min-h-[200px] rounded-lg bg-muted/30 p-3">
        {columnTasks.length > 0 ? (
          columnTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
            No tasks
          </div>
        )}
      </div>
    </div>
  )
}

export function TasksBoardPage() {
  const navigate = useNavigate()
  const [tasks] = useState<Task[]>(mockTasks)

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'TODO').length,
    inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    review: tasks.filter(t => t.status === 'REVIEW').length,
    completed: tasks.filter(t => t.status === 'COMPLETED').length,
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tasks Board</h1>
          <p className="text-muted-foreground mt-1">
            Manage tasks across different stages
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/tasks')} variant="outline" size="lg">
            <List className="h-4 w-4" />
            List View
          </Button>
          <Button onClick={() => navigate('/tasks/create')} size="lg">
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total Tasks</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-gray-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.todo}</div>
            <div className="text-xs text-muted-foreground">To Do</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.review}</div>
            <div className="text-xs text-muted-foreground">Review</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.completed}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[800px]">
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasks}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

