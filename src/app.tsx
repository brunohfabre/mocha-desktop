import { useEffect, useRef, useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import { QueryClientProvider } from '@tanstack/react-query'
import { relaunch } from '@tauri-apps/api/process'
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'

import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/sonner'
import { queryClient } from './lib/react-query'
import { router } from './routes'

export function App() {
  const firstRenderRef = useRef(true)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function verifyUpdate() {
      try {
        firstRenderRef.current = false

        const { shouldUpdate } = await checkUpdate()

        if (shouldUpdate) {
          await installUpdate()

          await relaunch()
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (!firstRenderRef.current) {
      return
    }

    verifyUpdate()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-sm">Verifying update</p>
      </div>
    )
  }

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>

      <Toaster position="top-right" />
    </ThemeProvider>
  )
}
