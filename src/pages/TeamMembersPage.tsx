import { useState } from 'react'
import { Plus, Mail, Shield, Award } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/common/Table'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Avatar } from '@/components/common/Avatar'
import { Progress } from '@/components/common/Progress'
import { cn } from '@/lib/utils'

interface TeamMember {
  id: string
  name: string
  role: 'Admin' | 'PM' | 'Developer'
  position: string
  email: string
  avatar?: string
  monthlyScore: number
  targetScore: number
  status: 'Active' | 'Inactive'
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Admin',
    position: 'Engineering Manager',
    email: 'sarah.johnson@company.com',
    monthlyScore: 48,
    targetScore: 50,
    status: 'Active',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Developer',
    position: 'Senior Full-Stack Developer',
    email: 'michael.chen@company.com',
    monthlyScore: 42,
    targetScore: 50,
    status: 'Active',
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'PM',
    position: 'Project Manager',
    email: 'emily.davis@company.com',
    monthlyScore: 45,
    targetScore: 50,
    status: 'Active',
  },
  {
    id: '4',
    name: 'James Wilson',
    role: 'Developer',
    position: 'Frontend Developer',
    email: 'james.wilson@company.com',
    monthlyScore: 38,
    targetScore: 50,
    status: 'Active',
  },
  {
    id: '5',
    name: 'Linda Martinez',
    role: 'Developer',
    position: 'Backend Developer',
    email: 'linda.martinez@company.com',
    monthlyScore: 44,
    targetScore: 50,
    status: 'Active',
  },
  {
    id: '6',
    name: 'Robert Taylor',
    role: 'PM',
    position: 'Technical Lead',
    email: 'robert.taylor@company.com',
    monthlyScore: 50,
    targetScore: 50,
    status: 'Active',
  },
  {
    id: '7',
    name: 'Jennifer Anderson',
    role: 'Developer',
    position: 'Full-Stack Developer',
    email: 'jennifer.anderson@company.com',
    monthlyScore: 36,
    targetScore: 50,
    status: 'Active',
  },
  {
    id: '8',
    name: 'David Brown',
    role: 'Developer',
    position: 'DevOps Engineer',
    email: 'david.brown@company.com',
    monthlyScore: 41,
    targetScore: 50,
    status: 'Active',
  },
  {
    id: '9',
    name: 'Maria Garcia',
    role: 'Developer',
    position: 'Mobile Developer',
    email: 'maria.garcia@company.com',
    monthlyScore: 0,
    targetScore: 50,
    status: 'Inactive',
  },
  {
    id: '10',
    name: 'Christopher Lee',
    role: 'Admin',
    position: 'CTO',
    email: 'christopher.lee@company.com',
    monthlyScore: 47,
    targetScore: 50,
    status: 'Active',
  },
]

const getRoleColor = (role: string) => {
  const colors = {
    Admin: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    PM: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    Developer: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800',
  }
  return colors[role as keyof typeof colors] || colors.Developer
}

const getStatusColor = (status: string) => {
  if (status === 'Active') {
    return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800'
  }
  return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700'
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export function TeamMembersPage() {
  const [members] = useState<TeamMember[]>(mockTeamMembers)

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'Active').length,
    inactive: members.filter(m => m.status === 'Inactive').length,
    admins: members.filter(m => m.role === 'Admin').length,
    pms: members.filter(m => m.role === 'PM').length,
    developers: members.filter(m => m.role === 'Developer').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members and track their performance
          </p>
        </div>
        <Button size="lg">
          <Plus className="h-4 w-4" />
          Add Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950">
                <div className="h-2 w-2 rounded-full bg-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.active}</div>
                <div className="text-xs text-muted-foreground">Active</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <div className="h-2 w-2 rounded-full bg-gray-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.inactive}</div>
                <div className="text-xs text-muted-foreground">Inactive</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950">
                <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.admins}</div>
                <div className="text-xs text-muted-foreground">Admins</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950">
                <div className="h-5 w-5 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">
                  PM
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.pms}</div>
                <div className="text-xs text-muted-foreground">PMs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950">
                <div className="h-5 w-5 flex items-center justify-center text-green-600 dark:text-green-400 font-mono text-xs">
                  {'</>'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.developers}</div>
                <div className="text-xs text-muted-foreground">Devs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Team Members</CardTitle>
          <CardDescription>
            A comprehensive list of all team members with their roles and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Position</TableHead>
                  <TableHead className="hidden lg:table-cell">Email</TableHead>
                  <TableHead>Monthly Score</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => {
                  const scorePercentage = (member.monthlyScore / member.targetScore) * 100

                  return (
                    <TableRow key={member.id} className="group">
                      <TableCell>
                        <Avatar
                          src={member.avatar}
                          fallback={getInitials(member.name)}
                          className="h-10 w-10"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium group-hover:text-primary transition-colors">
                            {member.name}
                          </span>
                          {/* Show position on mobile when hidden in column */}
                          <span className="text-xs text-muted-foreground md:hidden">
                            {member.position}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn('border', getRoleColor(member.role))}>
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {member.position}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 min-w-[120px]">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">
                              {member.monthlyScore} / {member.targetScore}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {scorePercentage.toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={scorePercentage} className="h-1.5" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn('border', getStatusColor(member.status))}>
                          {member.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Email All Active
            </Button>
            <Button variant="outline">
              <Award className="h-4 w-4 mr-2" />
              Export Performance Report
            </Button>
            <Button variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              Manage Permissions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

