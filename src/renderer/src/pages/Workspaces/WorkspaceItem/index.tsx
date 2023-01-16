import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { WorkspaceType } from '..'

import { AlertDialog } from '../../../components/AlertDialog'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
} from '../../../components/ContextMenu'
import { Heading } from '../../../components/Heading'
import { api } from '../../../lib/api'
import { useWorkspaceStore } from '../../../stores/workspaceStore'
import { Container } from './styles'

type WorkspaceItemProps = {
  workspace: WorkspaceType
}

export function WorkspaceItem({ workspace }: WorkspaceItemProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const selectWorkspace = useWorkspaceStore((state) => state.selectWorkspace)

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)

  const {
    mutateAsync: handleDeleteWorkspace,
    isLoading: isHandleDeleteWorkspaceLoading,
  } = useMutation(
    async () => {
      await api.delete(`/workspaces/${workspace.id}`)
    },
    {
      onSuccess: () => {
        queryClient.setQueryData(['workspaces'], (prevState: any) =>
          prevState.filter((item: WorkspaceType) => item.id !== workspace.id),
        )

        setConfirmDeleteVisible(false)
      },
    },
  )

  function handleSelectWorkspace(workspace: WorkspaceType) {
    selectWorkspace(workspace)
    navigate('/')
  }

  return (
    <>
      <AlertDialog
        open={confirmDeleteVisible}
        onOpenChange={setConfirmDeleteVisible}
        title="Delete workspace"
        description={`Are you sure you want to delete the workspace ${workspace.name}? This action is permanent and will delete all your workspace data.`}
        onAction={handleDeleteWorkspace}
        actionLoading={isHandleDeleteWorkspaceLoading}
        actionText="Delete"
      />

      <ContextMenu key={workspace.id}>
        <Container onClick={() => handleSelectWorkspace(workspace)}>
          <Heading size="sm">{workspace.name}</Heading>
        </Container>

        <ContextMenuContent>
          <ContextMenuItem
            type="danger"
            onClick={() => setConfirmDeleteVisible(true)}
          >
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  )
}
