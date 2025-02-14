import { Empty } from '@/components/empty'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import {
  getGetCollectionsQueryKey,
  useCreateCollection,
  useGetCollections,
} from '@/http/generated/api'
import { useOrganizationStore } from '@/stores/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const createCollectionSchema = z.object({
  name: z.string().min(1),
})

type CreateCollectionData = z.infer<typeof createCollectionSchema>

export function Collections() {
  const queryClient = useQueryClient()

  const { mutateAsync: createCollection, isPending } = useCreateCollection()

  const createCollectionForm = useForm<CreateCollectionData>({
    resolver: zodResolver(createCollectionSchema),
  })

  const organizationSelected = useOrganizationStore(
    (state) => state.organizationSelected
  )

  const [modalVisible, setModalVisible] = useState(false)

  const { data, isLoading } = useGetCollections(organizationSelected)

  function handleCloseModal() {
    createCollectionForm.reset()
    setModalVisible(false)
  }

  async function handleCreateCollection(data: CreateCollectionData) {
    try {
      const { name } = data

      await createCollection({
        organizationId: organizationSelected,
        data: {
          name,
        },
      })

      queryClient.invalidateQueries({
        queryKey: getGetCollectionsQueryKey(organizationSelected),
      })

      handleCloseModal()
    } catch {
      toast.error('Error on create collection')
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col p-4 flex-1">
        <header>
          <Skeleton className="w-32 h-9" />
        </header>

        <div className="grid grid-cols-3 w-full gap-2">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    )
  }

  return (
    <>
      <Dialog open={modalVisible} onOpenChange={handleCloseModal}>
        <DialogContent>
          <form
            onSubmit={createCollectionForm.handleSubmit(handleCreateCollection)}
            className="space-y-6"
          >
            <DialogHeader>
              <DialogTitle>Create collection</DialogTitle>
            </DialogHeader>

            <div className="space-y-1">
              <Label
                htmlFor="name"
                className={
                  createCollectionForm.formState.errors.name &&
                  'text-destructive'
                }
              >
                Collection name
              </Label>

              <Input
                id="name"
                placeholder="Collection name"
                isErrored={!!createCollectionForm.formState.errors.name}
                {...createCollectionForm.register('name')}
              />

              {createCollectionForm.formState.errors.name && (
                <span className="text-sm text-destructive">
                  {createCollectionForm.formState.errors.name?.message}
                </span>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex-1 flex flex-col">
        <header className="p-4 flex justify-between items-center">
          <p className="text-lg font-semibold">Collections</p>

          <Button type="button" onClick={() => setModalVisible(true)}>
            New collection
          </Button>
        </header>

        {!data?.collections.length ? (
          <Empty />
        ) : (
          <div className="grid grid-cols-3 p-4 gap-2">
            {data.collections.map((collection) => (
              <div key={collection.id} className="p-4 border rounded-lg">
                <p>{JSON.stringify(collection, null, 2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
