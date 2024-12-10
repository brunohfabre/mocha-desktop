import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-full flex flex-col gap-4">
      <div className="bg-red-200 region-drag p-2">
        <button
          type="button"
          className="size-10 bg-blue-200 region-no-drag"
          onClick={() => window.api.window.minimize()}
        />
        <button
          type="button"
          className="size-10 bg-green-200 region-no-drag"
          onClick={() => window.api.window.toggleMaximize()}
        />
        <button
          type="button"
          className="size-10 bg-gray-200 region-no-drag"
          onClick={() => window.api.window.close()}
        />
      </div>

      <div className="flex flex-col p-4 gap-2">
        <p>home</p>

        <div>
          <Button type="button" onClick={() => navigate('/sign-in')}>
            go to sign in
          </Button>
        </div>
      </div>
    </div>
  )
}
