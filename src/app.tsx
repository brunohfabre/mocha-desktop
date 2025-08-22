import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { useAuthStore } from './stores/auth'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const client = new QueryClient()

export function App() {
  const token = useAuthStore((state) => state.token)

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} context={{ token }} />
    </QueryClientProvider>
  )
}
