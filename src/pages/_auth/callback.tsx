import {
  createFileRoute,
  redirect,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { useEffect } from 'react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'

export const Route = createFileRoute('/_auth/callback')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      code: (search.code as string) ?? '',
    }
  },
})

function RouteComponent() {
  const navigate = useNavigate()
  const location = useLocation()

  const setCredentials = useAuthStore((state) => state.setCredentials)

  useEffect(() => {
    async function authenticate() {
      try {
        const response = await api.post('/auth/github', {
          code: location.search.code,
        })

        setCredentials(response.data)

        navigate({
          to: '/',
          replace: true,
        })
      } catch {
        navigate({
          to: '/sign-in',
          replace: true,
        })
      }
    }

    if (location.search.code) {
      authenticate()
    }
  }, [location.search.code, setCredentials, navigate])

  if (!location.search.code) {
    return redirect({
      to: '/sign-in',
      replace: true,
    })
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <span className="text-sm">Entrando com o GitHub...</span>
    </div>
  )
}
