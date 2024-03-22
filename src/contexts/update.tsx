import { ReactNode, useEffect, useRef, useState } from 'react'

import LogoDark from '@/assets/logo-dark.png'
import LogoLight from '@/assets/logo-light.png'
import { useTheme } from '@/components/theme-provider'
import { relaunch } from '@tauri-apps/api/process'
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'

export function UpdateProvider({ children }: { children: ReactNode }) {
  const firstRenderRef = useRef(true)

  const { theme } = useTheme()

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
        {theme === 'light' ? (
          <img src={LogoLight} alt="Mocha" className="w-16 animate-bounce" />
        ) : (
          <img src={LogoDark} alt="Mocha" className="w-16 animate-bounce" />
        )}
      </div>
    )
  }

  return children
}
