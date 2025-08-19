import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/$organizationId/$projectId/collections'
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/$organizationId/$projectId/collections"!</div>
}
