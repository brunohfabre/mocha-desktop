import { useAuthStore } from '@/stores/auth-store'
import { Navigate, Outlet } from 'react-router'
import { Sidebar } from '../sidebar'
import { TitleBar } from '../title-bar'
import { Separator } from '../ui/separator'

export function AppLayout() {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="h-screen antialiased flex flex-col">
      <TitleBar />

      <Separator orientation="horizontal" />

      <main className="flex flex-1">
        <Sidebar />

        <Separator orientation="vertical" />

        <Outlet />
      </main>
    </div>
  )
}
