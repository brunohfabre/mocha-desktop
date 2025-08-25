import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { api } from '@/lib/api'

export const Route = createFileRoute('/_app/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: async () => {
      const response = await api.get('/organizations')

      return response.data
    },
  })

  return (
    <div className="flex flex-col p-4 gap-4">
      <span>Hello "/"!</span>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
