import { Route, Routes } from 'react-router'
import { AppLayout } from './components/layouts/app-layout'
import { AuthLayout } from './components/layouts/auth-layout'
import { Home } from './pages/home'
import { SignIn } from './pages/sign-in'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  )
}
