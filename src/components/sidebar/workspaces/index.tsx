import { useEffect } from 'react'
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
import { useWorkspaceStore } from '@/stores/workspace'
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

  const workspaceSelected = useWorkspaceStore(
    (state) => state.workspaceSelected,
  )
  const selectWorkspace = useWorkspaceStore((state) => state.selectWorkspace)

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
      selectWorkspace(data[0].id)
    }
  }, [data, isSuccess, workspaceSelected, selectWorkspace])

  // function handleNavigateToWorkspaces() {
  //   navigate('/workspaces')
  // }

  function handleOpenCreateWorkspaceModal() {
    setSearchParams((state) => {
      state.set('modal', 'open')

      return state
    })
  }

  const workspaceSelectedName =
    data?.find((workspace) => workspace.id === workspaceSelected)?.name ?? ''

  if (isPending) {
    return (
      <div className="h-14 border-b flex items-center justify-center text-sm">
        is loading...
      </div>
    )
  }

  return (
    <>
      <CreateWorkspaceModal selectWorkspace={selectWorkspace} />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className={cn(
              'flex items-center justify-between px-3 h-14 border-b hover:bg-muted',
              !expanded && 'justify-center h-12',
            )}
          >
            {expanded && (
              <span className="text-sm">{workspaceSelectedName}</span>
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
              onClick={() => selectWorkspace(workspace.id)}
            >
              {workspace.name}
              {workspace.id === workspaceSelected && (
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
