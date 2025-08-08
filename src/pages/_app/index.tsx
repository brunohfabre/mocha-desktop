import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <span>Hello "/"!</span>
      <Link to="/test">go to test</Link>
    </div>
  )
}
