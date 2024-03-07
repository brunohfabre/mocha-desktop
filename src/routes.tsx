import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app-layout'
import { AuthLayout } from './pages/_layouts/auth-layout'
import { InternalLayout } from './pages/_layouts/internal-layout'
import { CodeVerification } from './pages/auth/code-verification'
import { SignIn } from './pages/auth/sign-in'
import { CreateWorkspace } from './pages/create-workspace'
import { Home } from './pages/home'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    element: <InternalLayout />,
    path: '/',
    children: [
      {
        path: '/create-workspace',
        element: <CreateWorkspace />,
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
        element: <CodeVerification />,
      },
    ],
  },
])
