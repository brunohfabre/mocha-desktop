import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '@/stores/auth'

export function AuthLayout() {
  const token = useAuthStore((state) => state.token)

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex h-screen w-full flex-col antialiased">
      <Outlet />
    </div>
  )
}
