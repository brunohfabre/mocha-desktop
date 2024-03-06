import LogoLight from '@/assets/logo-light.png'
import { useAuth } from '@/contexts/auth'

import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu'

export function Sidebar() {
  const { session, signOut } = useAuth()

  function handleSignOut() {
    signOut()
  }

  return (
    <div className="w-64 border-r flex flex-col gap-3">
      <header className="h-14 flex items-center px-3">
        <img src={LogoLight} alt="Mocha" className="h-6" />
      </header>

      <div className="flex-1 flex flex-col px-3">
        <Button variant="ghost" className="flex items-center justify-start">
          Collections
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex px-3 items-center h-14 gap-2 cursor-pointer hover:bg-muted">
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>CN</AvatarFallback>
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
