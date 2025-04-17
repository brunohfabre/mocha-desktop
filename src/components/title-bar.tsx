import { useAuthStore } from '@/stores/auth-store'
import { platform } from '@tauri-apps/plugin-os'
import { House, Search } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export function TitleBar() {
  const token = useAuthStore((state) => state.token)

  const isMacos = platform() === 'macos'

  return (
    <div className="h-[52px] flex">
      {isMacos && <div className="h-[52px] w-[92px]" data-tauri-drag-region />}

      <div className="flex-1 flex" data-tauri-drag-region>
        {!!token && (
          <>
            <div className="p-2 pl-0">
              <Button size="icon" variant="outline">
                <House size={16} />
              </Button>
            </div>

            <div className="py-4">
              <Separator orientation="vertical" />
            </div>

            <div className="flex-1" data-tauri-drag-region />

            <div className="py-4">
              <Separator orientation="vertical" />
            </div>

            <div className="p-2">
              <Button size="icon" variant="outline">
                <Search size={16} />
              </Button>
            </div>
          </>
        )}
      </div>

      {!isMacos && <div className="bg-green-500 w-32" />}
    </div>
  )
}
