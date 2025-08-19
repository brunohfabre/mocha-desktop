import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/$organizationId/$projectId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/$organizationId/$projectId/"!</div>
}
