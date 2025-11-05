import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { Avatar } from '@/components/common/Avatar'
import { Progress } from '@/components/common/Progress'
import { 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle, 
  Award,
  Users,
  Target,
  Calendar,
  Activity
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

// Mock data for weekly score trend
const weeklyScoreData = [
  { week: 'Week 1', score: 12, tasks: 8 },
  { week: 'Week 2', score: 18, tasks: 12 },
  { week: 'Week 3', score: 22, tasks: 15 },
  { week: 'Week 4', score: 15, tasks: 10 },
]

// Mock data for project performance
const projectPerformanceData = [
  { project: 'Customer Portal', completed: 16, pending: 8, score: 156 },
  { project: 'Mobile App', completed: 14, pending: 18, score: 134 },
  { project: 'API Migration', completed: 16, pending: 2, score: 148 },
  { project: 'Analytics Dashboard', completed: 3, pending: 12, score: 32 },
]

// Mock data for task status distribution
const taskStatusData = [
  { name: 'Completed', value: 49, color: '#22c55e' },
  { name: 'In Progress', value: 32, color: '#3b82f6' },
  { name: 'In Review', value: 12, color: '#a855f7' },
  { name: 'To Do', value: 7, color: '#6b7280' },
]

// Mock data for top performers
const topPerformers = [
  { id: '1', name: 'Robert Taylor', score: 50, tasks: 12, avatar: '', role: 'Technical Lead' },
  { id: '2', name: 'Sarah Johnson', score: 48, tasks: 11, avatar: '', role: 'Engineering Manager' },
  { id: '3', name: 'Michael Chen', score: 47, tasks: 10, avatar: '', role: 'Senior Developer' },
  { id: '4', name: 'Emily Davis', score: 45, tasks: 10, avatar: '', role: 'Project Manager' },
  { id: '5', name: 'Linda Martinez', score: 44, tasks: 9, avatar: '', role: 'Backend Developer' },
]

// Mock data for daily activity
const dailyActivityData = [
  { day: 'Mon', tasksCompleted: 8, tasksCreated: 5 },
  { day: 'Tue', tasksCompleted: 12, tasksCreated: 7 },
  { day: 'Wed', tasksCompleted: 10, tasksCreated: 8 },
  { day: 'Thu', tasksCompleted: 15, tasksCreated: 6 },
  { day: 'Fri', tasksCompleted: 14, tasksCreated: 9 },
  { day: 'Sat', tasksCompleted: 3, tasksCreated: 2 },
  { day: 'Sun', tasksCompleted: 2, tasksCreated: 1 },
]

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export function Analytics() {
  // Calculate stats
  const totalTasks = 67
  const completedTasks = 49
  const onTimeRate = 82 // percentage
  const totalPenalties = 15
  const avgScore = 42.5

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Performance analytics and insights
        </p>
      </div>

      {/* Monthly Performance Overview Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Tasks Completed
                </p>
                <p className="text-2xl font-bold mt-2">{completedTasks}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  of {totalTasks} total
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-950">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Average Score
                </p>
                <p className="text-2xl font-bold mt-2">{avgScore}</p>
                <p className="text-xs text-green-600 mt-1">
                  +8% from last month
                </p>
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
                <p className="text-sm font-medium text-muted-foreground">
                  On-Time Rate
                </p>
                <p className="text-2xl font-bold mt-2">{onTimeRate}%</p>
                <Progress value={onTimeRate} className="mt-2 h-2" />
              </div>
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-950">
                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Delay Penalties
                </p>
                <p className="text-2xl font-bold mt-2">{totalPenalties}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  points deducted
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-950">
                <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Score Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Score Trend</CardTitle>
            <CardDescription>
              Weekly score progression for current month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyScoreData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="week" 
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
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Task Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
            <CardDescription>
              Current status of all tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Performance & Top Performers */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Project Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Project Performance</CardTitle>
            <CardDescription>
              Comparison of active projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="project" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    angle={-15}
                    textAnchor="end"
                    height={60}
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
                  <Legend />
                  <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>
              Highest scoring employees this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div
                  key={performer.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      #{index + 1}
                    </div>
                    <Avatar
                      src={performer.avatar}
                      fallback={getInitials(performer.name)}
                      className="h-10 w-10"
                    />
                    <div>
                      <p className="font-medium text-sm">{performer.name}</p>
                      <p className="text-xs text-muted-foreground">{performer.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-600" />
                      <span className="font-bold text-lg">{performer.score}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{performer.tasks} tasks</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Activity</CardTitle>
          <CardDescription>
            Tasks completed vs created this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyActivityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="day" 
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
                <Legend />
                <Bar 
                  dataKey="tasksCompleted" 
                  fill="#22c55e" 
                  name="Completed"
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="tasksCreated" 
                  fill="#3b82f6" 
                  name="Created"
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-semibold">Most Active Day</p>
                <p className="text-2xl font-bold mt-1">Thursday</p>
                <p className="text-xs text-muted-foreground mt-1">
                  15 tasks completed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950">
                <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-semibold">Active Team Members</p>
                <p className="text-2xl font-bold mt-1">9</p>
                <p className="text-xs text-muted-foreground mt-1">
                  out of 10 total
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-semibold">Average Task Duration</p>
                <p className="text-2xl font-bold mt-1">3.2</p>
                <p className="text-xs text-muted-foreground mt-1">
                  days per task
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

