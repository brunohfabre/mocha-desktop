import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'

import { Toaster } from './components/ui/sonner'
import { Router } from './router'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>

      <Toaster position="top-right" />
    </QueryClientProvider>
  )
}
