import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '../pages/_layouts/app-layout'
import { AuthLayout } from '../pages/_layouts/auth-layout'
import { InternalLayout } from '../pages/_layouts/internal-layout'
import { Collections } from '../pages/app/collections'
import { Home } from '../pages/app/home'
import { Notifications } from '../pages/app/notifications'
import { Organization } from '../pages/app/organization'
import { Profile } from '../pages/app/profile'
import { AccountVerification } from '../pages/auth/account-verification'
import { SignIn } from '../pages/auth/sign-in'
import { Protected } from './protected'

export const router = createBrowserRouter([
  {
    element: <Protected isProtected={false} />,
    children: [
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
    ],
  },

  {
    element: <Protected isProtected />,
    children: [
      {
        path: '/',
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
        path: '/',
        element: <InternalLayout />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
          },
          {
            path: '/organizations/:id',
            element: <Organization />,
          },
          {
            path: '/notifications',
            element: <Notifications />,
          },
        ],
      },
    ],
  },
])
