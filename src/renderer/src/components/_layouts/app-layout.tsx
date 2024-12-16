import { useAuthStore } from '@/stores/auth-store'
import { getShortName } from '@/utils/get-short-name'
import { Minus, Square, X } from 'lucide-react'
import { Navigate, Outlet } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
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
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const clearCredentials = useAuthStore((state) => state.clearCredentials)

  const isMacOS = process.platform === 'darwin'

  function handleSignOut() {
    clearCredentials()
  }

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="h-screen w-full antialiased flex flex-col">
      <div className="region-drag flex h-[52px]">
        {isMacOS && <div className="w-[92px] h-full" />}

        <div className="text-sm flex-1 flex items-center px-4">tabs</div>

        {!isMacOS && (
          <div className="flex h-full">
            <button
              type="button"
              className="px-4 flex-1 region-no-drag hover:bg-muted"
              onClick={() => window.api.window.minimize()}
            >
              <Minus className="size-3" />
            </button>
            <button
              type="button"
              className="px-4 flex-1 region-no-drag hover:bg-muted"
              onClick={() => window.api.window.toggleMaximize()}
            >
              <Square className="size-3" />
            </button>
            <button
              type="button"
              className="px-4 flex-1 region-no-drag hover:bg-red-500 hover:text-white"
              onClick={() => window.api.window.close()}
            >
              <X className="size-4" />
            </button>
          </div>
        )}
      </div>

      <Separator orientation="horizontal" />

      <div className="flex-1 flex">
        <aside className="w-[52px] flex flex-col">
          <div className="bg-red-200 flex-1" />

          <DropdownMenu>
            <DropdownMenuTrigger className="h-[52px] hover:bg-muted justify-center flex items-center">
              <Avatar className="size-9">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback>{getShortName(user?.name)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end" alignOffset={4}>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </aside>

        <Separator orientation="vertical" />

        <Outlet />
      </div>
    </div>
  )
}
