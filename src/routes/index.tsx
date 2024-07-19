import { createBrowserRouter } from 'react-router-dom'

import { AccountSettings } from '@/pages/account-settings'
import { AccountVerification } from '@/pages/account-verification'
import { Collections } from '@/pages/collections'
import { Collection } from '@/pages/collections/collection'
import { CreateCollection } from '@/pages/create-collection'
import { CreateOrganization } from '@/pages/create-organization'
import { Databases } from '@/pages/databases'
import { Home } from '@/pages/home'
import { NoMatch } from '@/pages/no-match'
import { Notes } from '@/pages/notes'
import { Notifications } from '@/pages/notifications'
import { Organizations } from '@/pages/organizations'
import { Organization } from '@/pages/organizations/organization'
import { Passwords } from '@/pages/passwords'
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
      {
        path: '/collections',
        element: <Collections />,
      },
      {
        path: '/databases',
        element: <Databases />,
      },
      {
        path: '/passwords',
        element: <Passwords />,
      },
      {
        path: '/notes',
        element: <Notes />,
      },
      {
        path: '/collections/:id',
        element: <Collection />,
      },
    ],
  },
  {
    path: '/',
    element: <InternalLayout />,
    children: [
      {
        path: '/account/:tab?',
        element: <AccountSettings />,
      },
      {
        path: '/organizations',
        element: <Organizations />,
      },
      {
        path: '/create-organization',
        element: <CreateOrganization />,
      },
      {
        path: '/notifications',
        element: <Notifications />,
      },
      {
        path: '/organizations/:id',
        element: <Organization />,
      },
      {
        path: '/create-collection',
        element: <CreateCollection />,
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
    path: '*',
    element: <NoMatch />,
  },
])
