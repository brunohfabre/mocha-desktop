import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CaretDown } from 'phosphor-react'

import { useAuthStore } from '../../stores/authStore'
import { useWorkspaceStore } from '../../stores/workspaceStore'
import { AlertDialog } from '../AlertDialog'
import { Avatar } from '../Avatar'
import { Dropdown, DropdownContent, DropdownItem } from '../Dropdown'
import { Text } from '../Text'
import { Container, ProfileContainer, WorkspacesContainer } from './styles'

type PageHeaderProps = {
  isAuth?: boolean
  spacing?: boolean
  showWorkspace?: boolean
}

export function PageHeader({
  isAuth,
  spacing,
  showWorkspace = true,
}: PageHeaderProps) {
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)

  const { workspace, selectWorkspace } = useWorkspaceStore((state) => ({
    workspace: state.workspace,
    selectWorkspace: state.selectWorkspace,
  }))
  const signOut = useAuthStore((state) => state.signOut)

  const [confirmSignOutVisible, setConfirmSignOutVisible] = useState(false)

  function handleSignOut() {
    selectWorkspace(null)
    signOut()
  }

  return (
    <>
      <AlertDialog
        open={confirmSignOutVisible}
        onOpenChange={setConfirmSignOutVisible}
        title="Sign out"
        description="Are you sure sign out from app?"
        onAction={handleSignOut}
        actionText="Sign out"
      />

      <Container css={{ paddingLeft: spacing ? 86 : 16 }}>
        {!isAuth && (
          <>
            {showWorkspace && workspace?.id && (
              <WorkspacesContainer onClick={() => navigate('/workspaces')}>
                <Text size="sm">{workspace?.name}</Text>
                <CaretDown />
              </WorkspacesContainer>
            )}

            <Dropdown>
              <ProfileContainer>
                <Text size="sm">{user?.name}</Text>

                <Avatar />
              </ProfileContainer>

              <DropdownContent>
                <DropdownItem
                  type="danger"
                  onClick={() => setConfirmSignOutVisible(true)}
                >
                  Sign out
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </>
        )}
      </Container>
    </>
  )
}
