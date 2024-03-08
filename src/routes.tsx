import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app-layout'
import { AuthLayout } from './pages/_layouts/auth-layout'
import { CodeVerification } from './pages/auth/code-verification'
import { SignIn } from './pages/auth/sign-in'
import { Collections } from './pages/collections'
import { Home } from './pages/home'

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
  // {
  //   element: <InternalLayout />,
  //   path: '/',
  //   children: [
  //     {
  //       path: '/create-workspace',
  //       element: <CreateWorkspaceModal />,
  //     },
  //   ],
  // },
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
        element: <CodeVerification />,
      },
    ],
  },
])
