import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'

export function SignIn() {
  const setCredentials = useAuthStore((state) => state.setCredentials)

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
    <div className="flex flex-1 items-center justify-center flex-col gap-4">
      <span>sign in page</span>

      <Button type="button" onClick={signIn}>
        Sign in
      </Button>
    </div>
  )
}
