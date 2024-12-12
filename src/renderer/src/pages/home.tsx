import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex flex-col p-4 gap-2">
        <p>home</p>

        <div>
          <Button type="button" onClick={() => navigate('/sign-in')}>
            go to sign in
          </Button>
        </div>
      </div>
    </div>
  )
}
