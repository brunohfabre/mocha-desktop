import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'
import { getShortName } from '@/utils/get-short-name'
import {
  Bell,
  Database,
  House,
  LockKeyhole,
  LogOut,
  Notebook,
  StickyNote,
  User,
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)
  const clearCredentials = useAuthStore((state) => state.clearCredentials)

  function signOut() {
    clearCredentials()
  }

  const shortName = getShortName(user?.name ?? '')

  function handleNavigateToHome() {
    navigate('/')
  }

  function handleNavigateToCollections() {
    navigate('/collections')
  }

  function handleNavigateToNotes() {
    navigate('/notes')
  }

  function handleNavigateToDatabases() {
    navigate('/databases')
  }

  function handleNavigateToPasswords() {
    navigate('/passwords')
  }

  return (
    <aside className="w-[52px] flex flex-col p-2 justify-between">
      <div className="gap-1 flex flex-col">
        <Button
          size="icon"
          variant={location.pathname === '/' ? 'secondary' : 'ghost'}
          className={cn(location.pathname !== '/' && 'text-zinc-400')}
          onClick={handleNavigateToHome}
        >
          <House />
        </Button>

        <Button
          size="icon"
          variant={location.pathname === '/collections' ? 'secondary' : 'ghost'}
          className={cn(
            location.pathname !== '/collections' && 'text-zinc-400'
          )}
          onClick={handleNavigateToCollections}
        >
          <Notebook />
        </Button>

        <Button
          size="icon"
          disabled
          variant={location.pathname === '/notes' ? 'secondary' : 'ghost'}
          className={cn(location.pathname !== '/notes' && 'text-zinc-400')}
          onClick={handleNavigateToNotes}
        >
          <StickyNote />
        </Button>

        <Button
          size="icon"
          disabled
          variant={location.pathname === '/databases' ? 'secondary' : 'ghost'}
          className={cn(location.pathname !== '/databases' && 'text-zinc-400')}
          onClick={handleNavigateToDatabases}
        >
          <Database />
        </Button>

        <Button
          size="icon"
          disabled
          variant={location.pathname === '/passwords' ? 'secondary' : 'ghost'}
          className={cn(location.pathname !== '/passwords' && 'text-zinc-400')}
          onClick={handleNavigateToPasswords}
        >
          <LockKeyhole />
        </Button>
      </div>
      <div className="flex-1" />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="size-9">
                  <AvatarImage src={user?.avatarUrl} />
                  <AvatarFallback>{shortName}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="min-w-56"
                side="right"
                align="end"
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                      <AvatarFallback className="rounded-lg">
                        {shortName}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.name}
                      </span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="text-foreground" />
                    Account
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Bell className="text-foreground" />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="text-foreground" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent side="right">Log out</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </aside>
  )
}
