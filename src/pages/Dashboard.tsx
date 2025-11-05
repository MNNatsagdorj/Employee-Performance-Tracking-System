import { useQuery } from '@tanstack/react-query'
import { TrendingUp, Target, CheckCircle2, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Progress } from '@/components/common/Progress'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/common/Table'
import { SkeletonStats, SkeletonTable } from '@/components/common/Skeleton'
import api from '@/lib/mockApi'
import { DashboardStats, Task } from '@/types'
import { formatDate, getDaysUntil, getStatusColor, getPriorityColor } from '@/lib/utils'

export function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await api.get('/dashboard/stats')
      return response.data
    },
  })

  const { data: recentTasks, isLoading: tasksLoading } = useQuery<Task[]>({
    queryKey: ['recent-tasks'],
    queryFn: async () => {
      const response = await api.get('/tasks')
      return response.data.slice(0, 5)
    },
  })

  const { data: upcomingDeadlines, isLoading: deadlinesLoading } = useQuery<Task[]>({
    queryKey: ['upcoming-deadlines'],
    queryFn: async () => {
      const response = await api.get('/tasks/upcoming')
      return response.data
    },
  })

  const scorePercentage = stats ? (stats.monthlyScore / stats.targetScore) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's your performance overview
        </p>
      </div>

      {/* Stats Grid */}
      {statsLoading ? (
        <SkeletonStats />
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.monthlyScore} / {stats?.targetScore}
            </div>
            <Progress value={scorePercentage} className="mt-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {scorePercentage.toFixed(0)}% of target achieved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.completedTasks}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats?.pendingTasks} tasks pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.averageScore}</div>
            <p className="text-xs text-green-600 mt-2">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productivity</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.productivity}%</div>
            <Progress value={stats?.productivity} className="mt-3" />
          </CardContent>
        </Card>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Tasks */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Tasks</CardTitle>
                <CardDescription>Your latest assigned tasks</CardDescription>
              </div>
              <Link to="/tasks">
                <Button variant="ghost" size="sm">
                  View all
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {tasksLoading ? (
              <SkeletonTable />
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead className="hidden sm:table-cell">Status</TableHead>
                      <TableHead className="hidden md:table-cell">Priority</TableHead>
                      <TableHead>Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTasks?.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <Link to={`/tasks/${task.id}`} className="hover:underline">
                            <div className="font-medium line-clamp-1">{task.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {task.projectName}
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{task.storyPoints}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Tasks due soon</CardDescription>
          </CardHeader>
          <CardContent>
            {deadlinesLoading ? (
              <SkeletonTable />
            ) : (
              <div className="space-y-4">
                {upcomingDeadlines?.map((task) => {
                const daysUntil = getDaysUntil(task.dueDate)
                const isOverdue = daysUntil < 0
                const isUrgent = daysUntil <= 3 && daysUntil >= 0

                return (
                    <Link
                      key={task.id}
                      to={`/tasks/${task.id}`}
                      className="flex items-start gap-4 rounded-lg border border-border p-4 hover:bg-accent transition-colors"
                    >
                      <div className="flex-1 space-y-1 min-w-0">
                        <p className="font-medium leading-none line-clamp-1">{task.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {task.projectName}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div
                          className={`text-sm font-medium ${
                            isOverdue
                              ? 'text-red-600'
                              : isUrgent
                              ? 'text-orange-600'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {isOverdue
                            ? `${Math.abs(daysUntil)}d overdue`
                            : daysUntil === 0
                            ? 'Today'
                            : `${daysUntil}d left`}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatDate(task.dueDate)}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

