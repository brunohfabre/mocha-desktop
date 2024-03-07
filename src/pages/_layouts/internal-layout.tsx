import { Navigate, Outlet, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'

export function InternalLayout() {
  const navigate = useNavigate()

  const { session } = useAuth()

  if (!session) {
    return <Navigate to="/sign-in" replace />
  }

  function handleGoBack() {
    navigate(-1)
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="h-14 border-b flex items-center px-4">
        <Button onClick={handleGoBack}>back</Button>
      </header>

      <Outlet />
    </div>
  )
}
