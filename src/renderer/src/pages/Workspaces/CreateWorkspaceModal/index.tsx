import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '../../../components/Button'
import { Modal } from '../../../components/Modal'
import { TextInput } from '../../../components/TextInput'
import { api } from '../../../lib/api'
import { useWorkspaceStore } from '../../../stores/workspaceStore'
import { Container } from './styles'

type CreateWorkspaceModalProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
}

const createWorkspaceFormSchema = z.object({
  name: z.string().min(1, 'required'),
})

type CreateWorkspaceFormData = z.infer<typeof createWorkspaceFormSchema>

export function CreateWorkspaceModal({
  open,
  onOpenChange,
}: CreateWorkspaceModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateWorkspaceFormData>({
    resolver: zodResolver(createWorkspaceFormSchema),
  })

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const selectWorkspace = useWorkspaceStore((state) => state.selectWorkspace)

  function handleClose() {
    reset()
    onOpenChange(false)
  }

  const {
    mutateAsync: handleCreateWorkspace,
    isLoading: isCreateWorkspaceLoading,
  } = useMutation(
    async (data: CreateWorkspaceFormData) => {
      const { name } = data

      const response = await api.post('/workspaces', {
        name,
      })

      return response.data.workspace
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['workspaces'], (prevState: any) => [
          ...prevState,
          data,
        ])

        handleClose()
        selectWorkspace(data)
        navigate('/')
      },
    },
  )

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      title="New workspace"
      size="sm"
    >
      <Container onSubmit={handleSubmit(handleCreateWorkspace as any)}>
        <TextInput
          label="Name"
          placeholder="Name"
          {...register('name')}
          error={errors.name?.message}
          autoFocus
        />

        <footer>
          <Button isLoading={isCreateWorkspaceLoading}>Create</Button>
        </footer>
      </Container>
    </Modal>
  )
}
