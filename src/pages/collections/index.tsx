import { useNavigate } from 'react-router-dom'

import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function Collections() {
  const navigate = useNavigate()

  function handleNavigateToCreateCollection() {
    navigate('/create-collection')
  }

  function handleNavigateToCollection() {
    navigate('/collections/123123')
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <header className="flex justify-between">
        <p className="text-lg font-semibold">Collections</p>

        <Button type="button" onClick={handleNavigateToCreateCollection}>
          + New Collection
        </Button>
      </header>

      <div className="rounded-lg border">
        <div className="flex items-center justify-between p-4">
          <p className="text-sm font-semibold">Collection #1</p>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleNavigateToCollection}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        <Separator orientation="horizontal" />

        <div className="flex items-center justify-between p-4">
          <p className="text-sm font-semibold">Collection #2</p>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleNavigateToCollection}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
