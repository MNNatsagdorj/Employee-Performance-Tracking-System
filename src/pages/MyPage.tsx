import { useState } from 'react'
import { User, Mail, Briefcase, Shield, Edit, Calendar, Award, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Avatar } from '@/components/common/Avatar'
import { Progress } from '@/components/common/Progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/common/Table'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useAuthStore } from '@/stores/authStore'
import { cn, formatDate, getStatusColor, getPriorityColor } from '@/lib/utils'

// Mock performance data for charts
const performanceData = [
  { month: 'Jan', points: 42 },
  { month: 'Feb', points: 38 },
  { month: 'Mar', points: 45 },
  { month: 'Apr', points: 41 },
  { month: 'May', points: 48 },
  { month: 'Jun', points: 44 },
  { month: 'Jul', points: 50 },
  { month: 'Aug', points: 47 },
  { month: 'Sep', points: 43 },
  { month: 'Oct', points: 46 },
  { month: 'Nov', points: 37 },
]

// Mock current tasks
const currentTasks = [
  {
    id: '1',
    title: 'Implement user authentication flow',
    project: 'Customer Portal',
    dueDate: '2025-02-10',
    score: 12,
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Design responsive dashboard layout',
    project: 'Customer Portal',
    dueDate: '2025-02-08',
    score: 10,
    status: 'completed',
    priority: 'high',
  },
  {
    id: '3',
    title: 'API rate limiting implementation',
    project: 'API Migration',
    dueDate: '2025-02-15',
    score: 6,
    status: 'todo',
    priority: 'urgent',
  },
  {
    id: '4',
    title: 'Create data visualization components',
    project: 'Analytics Dashboard',
    dueDate: '2025-02-20',
    score: 12,
    status: 'in-progress',
    priority: 'medium',
  },
]

// All tasks for the Tasks tab
const allMyTasks = [
  ...currentTasks,
  {
    id: '5',
    title: 'Write API documentation',
    project: 'API Migration',
    dueDate: '2025-01-28',
    score: 8,
    status: 'completed',
    priority: 'medium',
  },
  {
    id: '6',
    title: 'Setup CI/CD pipeline',
    project: 'DevOps',
    dueDate: '2025-01-25',
    score: 8,
    status: 'completed',
    priority: 'high',
  },
  {
    id: '7',
    title: 'Code review and refactoring',
    project: 'Customer Portal',
    dueDate: '2025-01-22',
    score: 3,
    status: 'completed',
    priority: 'low',
  },
  {
    id: '8',
    title: 'Performance optimization',
    project: 'Analytics Dashboard',
    dueDate: '2025-02-18',
    score: 10,
    status: 'review',
    priority: 'high',
  },
]

type TabType = 'overview' | 'performance' | 'tasks'

export function MyPage() {
  const user = useAuthStore((state) => state.user)
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  // Mock user details
  const userDetails = {
    name: user?.name || 'Sarah Johnson',
    email: user?.email || 'sarah.johnson@company.com',
    role: user?.role || 'employee',
    position: 'Senior Full-Stack Developer',
    avatar: user?.avatar,
    monthlyScore: 37,
    targetScore: 50,
    tasksCompleted: 8,
    tasksPending: 4,
  }

  const scorePercentage = (userDetails.monthlyScore / userDetails.targetScore) * 100

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: Award },
    { id: 'performance' as TabType, label: 'Performance', icon: TrendingUp },
    { id: 'tasks' as TabType, label: 'Tasks', icon: Calendar },
  ]

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your personal information and performance
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Left Side - Profile Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar and Name */}
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar
                  src={userDetails.avatar}
                  fallback={getInitials(userDetails.name)}
                  className="h-24 w-24 text-2xl"
                />
                <div className="space-y-1">
                  <h2 className="text-xl font-bold">{userDetails.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {userDetails.position}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium truncate">
                      {userDetails.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Role</p>
                    <p className="text-sm font-medium capitalize">
                      {userDetails.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Position</p>
                    <p className="text-sm font-medium">
                      {userDetails.position}
                    </p>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <Button className="w-full" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="text-lg font-bold text-green-600">
                  {userDetails.tasksCompleted}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pending</span>
                <span className="text-lg font-bold text-orange-600">
                  {userDetails.tasksPending}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="text-lg font-bold text-primary">
                  {userDetails.monthlyScore} pts
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Tabs Content */}
        <div className="space-y-6">
          {/* Tabs Navigation */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </CardHeader>
          </Card>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Score Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>This Month Score Summary</CardTitle>
                  <CardDescription>
                    Your performance score for the current month
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">
                      {userDetails.monthlyScore}
                    </span>
                    <span className="text-2xl text-muted-foreground">
                      / {userDetails.targetScore}
                    </span>
                    <span className="text-sm text-muted-foreground">points</span>
                  </div>
                  <Progress value={scorePercentage} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {scorePercentage.toFixed(1)}% of monthly target achieved
                  </p>
                </CardContent>
              </Card>

              {/* Current Assigned Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Assigned Tasks</CardTitle>
                  <CardDescription>
                    Tasks you're currently working on
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-4 rounded-lg border border-border p-4 hover:bg-accent transition-colors"
                      >
                        <div className="flex-1 space-y-1">
                          <p className="font-medium leading-tight">{task.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{task.project}</span>
                            <span>•</span>
                            <span>{formatDate(task.dueDate)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                          <Badge variant="outline">{task.score} pts</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trend</CardTitle>
                  <CardDescription>
                    Your monthly performance scores over time
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
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="points"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Bar Chart Alternative */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Comparison</CardTitle>
                  <CardDescription>
                    Bar chart view of your monthly scores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
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
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar
                          dataKey="points"
                          fill="hsl(var(--primary))"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'tasks' && (
            <Card>
              <CardHeader>
                <CardTitle>All My Tasks</CardTitle>
                <CardDescription>
                  Complete list of your assigned tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allMyTasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell>
                            <div className="font-medium max-w-[250px] truncate">
                              {task.title}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {task.project}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(task.dueDate)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-semibold">
                              {task.score} pts
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

