import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  name: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

export function Profile() {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const setCredentials = useAuthStore((state) => state.setCredentials)

  const { handleSubmit, formState, register } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: user ?? {},
  })

  const [isLoading, setIsLoading] = useState(false)

  async function updateUser({ name }: FormData) {
    try {
      setIsLoading(true)

      const response = await api.put('/users', {
        name,
      })

      setCredentials({
        token,
        user: response.data.user,
      })

      toast.success('Profile updated successfully.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-8 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <strong className="text-lg font-semibold">About you</strong>

        <form
          className="border rounded-lg flex flex-col p-4 gap-8"
          onSubmit={handleSubmit(updateUser)}
        >
          <div className="space-y-1">
            <Label>Name</Label>
            <Input placeholder="Name" {...register('name')} />
            <span className="text-sm text-red-500">
              {formState.errors.name?.message}
            </span>
          </div>

          <div className="flex justify-end">
            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Save
            </Button>
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-2">
        <strong className="text-lg font-semibold">Danger zone</strong>

        <div className="border rounded-lg flex flex-col p-4 gap-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-base font-medium">Delete your account?</p>
              <p className="text-sm text-muted-foreground">
                This action delete all data of your account.
              </p>
            </div>

            <Button type="button" variant="destructive" disabled>
              Delete account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
