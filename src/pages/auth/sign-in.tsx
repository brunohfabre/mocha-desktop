import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Loader2 } from 'lucide-react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  email: z.string().min(1).email(),
})

type FormData = z.infer<typeof formSchema>

export function SignIn() {
  const { handleSubmit, register, formState } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const [isLoading, setIsLoading] = useState(false)

  async function sendVerificationCode({ email }: FormData) {
    try {
      setIsLoading(true)

      await api.post('/authenticate', {
        email,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <form
        className="max-w-96 w-full space-y-6"
        onSubmit={handleSubmit(sendVerificationCode)}
      >
        <div>
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <span className="text-sm text-muted-foreground">Welcome back 👋</span>
        </div>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input placeholder="Email" {...register('email')} />
          <span className="text-sm text-red-500">
            {formState.errors.email?.message}
          </span>
        </div>

        <Button className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </div>
  )
}
