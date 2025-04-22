import { getCurrentWindow } from '@tauri-apps/api/window'
import { platform } from '@tauri-apps/plugin-os'

import CloseIcon from '@/assets/icons/close.svg'
import MaximizeIcon from '@/assets/icons/maximize.svg'
import MinimizeIcon from '@/assets/icons/minimize.svg'
import RestoreIcon from '@/assets/icons/restore.svg'
import { useState } from 'react'

const appWindow = getCurrentWindow()

interface TitleBarProps {
  showButtons?: boolean
}

export function TitleBar({ showButtons = true }: TitleBarProps) {
  const [isMaximized, setIsMaximized] = useState(false)

  const isMacos = platform() === 'macos'

  return (
    <div className="h-[52px] flex">
      {isMacos && <div className="h-[52px] w-[92px]" data-tauri-drag-region />}

      <div className="flex-1 flex">
        {!!showButtons && (
          <>
            <div className="flex-1" data-tauri-drag-region />

            {/* <div className="p-2">
              <Button size="icon" variant="outline">
                <Search size={16} />
              </Button>
            </div> */}
          </>
        )}
      </div>

      {!isMacos && (
        <div className="flex">
          <button
            type="button"
            className="px-4 cursor-pointer hover:bg-muted"
            onClick={() => appWindow.minimize()}
          >
            <img src={MinimizeIcon} alt="" />
          </button>

          {!isMaximized && (
            <button
              type="button"
              className="px-4 cursor-pointer hover:bg-muted"
              onClick={() => {
                appWindow.toggleMaximize()

                setIsMaximized((prevState) => !prevState)
              }}
            >
              <img src={MaximizeIcon} alt="" />
            </button>
          )}

          {isMaximized && (
            <button
              type="button"
              className="px-4 cursor-pointer hover:bg-muted"
              onClick={() => {
                appWindow.toggleMaximize()

                setIsMaximized((prevState) => !prevState)
              }}
            >
              <img src={RestoreIcon} alt="" />
            </button>
          )}

          <button
            type="button"
            className="px-4 cursor-pointer hover:bg-destructive group"
            onClick={() => appWindow.close()}
          >
            <img src={CloseIcon} alt="" className="group-hover:invert" />
          </button>
        </div>
      )}
    </div>
  )
}
