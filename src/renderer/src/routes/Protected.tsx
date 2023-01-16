import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { useWorkspaceStore } from '../stores/workspaceStore'

type ProtectedProps = {
  isProtected?: boolean
}

export function Protected({ isProtected }: ProtectedProps) {
  const location = useLocation()

  const token = useAuthStore((state) => state.token)
  const workspace = useWorkspaceStore((state) => state.workspace)
  
  const isSigned = !!token
  
  if (!isSigned && isProtected) {
    return <Navigate to="/sign-in" />
  }

  if (isSigned && !isProtected) {
    return <Navigate to="/" />
  }

  if(isSigned && !workspace && location.pathname !== '/workspaces') {
    return <Navigate to="/workspaces" />
  }

  return <Outlet />
}
