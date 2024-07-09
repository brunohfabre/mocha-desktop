import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { z } from 'zod'

import LogoLight from '@/assets/images/logo-light.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { open } from '@tauri-apps/api/shell'

const formSchema = z.object({
  email: z.string().email(),
})

type FormData = z.infer<typeof formSchema>

export function SignIn() {
  const navigate = useNavigate()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  function authenticate(data: FormData) {
    console.log('authenticate', data)

    navigate('/account-verification')
  }

  return (
    <div className="mx-auto flex size-full max-w-96 flex-col justify-center gap-8 px-4">
      <div className="mb-4 flex justify-center">
        <img src={LogoLight} alt="Mocha" className="w-14" />
      </div>

      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(authenticate)}
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            The new standard for project management
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>

          <Input id="email" placeholder="Email" {...form.register('email')} />

          {form.formState.errors.email?.message && (
            <span className="text-xs text-red-500">
              {form.formState.errors.email?.message}
            </span>
          )}
        </div>

        <Button type="submit">Sign in</Button>
      </form>

      <div className="flex justify-center">
        <span className="max-w-80 text-center text-xs text-muted-foreground/75">
          By clicking sign in, you agree to our{' '}
          <button
            type="button"
            className="underline underline-offset-4 hover:text-black"
            onClick={() => {
              open('https://mocha.coddee.co/terms-of-service')
            }}
          >
            Terms of Service
          </button>{' '}
          and{' '}
          <button
            type="button"
            className="underline underline-offset-4 hover:text-black"
            onClick={() => {
              open('https://mocha.coddee.co/privacy-policy')
            }}
          >
            Privacy Policy
          </button>
          .
        </span>
      </div>
    </div>
  )
}
