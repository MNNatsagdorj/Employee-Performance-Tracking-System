import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Trophy, 
  Settings,
  BarChart3,
  Users,
  X,
  Shield,
  Clipboard,
  Code,
  UserCog
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/common/Button'
import { useAuthStore } from '@/stores/authStore'
import { UserRole } from '@/types'

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles?: UserRole[] // If specified, only these roles can see this item
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Teams',
    href: '/teams',
    icon: Users,
    roles: ['OWNER', 'TEAM_MANAGER'], // Only visible to owners and managers
  },
  {
    title: 'Members',
    href: '/members',
    icon: UserCog,
    roles: ['OWNER', 'TEAM_MANAGER'], // Only visible to owners and managers
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: FolderKanban,
  },
  {
    title: 'PM Dashboard',
    href: '/project-assignment',
    icon: Clipboard,
    roles: ['PM', 'TEAM_MANAGER', 'OWNER'], // PM-specific page
  },
  {
    title: 'Developer Tasks',
    href: '/developer-tasks',
    icon: Code,
    roles: ['DEVELOPER'], // Developer-specific page
  },
  {
    title: 'Tasks',
    href: '/tasks',
    icon: CheckSquare,
  },
  {
    title: 'Score Report',
    href: '/score-report',
    icon: Trophy,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    roles: ['OWNER', 'TEAM_MANAGER', 'PM'], // Analytics for management
  },
  {
    title: 'Settings',
    href: '/system-settings',
    icon: Settings,
  },
]

interface SidebarProps {
  isMobileOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
  const location = useLocation()
  const { user } = useAuthStore()

  // PROTOTYPE MODE: Show all nav items regardless of role
  // TODO: Enable role-based filtering for production
  const visibleNavItems = navItems // Show all items
  
  // Production version (commented out):
  // const visibleNavItems = navItems.filter(item => {
  //   if (!item.roles || item.roles.length === 0) return true
  //   return user?.role && item.roles.includes(user.role)
  // })

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card transition-transform duration-300',
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col gap-2 py-4">
          {/* Logo */}
          <div className="px-6 py-2 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3" onClick={onClose}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                EP
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-base leading-tight">EmployeeTrack</span>
                <span className="text-xs text-muted-foreground">Performance System</span>
              </div>
            </Link>
            {/* Mobile Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Role Badge */}
          {user && (
            <div className="px-6 py-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 text-sm">
                {user.role === 'OWNER' && <Shield className="h-4 w-4 text-yellow-600" />}
                {user.role === 'TEAM_MANAGER' && <Shield className="h-4 w-4 text-blue-600" />}
                {user.role === 'PM' && <Clipboard className="h-4 w-4 text-green-600" />}
                {user.role === 'DEVELOPER' && <Code className="h-4 w-4 text-purple-600" />}
                <span className="font-medium">
                  {user.role === 'OWNER' && 'Owner'}
                  {user.role === 'TEAM_MANAGER' && 'Team Manager'}
                  {user.role === 'PM' && 'PM'}
                  {user.role === 'DEVELOPER' && 'Developer'}
                </span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3">
            {visibleNavItems.map((item) => {
              const isActive = location.pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary dark:bg-primary/20'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="px-6 py-2 text-xs text-muted-foreground">
            <p>© 2024 EmployeeTrack</p>
            <p className="mt-1">Version 2.0</p>
          </div>
        </div>
      </aside>
    </>
  )
}
