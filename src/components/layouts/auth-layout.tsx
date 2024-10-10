import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '@/stores/auth-store'

export function AuthLayout() {
  const token = useAuthStore((state) => state.token)

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex h-screen w-full antialiased">
      <Outlet />
    </div>
  )
}
