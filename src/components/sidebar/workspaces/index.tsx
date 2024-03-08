import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import { ChevronsUpDown, Check } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

import { CreateWorkspaceModal } from './create-workspace-modal'

export type WorkspaceType = {
  id: string
  name: string
}

export function Workspaces() {
  const [, setSearchParams] = useSearchParams()

  const location = useLocation()

  const isShort = location.pathname !== '/'

  const [workspaceSelected, setWorkspaceSelected] =
    useState<WorkspaceType | null>(() => {
      const persistedData = localStorage.getItem('mocha:workspace')

      if (persistedData) {
        return JSON.parse(persistedData)
      }

      return null
    })

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const response = await api.get<{ workspaces: WorkspaceType[] }>(
        '/workspaces',
      )

      return response.data.workspaces
    },
  })

  useEffect(() => {
    if (data?.length && isSuccess && !workspaceSelected) {
      handleSelectWorkspace(data[0])
    }
  }, [data, isSuccess, workspaceSelected])

  function handleSelectWorkspace(workspace: WorkspaceType) {
    setWorkspaceSelected(workspace)

    localStorage.setItem('mocha:workspace', JSON.stringify(workspace))
  }

  function handleOpenCreateWorkspaceModal() {
    setSearchParams((state) => {
      state.set('modal', 'open')

      return state
    })
  }

  if (isPending) {
    return <div>is loading</div>
  }

  return (
    <>
      <CreateWorkspaceModal selectWorkspace={handleSelectWorkspace} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            data-is-short={isShort}
            className="h-14 flex px-3 items-center justify-between border-b cursor-pointer data-[is-short=true]:justify-center hover:bg-muted"
          >
            <span
              data-is-short={isShort}
              className="text-sm data-[is-short=true]:hidden"
            >
              {workspaceSelected?.name}
            </span>

            <ChevronsUpDown size={16} className="text-muted-foreground" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-60">
          {data?.map((workspace) => (
            <DropdownMenuItem
              key={workspace.id}
              onClick={() => handleSelectWorkspace(workspace)}
              className="items-center justify-between"
            >
              {workspace.name}

              {workspace.id === workspaceSelected?.id && <Check size={14} />}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleOpenCreateWorkspaceModal}>
            + Create workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
