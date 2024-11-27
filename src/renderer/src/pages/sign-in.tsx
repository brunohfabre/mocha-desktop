import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export function SignIn() {
  const navigate = useNavigate()

  return (
    <div>
      <span>sign in</span>

      <Button type="button" variant="outline" onClick={() => navigate(-1)}>
        go back
      </Button>
    </div>
  )
}
