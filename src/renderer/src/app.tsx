import { Toaster } from './components/ui/sonner'
import { AppRoutes } from './routes'

export function App() {
  return (
    <>
      <AppRoutes />

      <Toaster position="top-right" />
    </>
  )
}
