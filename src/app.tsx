import { relaunch } from '@tauri-apps/plugin-process'
import { check } from '@tauri-apps/plugin-updater'
import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router'

import { TitleBar } from './components/title-bar'
import { AppRoutes } from './routes'

export function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [result, setResult] = useState('')

  useEffect(() => {
    async function prepare() {
      try {
        const update = await check()

        console.log(update)

        if (update) {
          setResult(
            `found update ${update.version} from ${update.date} with notes ${update.body}`
          )

          let downloaded = 0
          let contentLength: number | undefined = 0

          await update.downloadAndInstall((event) => {
            switch (event.event) {
              case 'Started':
                contentLength = event.data.contentLength

                setResult(
                  `started downloading ${event.data.contentLength} bytes`
                )
                break
              case 'Progress':
                downloaded += event.data.chunkLength

                setResult(`downloaded ${downloaded} from ${contentLength}`)
                break
              case 'Finished':
                setResult('download finished')

                break
            }
          })

          setResult('update installed')

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
        <TitleBar />

        <div className="flex-1 flex items-center justify-center">
          <span>{JSON.stringify(result, null, 2)}</span>
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
