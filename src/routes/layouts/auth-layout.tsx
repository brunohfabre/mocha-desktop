import { Navigate, Outlet } from 'react-router-dom'

import { authStore } from '@/stores/auth'

export function AuthLayout() {
  const token = authStore((state) => state.token)

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex h-screen w-full flex-col antialiased">
      <span>Auth layout</span>

      <Outlet />
    </div>
  )
}
