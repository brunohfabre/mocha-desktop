import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export function GithubAuth() {
  const navigate = useNavigate()
  const params = useParams<{ token: string }>()

  const setCredentials = useAuthStore((state) => state.setCredentials)

  useEffect(() => {
    api
      .get('/profile', {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      })
      .then((response) => {
        if (!params.token) {
          navigate('/sign-in', {
            replace: true,
          })

          return
        }

        setCredentials({
          token: params.token,
          user: response.data.user,
        })
      })
  }, [navigate, params.token, setCredentials])

  return (
    <div className="flex-1 flex items-center justify-center">
      <p className="animate-bounce">Loading info</p>
    </div>
  )
}
