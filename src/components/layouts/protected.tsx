import { useEffect, useRef, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import LogoDark from '@/assets/logo-dark.png'
import LogoLight from '@/assets/logo-light.png'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth-store'
import { useOrganizationStore } from '@/stores/organization-store'

import { useTheme } from '../theme-provider'

export function Protected() {
  const firstRenderRef = useRef(true)

  const navigate = useNavigate()
  const location = useLocation()

  const token = useAuthStore((state) => state.token)
  const setUser = useAuthStore((state) => state.setUser)

  const setOrganization = useOrganizationStore((state) => state.setOrganization)

  const { theme } = useTheme()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUserData() {
      const meResponse = await api.get('/me')

      setUser(meResponse.data.user)

      if (!meResponse.data.user.name) {
        navigate('/create-name')
      }

      const organizationsResponse = await api.get('/organizations')

      setOrganization(organizationsResponse.data.organizations[0])

      setIsLoading(false)
    }

    if (token && firstRenderRef.current) {
      firstRenderRef.current = false

      loadUserData()
    }
  }, [token, setUser, navigate, location.pathname, setOrganization])

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <img
          src={theme === 'dark' ? LogoDark : LogoLight}
          alt="Mocha"
          className="w-14 animate-bounce"
        />
      </div>
    )
  }

  return <Outlet />
}
