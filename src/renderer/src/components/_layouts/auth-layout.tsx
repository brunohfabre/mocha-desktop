import { useAuthStore } from '@/stores/auth-store'
import { Minus, Square, X } from 'lucide-react'
import { Navigate, Outlet } from 'react-router-dom'

export function AuthLayout() {
  const token = useAuthStore((state) => state.token)

  const isMacOS = process.platform === 'darwin'

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="h-screen w-full antialiased flex flex-col">
      <div className="region-drag flex h-[52px]">
        {isMacOS && <div className="w-[92px] h-full" />}

        <div className="flex-1" />

        {!isMacOS && (
          <div className="flex h-full">
            <button
              type="button"
              className="px-4 flex-1 region-no-drag hover:bg-muted"
              onClick={() => window.api.window.minimize()}
            >
              <Minus className="size-3" />
            </button>
            <button
              type="button"
              className="px-4 flex-1 region-no-drag hover:bg-muted"
              onClick={() => window.api.window.toggleMaximize()}
            >
              <Square className="size-3" />
            </button>
            <button
              type="button"
              className="px-4 flex-1 region-no-drag hover:bg-red-500 hover:text-white"
              onClick={() => window.api.window.close()}
            >
              <X className="size-4" />
            </button>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  )
}
