import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import LogoLight from '@/assets/logo-light.png'
import { useTheme, type Theme } from '@/components/theme-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/stores/auth'

export function InternalLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const { theme, setTheme } = useTheme()

  const token = useAuthStore((state) => state.token)
  const clearCredentials = useAuthStore((state) => state.clearCredentials)

  const isAccountRoute = location.pathname.includes('account')

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  function handleNavigateToAccount() {
    navigate('/account')
  }

  function handleSignOut() {
    clearCredentials()
  }

  return (
    <div className="flex h-screen w-full flex-col antialiased">
      <div className="flex items-center justify-between px-4 py-2">
        <Link to="/" replace>
          <img src={LogoLight} alt="Mocha" className="w-10" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="size-9">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-48" align="end">
            <div className="mb-2 flex flex-col p-2">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">johndoe@email.com</p>
            </div>

            {!isAccountRoute && (
              <DropdownMenuItem onClick={handleNavigateToAccount}>
                Account settings
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={(value) => setTheme(value as Theme)}
                  >
                    <DropdownMenuRadioItem value="light">
                      Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      System
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-red-500 focus:text-red-600"
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator orientation="horizontal" />

      <Outlet />
    </div>
  )
}
