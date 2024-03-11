import { useState } from 'react'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

const tabs = [
  {
    id: crypto.randomUUID(),
    label: 'tab-label',
  },
]

export function Tabs() {
  const [tabSelected, setTabSelected] = useState('')

  function handleRemoveTab(id: string) {
    console.log(id)
  }

  return (
    <div className="flex items-center border-b h-14 pl-2">
      <div className="mr-2">
        <Button type="button" size="icon" variant="ghost" className="w-6 group">
          <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-black" />
        </Button>

        <Button type="button" size="icon" variant="ghost" className="w-6 group">
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-black" />
        </Button>
      </div>

      <ScrollArea className="flex-1 w-[64px]">
        <div className="h-14 flex items-center pr-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              type="button"
              variant={tab.id === tabSelected ? 'secondary' : 'ghost'}
              className={cn(
                'gap-2 pl-3 pr-1.5',
                tab.id !== tabSelected && 'opacity-50',
              )}
              onClick={() => setTabSelected(tab.id)}
            >
              {tab.label}

              <Button
                size="icon"
                className="w-6 h-6"
                variant="ghost"
                onClick={(event) => {
                  event.stopPropagation()

                  handleRemoveTab(tab.id)
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </Button>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
