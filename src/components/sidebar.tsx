import { useLocation, useNavigate } from 'react-router-dom'

import {
  Bell,
  Check,
  ChevronDown,
  ChevronsUpDown,
  Database,
  Files,
  KeyRound,
  Plus,
  Settings,
  StickyNote,
} from 'lucide-react'

import { useTabs } from '@/contexts/tabs'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'

import { useTheme, type Theme } from './theme-provider'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
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
} from './ui/dropdown-menu'
import { Separator } from './ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const clearCredentials = useAuthStore((state) => state.clearCredentials)

  const { theme, setTheme } = useTheme()
  const { tabs, addTab } = useTabs()

  const isMinimized = tabs.length > 0

  function handleNavigateToOrganizations() {
    navigate('/organizations')
  }

  function handleNavigateToCreateOrganization() {
    navigate('/create-organization')
  }

  function handleNavigateToCollections() {
    navigate('/collections')

    addTab({
      id: crypto.randomUUID(),
      name: 'Collections',
      pinned: false,
      route: '/collections',
    })
  }

  function handleNavigateToDatabases() {
    navigate('/databases')

    addTab({
      id: crypto.randomUUID(),
      name: 'Databases',
      pinned: false,
      route: '/databases',
    })
  }

  function handleNavigateToPasswords() {
    navigate('/passwords')

    addTab({
      id: crypto.randomUUID(),
      name: 'Passwords',
      pinned: false,
      route: '/passwords',
    })
  }

  function handleNavigateToNotes() {
    navigate('/notes')

    addTab({
      id: crypto.randomUUID(),
      name: 'Notes',
      pinned: false,
      route: '/notes',
    })
  }

  function handleNavigateToOrganization() {
    navigate('/organizations/123123')
  }

  function handleNavigateToNotifications() {
    navigate('/notifications')
  }

  function handleNavigateToAccount() {
    navigate('/account')
  }

  function handleSignOut() {
    clearCredentials()
  }

  return (
    <div className={cn('flex w-64 flex-col', isMinimized && 'w-[52px]')}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              'flex h-[52px] cursor-pointer items-center justify-between pl-4 pr-2 text-sm hover:bg-muted',
              isMinimized && ' px-0 justify-center',
            )}
          >
            {!isMinimized && 'Organization #2'}
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={cn(
            'min-w-[calc(var(--radix-dropdown-menu-trigger-width)-8px)]',
            isMinimized && 'min-w-56',
          )}
          align="start"
          alignOffset={4}
        >
          <DropdownMenuItem>Organization #1</DropdownMenuItem>
          <DropdownMenuItem className="justify-between">
            Organization #2
            <Check className="size-4" />
          </DropdownMenuItem>
          <DropdownMenuItem>Organization #3</DropdownMenuItem>
          <DropdownMenuItem>Organization #4</DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleNavigateToOrganizations}>
            All organizations
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleNavigateToCreateOrganization}>
            <Plus className="mr-2 size-4" /> Create organization
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="horizontal" />

      <div className="flex flex-1 flex-col p-2">
        <span
          className={cn(
            'text-xs text-muted-foreground mx-2 py-1',
            isMinimized && 'mx-0 text-center',
          )}
        >
          {isMinimized ? 'Gen.' : 'General'}
        </span>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={
                  location.pathname === '/collections' ? 'default' : 'ghost'
                }
                className={cn(
                  'justify-start gap-2 px-2 font-normal',
                  isMinimized && 'justify-center',
                )}
                onClick={handleNavigateToCollections}
              >
                <Files className="size-4 stroke-[1.5px]" />
                {!isMinimized && 'Collections'}
              </Button>
            </TooltipTrigger>

            {isMinimized && (
              <TooltipContent side="right">Collections</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={
                  location.pathname === '/databases' ? 'default' : 'ghost'
                }
                className={cn(
                  'justify-start gap-2 px-2 font-normal',
                  isMinimized && 'justify-center',
                )}
                onClick={handleNavigateToDatabases}
                disabled
              >
                <Database className="size-4 stroke-[1.5px]" />
                {!isMinimized && 'Databases'}
              </Button>
            </TooltipTrigger>
            {isMinimized && (
              <TooltipContent side="right">Databases</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={
                  location.pathname === '/passwords' ? 'default' : 'ghost'
                }
                className={cn(
                  'justify-start gap-2 px-2 font-normal',
                  isMinimized && 'justify-center',
                )}
                onClick={handleNavigateToPasswords}
                disabled
              >
                <KeyRound className="size-4 stroke-[1.5px]" />
                {!isMinimized && 'Passwords'}
              </Button>
            </TooltipTrigger>
            {isMinimized && (
              <TooltipContent side="right">Passwords</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={location.pathname === '/notes' ? 'default' : 'ghost'}
                className={cn(
                  'justify-start gap-2 px-2 font-normal',
                  isMinimized && 'justify-center',
                )}
                onClick={handleNavigateToNotes}
                disabled
              >
                <StickyNote className="size-4 stroke-[1.5px]" />
                {!isMinimized && 'Notes'}
              </Button>
            </TooltipTrigger>
            {isMinimized && <TooltipContent side="right">Notes</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* <div className="px-2">
        <div className="rounded-md bg-primary p-4">
          <p className="text-sm text-muted">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam
            praesentium neque nulla numquam unde.
          </p>
        </div>
      </div> */}

      <div className="flex flex-col p-2">
        <span
          className={cn(
            'text-xs text-muted-foreground mx-2 py-1',
            isMinimized && 'mx-0 text-center',
          )}
        >
          {isMinimized ? 'Set.' : 'Settings'}
        </span>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  'justify-start gap-2 px-2 font-normal',
                  isMinimized && 'justify-center',
                )}
                onClick={handleNavigateToOrganization}
                disabled={false}
              >
                <Settings className="size-4 stroke-[1.5px]" />
                {!isMinimized && 'Organization Settings'}
              </Button>
            </TooltipTrigger>
            {isMinimized && (
              <TooltipContent side="right">
                Organization Settings
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  'justify-start gap-2 px-2 font-normal',
                  isMinimized && 'justify-center',
                )}
                onClick={handleNavigateToNotifications}
                disabled={false}
              >
                <div className="relative">
                  <Bell className="size-4 stroke-[1.5px]" />
                  <div className="absolute -right-0.5 -top-0.5 ml-auto size-2 rounded-full bg-orange-500" />
                </div>
                {!isMinimized && 'Notifications'}
              </Button>
            </TooltipTrigger>
            {isMinimized && (
              <TooltipContent side="right">Notifications</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      <Separator orientation="horizontal" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <footer className="flex h-[52px] cursor-pointer items-center gap-2 px-2 hover:bg-muted">
            <Avatar className="size-9">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            {!isMinimized && (
              <>
                <div className="flex-1">
                  <p className="text-sm font-medium">John Doe</p>
                </div>

                <ChevronDown className="size-4 text-muted-foreground" />
              </>
            )}
          </footer>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={cn(
            'min-w-[calc(var(--radix-dropdown-menu-trigger-width)-8px)]',
            isMinimized && 'min-w-56',
          )}
          align="start"
          alignOffset={4}
        >
          <div className="mb-2 flex flex-col p-2">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-sm text-muted-foreground">johndoe@email.com</p>
          </div>
          <DropdownMenuItem onClick={handleNavigateToAccount}>
            Account settings
          </DropdownMenuItem>

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
  )
}
