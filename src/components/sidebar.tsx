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

import { authStore } from '@/stores/auth'

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

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const { theme, setTheme } = useTheme()

  const clearCredentials = authStore((state) => state.clearCredentials)

  function handleNavigateToOrganizations() {
    navigate('/organizations')
  }

  function handleNavigateToCreateOrganization() {
    navigate('/create-organization')
  }

  function handleNavigateToCollections() {
    navigate('/collections')
  }

  function handleNavigateToDatabases() {
    navigate('/databases')
  }

  function handleNavigateToPasswords() {
    navigate('/passwords')
  }

  function handleNavigateToNotes() {
    navigate('/notes')
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
    <div className="flex w-64 flex-col">
      {/* <header className="flex h-[52px] items-center px-4">
        <img src={LogoLight} alt="Mocha" className="w-10" />
      </header>

      <Separator orientation="horizontal" /> */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex h-[52px] cursor-pointer items-center justify-between pl-4 pr-2 text-sm hover:bg-muted">
            organizations
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[calc(var(--radix-dropdown-menu-trigger-width)-8px)]">
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
        <div className="px-2">
          <span className="text-xs text-muted-foreground">General</span>
        </div>

        <Button
          type="button"
          variant={
            location.pathname.includes('collections') ? 'default' : 'ghost'
          }
          className="justify-start gap-2 px-2 font-normal"
          onClick={handleNavigateToCollections}
        >
          <Files className="size-4 stroke-[1.5px]" />
          Collections
        </Button>
        <Button
          type="button"
          variant={
            location.pathname.includes('databases') ? 'default' : 'ghost'
          }
          className="justify-start gap-2 px-2 font-normal"
          onClick={handleNavigateToDatabases}
          disabled={false}
        >
          <Database className="size-4 stroke-[1.5px]" />
          Databases
        </Button>
        <Button
          type="button"
          variant={
            location.pathname.includes('passwords') ? 'default' : 'ghost'
          }
          className="justify-start gap-2 px-2 font-normal"
          onClick={handleNavigateToPasswords}
          disabled={false}
        >
          <KeyRound className="size-4 stroke-[1.5px]" />
          Passwords
        </Button>
        <Button
          type="button"
          variant={location.pathname.includes('notes') ? 'default' : 'ghost'}
          className="justify-start gap-2 px-2 font-normal"
          onClick={handleNavigateToNotes}
          disabled={false}
        >
          <StickyNote className="size-4 stroke-[1.5px]" />
          Notes
        </Button>
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
        <div className="px-2">
          <span className="text-xs text-muted-foreground">General</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="justify-start gap-2 px-2 font-normal"
          onClick={handleNavigateToOrganization}
          disabled={false}
        >
          <Settings className="size-4 stroke-[1.5px]" />
          Organization settings
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="justify-start gap-2 px-2 font-normal"
          onClick={handleNavigateToNotifications}
          disabled={false}
        >
          <Bell className="size-4 stroke-[1.5px]" />
          Notifications
          <div className="ml-auto size-2 rounded-full bg-orange-500" />
        </Button>
      </div>

      <Separator orientation="horizontal" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <footer className="flex h-[52px] cursor-pointer items-center gap-2 px-2 hover:bg-muted">
            <Avatar className="size-9">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
            </div>

            <ChevronDown className="size-4 text-muted-foreground" />
          </footer>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[calc(var(--radix-dropdown-menu-trigger-width)-8px)]">
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
