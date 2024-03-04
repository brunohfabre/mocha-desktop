import { Link, Navigate, Outlet } from 'react-router-dom'

import LogoDark from '@/assets/logo-dark.png'
import LogoLight from '@/assets/logo-light.png'
import { useTheme } from '@/components/theme-provider'
import { useAuth } from '@/contexts/auth'

export function AuthLayout() {
  const { theme } = useTheme()
  const { session } = useAuth()

  console.log(theme)

  if (session) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="p-4 max-w-7xl w-full mx-auto">
        <img
          src={theme === 'light' ? LogoLight : LogoDark}
          alt="Mocha"
          className="h-7"
        />
      </header>

      <Outlet />

      <footer className="p-4 text-center">
        <p className="text-muted-foreground text-sm leading-relaxed w-full max-w-80 md:max-w-none">
          By clicking sign in, you agree to our{' '}
          <Link
            to="/terms-of-service"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            to="/privacy-policy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </footer>
    </div>
  )
}
