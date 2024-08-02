import { Navigate, Outlet } from 'react-router-dom'

import { TitleBar } from '@/components/title-bar'
import { useAuthStore } from '@/stores/auth'

export function AuthLayout() {
  const token = useAuthStore((state) => state.token)

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex h-screen w-full flex-col antialiased">
      <TitleBar />

      <Outlet />
    </div>
  )
}
