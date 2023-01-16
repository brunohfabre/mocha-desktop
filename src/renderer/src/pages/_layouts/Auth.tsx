import { Outlet } from 'react-router-dom'

import { PageHeader } from '../../components/PageHeader'
import { Container } from './styles'

export function AuthLayout() {
  return (
    <Container>
      <PageHeader isAuth />

      <Outlet />
    </Container>
  )
}
