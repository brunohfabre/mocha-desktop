import { RouterProvider } from 'react-router-dom'

import { QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from './components/theme-provider'
import { queryClient } from './lib/react-query'
import { router } from './routes'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="mocha.ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
