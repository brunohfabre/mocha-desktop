import { Navigate, Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'
import { Separator } from '@/components/ui/separator'
import { authStore } from '@/stores/auth'

export function AppLayout() {
  const token = authStore((state) => state.token)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="flex h-screen w-full antialiased">
      <Sidebar />

      <Separator orientation="vertical" />

      <Outlet />
    </div>
  )
}
