import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

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

      navigate('/code-verification', {
        state: {
          email,
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center">
      <form
        className="flex-1 flex flex-col justify-center max-w-96 w-full space-y-6"
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

      <footer className="p-4 text-center">
        <p className="text-muted-foreground text-sm leading-relaxed w-full max-w-80 md:max-w-none">
          By clicking sign in, you agree to our{' '}
          <Link
            to="/terms-of-service"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            to="/privacy-policy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </footer>
    </div>
  )
}
