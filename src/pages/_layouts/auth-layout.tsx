import { Navigate, Outlet } from 'react-router-dom'

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
    </div>
  )
}
