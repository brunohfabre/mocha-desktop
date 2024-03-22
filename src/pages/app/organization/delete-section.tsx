import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { OrganizationType } from '@/components/sidebar/organizations'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import { useOrganizationStore } from '@/stores/organization'
import { useQueryClient } from '@tanstack/react-query'

export function DeleteSection() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const queryClient = useQueryClient()

  const organizationSelected = useOrganizationStore(
    (state) => state.organizationSelected,
  )
  const selectOrganization = useOrganizationStore(
    (state) => state.selectOrganization,
  )

  const [isLoading, setIsLoading] = useState(false)
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
  const [deleteInput, setDeleteInput] = useState('')

  function handleCloseDeleteDialog() {
    setDeleteDialogVisible(false)
    setDeleteInput('')
  }

  async function handleDelete() {
    try {
      setIsLoading(true)

      const organizations = queryClient.getQueryData([
        'organizations',
      ]) as OrganizationType[]

      if (organizations.length <= 1) {
        toast.error('Cannot delete all organizations.')

        return
      }

      await api.delete(`/organizations/${id}`)

      if (id === organizationSelected) {
        selectOrganization(organizations[0].id)
      }

      navigate(-1)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Dialog open={deleteDialogVisible} onOpenChange={setDeleteDialogVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete organization</DialogTitle>
            <DialogDescription>
              Really want to delete this organization?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1 my-4">
            <Label className="text-muted-foreground" htmlFor="delete">
              To verify, type <strong className="text-primary">DELETE</strong>{' '}
              above
            </Label>
            <Input
              id="delete"
              value={deleteInput}
              onChange={(event) => setDeleteInput(event.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseDeleteDialog}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              onClick={handleDelete}
              disabled={isLoading || deleteInput !== 'DELETE'}
              variant="destructive"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Delete organization
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-2">
        <strong className="text-lg font-semibold">Danger zone</strong>

        <div className="border rounded-lg flex flex-col p-4 gap-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-base font-medium">Delete organization?</p>
              <p className="text-sm text-zinc-500">
                This action delete all data of organization.
              </p>
            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={() => setDeleteDialogVisible(true)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
