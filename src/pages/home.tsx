import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

export function Home() {
  return (
    <div className="flex-1 flex">
      <span>home</span>

      <Button asChild>
        <Link to="/sign-in">Go to sign in</Link>
      </Button>
    </div>
  )
}
