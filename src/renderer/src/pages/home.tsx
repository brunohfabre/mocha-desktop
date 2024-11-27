import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()

  return (
    <div className="p-4">
      <p>home</p>

      <Button type="button" onClick={() => navigate('/sign-in')}>
        go to sign in
      </Button>
    </div>
  )
}
