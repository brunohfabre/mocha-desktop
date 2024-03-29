import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'

import { OrganizationType } from '@/components/sidebar/organizations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { api } from '@/lib/api'
import { queryClient } from '@/lib/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'

import { DeleteSection } from './delete-section'
import { Members } from './members'

const formSchema = z.object({
  name: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

export function Organization() {
  const { id } = useParams<{ id: string }>()

  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const { isPending } = useQuery({
    queryKey: ['organizations', id],
    queryFn: async () => {
      const response = await api.get(`/organizations/${id}`)

      reset(response.data.organization)
    },
  })

  async function updateOrganization({ name }: FormData) {
    try {
      setIsLoading(true)

      const response = await api.put(`/organizations/${id}`, {
        name,
      })

      queryClient.setQueryData(
        ['organizations'],
        (prevState: OrganizationType[]) =>
          prevState.map((organization) =>
            organization.id === id ? response.data.organization : organization,
          ),
      )

      toast.success('Organization updated successfully.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isPending) {
    return <div>is pending</div>
  }

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-8 flex flex-col gap-8">
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="members" disabled>
            Members
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="flex flex-col gap-8 mt-8">
            <div className="flex flex-col gap-2">
              <strong className="text-lg font-semibold">Organization</strong>

              <form
                className="border rounded-lg flex flex-col p-4 gap-8"
                onSubmit={handleSubmit(updateOrganization)}
              >
                <div className="space-y-1">
                  <Label>Name</Label>
                  <Input placeholder="Name" {...register('name')} />
                  <span className="text-sm text-red-500">
                    {formState.errors.name?.message}
                  </span>
                </div>

                <div className="flex justify-end">
                  <Button>
                    {isLoading && (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    )}
                    Save
                  </Button>
                </div>
              </form>
            </div>

            <DeleteSection />
          </div>
        </TabsContent>

        <Members />
      </Tabs>
    </div>
  )
}
