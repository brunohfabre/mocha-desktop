import { relaunch } from '@tauri-apps/plugin-process'
import { check } from '@tauri-apps/plugin-updater'
import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router'

import { TitleBar } from './components/title-bar'
import { AppRoutes } from './routes'

type Step = 'looking' | 'started' | 'downloading' | 'finished'

export function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [step, setStep] = useState<Step>('looking')
  const [progress, setProgress] = useState(37)

  useEffect(() => {
    async function prepare() {
      try {
        const update = await check()

        console.log(update)

        if (update) {
          let downloaded = 0
          let contentLength = 0

          await update.downloadAndInstall((event) => {
            switch (event.event) {
              case 'Started':
                contentLength = event.data.contentLength ?? 0

                setStep('started')

                break
              case 'Progress':
                downloaded += event.data.chunkLength

                setStep('downloading')

                setProgress(Math.round((downloaded / contentLength) * 100))

                break
              case 'Finished':
                setStep('finished')

                break
            }
          })

          await relaunch()
        }
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  if (!appIsReady) {
    return (
      <div className="h-screen flex flex-col antialiased">
        <TitleBar showButtons={false} />

        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          {step}

          {step === 'downloading' && (
            <div className="h-4 w-60 bg-zinc-300">
              <div
                className="bg-zinc-400 h-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
