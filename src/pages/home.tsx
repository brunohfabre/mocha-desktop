import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'

export function Home() {
  const clearCredentials = useAuthStore((state) => state.clearCredentials)

  function signOut() {
    clearCredentials()
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4">
      <span>home page</span>

      <Button type="button" variant="destructive" onClick={signOut}>
        Sign out
      </Button>
    </div>
  )
}
