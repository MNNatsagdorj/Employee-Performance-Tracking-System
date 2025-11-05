import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Settings as SettingsIcon } from 'lucide-react'

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <SettingsIcon className="h-6 w-6 text-muted-foreground" />
            <div>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                User settings and preferences will be available here
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page will include profile settings, notification preferences, and more.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

