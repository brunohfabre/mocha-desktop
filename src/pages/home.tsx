import { useAuthStore } from '@/stores/auth-store'

export function Home() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4">
      <span className="text-lg font-medium">
        Welcome back, {user?.name.split(' ')[0]} 👋
      </span>
    </div>
  )
}
