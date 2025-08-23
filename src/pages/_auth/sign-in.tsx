import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { openUrl } from '@tauri-apps/plugin-opener'
import Logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import { env } from '@/env'

export const Route = createFileRoute('/_auth/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  async function handleOpenGithubSignIn() {
    openUrl(
      `https://github.com/login/oauth/authorize?client_id=${env.VITE_APP_GITHUB_CLIENT_ID}`
    )
  }

  function handleSignIn() {
    navigate({
      to: '/callback',
      replace: true,
      search: {
        code: '97f4c757f01d058b3b79',
      },
    })
  }

  return (
    <div className="flex-1 flex flex-col px-10 pb-10">
      <header>
        <img src={Logo} alt="" className="size-9" />
      </header>

      <div className="flex-1 w-full max-w-sm flex flex-col mx-auto justify-center gap-10">
        <p className="text-2xl font-bold text-center">Get started for free</p>

        <div className="flex flex-col gap-4">
          <Button onClick={handleOpenGithubSignIn} variant="outline">
            Sign in with GitHub
          </Button>

          <Button onClick={handleSignIn} variant="outline">
            Sign in with Google
          </Button>
        </div>
      </div>

      <footer className="w-full max-w-sm mx-auto">
        {/* <p className="text-center text-xs">
          Signing up for a Mocha account means you agree to the Privacy Policy
          and Terms of Service.
        </p> */}
      </footer>
    </div>
  )
}
