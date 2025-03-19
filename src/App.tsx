import { relaunch } from '@tauri-apps/plugin-process'
import { check } from '@tauri-apps/plugin-updater'
import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router'

import { AppRoutes } from './routes'

export function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        const update = await check()

        if (update) {
          console.log(
            `found update ${update.version} from ${update.date} with notes ${update.body}`
          )
          let downloaded = 0
          let contentLength = 0
          // alternatively we could also call update.download() and update.install() separately
          await update.downloadAndInstall((event) => {
            switch (event.event) {
              case 'Started':
                contentLength = event.data.contentLength

                console.log(
                  `started downloading ${event.data.contentLength} bytes`
                )
                break
              case 'Progress':
                downloaded += event.data.chunkLength
                console.log(`downloaded ${downloaded} from ${contentLength}`)
                break
              case 'Finished':
                console.log('download finished')
                break
            }
          })

          console.log('update installed')

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
      <div className="h-screen flex items-center justify-center antialiased">
        <span>verify update</span>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
