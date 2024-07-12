import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './components/theme-provider'
import { router } from './routes'

export function App() {
  return (
    <ThemeProvider storageKey="mocha.theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
