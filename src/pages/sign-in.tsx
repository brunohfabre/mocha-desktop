import { Button } from '@/components/ui/button'
import { env } from '@/env'
import { Link } from 'react-router'

export function SignIn() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Button type="button" asChild>
        <Link to={`${env.VITE_FRONTEND_URL}/auth/github`} target="_blank">
          Continue with GitHub
        </Link>
      </Button>
    </div>
  )
}
