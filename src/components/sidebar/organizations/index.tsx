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
import { useOrganizationStore } from '@/stores/organization'
import { useQuery } from '@tanstack/react-query'

import { CreateOrganizationModal } from './create-organization-modal'

export type OrganizationType = {
  id: string
  name: string
}

export function Organizations() {
  const [, setSearchParams] = useSearchParams()

  const location = useLocation()

  const expanded = location.pathname === '/'

  const organizationSelected = useOrganizationStore(
    (state) => state.organizationSelected,
  )
  const selectOrganization = useOrganizationStore(
    (state) => state.selectOrganization,
  )

  const { data, isPending } = useQuery({
    queryKey: ['organizations'],
    queryFn: async () => {
      const response = await api.get<{ organizations: OrganizationType[] }>(
        '/organizations',
      )

      if (!organizationSelected) {
        selectOrganization(response.data.organizations[0].id)
      }

      return response.data.organizations
    },
  })

  function handleOpenCreateOrganizationModal() {
    setSearchParams((state) => {
      state.set('modal', 'open')

      return state
    })
  }

  const organizationSelectedName =
    data?.find((organization) => organization.id === organizationSelected)
      ?.name ?? ''

  if (isPending) {
    return (
      <div className="h-14 border-b flex items-center justify-center text-sm">
        is loading...
      </div>
    )
  }

  return (
    <>
      <CreateOrganizationModal selectOrganization={selectOrganization} />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className={cn(
              'flex items-center justify-between px-3 h-14 border-b hover:bg-muted',
              !expanded && 'justify-center h-12',
            )}
          >
            {expanded && (
              <span className="text-sm">{organizationSelectedName}</span>
            )}

            <ChevronsUpDown className="w-4 h-4" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={cn('w-[248px]', !expanded && 'mt-1')}
          side={expanded ? 'bottom' : 'right'}
          align={expanded ? 'center' : 'start'}
        >
          {data?.map((organization) => (
            <DropdownMenuItem
              key={organization.id}
              className="flex justify-between items-center"
              onClick={() => selectOrganization(organization.id)}
            >
              {organization.name}
              {organization.id === organizationSelected && (
                <Check className="w-4 h-4" />
              )}
            </DropdownMenuItem>
          ))}

          {/* <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleNavigateToOrganizations}>
            All organizations
          </DropdownMenuItem> */}

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleOpenCreateOrganizationModal}>
            + Create organization
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
