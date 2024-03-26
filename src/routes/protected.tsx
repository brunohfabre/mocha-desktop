import { Outlet } from 'react-router-dom'

interface ProtectedProps {
  isProtected: boolean
}

export function Protected({ isProtected }: ProtectedProps) {
  return <Outlet />
}
