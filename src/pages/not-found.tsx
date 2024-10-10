import { Navigate } from 'react-router-dom'

import { useAuthStore } from '@/stores/auth-store'

export function NotFound() {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="flex h-screen w-full items-center justify-center antialiased">
      <p>Not found</p>
    </div>
  )
}
