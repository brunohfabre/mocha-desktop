import { Route } from 'react-router-dom'
import { Router } from '../../lib/electron-router-dom'
import { AppLayout } from './components/_layouts/app-layout'
import { AuthLayout } from './components/_layouts/auth-layout'
import { Github } from './pages/github'
import { Home } from './pages/home'
import { SignIn } from './pages/sign-in'

export function AppRoutes() {
  return (
    <Router
      main={
        <>
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/auth/github" element={<Github />} />
          </Route>

          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </>
      }
    />
  )
}
