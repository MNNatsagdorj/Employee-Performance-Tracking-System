import { useQuery } from '@tanstack/react-query'
import { Trophy, TrendingUp, TrendingDown, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Progress } from '@/components/common/Progress'
import { Badge } from '@/components/common/Badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/common/Table'
import api from '@/lib/mockApi'
import { ScoreReport as ScoreReportType } from '@/types'
import { formatDate } from '@/lib/utils'

export function ScoreReport() {
  const { data: report } = useQuery<ScoreReportType>({
    queryKey: ['score-report'],
    queryFn: async () => {
      const response = await api.get('/score/report')
      return response.data
    },
  })

  const scorePercentage = report
    ? (report.totalScore / report.targetScore) * 100
    : 0

  const tasksWithPenalty = report?.tasks.filter((t) => t.delayPenalty < 0).length || 0
  const tasksOnTime = (report?.tasks.length || 0) - tasksWithPenalty

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Score Report</h1>
        <p className="text-muted-foreground mt-1">
          Track your performance scores and metrics
        </p>
      </div>

      {/* Summary Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Monthly Score Summary</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" />
                {report?.month}
              </CardDescription>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{report?.totalScore}</span>
              <span className="text-2xl text-muted-foreground">/ {report?.targetScore}</span>
              <span className="text-sm text-muted-foreground">points</span>
            </div>
            <Progress value={scorePercentage} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {scorePercentage.toFixed(1)}% of monthly target achieved
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                Completed Tasks
              </div>
              <p className="text-2xl font-bold">{report?.tasks.length}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-green-600" />
                On Time
              </div>
              <p className="text-2xl font-bold text-green-600">{tasksOnTime}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingDown className="h-4 w-4 text-red-600" />
                With Penalty
              </div>
              <p className="text-2xl font-bold text-red-600">{tasksWithPenalty}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
          <CardDescription>
            Detailed scoring for each completed task
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Completed Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Base Score</TableHead>
                <TableHead>Delay Penalty</TableHead>
                <TableHead>Final Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report?.tasks.map((task) => (
                <TableRow key={task.taskId}>
                  <TableCell>
                    <div className="font-medium">{task.taskTitle}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(task.completedDate)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(task.dueDate)}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{task.baseScore}</span>
                  </TableCell>
                  <TableCell>
                    {task.delayPenalty < 0 ? (
                      <Badge className="text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400">
                        {task.delayPenalty} ({task.daysLate} days late)
                      </Badge>
                    ) : (
                      <Badge className="text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400">
                        {task.delayPenalty}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-lg font-bold">{task.finalScore}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Total Row */}
          <div className="mt-4 flex items-center justify-between rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
            <span className="text-lg font-semibold">Total Score</span>
            <span className="text-2xl font-bold text-primary">
              {report?.totalScore} points
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Performance Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-muted-foreground">
                Complete tasks before the due date to avoid penalties
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-muted-foreground">
                Focus on high story point tasks for better scores
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-muted-foreground">
                Maintain consistent performance to reach your monthly target
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

