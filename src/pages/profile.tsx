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

      toast.success('Profile updated successfully')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col py-8 px-4 gap-8">
      <div className="flex flex-col gap-2">
        <strong className="text-lg font-medium">Account details</strong>

        <form
          className="border rounded-lg flex flex-col p-4 gap-4"
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
            <Button>
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* <div className="flex flex-col gap-2">
        <strong className="text-lg font-medium">Danger zone</strong>

        <div className="border rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-base font-semibold">Delete account</p>
              <p className="text-sm text-gray-500">
                This action will be remove all content vinculated your account
                like collections.
              </p>
            </div>
            <Button variant="destructive">Delete account</Button>
          </div>
        </div>
      </div> */}
    </div>
  )
}
