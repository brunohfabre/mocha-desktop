import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'

import LogoBlack from '@/assets/images/logo-black.png'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { z } from 'zod'

const signUpFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(6),
})

type SignUpFormData = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const setCredentials = useAuthStore((state) => state.setCredentials)

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  })

  function signUp() {
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
        <h1 className="text-lg font-semibold">Create new account</h1>
        <span className="text-muted-foreground text-sm">
          Enter your name and email to receive a one-time passcode.
        </span>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={signUpForm.handleSubmit(signUp)}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              aria-invalid={!!signUpForm.formState.errors.name?.message}
              {...signUpForm.register('name')}
            />
            {signUpForm.formState.errors.name?.message && (
              <span className="text-sm text-red-500">
                {signUpForm.formState.errors.name?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="johndoe@acme.com"
              aria-invalid={!!signUpForm.formState.errors.email?.message}
              {...signUpForm.register('email')}
            />
            {signUpForm.formState.errors.email?.message && (
              <span className="text-sm text-red-500">
                {signUpForm.formState.errors.email?.message}
              </span>
            )}
          </div>
        </div>

        <Button type="submit">Create account</Button>

        <span className="text-sm text-center text-muted-foreground">
          Do you have account?{' '}
          <Link to="/sign-in" className="text-foreground hover:underline">
            Sign in
          </Link>
        </span>
      </form>
    </div>
  )
}
