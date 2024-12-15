import GithubLogo from '@/assets/images/github-mark.png'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth-store'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Github() {
  const navigate = useNavigate()

  const setCredentials = useAuthStore((state) => state.setCredentials)

  const [isLoading, setIsLoading] = useState(false)

  function handleBack() {
    navigate(-1)
  }

  useEffect(() => {
    window.api.onDeepLink(async ({ url }: { url: string }) => {
      setIsLoading(true)

      if (isLoading) {
        return
      }

      if (!url.includes('/auth/github')) {
        return
      }

      const urlData = new URL(url)

      const code = urlData.searchParams.get('code')

      if (!code) {
        return
      }

      try {
        const response = await api.post('/authenticate', {
          code,
        })

        setCredentials(response.data)
      } catch {
        navigate(-1)
      } finally {
        setIsLoading(false)
      }
    })

    return () => {
      setIsLoading(false)
    }
  }, [navigate, setCredentials, isLoading])

  return (
    <div className="flex-1 flex items-center justify-center flex-col gap-16">
      <div className="flex flex-col gap-4 items-center">
        <img src={GithubLogo} alt="Github" className="w-14" />
        <p className="text-sm text-muted-foreground">Loading GitHub info.</p>
      </div>

      <Button variant="ghost" onClick={handleBack}>
        <ArrowLeft />
        Back to sign in
      </Button>
    </div>
  )
}
