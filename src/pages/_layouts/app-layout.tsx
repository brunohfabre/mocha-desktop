import { Navigate, Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'
import { useAuth } from '@/contexts/auth'

export function AppLayout() {
  const { session } = useAuth()

  if (!session) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="min-h-screen w-full flex">
      <Sidebar />

      <Outlet />
    </div>
  )
}
