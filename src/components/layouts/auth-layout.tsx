import { useAuthStore } from '@/stores/auth-store'
import { Navigate, Outlet } from 'react-router'

export function AuthLayout() {
  const token = useAuthStore((state) => state.token)

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="h-screen antialiased flex">
      <Outlet />
    </div>
  )
}
