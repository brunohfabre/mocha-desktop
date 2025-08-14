import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth'

export const Route = createFileRoute('/_app')({
  beforeLoad: () => {
    if (!useAuthStore.getState().token) {
      return redirect({ to: '/sign-in', replace: true })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
