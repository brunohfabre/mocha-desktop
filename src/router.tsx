import { Route, Routes } from 'react-router'

import { AuthLayout } from './components/_layouts/auth-layout'

import { AppLayout } from './components/_layouts/app-layout'
import { GithubAuth } from './pages/auth/github'
import { Home } from './pages/home'
import { SignIn } from './pages/sign-in'

export function Router() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/auth/github/:token" element={<GithubAuth />} />
      </Route>
    </Routes>
  )
}
