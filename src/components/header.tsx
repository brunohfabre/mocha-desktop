import { Link, useNavigate } from '@tanstack/react-router'
import { platform } from '@tauri-apps/plugin-os'
import Logo from '@/assets/logo.png'
import { useAuthStore } from '@/stores/auth'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Separator } from './ui/separator'

export function Header() {
  const navigate = useNavigate()

  const currentPlatform = platform()

  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const clearCredentials = useAuthStore((state) => state.clearCredentials)

  function handleSignOut() {
    clearCredentials()

    navigate({
      to: '/sign-in',
      replace: true,
    })
  }

  return (
    <>
      <div className="h-10 w-full flex" data-tauri-drag-region>
        {token && (
          <>
            {currentPlatform === 'macos' && (
              <>
                <div className="w-20" data-tauri-drag-region />

                <Separator orientation="vertical" />
              </>
            )}

            <Link
              to="/"
              className="px-3 flex items-center gap-1.5"
              data-tauri-drag-region
            >
              <img src={Logo} alt="" className="max-h-6" />

              <span className="text-base font-bold">Mocha</span>
            </Link>

            <Separator orientation="vertical" />

            <div className="flex-1" data-tauri-drag-region />

            <Separator orientation="vertical" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="size-10 flex items-center justify-center">
                  <Avatar>
                    <AvatarImage src={user?.avatarUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="min-w-48"
                alignOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center px-2 py-1.5 text-left text-sm">
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{user?.name}</span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>

      {token && <Separator />}
    </>
  )
}
