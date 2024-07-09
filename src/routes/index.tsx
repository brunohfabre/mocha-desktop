import { createBrowserRouter } from 'react-router-dom'

import { AccountVerification } from '@/pages/account-verification'
import { Home } from '@/pages/home'
import { NoMatch } from '@/pages/no-match'
import { SignIn } from '@/pages/sign-in'

import { AppLayout } from './layouts/app-layout'
import { AuthLayout } from './layouts/auth-layout'
import { InternalLayout } from './layouts/internal-layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
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
        path: '/account-verification',
        element: <AccountVerification />,
      },
    ],
  },
  {
    path: '/',
    element: <InternalLayout />,
    children: [],
  },
  {
    path: '*',
    element: <NoMatch />,
  },
])
