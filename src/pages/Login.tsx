import { useState, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Loader2 } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from '@/stores/toastStore'
import api from '@/lib/mockApi'

export function Login() {
  const navigate = useNavigate()
  const toast = useToast()
  const login = useAuthStore((state) => state.login)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Validation Error', 'Please enter both email and password')
      return
    }

    setIsLoading(true)

    try {
      // Mock API call
      const response = await api.post('/auth/login', { email, password })
      const { user, token } = response.data
      
      login(user, token)
      toast.success('Welcome back!', `Logged in as ${user.name}`)
      navigate('/dashboard')
    } catch (error) {
      toast.error('Login Failed', 'Invalid credentials. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <span className="text-2xl font-bold">EP</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">EmployeeTrack</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Performance Management System
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign in
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Enterprise SSO
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" type="button">
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.46 12.24c0-.81-.07-1.59-.2-2.34H12v4.43h5.84c-.25 1.35-1.01 2.5-2.15 3.27v2.78h3.48c2.04-1.88 3.22-4.65 3.22-7.94z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.91 0 5.35-.96 7.13-2.61l-3.48-2.78c-.96.65-2.19 1.03-3.65 1.03-2.81 0-5.19-1.9-6.04-4.45H2.34v2.87C4.11 20.64 7.76 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.96 14.19c-.22-.65-.34-1.35-.34-2.06s.12-1.41.34-2.06V7.2H2.34C1.49 8.9 1 10.89 1 13s.49 4.1 1.34 5.8l3.62-2.87z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.59 0 3.01.55 4.13 1.62l3.09-3.09C17.34 2.14 14.91 1 12 1 7.76 1 4.11 3.36 2.34 6.94l3.62 2.87C6.81 7.28 9.19 5.38 12 5.38z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button">
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
                    />
                  </svg>
                  Azure AD
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

