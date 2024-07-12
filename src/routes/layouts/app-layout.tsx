import { Navigate, Outlet } from 'react-router-dom'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { authStore } from '@/stores/auth'

export function AppLayout() {
  const token = authStore((state) => state.token)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="flex h-screen w-full overflow-auto antialiased">
      <Sidebar />

      <Separator orientation="vertical" />

      <div className="flex flex-1 flex-col overflow-auto">
        <div className="flex">
          <div className="flex p-2">
            <Button type="button" className="px-1.5" variant="ghost">
              <ChevronLeft className="size-3.5" />
            </Button>
            <Button type="button" className="px-1.5" variant="ghost">
              <ChevronRight className="size-3.5" />
            </Button>
          </div>

          <div className="flex flex-1 overflow-auto p-2">
            <Button type="button" variant="outline" className="pr-0">
              Page name #1
              <button className="mx-2 flex size-6 items-center justify-center rounded-sm">
                <X className="size-3.5" />
              </button>
            </Button>

            <Button type="button" variant="ghost" className="pr-0">
              Page name #2
              <button className="mx-2 flex size-6 items-center justify-center rounded-sm">
                <X className="size-3.5" />
              </button>
            </Button>

            <Button type="button" variant="ghost" className="pr-0">
              Page name #3
              <button className="mx-2 flex size-6 items-center justify-center rounded-sm">
                <X className="size-3.5" />
              </button>
            </Button>
          </div>
        </div>

        <Separator orientation="horizontal" />
        <Outlet />
      </div>
    </div>
  )
}
