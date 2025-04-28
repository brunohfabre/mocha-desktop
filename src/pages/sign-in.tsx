import { Button } from '@/components/ui/button'

import Logo from '@/assets/logo.svg'
import { useAuthStore } from '@/stores/auth-store'

export function SignIn() {
  const { setCredentials } = useAuthStore()

  function handleSignIn() {
    setCredentials({
      token: 'adsasd',
      user: {
        id: 'id',
        name: 'John Doe',
        email: 'johndoe@email.com',
      },
    })
  }

  return (
    <div className="flex flex-col justify-center flex-1 mx-auto max-w-80 w-full gap-8">
      <img src={Logo} alt="Mocha" className="w-10" />

      <div className="gap-1">
        <h1 className="text-xl font-semibold">Log in to Mocha</h1>
        <span className="text-muted-foreground text-sm">
          The new stardard for devs.
        </span>
      </div>

      <Button type="submit" onClick={handleSignIn}>
        Continue
      </Button>
    </div>
  )
}
