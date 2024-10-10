import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Notebook } from 'lucide-react'

import LogoDark from '@/assets/logo-dark.png'
import LogoLight from '@/assets/logo-light.png'
import { useAuthStore } from '@/stores/auth-store'

import { useTheme } from '../theme-provider'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Separator } from '../ui/separator'

export function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const user = useAuthStore((state) => state.user)
  const clearCredentials = useAuthStore((state) => state.clearCredentials)

  const { theme, setTheme } = useTheme()

  function handleSwitchTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  function handleSignOut() {
    clearCredentials()
  }

  function getShortName() {
    const name = user?.name ?? ''

    const splittedName = name.split(' ').map((word) => word.trim())

    return `${splittedName[0][0]}${splittedName[splittedName.length - 1][0]}`
  }

  return (
    <div className="flex h-screen w-full antialiased">
      <div className="flex flex-col">
        <Link className="flex size-[52px] items-center justify-center" to="/">
          <img
            src={theme === 'dark' ? LogoDark : LogoLight}
            alt="Mocha"
            className="w-9"
          />
        </Link>

        <div className="flex flex-1 flex-col p-2">
          <Button
            type="button"
            size="icon"
            variant={
              location.pathname.startsWith('/collections') ? 'default' : 'ghost'
            }
            onClick={() => navigate('/collections')}
          >
            <Notebook className="size-4" />
          </Button>
        </div>

        <div className="flex size-[52px] items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="size-9">
                <AvatarFallback>{getShortName().toUpperCase()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleSwitchTheme}>
                Switch theme
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-500 focus:bg-destructive/30 focus:text-red-500"
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Separator orientation="vertical" />

      <Outlet />
    </div>
  )
}
