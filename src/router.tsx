import { Route, Routes } from 'react-router'

import { AuthLayout } from './components/_layouts/auth-layout'

import { AppLayout } from './components/_layouts/app-layout'
import { GithubAuth } from './pages/auth/github'
import { Collections } from './pages/collections'
import { Collection } from './pages/collections/collection'
import { Home } from './pages/home'
import { SignIn } from './pages/sign-in'

export function Router() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:collectionId" element={<Collection />} />
        <Route
          path="/collections/:collectionId/requests/:requestId"
          element={<Collection />}
        />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/auth/github/:token" element={<GithubAuth />} />
      </Route>
    </Routes>
  )
}
