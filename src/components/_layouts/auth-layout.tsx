import { useAuthStore } from '@/stores/auth'
import type { UnlistenFn } from '@tauri-apps/api/event'
import { onOpenUrl } from '@tauri-apps/plugin-deep-link'
import { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'

export function AuthLayout() {
  const navigate = useNavigate()

  const token = useAuthStore((state) => state.token)

  useEffect(() => {
    let sub: UnlistenFn

    onOpenUrl((urls) => {
      console.log(urls)

      const url = new URL(urls[0])

      const token = url.searchParams.get('token')

      if (!token) {
        return
      }

      navigate(`/auth/github/${token}`)
    }).then((unlistenFn) => {
      sub = unlistenFn
    })

    return () => {
      if (sub) {
        sub()
      }
    }
  }, [navigate])

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="h-screen flex flex-col antialiased">
      <Outlet />
    </div>
  )
}
