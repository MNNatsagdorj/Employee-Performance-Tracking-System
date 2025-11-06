import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Avatar } from '@/components/common/Avatar'
import { SkeletonCard } from '@/components/common/Skeleton'
import { Plus, Users, Shield, Clipboard, TrendingUp, Folder } from 'lucide-react'
import api from '@/lib/mockApi'
import { Team } from '@/types'

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export function TeamsPage() {
  const navigate = useNavigate()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Fetch teams
  const { data: teams, isLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const response = await api.get<Team[]>('/teams')
      return response.data
    }
  })

  const handleTeamClick = (teamId: string) => {
    navigate(`/teams/${teamId}`)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Teams</h1>
            <p className="text-muted-foreground mt-1">Manage teams and their members</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  const totalMembers = teams?.reduce((sum, team) => sum + (team.members?.length || 0), 0) || 0
  const totalProjects = teams?.reduce((sum, team) => sum + (team.projectsCount || 0), 0) || 0
  const totalScore = teams?.reduce((sum, team) => sum + (team.totalScore || 0), 0) || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground mt-1">
            Manage teams, assign members, and track performance
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Team
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Teams</p>
                <p className="text-2xl font-bold mt-2">{teams?.length || 0}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold mt-2">{totalMembers}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-950">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold mt-2">{totalProjects}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-950">
                <Folder className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Score</p>
                <p className="text-2xl font-bold mt-2">{totalScore}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-950">
                <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teams Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teams?.map((team) => (
          <Card
            key={team.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleTeamClick(team.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{team.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {team.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Team Lead Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Team Manager:</span>
                  <span className="text-sm text-muted-foreground">{team.managerName}</span>
                </div>
                {team.pmName && (
                  <div className="flex items-center gap-2">
                    <Clipboard className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">PM:</span>
                    <span className="text-sm text-muted-foreground">{team.pmName}</span>
                  </div>
                )}
              </div>

              {/* Members */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  {team.members?.length || 0} Developer{team.members?.length !== 1 ? 's' : ''}
                </p>
                <div className="flex -space-x-2">
                  {team.memberDetails?.slice(0, 5).map((member) => (
                    <Avatar
                      key={member.id}
                      src={member.avatar}
                      fallback={getInitials(member.name)}
                      className="h-8 w-8 border-2 border-background"
                    />
                  ))}
                  {(team.members?.length || 0) > 5 && (
                    <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                      <span className="text-xs font-medium">
                        +{(team.members?.length || 0) - 5}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Projects</p>
                    <p className="text-lg font-bold">{team.projectsCount || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Score</p>
                    <p className="text-lg font-bold">{team.totalScore || 0}</p>
                  </div>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {teams?.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No teams yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first team to get started with organizing your workforce
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

