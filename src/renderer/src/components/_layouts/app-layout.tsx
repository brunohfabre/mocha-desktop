import { useAuthStore } from '@/stores/auth-store'
import { Navigate, Outlet } from 'react-router-dom'
import { Separator } from '../ui/separator'

export function AppLayout() {
  const token = useAuthStore((state) => state.token)

  const isMacOS = process.platform === 'darwin'

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="h-screen w-full antialiased flex flex-col">
      <div className="bg-red-200 region-drag flex h-[52px]">
        {isMacOS && <div className="w-[92px] h-full bg-violet-300" />}

        <div className="text-sm flex-1 flex items-center px-4">tabs</div>

        {!isMacOS && (
          <div className="flex h-full">
            <button
              type="button"
              className="px-4 flex-1 bg-blue-200 region-no-drag"
              onClick={() => window.api.window.minimize()}
            >
              --
            </button>
            <button
              type="button"
              className="px-4 flex-1 bg-green-200 region-no-drag"
              onClick={() => window.api.window.toggleMaximize()}
            >
              --
            </button>
            <button
              type="button"
              className="px-4 flex-1 bg-gray-200 region-no-drag"
              onClick={() => window.api.window.close()}
            >
              --
            </button>
          </div>
        )}
      </div>

      <Separator orientation="horizontal" />

      <div className="flex-1 flex">
        <aside className="w-[52px]" />

        <Separator orientation="vertical" />

        <Outlet />
      </div>
    </div>
  )
}
