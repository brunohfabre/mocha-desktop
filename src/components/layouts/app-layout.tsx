import Logo from '@/assets/logo.svg'
import { useAuthStore } from '@/stores/auth-store'
import { CaretDown, MagnifyingGlass, X } from '@phosphor-icons/react'
import { Navigate, Outlet, useLocation } from 'react-router'

import { cn } from '@/lib/utils'
import { TitleBar } from '../title-bar'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Separator } from '../ui/separator'

export function AppLayout() {
  const location = useLocation()

  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="h-screen antialiased flex flex-col">
      <TitleBar>
        <div className="flex-1 flex" data-tauri-drag-region>
          <button
            type="button"
            className={cn(
              'gap-1.5 font-semibold flex text-base h-[52px] px-4 items-center cursor-pointer',
              location.pathname === '/' && 'bg-muted'
            )}
          >
            <img src={Logo} alt="" className="w-6" />
            Mocha
          </button>

          <Separator orientation="vertical" />

          <button
            type="button"
            className="h-[52px] gap-4 min-w-48 justify-between flex items-center px-4 text-sm cursor-pointer hover:bg-muted transition-colors"
          >
            Workspace #1
            <CaretDown size={16} />
          </button>

          <Separator orientation="vertical" />

          <button
            type="button"
            className="flex pl-4 pr-2 items-center text-sm gap-3 cursor-pointer hover:bg-muted transition-colors text-muted-foreground"
          >
            Tab one
            <button
              type="button"
              className="p-1 cursor-pointer hover:bg-zinc-200 transition-colors"
            >
              <X size={12} />
            </button>
          </button>

          <Separator orientation="vertical" />

          <button
            type="button"
            className="flex pl-4 pr-2 items-center text-sm gap-3 cursor-pointer hover:bg-muted transition-colors text-muted-foreground"
          >
            Tab two
            <button
              type="button"
              className="p-1 cursor-pointer hover:bg-zinc-200 transition-colors"
            >
              <X size={12} />
            </button>
          </button>

          <Separator orientation="vertical" />

          <button
            type="button"
            className="flex pl-4 pr-2 items-center text-sm gap-3 cursor-pointer hover:bg-muted transition-colors text-muted-foreground"
          >
            Tab three
            <button
              type="button"
              className="p-1 cursor-pointer hover:bg-zinc-200 transition-colors"
            >
              <X size={12} />
            </button>
          </button>

          <Separator orientation="vertical" />
        </div>

        <div className="flex">
          <Separator orientation="vertical" />

          <button
            type="button"
            className="size-[52px] flex items-center justify-center cursor-pointer hover:bg-muted transition-colors"
          >
            <MagnifyingGlass size={16} />
          </button>

          <Separator orientation="vertical" />

          <button
            type="button"
            className="w-[52px] px-4 flex items-center justify-center cursor-pointer hover:bg-muted transition-colors"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </TitleBar>

      <Separator orientation="horizontal" />

      <Outlet />
    </div>
  )
}
