import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ context }) => {
    if (!context.token) {
      return redirect({ to: '/sign-in', replace: true })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
