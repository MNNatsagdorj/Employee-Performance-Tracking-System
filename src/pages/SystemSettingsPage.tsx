import { useState } from 'react'
import { Save, Upload, Settings as SettingsIcon, Shield, Award } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { useToast } from '@/stores/toastStore'
import { cn } from '@/lib/utils'

type TabType = 'general' | 'scoring' | 'permissions'

interface RolePermissions {
  role: string
  canAssignTasks: boolean
  canEditProjects: boolean
  canViewScoreboard: boolean
}

const timezones = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Australia/Sydney',
]

export function SystemSettingsPage() {
  const toast = useToast()
  const [activeTab, setActiveTab] = useState<TabType>('general')

  // General Settings State
  const [companyName, setCompanyName] = useState('Acme Corporation')
  const [timezone, setTimezone] = useState('America/New_York')

  // Score Rules State
  const [monthlyTarget, setMonthlyTarget] = useState(50)
  const [delayPenalty, setDelayPenalty] = useState(1)
  const [minimumFloor, setMinimumFloor] = useState(20)

  // Roles & Permissions State
  const [permissions, setPermissions] = useState<RolePermissions[]>([
    {
      role: 'Admin',
      canAssignTasks: true,
      canEditProjects: true,
      canViewScoreboard: true,
    },
    {
      role: 'Manager',
      canAssignTasks: true,
      canEditProjects: true,
      canViewScoreboard: true,
    },
    {
      role: 'Project Manager',
      canAssignTasks: true,
      canEditProjects: false,
      canViewScoreboard: true,
    },
    {
      role: 'Developer',
      canAssignTasks: false,
      canEditProjects: false,
      canViewScoreboard: true,
    },
    {
      role: 'Employee',
      canAssignTasks: false,
      canEditProjects: false,
      canViewScoreboard: false,
    },
  ])

  const tabs = [
    { id: 'general' as TabType, label: 'General Settings', icon: SettingsIcon },
    { id: 'scoring' as TabType, label: 'Score Rules', icon: Award },
    { id: 'permissions' as TabType, label: 'Roles & Permissions', icon: Shield },
  ]

  const togglePermission = (
    roleIndex: number,
    permission: 'canAssignTasks' | 'canEditProjects' | 'canViewScoreboard'
  ) => {
    const newPermissions = [...permissions]
    newPermissions[roleIndex][permission] = !newPermissions[roleIndex][permission]
    setPermissions(newPermissions)
  }

  const handleSaveChanges = () => {
    const settings = {
      general: {
        companyName,
        timezone,
      },
      scoring: {
        monthlyTarget,
        delayPenalty,
        minimumFloor,
      },
      permissions,
    }

    console.log('Saving system settings:', settings)
    toast.success('Settings Saved!', 'System settings have been updated successfully')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure system-wide settings and preferences
        </p>
      </div>

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
      <div className="space-y-6">
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Basic information about your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Company Name */}
                <div className="space-y-2">
                  <label htmlFor="companyName" className="text-sm font-medium">
                    Company Name *
                  </label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name"
                  />
                  <p className="text-xs text-muted-foreground">
                    This name will appear throughout the system
                  </p>
                </div>

                {/* Logo Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        PNG, JPG or SVG. Max size 2MB. Recommended: 200x200px
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regional Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Regional Settings</CardTitle>
                <CardDescription>
                  Configure timezone and localization preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Default Timezone */}
                <div className="space-y-2">
                  <label htmlFor="timezone" className="text-sm font-medium">
                    Default Timezone *
                  </label>
                  <select
                    id="timezone"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground">
                    All dates and times will be displayed in this timezone
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'scoring' && (
          <Card>
            <CardHeader>
              <CardTitle>Performance Scoring Rules</CardTitle>
              <CardDescription>
                Configure how employee performance scores are calculated
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Monthly Target Score */}
              <div className="space-y-2">
                <label htmlFor="monthlyTarget" className="text-sm font-medium">
                  Monthly Target Score *
                </label>
                <Input
                  id="monthlyTarget"
                  type="number"
                  value={monthlyTarget}
                  onChange={(e) => setMonthlyTarget(Number(e.target.value))}
                  min={1}
                  max={1000}
                />
                <p className="text-xs text-muted-foreground">
                  The default target score employees should aim to achieve each month
                </p>
              </div>

              {/* Delay Penalty Per Day */}
              <div className="space-y-2">
                <label htmlFor="delayPenalty" className="text-sm font-medium">
                  Delay Penalty Per Day *
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    id="delayPenalty"
                    type="number"
                    value={delayPenalty}
                    onChange={(e) => setDelayPenalty(Number(e.target.value))}
                    min={0}
                    max={100}
                    step={0.5}
                    className="max-w-[200px]"
                  />
                  <span className="text-sm text-muted-foreground">points/day</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Points deducted per day for tasks completed after the due date
                </p>
              </div>

              {/* Minimum Score Floor */}
              <div className="space-y-2">
                <label htmlFor="minimumFloor" className="text-sm font-medium">
                  Minimum Score Floor *
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    id="minimumFloor"
                    type="number"
                    value={minimumFloor}
                    onChange={(e) => setMinimumFloor(Number(e.target.value))}
                    min={0}
                    max={100}
                    className="max-w-[200px]"
                  />
                  <span className="text-sm text-muted-foreground">% of base score</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Minimum percentage of base score a task can receive after penalties
                </p>
              </div>

              {/* Example Calculation */}
              <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-2">
                <h4 className="text-sm font-semibold">Example Calculation</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Base Score: 10 points</p>
                  <p>Days Late: 3 days</p>
                  <p>Penalty: 3 × {delayPenalty} = {3 * delayPenalty} points</p>
                  <p>Raw Score: 10 - {3 * delayPenalty} = {10 - (3 * delayPenalty)} points</p>
                  <p>
                    Minimum Floor: 10 × {minimumFloor}% = {(10 * minimumFloor) / 100} points
                  </p>
                  <p className="font-semibold text-foreground pt-2">
                    Final Score: {Math.max(10 - (3 * delayPenalty), (10 * minimumFloor) / 100)} points
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'permissions' && (
          <Card>
            <CardHeader>
              <CardTitle>Role-Based Permissions</CardTitle>
              <CardDescription>
                Configure what each role can do in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-sm">Role</th>
                      <th className="text-center py-3 px-4 font-semibold text-sm">
                        Can Assign Tasks
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-sm">
                        Can Edit Projects
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-sm">
                        Can View Scoreboard
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((perm, index) => (
                      <tr
                        key={perm.role}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              'h-2 w-2 rounded-full',
                              perm.role === 'Admin' ? 'bg-purple-500' :
                              perm.role === 'Manager' ? 'bg-blue-500' :
                              perm.role === 'Project Manager' ? 'bg-cyan-500' :
                              perm.role === 'Developer' ? 'bg-green-500' :
                              'bg-gray-500'
                            )} />
                            <span className="font-medium">{perm.role}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={perm.canAssignTasks}
                              onChange={() => togglePermission(index, 'canAssignTasks')}
                              className="h-5 w-5 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                            />
                          </label>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={perm.canEditProjects}
                              onChange={() => togglePermission(index, 'canEditProjects')}
                              className="h-5 w-5 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                            />
                          </label>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={perm.canViewScoreboard}
                              onChange={() => togglePermission(index, 'canViewScoreboard')}
                              className="h-5 w-5 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                            />
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Permission Descriptions */}
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Can Assign Tasks:</span> Ability to assign tasks to team members
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Can Edit Projects:</span> Ability to create and modify projects
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Can View Scoreboard:</span> Ability to view all team members' performance scores
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Changes will take effect immediately after saving
              </p>
              <Button onClick={handleSaveChanges} size="lg">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

