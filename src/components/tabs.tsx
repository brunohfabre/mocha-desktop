import { useNavigate } from 'react-router-dom'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTabs, type TabType } from '@/contexts/tabs'
import { cn } from '@/lib/utils'

export function Tabs() {
  const navigate = useNavigate()

  const { tabs, selectTab, removeTab } = useTabs()

  function handleClick(tab: TabType) {
    navigate(tab.route)
    selectTab(tab)
  }

  function handleRemove(tab: TabType) {
    removeTab(tab)
  }

  if (!tabs.length) {
    return
  }

  return (
    <div className="flex">
      <div className="flex p-2">
        <Button type="button" className="px-1.5" variant="ghost">
          <ChevronLeft className="size-3.5" />
        </Button>
        <Button type="button" className="px-1.5" variant="ghost">
          <ChevronRight className="size-3.5" />
        </Button>
      </div>

      <div className="flex flex-1 overflow-auto p-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            type="button"
            variant={tab.route === location.pathname ? 'outline' : 'ghost'}
            className={cn(
              'pr-0',
              tab.route !== location.pathname && 'border border-transparent',
            )}
            onClick={() => handleClick(tab)}
          >
            {tab.name}
            <button
              className="mx-2 flex size-6 items-center justify-center rounded-sm"
              onClick={(event) => {
                event.stopPropagation()
                handleRemove(tab)
              }}
            >
              <X className="size-3.5" />
            </button>
          </Button>
        ))}
      </div>
    </div>
  )
}
