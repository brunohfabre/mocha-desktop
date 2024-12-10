import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="h-screen w-full antialiased flex flex-col">
      <span>app</span>

      <Outlet />
    </div>
  )
}
