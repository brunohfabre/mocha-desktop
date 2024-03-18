import { Navigate, Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'
import { Tabs } from '@/components/tabs'
import { useAuthStore } from '@/stores/auth'

export function AppLayout() {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="min-h-screen w-full flex antialiased">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Tabs />

        <Outlet />
      </div>
    </div>
  )
}
