import { Navigate, Outlet } from 'react-router-dom'

import { authStore } from '@/stores/auth'

export function AppLayout() {
  const token = authStore((state) => state.token)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="h-screen w-full antialiased">
      <span>app layout</span>

      <Outlet />
    </div>
  )
}
