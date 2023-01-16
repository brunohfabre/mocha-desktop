import { Toaster } from 'react-hot-toast'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AppRoutes } from './routes/AppRoutes'
import { globalStyles } from './styles/global'
import { ThemeProvider } from './styles/ThemeProvider'

const queryClient = new QueryClient()

globalStyles()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Toaster position="top-right" />

        <AppRoutes />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
