import { useAuthStore } from '@/stores/auth-store'
import { Navigate, Outlet } from 'react-router'
import { Sidebar } from '../sidebar'
import { TitleBar } from '../title-bar'

export function AppLayout() {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="h-screen antialiased flex flex-col bg-sidebar">
      <TitleBar />

      <main className="flex flex-1">
        <Sidebar />

        <div className="flex flex-col flex-1 mb-2 mr-2 bg-background rounded-lg shadow-sm ">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
