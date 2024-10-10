import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { LoaderCircle } from 'lucide-react'
import { z } from 'zod'

import LogoDark from '@/assets/logo-dark.png'
import LogoLight from '@/assets/logo-light.png'
import { useTheme } from '@/components/theme-provider'
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

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const { theme } = useTheme()

  const [loading, setLoading] = useState(false)

  async function signIn(data: FormData) {
    try {
      setLoading(true)

      const { email } = data

      await api.post('/authenticate', {
        email,
      })

      navigate('/verify-account', {
        state: {
          email,
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-96 flex-1 flex-col justify-center gap-8">
      <img
        src={theme === 'dark' ? LogoDark : LogoLight}
        alt="Mocha"
        className="w-10"
      />

      <h1 className="text-xl font-semibold">Sign in</h1>

      <form
        onSubmit={form.handleSubmit(signIn)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Email" {...form.register('email')} />
          {form.formState.errors.email?.message && (
            <span className="text-sm text-red-500">
              {form.formState.errors.email?.message}
            </span>
          )}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </div>
  )
}
