import { useNavigate } from 'react-router-dom'

import { PencilLineIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function Organizations() {
  const navigate = useNavigate()

  function handleNavigateToCreateOrganization() {
    navigate('/create-organization')
  }

  function handleNavigateToOrganization() {
    navigate('/organizations/123123')
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <header className="flex justify-between">
        <p className="text-lg font-semibold">Organizations</p>

        <Button type="button" onClick={handleNavigateToCreateOrganization}>
          + New organization
        </Button>
      </header>

      <div className="rounded-lg border">
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Organization #1</p>

            <div className="flex gap-2">
              <Badge variant="secondary">12 Members</Badge>
              <Badge variant="secondary">2 Collections</Badge>
              <Badge variant="secondary">No databases</Badge>
              <Badge variant="secondary">118 Passwords</Badge>
              <Badge variant="secondary">3 Notes</Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline">
              Select
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleNavigateToOrganization}
            >
              <PencilLineIcon className="size-4" />
            </Button>
          </div>
        </div>

        <Separator orientation="horizontal" />

        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Organization #2</p>

            <div className="flex gap-2">
              <Badge variant="secondary">12 Members</Badge>
              <Badge variant="secondary">2 Collections</Badge>
              <Badge variant="secondary">No databases</Badge>
              <Badge variant="secondary">118 Passwords</Badge>
              <Badge variant="secondary">3 Notes</Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" disabled>
              Selected
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleNavigateToOrganization}
            >
              <PencilLineIcon className="size-4" />
            </Button>
          </div>
        </div>

        <Separator orientation="horizontal" />

        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Organization #3</p>

            <div className="flex gap-2">
              <Badge variant="secondary">12 Members</Badge>
              <Badge variant="secondary">2 Collections</Badge>
              <Badge variant="secondary">No databases</Badge>
              <Badge variant="secondary">118 Passwords</Badge>
              <Badge variant="secondary">3 Notes</Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline">
              Select
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleNavigateToOrganization}
            >
              <PencilLineIcon className="size-4" />
            </Button>
          </div>
        </div>

        <Separator orientation="horizontal" />

        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Organization #4</p>

            <div className="flex gap-2">
              <Badge variant="secondary">12 Members</Badge>
              <Badge variant="secondary">2 Collections</Badge>
              <Badge variant="secondary">No databases</Badge>
              <Badge variant="secondary">118 Passwords</Badge>
              <Badge variant="secondary">3 Notes</Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline">
              Select
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleNavigateToOrganization}
            >
              <PencilLineIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
