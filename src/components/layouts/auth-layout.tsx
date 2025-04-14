import { useAuthStore } from '@/stores/auth-store'
import { Navigate, Outlet } from 'react-router'
import { TitleBar } from '../title-bar'

export function AuthLayout() {
  const token = useAuthStore((state) => state.token)

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="h-screen antialiased flex flex-col">
      <TitleBar />

      <Outlet />
    </div>
  )
}
