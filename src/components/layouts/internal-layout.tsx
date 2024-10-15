import { Link, Outlet } from 'react-router-dom'

import { LogOut } from 'lucide-react'

import LogoDark from '@/assets/logo-dark.svg'
import LogoLight from '@/assets/logo-light.svg'
import { useAuthStore } from '@/stores/auth-store'

import { useTheme } from '../theme-provider'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export function InternalLayout() {
  const clearCredentials = useAuthStore((state) => state.clearCredentials)

  const { theme } = useTheme()

  function handleSignOut() {
    clearCredentials()
  }

  return (
    <div className="flex h-screen w-full flex-col antialiased">
      <header className="flex items-center justify-between px-2">
        <Link className="flex size-[52px] items-center justify-center" to="/">
          <img
            src={theme === 'dark' ? LogoDark : LogoLight}
            alt="Mocha"
            className="w-9"
          />
        </Link>

        <Button variant="outline" size="icon" onClick={handleSignOut}>
          <LogOut className="size-4" />
        </Button>
      </header>

      <Separator orientation="horizontal" />

      <Outlet />
    </div>
  )
}
