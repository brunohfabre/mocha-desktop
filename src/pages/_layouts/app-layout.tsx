import { Navigate, Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'
import { Tabs } from '@/components/tabs'
import { useAuthStore } from '@/stores/auth'
import { useTabs } from '@/stores/tabs'

export function AppLayout() {
  const token = useAuthStore((state) => state.token)

  const tabs = useTabs((state) => state.tabs)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="min-h-screen w-full flex antialiased">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {!!tabs.length && <Tabs />}

        <Outlet />
      </div>
    </div>
  )
}
