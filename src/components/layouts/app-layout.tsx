import { useAuthStore } from '@/stores/auth-store'
import { Navigate, Outlet } from 'react-router'

export function AppLayout() {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="h-screen antialiased">
      <Outlet />
    </div>
  )
}
