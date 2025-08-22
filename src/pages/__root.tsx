import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Header } from '@/components/header'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="h-screen w-full flex flex-col antialiased">
      <Header />

      <Outlet />
    </div>
  )
}
