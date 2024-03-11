import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import { Check, ChevronsUpDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'

import { CreateWorkspaceModal } from './create-workspace-modal'

export type WorkspaceType = {
  id: string
  name: string
}

export function Workspaces() {
  const [, setSearchParams] = useSearchParams()

  const location = useLocation()

  const expanded = location.pathname === '/'

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

  // function handleNavigateToWorkspaces() {
  //   navigate('/workspaces')
  // }

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
    return (
      <div className="h-14 border-b flex items-center justify-center text-sm">
        is loading...
      </div>
    )
  }

  return (
    <>
      <CreateWorkspaceModal selectWorkspace={handleSelectWorkspace} />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className={cn(
              'flex items-center justify-between px-3 h-14 border-b hover:bg-muted',
              !expanded && 'justify-center h-12',
            )}
          >
            {expanded && (
              <span className="text-sm">{workspaceSelected?.name}</span>
            )}

            <ChevronsUpDown className="w-4 h-4" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={cn('w-[248px]', !expanded && 'mt-1')}
          side={expanded ? 'bottom' : 'right'}
          align={expanded ? 'center' : 'start'}
        >
          {data?.map((workspace) => (
            <DropdownMenuItem
              key={workspace.id}
              className="flex justify-between items-center"
              onClick={() => handleSelectWorkspace(workspace)}
            >
              {workspace.name}
              {workspace.id === workspaceSelected?.id && (
                <Check className="w-4 h-4" />
              )}
            </DropdownMenuItem>
          ))}

          {/* <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleNavigateToWorkspaces}>
            All workspaces
          </DropdownMenuItem> */}

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleOpenCreateWorkspaceModal}>
            + Create workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
