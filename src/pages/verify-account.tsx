import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import { LoaderCircle } from 'lucide-react'
import { z } from 'zod'

import LogoDark from '@/assets/logo-dark.png'
import LogoLight from '@/assets/logo-light.png'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth-store'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  code: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

export function VerifyAccount() {
  const navigate = useNavigate()
  const location = useLocation()

  const state = location.state as { email?: string }

  const { theme } = useTheme()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const setToken = useAuthStore((state) => state.setToken)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!state?.email) {
      navigate('/sign-in', {
        replace: true,
      })
    }
  }, [state, navigate])

  async function verifyCode(data: FormData) {
    try {
      setLoading(true)

      const { code } = data

      const response = await api.post('/sessions', {
        email: state?.email,
        code,
      })

      setToken(response.data.token)
    } finally {
      setLoading(false)
    }
  }

  function handleBack() {
    navigate(-1)
  }

  return (
    <div className="mx-auto flex max-w-96 flex-1 flex-col justify-center gap-8">
      <img
        src={theme === 'dark' ? LogoDark : LogoLight}
        alt="Mocha"
        className="w-10"
      />

      <h1 className="text-2xl font-semibold">Verify account</h1>

      <form
        onSubmit={form.handleSubmit(verifyCode)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-1">
          <Label htmlFor="code">Code</Label>
          <Input id="code" placeholder="Code" {...form.register('code')} />
          {form.formState.errors.code?.message && (
            <span className="text-sm text-red-500">
              {form.formState.errors.code?.message}
            </span>
          )}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            'Verify code'
          )}
        </Button>
      </form>

      <Button type="button" variant="ghost" onClick={handleBack}>
        Back to sign in
      </Button>
    </div>
  )
}
