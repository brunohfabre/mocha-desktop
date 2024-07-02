import {
  checkUpdate,
  installUpdate,
  onUpdaterEvent,
} from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'
import { useEffect, useState } from 'react'

export function App() {
  const [isUpdating, setIsUpdating] = useState(true)

  useEffect(() => {
    const subscription = async () => await onUpdaterEvent(({ error, status }) => {
      // This will log all updater events, including status updates and errors.
      console.log('Updater event', error, status)

      if(['ERROR', 'DONE', 'UPTODATE'].includes(status)) {
        setIsUpdating(false)
      }
    })

    async function loadUpdater() {
      try {
        const { shouldUpdate, manifest } = await checkUpdate()

        console.log(shouldUpdate)

        if (shouldUpdate) {
          // You could show a dialog asking the user if they want to install the update here.
          console.log(
            `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
          )

          // Install the update. This will also restart the app on Windows!
          await installUpdate()

          // On macOS and Linux you will need to restart the app manually.
          // You could use this step to display another confirmation dialog.
          await relaunch()
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadUpdater()

    return () => {
      subscription()
    }
  }, [])

  if(isUpdating) {
    return <div className='h-screen w-full antialiased flex flex-col items-center justify-center'>
      <p>is updating</p>
    </div>
  }

  return (
    <div className="h-screen w-full antialiased">
      app component
    </div>
  )
}
