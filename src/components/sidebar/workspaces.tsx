import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ChevronsUpDown, Check } from 'lucide-react'

import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu'

type WorkspaceType = {
  id: string
  name: string
}

export function Workspaces() {
  const navigate = useNavigate()

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

  function handleNavigateToCreateWorkspace() {
    navigate('/create-workspace')
  }

  if (isPending) {
    return <div>is loading</div>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-14 flex px-3 items-center justify-between border-b cursor-pointer hover:bg-muted">
          <span className="text-sm">{workspaceSelected?.name}</span>

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
        <DropdownMenuItem onClick={handleNavigateToCreateWorkspace}>
          + Create workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
