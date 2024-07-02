import { createBrowserRouter } from 'react-router-dom'

import { Home } from '@/pages/home'
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
    ],
  },
  {
    path: '/',
    element: <InternalLayout />,
    children: [],
  },
])
