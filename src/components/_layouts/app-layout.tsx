import { TitleBar } from '@/components/title-bar'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'

export function AppLayout() {
  const token = useAuthStore((state) => state.token)
  const setCredentials = useAuthStore((state) => state.setCredentials)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api.get('/profile').then((response) => {
      setCredentials(response.data)

      setIsLoading(false)
    })
  }, [setCredentials])

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="animate-bounce">is loading</span>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col antialiased">
      <TitleBar />

      <main className="flex-1 flex">
        {/* <Sidebar /> */}

        <Outlet />
      </main>
    </div>
  )
}
