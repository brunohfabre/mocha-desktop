import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ChevronLeft } from 'lucide-react'
import { z } from 'zod'

import LogoLight from '@/assets/images/logo-light.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authStore } from '@/stores/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { open } from '@tauri-apps/api/shell'

const formSchema = z.object({
  code: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

let countdownTimer: any

export function AccountVerification() {
  const navigate = useNavigate()

  const setCredentials = authStore((state) => state.setCredentials)

  const [time, setTime] = useState(59)

  useEffect(() => {
    if (time) {
      countdownTimer = setTimeout(() => {
        setTime((prevState) => prevState - 1)
      }, 1000)
    }

    return () => {
      clearTimeout(countdownTimer)
    }
  }, [time])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  function verifyAccount(data: FormData) {
    console.log('verify', data)

    setCredentials({
      token: 'asdasd',
      user: {
        id: crypto.randomUUID(),
        name: 'Bruno Fabre',
        email: 'bruno.hfabre@gmail.com',
      },
    })
  }

  function handleResendCode() {
    setTime(60)
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="p-4">
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="size-4" />
        </Button>
      </div>

      <div className="mx-auto flex size-full max-w-96 flex-col justify-center px-4">
        <div className="flex flex-1 flex-col justify-center gap-8">
          <div className="mb-4 flex justify-center">
            <img src={LogoLight} alt="Mocha" className="w-14" />
          </div>

          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(verifyAccount)}
          >
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold">Account verification</h1>
              <p className="text-sm text-muted-foreground">
                To continue, type code sent by email
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="code">Code</Label>

              <Input
                id="code"
                placeholder="Code"
                autoFocus
                {...form.register('code')}
              />

              {form.formState.errors.code?.message && (
                <span className="text-xs text-red-500">
                  {form.formState.errors.code?.message}
                </span>
              )}
            </div>

            <Button type="submit">Verify account</Button>
          </form>

          <Button
            type="button"
            variant="ghost"
            disabled={!!time}
            onClick={handleResendCode}
          >
            Resend code {!!time && `(${time})`}
          </Button>

          <div className="flex justify-center">
            <span className="max-w-80 text-center text-xs text-muted-foreground/75">
              By clicking verify account, you agree to our{' '}
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
      </div>
    </div>
  )
}
