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

  function handleSignOut() {
    signOut()
  }

  return (
    <div className="w-64 border-r flex flex-col">
      <header className="h-14 flex items-center px-3 border-b">
        <img src={LogoLight} alt="Mocha" className="h-6" />
      </header>

      <Workspaces />

      <div className="flex-1 flex flex-col py-3 border-b">
        <button
          type="button"
          className="text-sm h-10 flex items-center px-3 hover:bg-muted"
        >
          Collections
        </button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex px-3 items-center h-14 gap-2 cursor-pointer hover:bg-muted">
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>
                {getShortName(session?.user.name ?? '')}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
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
