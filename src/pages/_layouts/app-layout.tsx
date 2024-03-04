import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/contexts/auth'

export function AppLayout() {
  const { session } = useAuth()

  if (!session) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div>
      <span>app layout</span>

      <Outlet />
    </div>
  )
}
