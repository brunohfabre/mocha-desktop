import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function NoMatch() {
  const navigate = useNavigate()

  function handleGoBackToHome() {
    navigate('/')
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 antialiased">
      <p className="text-sm font-medium">No match</p>

      <Button type="button" onClick={handleGoBackToHome}>
        Go back to home
      </Button>
    </div>
  )
}
