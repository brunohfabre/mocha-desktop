import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './components/layouts/app-layout'
import { AuthLayout } from './components/layouts/auth-layout'
import { InternalLayout } from './components/layouts/internal-layout'
import { Protected } from './components/layouts/protected'
import { Collections } from './pages/collections'
import { Collection } from './pages/collections/collection'
import { CollectionRequest } from './pages/collections/collection/collection-request'
import { Environments } from './pages/collections/collection/environments'
import { CreateName } from './pages/create-name'
import { Home } from './pages/home'
import { NotFound } from './pages/not-found'
import { SignIn } from './pages/sign-in'
import { VerifyAccount } from './pages/verify-account'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/verify-account',
        element: <VerifyAccount />,
      },
    ],
  },
  {
    element: <Protected />,
    children: [
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
          {
            path: 'collections/:collectionId',
            element: <Collection />,
            children: [
              {
                path: 'requests/:requestId',
                element: <CollectionRequest />,
              },
              {
                path: 'environments',
                element: <Environments />,
              },
            ],
          },
        ],
      },
      {
        element: <InternalLayout />,
        children: [
          {
            path: '/create-name',
            element: <CreateName />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
