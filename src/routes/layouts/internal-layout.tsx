import { Navigate, Outlet } from 'react-router-dom'

import { authStore } from '@/stores/auth'

export function InternalLayout() {
  const token = authStore((state) => state.token)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="h-screen w-full antialiased">
      <span>Internal layout</span>

      <Outlet />
    </div>
  )
}
