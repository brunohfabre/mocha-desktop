import { Button } from '@/components/ui/button'
import { useGetCollections } from '@/http/generated/api'

export function Collections() {
  const { data, isLoading } = useGetCollections('asd')

  if (isLoading) {
    return <div>is loading</div>
  }

  return (
    <div className="flex-1 flex flex-col">
      <header className="p-4 flex justify-between">
        <p className="text-lg font-medium">Collections</p>

        <Button type="button" onClick={() => console.log('teste')} disabled>
          New collection
        </Button>
      </header>

      {!data ? (
        <div>
          <p>no collections</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 p-4 gap-2">
          <div className="p-4 border rounded-lg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              soluta rerum nesciunt voluptas? A blanditiis, corrupti numquam,
              impedit sunt aliquid saepe dolorem deserunt, magnam veritatis
              eligendi veniam? Iste, quibusdam quod?
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              soluta rerum nesciunt voluptas? A blanditiis, corrupti numquam,
              impedit sunt aliquid saepe dolorem deserunt, magnam veritatis
              eligendi veniam? Iste, quibusdam quod?
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              soluta rerum nesciunt voluptas? A blanditiis, corrupti numquam,
              impedit sunt aliquid saepe dolorem deserunt, magnam veritatis
              eligendi veniam? Iste, quibusdam quod?
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              soluta rerum nesciunt voluptas? A blanditiis, corrupti numquam,
              impedit sunt aliquid saepe dolorem deserunt, magnam veritatis
              eligendi veniam? Iste, quibusdam quod?
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
