import { platform } from '@tauri-apps/plugin-os'
import { Search } from 'lucide-react'
import { Button } from './ui/button'

export function TitleBar() {
  const isMacos = platform() === 'macos'

  return (
    <div className="h-[52px] flex">
      {isMacos && (
        <div
          className="bg-green-500 h-[52px] w-[92px]"
          data-tauri-drag-region
        />
      )}

      <div className="flex-1 flex" data-tauri-drag-region>
        <div className="flex-1" data-tauri-drag-region />

        <div className="p-2">
          <Button size="icon" variant="outline">
            <Search size={16} />
          </Button>
        </div>
      </div>

      {!isMacos && <div className="bg-green-500 w-32" />}
    </div>
  )
}
