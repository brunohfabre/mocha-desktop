import { useNavigate } from 'react-router-dom'

import {
  Bell,
  ChevronDown,
  ChevronsUpDown,
  Database,
  Files,
  KeyRound,
  Settings,
  StickyNote,
} from 'lucide-react'

import LogoLight from '@/assets/images/logo-light.png'
import { authStore } from '@/stores/auth'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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

  const clearCredentials = authStore((state) => state.clearCredentials)

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

  function handleNavigateToAccount() {
    navigate('/account')
  }

  function handleSignOut() {
    clearCredentials()
  }

  return (
    <div className="flex w-64 flex-col">
      <header className="flex h-[52px] items-center px-4">
        <img src={LogoLight} alt="Mocha" className="w-10" />
      </header>

      <Separator orientation="horizontal" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex h-[52px] cursor-pointer items-center justify-between pl-4 pr-2 text-sm hover:bg-muted">
            organizations
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[calc(var(--radix-dropdown-menu-trigger-width)-8px)]">
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          <DropdownMenuItem>Org #1</DropdownMenuItem>
          <DropdownMenuItem>Org #2</DropdownMenuItem>
          <DropdownMenuItem>Org #3</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleNavigateToCreateOrganization}>
            + Create organization
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="horizontal" />

      <div className="flex flex-1 flex-col p-2">
        <Button
          type="button"
          variant="ghost"
          className="justify-start gap-2 px-2 font-normal"
          onClick={handleNavigateToCollections}
        >
          <Files className="size-4 stroke-[1.5px]" />
          Collections
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="justify-start gap-2 px-2 font-normal"
          onClick={handleNavigateToDatabases}
          disabled={false}
        >
          <Database className="size-4 stroke-[1.5px]" />
          Databases
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="justify-start gap-2 px-2 font-normal"
          onClick={handleNavigateToPasswords}
          disabled={false}
        >
          <KeyRound className="size-4 stroke-[1.5px]" />
          Passwords
        </Button>
        <Button
          type="button"
          variant="ghost"
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
        <Button
          type="button"
          variant="ghost"
          className="justify-start gap-2 px-2 font-normal"
          onClick={handleNavigateToPasswords}
          disabled={false}
        >
          <Settings className="size-4 stroke-[1.5px]" />
          Organization settings
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="justify-start gap-2 px-2 font-normal"
          onClick={handleNavigateToNotes}
          disabled={false}
        >
          <Bell className="size-4 stroke-[1.5px]" />
          Notifications
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
          <DropdownMenuItem onClick={handleNavigateToAccount}>
            Profile
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value="light"
                  onValueChange={console.log}
                >
                  <DropdownMenuRadioItem value="light">
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark" disabled>
                    Dark
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
