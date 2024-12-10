import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="h-screen w-full antialiased flex">
      <span>auth</span>

      <Outlet />
    </div>
  )
}
