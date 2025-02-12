import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="h-screen flex flex-col antialiased">
      <div>app</div>

      <Outlet />
    </div>
  )
}
