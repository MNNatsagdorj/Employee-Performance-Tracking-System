import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MainLayout } from '@/layouts/MainLayout'
import { Login } from '@/pages/Login'
import { Dashboard } from '@/pages/Dashboard'
import { Projects } from '@/pages/Projects'
import { Tasks, TaskDetail } from '@/pages/Tasks'
import { CreateTaskPage } from '@/pages/CreateTaskPage'
import { TasksBoardPage } from '@/pages/TasksBoardPage'
import { ScoreReport } from '@/pages/ScoreReport'
import { Analytics } from '@/pages/Analytics'
import { TeamMembersPage } from '@/pages/TeamMembersPage'
import { MyPage } from '@/pages/MyPage'
import { SystemSettingsPage } from '@/pages/SystemSettingsPage'
import { Settings } from '@/pages/Settings'
import { ToastContainer } from '@/components/common/Toast'
import { useThemeStore } from '@/stores/themeStore'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function App() {
  const theme = useThemeStore((state) => state.theme)

  // Initialize theme on app load
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/create" element={<CreateTaskPage />} />
            <Route path="/tasks/board" element={<TasksBoardPage />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/score-report" element={<ScoreReport />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/team" element={<TeamMembersPage />} />
            <Route path="/my-profile" element={<MyPage />} />
            <Route path="/system-settings" element={<SystemSettingsPage />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

