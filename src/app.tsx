import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import LogoDark from '@/assets/logo-dark.png'
import LogoLight from '@/assets/logo-light.png'
import { QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider, useTheme } from './components/theme-provider'
import { Toaster } from './components/ui/sonner'
import { AppProvider } from './contexts'
import { api } from './lib/api'
import { queryClient } from './lib/react-query'
import { router } from './routes'
import { useAuthStore } from './stores/auth'

export function App() {
  const { theme } = useTheme()

  const setCredentials = useAuthStore((state) => state.setCredentials)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadMe() {
      try {
        setIsLoading(true)

        const response = await api.get('/me')

        setCredentials(response.data)
      } finally {
        setIsLoading(false)
      }
    }

    loadMe()
  }, [setCredentials])

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        {theme === 'light' ? (
          <img src={LogoLight} alt="Mocha" className="w-16 animate-bounce" />
        ) : (
          <img src={LogoDark} alt="Mocha" className="w-16 animate-bounce" />
        )}
      </div>
    )
  }

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
