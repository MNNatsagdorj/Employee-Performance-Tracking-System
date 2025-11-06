import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Avatar } from '@/components/common/Avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/common/Table'
import { ArrowLeft, Shield, Clipboard, Code, Mail, TrendingUp, Folder, Users } from 'lucide-react'
import api from '@/lib/mockApi'
import { Team, User, Project } from '@/types'
import { getRoleColor } from '@/lib/utils'

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'TEAM_MANAGER':
      return <Shield className="h-4 w-4" />
    case 'PM':
      return <Clipboard className="h-4 w-4" />
    case 'DEVELOPER':
      return <Code className="h-4 w-4" />
    default:
      return <Users className="h-4 w-4" />
  }
}

export function TeamDetailPage() {
  const { teamId } = useParams<{ teamId: string }>()
  const navigate = useNavigate()

  // Fetch team details
  const { data: team, isLoading } = useQuery({
    queryKey: ['team', teamId],
    queryFn: async () => {
      const response = await api.get<Team & { projects: Project[] }>(`/teams/${teamId}`)
      return response.data
    },
    enabled: !!teamId
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/teams')}>
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

  if (!team) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-lg text-muted-foreground">Team not found</p>
        <Button onClick={() => navigate('/teams')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Teams
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/teams')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Teams
        </Button>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{team.name}</h1>
            <p className="text-muted-foreground mt-1">{team.description}</p>
          </div>
          <Button>Edit Team</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                <p className="text-2xl font-bold mt-2">{team.members?.length || 0}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-950">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold mt-2">{team.projects?.length || 0}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-950">
                <Folder className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Score</p>
                <p className="text-2xl font-bold mt-2">{team.totalScore || 0}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-950">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Score</p>
                <p className="text-2xl font-bold mt-2">
                  {team.members?.length ? Math.round((team.totalScore || 0) / team.members.length) : 0}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-950">
                <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leadership */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Team Manager */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Team Manager
            </CardTitle>
            <CardDescription>Leads and oversees the team</CardDescription>
          </CardHeader>
          <CardContent>
            {team.managerName && (
              <div className="flex items-center gap-3">
                <Avatar
                  fallback={getInitials(team.managerName)}
                  className="h-12 w-12"
                />
                <div>
                  <p className="font-medium">{team.managerName}</p>
                  <Badge variant="secondary" className="mt-1">
                    Team Manager
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project Manager */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clipboard className="h-5 w-5 text-green-600" />
              Project Manager
            </CardTitle>
            <CardDescription>Manages projects and assigns tasks</CardDescription>
          </CardHeader>
          <CardContent>
            {team.pmName ? (
              <div className="flex items-center gap-3">
                <Avatar
                  fallback={getInitials(team.pmName)}
                  className="h-12 w-12"
                />
                <div>
                  <p className="font-medium">{team.pmName}</p>
                  <Badge variant="secondary" className="mt-1">
                    PM
                  </Badge>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No PM assigned</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({team.memberDetails?.length || 0})</CardTitle>
          <CardDescription>Developers and engineers in this team</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Score / Target</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.memberDetails?.map((member: User) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={member.avatar}
                        fallback={getInitials(member.name)}
                        className="h-10 w-10"
                      />
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <Badge
                          variant="secondary"
                          className={getRoleColor(member.role)}
                        >
                          {getRoleIcon(member.role)}
                          <span className="ml-1">{member.role}</span>
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.position}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {member.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{member.monthlyScore}</span>
                      <span className="text-muted-foreground">/ {member.monthlyTarget}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={member.status === 'active' ? 'default' : 'secondary'}
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Active Projects ({team.projects?.length || 0})</CardTitle>
          <CardDescription>Projects assigned to this team</CardDescription>
        </CardHeader>
        <CardContent>
          {team.projects && team.projects.length > 0 ? (
            <div className="space-y-4">
              {team.projects.map((project: Project) => (
                <div
                  key={project.id}
                  className="p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <Badge variant="secondary">{project.status}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {project.completedTasksCount} / {project.tasksCount} tasks
                        </span>
                        <span className="text-sm font-medium">
                          {project.progress}% complete
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No projects assigned to this team yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

