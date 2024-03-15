import { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

import { toast } from 'sonner'

import { Sidebar } from '@/components/sidebar'
import { Tabs } from '@/components/tabs'
import { useAuth } from '@/contexts/auth'
import { api } from '@/lib/api'

export function AppLayout() {
  const { session, signOut } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error.code === 'ERR_NETWORK') {
          toast.error('Service not available. Try again later.')
        }

        if (error.response.status === 401) {
          signOut()

          return
        }

        toast.error(error.response.data.message)

        return Promise.reject(error)
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate, signOut])

  if (!session) {
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
