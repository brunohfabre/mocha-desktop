import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Box, ChevronDown, Moon, Settings, Sun } from 'lucide-react'

import LogoDarkVector from '@/assets/logo-dark.png'
import LogoLightVector from '@/assets/logo-light.png'
import { useAuth } from '@/contexts/auth'
import { cn } from '@/lib/utils'
import { getShortName } from '@/utils/get-short-name'

import { useTheme } from '../theme-provider'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Workspaces } from './workspaces'

export function Sidebar() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  const { session, signOut } = useAuth()

  const [expanded, setExpanded] = useState(true)

  function handleChangeTheme() {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  function handleNavigateToProfile() {
    navigate('/profile')
  }

  function handleNavigateToCollections() {
    setExpanded(false)
    navigate('/collections')
  }

  function handleNavigateToWorkspaceSettings() {
    navigate('/workspaces/123')
  }

  function handleSignOut() {
    signOut()
  }

  return (
    <div
      className={cn(
        'w-64 border-r flex flex-col transition-all',
        !expanded && 'w-14',
      )}
    >
      <header
        className={cn(
          'border-b h-14 flex items-center justify-between transition-all',
          expanded && 'pr-3',
        )}
      >
        <Link
          to="/"
          className="px-3 h-14 flex items-center"
          onClick={() => setExpanded(true)}
        >
          <img
            src={theme === 'light' ? LogoLightVector : LogoDarkVector}
            alt="Mocha"
            className="w-10"
          />
        </Link>

        {expanded && (
          <Button variant="outline" size="icon" onClick={handleChangeTheme}>
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>
        )}
      </header>

      <Workspaces />

      <div className="flex-1 flex flex-col">
        <span
          className={cn(
            'px-3 pt-3 pb-0.5 text-xs text-zinc-400',
            !expanded && 'self-center',
          )}
        >
          {expanded ? 'General' : 'G'}
        </span>

        <button
          type="button"
          className={cn(
            'flex items-center justify-start gap-1.5 px-3 h-10 text-sm hover:bg-muted',
            !expanded && 'justify-center',
          )}
          onClick={handleNavigateToCollections}
        >
          <Box size={16} />
          {expanded && 'Collections'}
        </button>

        {/* <button
            type="button"
            className={cn(
              'flex items-center justify-start gap-1.5 px-3 h-10 text-sm enabled:hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed',
              !expanded && 'justify-center',
            )}
            onClick={handleNavigateToNotes}
            disabled
          >
            <StickyNote size={16} />
            {expanded && 'Notes'}
          </button>

          <button
            type="button"
            className={cn(
              'flex items-center justify-start gap-1.5 px-3 h-10 text-sm enabled:hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed',
              !expanded && 'justify-center',
            )}
            disabled
          >
            <Database size={16} />
            {expanded && 'Databases'}
          </button>

          <button
            type="button"
            className={cn(
              'flex items-center justify-start gap-1.5 px-3 h-10 text-sm enabled:hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed',
              !expanded && 'justify-center',
            )}
            disabled
          >
            <Lock size={16} />
            {expanded && 'Passwords'}
          </button> */}

        <span
          className={cn(
            'px-3 pt-3 pb-0.5 text-xs text-zinc-400',
            !expanded && 'self-center',
          )}
        >
          {expanded ? 'Workspace' : 'W'}
        </span>

        <button
          type="button"
          className={cn(
            'flex items-center justify-start gap-1.5 px-3 h-10 text-sm enabled:hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed',
            !expanded && 'justify-center',
          )}
          onClick={handleNavigateToWorkspaceSettings}
        >
          <Settings size={16} />

          {expanded && 'Workspace settings'}
        </button>
      </div>

      {/* {expanded && (
          <div className="border rounded-lg mb-3 mx-3 p-3 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <strong className="text-base font-medium">
                Premium account!
              </strong>

              <p className="text-sm text-gray-500">
                Upgrade to premium account that allows more new features
              </p>
            </div>

            <Button type="button" onClick={() => navigate('/upgrade')}>
              Upgrade
            </Button>
          </div>
        )} */}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className={cn(
              'border-t h-14 flex items-center gap-2 hover:bg-muted',
              expanded && 'px-3',
              !expanded && 'justify-center h-12',
            )}
          >
            <Avatar className={cn(!expanded && 'w-9 h-9')}>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback className="text-sm">
                {getShortName(session?.user.name ?? '')}
              </AvatarFallback>
            </Avatar>

            {expanded && (
              <>
                <div className="flex-1 flex flex-col">
                  <span className="text-sm font-semibold text-left">
                    {session?.user.name}
                  </span>
                  <span className="text-xs text-left">
                    {session?.user.email}
                  </span>
                </div>

                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={cn('w-[248px]', !expanded && 'mb-1')}
          side={expanded ? 'top' : 'right'}
        >
          <DropdownMenuItem onClick={handleNavigateToProfile}>
            Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
