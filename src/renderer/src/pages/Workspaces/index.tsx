import { useState } from 'react'

import { Plus } from 'phosphor-react'

import { useQuery } from '@tanstack/react-query'

import { Button } from '../../components/Button'
import { Empty } from '../../components/Empty'
import { Heading } from '../../components/Heading'
import { Text } from '../../components/Text'
import { api } from '../../lib/api'
import { CreateWorkspaceModal } from './CreateWorkspaceModal'
import { Container, Content } from './styles'
import { WorkspaceItem } from './WorkspaceItem'

export type WorkspaceType = {
  id: string
  name: string
}

export function Workspaces() {
  const [createModalVisible, setCreateModalVisible] = useState(false)

  const { data: workspaces, isLoading: isWorkspacesLoading } = useQuery(
    ['workspaces'],
    async () => {
      const response = await api.get('/workspaces')

      return response.data.workspaces
    },
  )

  if (!workspaces && isWorkspacesLoading) {
    return (
      <div>
        <Text>is loading</Text>
      </div>
    )
  }

  return (
    <>
      <CreateWorkspaceModal
        open={createModalVisible}
        onOpenChange={setCreateModalVisible}
      />

      <Container>
        <header>
          <Heading size="md">Workspaces</Heading>

          <Button type="button" onClick={() => setCreateModalVisible(true)}>
            <Plus weight="bold" />
            New workspace
          </Button>
        </header>

        {!workspaces.length ? (
          <Empty
            title="No workspaces yet"
            description="Create a workspace to start using the app."
          >
            <Button type="button" onClick={() => setCreateModalVisible(true)}>
              <Plus weight="bold" />
              New workspace
            </Button>
          </Empty>
        ) : (
          <Content>
            {workspaces.map((workspace: WorkspaceType) => (
              <WorkspaceItem key={workspace.id} workspace={workspace} />
            ))}
          </Content>
        )}
      </Container>
    </>
  )
}
