import { Router, Route } from 'electron-router-dom'

import { AuthLayout } from '../pages/_layouts/Auth'
import { DefaultLayout } from '../pages/_layouts/Default'
import { InternalLayout } from '../pages/_layouts/Internal'
import { GitHubCallback } from '../pages/GitHubCallback'
import { Home } from '../pages/Home'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'
import { Workspaces } from '../pages/Workspaces'
import { Protected } from './Protected'

export function AppRoutes() {
  return (
    <Router
      main={
        <>
          <Route element={<Protected />}>
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />

              <Route path="/callback/github" element={<GitHubCallback />} />
            </Route>
          </Route>

          <Route element={<Protected isProtected />}>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route element={<InternalLayout />}>
              <Route path="/workspaces" element={<Workspaces />} />
            </Route>
          </Route>
        </>
      }
    />
  )
}
