import GithubLogo from '@/assets/images/github-mark-white.png'
import Logo from '@/assets/images/logo.png'
import { Button } from '@/components/ui/button'
import { env } from '@/env'
import { useNavigate } from 'react-router-dom'

export function SignIn() {
  const navigate = useNavigate()

  function handleSignIn() {
    window.api.openExternalUrl(
      `https://github.com/login/oauth/authorize?client_id=${env.RENDERER_VITE_GITHUB_CLIENT_ID}`
    )

    navigate('/auth/github')
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-80 flex flex-col gap-8">
        <img src={Logo} alt="Mocha" className="w-14 self-center" />

        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold text-center">Mocha</p>
          <span className="text-muted-foreground text-sm text-center">
            Is the new standard for project management.
          </span>
        </div>

        <Button type="button" onClick={handleSignIn}>
          <img src={GithubLogo} alt="" className="size-4" />
          Sign in with GitHub
        </Button>
      </div>
    </div>
  )
}
