import { Navigate, Outlet } from 'react-router-dom'

import LogoDark from '@/assets/logo-dark.png'
import LogoLight from '@/assets/logo-light.png'
import { useTheme } from '@/components/theme-provider'
import { useAuthStore } from '@/stores/auth'

export function AuthLayout() {
  const { theme, setTheme } = useTheme()

  const token = useAuthStore((state) => state.token)

  if (token) {
    return <Navigate to="/" replace />
  }

  function handleChangeTheme() {
    if (theme === 'system' || theme === 'light') {
      setTheme('dark')

      return
    }

    setTheme('light')
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="p-4 max-w-7xl w-full mx-auto">
        <button type="button" onClick={handleChangeTheme}>
          <img
            src={theme === 'light' ? LogoLight : LogoDark}
            alt="Mocha"
            className="h-7"
          />
        </button>
      </header>
      <Outlet />
    </div>
  )
}
