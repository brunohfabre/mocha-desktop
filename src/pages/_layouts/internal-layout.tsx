import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { ChevronLeft } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores/auth'
import { getShortName } from '@/utils/get-short-name'

export function InternalLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const clearCredentials = useAuthStore((state) => state.clearCredentials)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  function handleGoBack() {
    navigate(-1)
  }

  function handleNavigateToProfile() {
    navigate('/profile')
  }

  function handleSignOut() {
    clearCredentials()
  }

  const isProfileRoute = location.pathname === '/profile'

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="h-14 border-b flex items-center justify-between px-3">
        <Button onClick={handleGoBack} size="icon" variant="outline">
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback className="text-sm">
                {getShortName(user?.name ?? '')}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[248px]" side="bottom" align="end">
            {!isProfileRoute && (
              <>
                <DropdownMenuItem onClick={handleNavigateToProfile}>
                  Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuItem onClick={handleSignOut}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <Outlet />
    </div>
  )
}
