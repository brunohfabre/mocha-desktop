import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

import { OrganizationType } from '.'

const formSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['PERSONAL', 'COMPANY']),
})

type FormData = z.infer<typeof formSchema>

interface CreateOrganizationModalProps {
  selectOrganization: (organizationId: string) => void
}

export function CreateOrganizationModal({
  selectOrganization,
}: CreateOrganizationModalProps) {
  const { handleSubmit, formState, register, reset, control } =
    useForm<FormData>({
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

  async function createOrganization({ name, type }: FormData) {
    try {
      setIsLoading(true)

      const response = await api.post('/organizations', {
        name,
        type,
      })

      queryClient.setQueryData(
        ['organizations'],
        (prevState: OrganizationType[]) => [
          ...prevState,
          response.data.organization,
        ],
      )

      selectOrganization(response.data.organization.id)

      handleCloseModal()

      toast.success('Organization created successfully.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={modal === 'open'} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create organization</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(createOrganization)}>
          <div className="flex flex-col my-6 gap-2">
            <div className="space-y-1 ">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name" {...register('name')} />
              <span className="text-sm text-red-500">
                {formState.errors.name?.message}
              </span>
            </div>

            <div className="space-y-1">
              <Label htmlFor="type">Type</Label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="PERSONAL">Personal</SelectItem>
                      <SelectItem value="COMPANY">Company</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              <span className="text-sm text-red-500">
                {formState.errors.name?.message}
              </span>
            </div>
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
