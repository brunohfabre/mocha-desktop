import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app-layout'
import { AuthLayout } from './pages/_layouts/auth-layout'
import { InternalLayout } from './pages/_layouts/internal-layout'
import { AccountVerification } from './pages/auth/account-verification'
import { SignIn } from './pages/auth/sign-in'
import { Collections } from './pages/collections'
import { Home } from './pages/home'
import { Profile } from './pages/profile'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/collections',
        element: <Collections />,
      },
    ],
  },
  {
    element: <InternalLayout />,
    children: [
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/code-verification',
        element: <AccountVerification />,
      },
    ],
  },
])
