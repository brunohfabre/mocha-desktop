import { useAuthStore } from '@/stores/auth-store'

export function Home() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="flex-1 flex flex-col gap-4 p-4">
      <span className="text-base font-medium">
        Welcome back, {user?.name.split(' ')[0]} 👋
      </span>
    </div>
  )
}
