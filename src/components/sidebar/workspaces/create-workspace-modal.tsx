import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { Loader2 } from 'lucide-react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

import { WorkspaceType } from '.'

const formSchema = z.object({
  name: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

interface CreateWorkspaceModalProps {
  selectWorkspace: (data: WorkspaceType) => void
}

export function CreateWorkspaceModal({
  selectWorkspace,
}: CreateWorkspaceModalProps) {
  const { handleSubmit, formState, register, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const queryClient = useQueryClient()

  const [searchParams, setSearchParams] = useSearchParams()

  const modal = searchParams.get('modal') ?? ''

  const [isLoading, setIsLoading] = useState(false)

  function handleCloseModal() {
    setSearchParams((state) => {
      state.delete('modal')

      return state
    })

    reset()
  }

  async function createWorkspace({ name }: FormData) {
    try {
      setIsLoading(true)

      const response = await api.post('/workspaces', {
        name,
      })

      queryClient.setQueryData(['workspaces'], (prevState: WorkspaceType[]) => [
        ...prevState,
        response.data.workspace,
      ])

      selectWorkspace(response.data.workspace)

      handleCloseModal()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={modal === 'open'} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create workspace</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(createWorkspace)}>
          <div className="space-y-1 my-6">
            <Label>Name</Label>
            <Input placeholder="Name" {...register('name')} />
            <span className="text-sm text-red-500">
              {formState.errors.name?.message}
            </span>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 size={16} /> : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
