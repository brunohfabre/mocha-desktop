import { useAuthStore } from '@/stores/auth-store'
import { Navigate, Outlet } from 'react-router-dom'

export function AuthLayout() {
  const token = useAuthStore((state) => state.token)

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="h-screen w-full antialiased flex">
      <Outlet />
    </div>
  )
}
