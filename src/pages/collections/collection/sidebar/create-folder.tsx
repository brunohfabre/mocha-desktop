import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

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
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

import type { Collection } from '.'

const formSchema = z.object({
  name: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

interface CreateFolderProps {
  open: boolean
  onOpenChange: (data: boolean) => void

  parentId?: string
}

export function CreateFolder({
  open,
  onOpenChange,
  parentId,
}: CreateFolderProps) {
  const { collectionId } = useParams<{ collectionId: string }>()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const queryClient = useQueryClient()

  const [loading, setLoading] = useState(false)

  function handleClose() {
    onOpenChange(false)
    form.reset()
  }

  async function createFolder(data: FormData) {
    try {
      setLoading(true)

      const { name } = data

      const response = await api.post(`/collections/${collectionId}/requests`, {
        type: 'FOLDER',
        name,
        parentId,
      })

      queryClient.setQueryData(
        ['collections', collectionId],
        (prevState: Collection) => ({
          ...prevState,
          requests: [...prevState.requests, response.data.request],
        }),
      )

      handleClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create folder</DialogTitle>
        </DialogHeader>

        <form
          className="mt-4 flex flex-col gap-8"
          onSubmit={form.handleSubmit(createFolder)}
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
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <LoaderCircle className="size-4 animate-spin" />
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
