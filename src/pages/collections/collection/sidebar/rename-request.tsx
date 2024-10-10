import { useEffect, useState } from 'react'
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

import type { Collection, Request } from '.'

const formSchema = z.object({
  name: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

interface RenameRequestProps {
  open: boolean
  onOpenChange: (data: boolean) => void

  request: Request | null
}

export function RenameRequest({
  open,
  onOpenChange,
  request,
}: RenameRequestProps) {
  const { collectionId } = useParams<{ collectionId: string }>()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const queryClient = useQueryClient()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (request) {
      form.reset(request)
    }
  }, [form, request])

  function handleClose() {
    onOpenChange(false)
    // form.reset()
  }

  async function rename(data: FormData) {
    try {
      setLoading(true)

      const { name } = data

      await api.put(`/collections/${collectionId}/requests/${request?.id}`, {
        name,
      })

      queryClient.setQueryData(
        ['collections', collectionId],
        (prevState: Collection) => ({
          ...prevState,
          requests: prevState.requests.map((item) =>
            item.id === request?.id ? { ...item, name } : item,
          ),
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
          <DialogTitle>Rename</DialogTitle>
        </DialogHeader>

        <form
          className="mt-4 flex flex-col gap-8"
          onSubmit={form.handleSubmit(rename)}
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
                'Save'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
