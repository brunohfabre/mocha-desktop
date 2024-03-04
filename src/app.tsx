import { useEffect, useRef, useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import { relaunch } from '@tauri-apps/api/process'
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'

import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/sonner'
import { AppProvider } from './contexts'
import { router } from './routes'

export function App() {
  const firstRenderRef = useRef(true)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function check() {
      try {
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

    firstRenderRef.current = false

    check()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <span className="animate-bounce">Loading...</span>
      </div>
    )
  }

  return (
    <ThemeProvider defaultTheme="light">
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>

      <Toaster position="top-right" />
    </ThemeProvider>
  )
}
