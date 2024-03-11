import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useLocation } from 'react-router-dom'

import { Loader2 } from 'lucide-react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/auth'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  code: z.string().regex(/[a-zA-Z]{5}-[a-zA-Z]{5}-[a-zA-Z]{5}/),
})

type FormData = z.infer<typeof formSchema>

export function AccountVerification() {
  const location = useLocation()

  const state = location.state as { email: string } | undefined

  const { signIn } = useAuth()

  const { handleSubmit, register, formState } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const [isLoading, setIsLoading] = useState(false)

  async function sendVerificationCode({ code }: FormData) {
    try {
      setIsLoading(true)

      const response = await api.post('/auth-links/authenticate', {
        code,
      })

      signIn(response.data)
    } finally {
      setIsLoading(false)
    }
  }

  if (!state?.email) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="flex-1 flex flex-col items-center">
      <form
        className="flex-1 flex flex-col justify-center max-w-96 w-full space-y-6"
        onSubmit={handleSubmit(sendVerificationCode)}
      >
        <div>
          <h1 className="text-2xl font-semibold">Verify account</h1>
          <span className="text-sm text-muted-foreground">
            To continue, enter the code sent by email below.
          </span>
        </div>
        <div className="space-y-1">
          <Label>Code</Label>
          <Input placeholder="Code" {...register('code')} />
          <span className="text-sm text-red-500">
            {formState.errors.code?.message}
          </span>
        </div>

        <Button className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            'Verify code'
          )}
        </Button>
      </form>

      <footer className="p-4 text-center">
        <p className="text-muted-foreground text-sm leading-relaxed w-full max-w-80 md:max-w-none">
          By clicking verify code, you agree to our{' '}
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
