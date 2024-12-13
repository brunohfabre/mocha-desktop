import GithubLogo from '@/assets/images/github-mark-white.png'
import { Button } from '@/components/ui/button'

export function SignIn() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-80 flex flex-col">
        <Button type="button">
          <img src={GithubLogo} alt="" className="size-4" />
          Sign in with GitHub
        </Button>
      </div>
    </div>
  )
}
