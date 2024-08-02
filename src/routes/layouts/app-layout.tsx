import { Navigate, Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'
import { Tabs } from '@/components/tabs'
import { TitleBar } from '@/components/title-bar'
import { Separator } from '@/components/ui/separator'
import { AppProvider } from '@/contexts'
import { useAuthStore } from '@/stores/auth'

export function AppLayout() {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <AppProvider>
      <div className="flex h-screen w-full flex-col overflow-auto antialiased">
        <TitleBar />

        <div className="flex flex-1">
          <Sidebar />

          <Separator orientation="vertical" />

          <div className="flex flex-1 flex-col overflow-auto">
            <Tabs />

            <Separator orientation="horizontal" />
            <Outlet />
          </div>
        </div>
      </div>
    </AppProvider>
  )
}
