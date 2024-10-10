import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { LoaderCircle } from 'lucide-react'
import { z } from 'zod'

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
import { api } from '@/lib/api'
import { useOrganizationStore } from '@/stores/organization-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

import type { Collection } from '.'

const formSchema = z.object({
  name: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

interface CollectionFormProps {
  open: boolean
  onOpenChange: (value: boolean) => void
  collectionToUpdate: Collection | null
}

export function CollectionForm({
  open,
  onOpenChange,
  collectionToUpdate,
}: CollectionFormProps) {
  const navigate = useNavigate()

  const organization = useOrganizationStore((state) => state.organization)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (collectionToUpdate) {
      form.reset(collectionToUpdate)
    }
  }, [collectionToUpdate, form])

  const queryClient = useQueryClient()

  async function submitCollection(data: FormData) {
    try {
      setLoading(true)

      const { name } = data

      if (collectionToUpdate) {
        await api.put(
          `/organizations/${organization?.id}/collections/${collectionToUpdate.id}`,
          {
            name,
          },
        )

        queryClient.setQueryData(['collections'], (prevState: Collection[]) =>
          prevState.map((collection) =>
            collection.id === collectionToUpdate.id
              ? { ...collection, name }
              : collection,
          ),
        )

        handleCloseModal()
      } else {
        const response = await api.post(
          `/organizations/${organization?.id}/collections`,
          {
            name,
          },
        )

        queryClient.setQueryData(['collections'], (prevState: Collection[]) => [
          ...prevState,
          response.data.collection,
        ])

        navigate(`/collections/${response.data.collection.id}`)
      }
    } finally {
      setLoading(false)
    }
  }

  function handleCloseModal() {
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {collectionToUpdate ? 'Update' : 'Create'} collection
          </DialogTitle>
        </DialogHeader>

        <form
          className="mt-4 flex flex-col gap-8"
          onSubmit={form.handleSubmit(submitCollection)}
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" {...form.register('name')} />
            {form.formState.errors.name?.message && (
              <span className="text-sm text-red-500">
                {form.formState.errors.name?.message}
              </span>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : collectionToUpdate ? (
                'Update'
              ) : (
                'Create'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
