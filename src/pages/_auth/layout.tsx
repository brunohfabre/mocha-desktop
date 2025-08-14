import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import type { UnlistenFn } from '@tauri-apps/api/event'
import { onOpenUrl } from '@tauri-apps/plugin-deep-link'
import { message } from '@tauri-apps/plugin-dialog'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    if (useAuthStore.getState().token) {
      return redirect({ to: '/', replace: true })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  useEffect(() => {
    let test: UnlistenFn | null = null

    onOpenUrl(async (urls) => {
      const url = new URL(urls[0])

      const code = url.searchParams.get('code') ?? ''

      navigate({ to: '/callback', search: { code } })

      await message(`deep link: ${JSON.stringify(urls, null, 2)}`)
    }).then((result) => {
      test = result
    })

    return () => {
      if (test) {
        test()
      }
    }
  }, [navigate])

  return <Outlet />
}
