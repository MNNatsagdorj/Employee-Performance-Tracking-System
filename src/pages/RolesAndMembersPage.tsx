import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Avatar } from '@/components/common/Avatar'
import { Input } from '@/components/common/Input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/common/Table'
import { Plus, Search, Crown, Shield, Clipboard, Code, Mail, Users } from 'lucide-react'
import api from '@/lib/mockApi'
import { User, UserRole } from '@/types'
import { getRoleColor } from '@/lib/utils'

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case 'OWNER':
      return <Crown className="h-4 w-4" />
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

const getRoleLabel = (role: UserRole) => {
  switch (role) {
    case 'OWNER':
      return 'Owner (사장)'
    case 'TEAM_MANAGER':
      return 'Team Manager (팀장)'
    case 'PM':
      return 'Project Manager'
    case 'DEVELOPER':
      return 'Developer'
    default:
      return role
  }
}

export function RolesAndMembersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<UserRole | 'ALL'>('ALL')

  // Fetch all users
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get<User[]>('/users')
      return response.data
    }
  })

  // Filter users
  const filteredUsers = users?.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  // Count by role
  const roleCounts = {
    OWNER: users?.filter(u => u.role === 'OWNER').length || 0,
    TEAM_MANAGER: users?.filter(u => u.role === 'TEAM_MANAGER').length || 0,
    PM: users?.filter(u => u.role === 'PM').length || 0,
    DEVELOPER: users?.filter(u => u.role === 'DEVELOPER').length || 0,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Roles & Members</h1>
          <p className="text-muted-foreground mt-1">
            Manage user roles and permissions across the organization
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      {/* Role Distribution Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Crown className="h-4 w-4" />
                  Owner
                </div>
                <p className="text-2xl font-bold mt-2">{roleCounts.OWNER}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-950">
                <Crown className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  Team Managers
                </div>
                <p className="text-2xl font-bold mt-2">{roleCounts.TEAM_MANAGER}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-950">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clipboard className="h-4 w-4" />
                  Project Managers
                </div>
                <p className="text-2xl font-bold mt-2">{roleCounts.PM}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-950">
                <Clipboard className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Code className="h-4 w-4" />
                  Developers
                </div>
                <p className="text-2xl font-bold mt-2">{roleCounts.DEVELOPER}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-950">
                <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={roleFilter === 'ALL' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('ALL')}
              >
                All Roles
              </Button>
              <Button
                variant={roleFilter === 'OWNER' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('OWNER')}
              >
                <Crown className="mr-1 h-3 w-3" />
                Owner
              </Button>
              <Button
                variant={roleFilter === 'TEAM_MANAGER' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('TEAM_MANAGER')}
              >
                <Shield className="mr-1 h-3 w-3" />
                Manager
              </Button>
              <Button
                variant={roleFilter === 'PM' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('PM')}
              >
                <Clipboard className="mr-1 h-3 w-3" />
                PM
              </Button>
              <Button
                variant={roleFilter === 'DEVELOPER' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('DEVELOPER')}
              >
                <Code className="mr-1 h-3 w-3" />
                Developer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Members ({filteredUsers?.length || 0})
          </CardTitle>
          <CardDescription>
            View and manage user roles and team assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Score / Target</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredUsers && filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Link to={`/members/${user.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <Avatar
                            src={user.avatar}
                            fallback={getInitials(user.name)}
                            className="h-10 w-10"
                          />
                          <div>
                            <p className="font-medium hover:text-primary transition-colors">{user.name}</p>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={getRoleColor(user.role)}
                        >
                          {getRoleIcon(user.role)}
                          <span className="ml-1">{getRoleLabel(user.role)}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.position}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.teamId ? (
                          <Badge variant="outline">Team {user.teamId.split('-')[1]}</Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.monthlyScore !== undefined ? (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{user.monthlyScore}</span>
                            <span className="text-muted-foreground">/ {user.monthlyTarget}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === 'active' ? 'default' : 'secondary'}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No members found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Role Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Descriptions & Permissions</CardTitle>
          <CardDescription>
            Understanding the hierarchy and responsibilities of each role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-3 mb-2">
                <Crown className="h-5 w-5 text-yellow-600" />
                <h4 className="font-semibold">Owner (사장 / Admin)</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Full access to all projects, teams, users, and performance analytics.
                Can view total points, project progress, and team comparisons.
              </p>
            </div>

            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold">Team Manager (개발 팀장 / 쇼퍼 관리자)</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Creates and manages teams (e.g., Backend Team, Frontend Team, QA Team).
                Assigns PM and developers to each team. Oversees all team tasks and performance reports.
              </p>
            </div>

            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-3 mb-2">
                <Clipboard className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold">Project Manager (PM)</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Receives projects and breaks them down into multiple smaller tasks.
                Assigns difficulty (Story Points), due date, and optionally selects developers.
                Reviews task submissions and approves them for scoring.
              </p>
            </div>

            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-3 mb-2">
                <Code className="h-5 w-5 text-purple-600" />
                <h4 className="font-semibold">Developer</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Views available tasks in their assigned team. Can choose a task to "Take Ownership" if it's open.
                After completion, submits for review (PM verifies and marks done).
                Earns performance points based on completion time, quality, and story points.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

