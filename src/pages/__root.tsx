import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="h-screen w-full flex flex-col antialiased">
      <div data-tauri-drag-region className="h-10 bg-red-200 w-full" />
      <Outlet />
    </div>
  )
}
