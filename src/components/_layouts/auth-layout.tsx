import type { UnlistenFn } from '@tauri-apps/api/event'
import { onOpenUrl } from '@tauri-apps/plugin-deep-link'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

export function AuthLayout() {
  useEffect(() => {
    let sub: UnlistenFn

    onOpenUrl((urls) => {
      console.log('deep link:', urls)
    }).then((unlistenFn) => {
      sub = unlistenFn
    })

    return () => {
      if (sub) {
        sub()
      }
    }
  }, [])
  return (
    <div className="h-screen flex flex-col antialiased">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, soluta.
        Nobis ad sunt suscipit a minus ratione voluptatibus velit tempora,
        assumenda quis ut culpa fuga nulla autem reprehenderit tempore
        exercitationem!
      </p>

      <Outlet />
    </div>
  )
}
