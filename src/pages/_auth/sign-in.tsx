import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { openUrl } from '@tauri-apps/plugin-opener'
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
    <div className="flex-1 flex flex-col items-center justify-center gap-2">
      <Button onClick={handleOpenGithubSignIn}>Sign in with GitHub</Button>

      <Button onClick={handleSignIn}>Sign in</Button>
    </div>
  )
}
