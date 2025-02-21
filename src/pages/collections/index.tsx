import { Empty } from '@/components/empty'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
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
  useDeleteCollection,
  useGetCollections,
} from '@/http/generated/api'
import { useOrganizationStore } from '@/stores/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2, Trash } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

const createCollectionSchema = z.object({
  name: z.string().min(1),
})

type CreateCollectionData = z.infer<typeof createCollectionSchema>

export function Collections() {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const {
    mutateAsync: createCollection,
    isPending: createCollectionIsPending,
  } = useCreateCollection()
  const {
    mutateAsync: deleteCollection,
    isPending: deleteCollectionIsPending,
  } = useDeleteCollection()

  const createCollectionForm = useForm<CreateCollectionData>({
    resolver: zodResolver(createCollectionSchema),
  })

  const organizationSelected = useOrganizationStore(
    (state) => state.organizationSelected
  )

  const [modalVisible, setModalVisible] = useState(false)
  const [deleteCollectionVisible, setDeleteCollectionVisible] = useState('')

  const { data, isLoading } = useGetCollections(organizationSelected)

  function handleCloseModal() {
    createCollectionForm.reset()
    setModalVisible(false)
  }

  async function handleCreateCollection(data: CreateCollectionData) {
    try {
      const { name } = data

      const response = await createCollection({
        organizationId: organizationSelected,
        data: {
          name,
        },
      })

      queryClient.invalidateQueries({
        queryKey: getGetCollectionsQueryKey(organizationSelected),
      })

      navigate(`/collections/${response.collection.id}`)
    } catch {
      toast.error('Error on create collection')
    }
  }

  async function handleDeleteCollection(collectionId: string) {
    try {
      await deleteCollection({
        organizationId: organizationSelected,
        collectionId,
      })

      queryClient.invalidateQueries({
        queryKey: getGetCollectionsQueryKey(organizationSelected),
      })

      setDeleteCollectionVisible('')
    } catch {
      toast.error('Error on delete collection')
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

              <Button type="submit" disabled={createCollectionIsPending}>
                {createCollectionIsPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Create'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteCollectionVisible}
        onOpenChange={() => setDeleteCollectionVisible('')}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete collection</AlertDialogTitle>

            <AlertDialogDescription>
              This collection will be deleted, along with all of its Requests.
              This action is not reversible. Please be certain.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => handleDeleteCollection(deleteCollectionVisible)}
            >
              {deleteCollectionIsPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Delete'
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
              <button
                type="button"
                key={collection.id}
                className="p-2 border rounded-lg flex justify-between"
                onClick={() => navigate(`/collections/${collection.id}`)}
              >
                <p className="m-2">{collection.name}</p>

                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={(event) => {
                    event.stopPropagation()

                    setDeleteCollectionVisible(collection.id)
                  }}
                  disabled={deleteCollectionIsPending}
                >
                  <Trash />
                </Button>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
