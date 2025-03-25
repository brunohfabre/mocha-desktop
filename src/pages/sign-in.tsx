import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'

import LogoBlack from '@/assets/images/logo-black.png'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { z } from 'zod'

const signInFormSchema = z.object({
  email: z.string().email().min(1),
})

type SignInFormData = z.infer<typeof signInFormSchema>

export function SignIn() {
  const setCredentials = useAuthStore((state) => state.setCredentials)

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  })

  function signIn() {
    setCredentials({
      token: 'asdasd',
      user: {
        id: crypto.randomUUID(),
        name: 'Bruno Fabre',
        email: 'bruno.hfabre@gmail.com',
      },
    })
  }

  return (
    <div className="flex flex-col justify-center flex-1 mx-auto max-w-sm gap-8">
      <img src={LogoBlack} alt="Mocha" className="w-12" />

      <div className="gap-1">
        <h1 className="text-lg font-semibold">Log in to Mocha</h1>
        <span className="text-muted-foreground text-sm">
          Enter your email to receive a one-time passcode.
        </span>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={signInForm.handleSubmit(signIn)}
      >
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="johndoe@acme.com"
            {...signInForm.register('email')}
          />
          {signInForm.formState.errors.email?.message && (
            <span className="text-sm text-red-500">
              {signInForm.formState.errors.email?.message}
            </span>
          )}
        </div>

        <Button type="submit">Continue</Button>

        <span className="text-sm text-center text-muted-foreground">
          Don't have a account?{' '}
          <Link to="/sign-up" className="text-foreground hover:underline">
            Create one
          </Link>
        </span>
      </form>
    </div>
  )
}
