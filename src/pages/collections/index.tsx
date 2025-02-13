import { Button } from '@/components/ui/button'

export function Collections() {
  return (
    <div className="flex-1 flex flex-col">
      <header className="p-4 flex justify-between">
        <p className="text-lg font-medium">Collections</p>

        <Button type="button" onClick={() => console.log('teste')} disabled>
          New collection
        </Button>
      </header>
    </div>
  )
}
