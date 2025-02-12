import { useAuthStore } from '@/stores/auth'
import { Navigate, Outlet } from 'react-router'

export function AppLayout() {
  const token = useAuthStore(state => state.token)

  if(!token) {
    return <Navigate to='/sign-in' replace />
  }

  return (
    <div className="h-screen flex flex-col antialiased">
      <div>app</div>

      <Outlet />
    </div>
  )
}
