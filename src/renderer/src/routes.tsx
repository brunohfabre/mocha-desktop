import { Route } from 'react-router-dom'
import { Router } from '../../lib/electron-router-dom'
import { Home } from './pages/home'
import { SignIn } from './pages/sign-in'

export function AppRoutes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
        </>
      }
    />
  )
}
