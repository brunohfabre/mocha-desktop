import { useLocation, useNavigate } from 'react-router-dom'

import LogoLight from '@/assets/logo-light.png'
import { useAuth } from '@/contexts/auth'
import { getShortName } from '@/utils/get-short-name'

import { Avatar, AvatarFallback } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu'
import { Workspaces } from './workspaces'

export function Sidebar() {
  const { session, signOut } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const isShort = location.pathname !== '/'

  function handleSignOut() {
    signOut()
  }

  function handleNavigateToHome() {
    navigate('/')
  }

  function handleNavigateToCollections() {
    navigate('/collections')
  }

  return (
    <div
      data-is-short={isShort}
      className="w-64 border-r flex flex-col data-[is-short=true]:w-14"
    >
      <header className="h-14 flex border-b">
        <button
          type="button"
          className="flex-1 px-3"
          onClick={handleNavigateToHome}
        >
          <img src={LogoLight} alt="Mocha" className="w-9" />
        </button>
      </header>

      <Workspaces />

      <div
        data-is-short={isShort}
        className="flex-1 flex flex-col py-2 border-b group"
      >
        <button
          type="button"
          className="text-sm h-10 flex items-center px-3 group-data-[is-short=true]:justify-center hover:bg-muted"
          onClick={handleNavigateToCollections}
        >
          {isShort ? 'C' : 'Collections'}
        </button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            data-is-short={isShort}
            className="flex px-3 items-center h-14 gap-2 cursor-pointer hover:bg-muted group data-[is-short=true]:p-0 data-[is-short=true]:justify-center"
          >
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>
                {getShortName(session?.user.name ?? '')}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col group-data-[is-short=true]:hidden">
              <p className="text-sm font-semibold">{session?.user.name}</p>
              <span className="text-xs">{session?.user.email}</span>
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-60">
          <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
