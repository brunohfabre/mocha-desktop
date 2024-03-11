import { RouterProvider } from 'react-router-dom'

import { QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/sonner'
import { AppProvider } from './contexts'
import { queryClient } from './lib/react-query'
import { router } from './routes'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </ThemeProvider>

      <Toaster position="top-right" />
    </QueryClientProvider>
  )
}
