import { BrowserRouter } from 'react-router'

import { Toaster } from './components/ui/sonner'
import { Router } from './router'

export function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>

      <Toaster />
    </>
  )
}
