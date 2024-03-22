import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  email: z.string().email(),
})

type FormData = z.infer<typeof formSchema>

export function Members() {
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const [removeAlertDialogVisible, setRemoveAlertDialogVisible] =
    useState(false)
  const [addMemberModalVisible, setAddMemberModalVisible] = useState(false)

  function handleRemoveMember() {
    console.log('handle-remove-member')

    setRemoveAlertDialogVisible(false)
  }

  function handleCloseAddMemberModal() {
    setAddMemberModalVisible(false)

    reset()
  }

  function addMember(data: FormData) {
    console.log(data)

    handleCloseAddMemberModal()
  }

  return (
    <>
      <AlertDialog
        open={removeAlertDialogVisible}
        onOpenChange={handleCloseAddMemberModal}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove member</AlertDialogTitle>
            <AlertDialogDescription>
              Really want to remove this member from organization?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setRemoveAlertDialogVisible(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveMember}>
              Remove member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={addMemberModalVisible}
        onOpenChange={setAddMemberModalVisible}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add member</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(addMember)}
            className="flex flex-col gap-8"
          >
            <div className="space-y-1">
              <Label>Email</Label>
              <Input placeholder="Email" {...register('email')} />
              <span className="text-sm text-red-500">
                {formState.errors.email?.message}
              </span>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseAddMemberModal}
              >
                Cancel
              </Button>
              <Button>Add member</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <TabsContent value="members">
        <div className="flex flex-col gap-4 mt-8">
          <header className="flex items-center justify-between">
            <strong className="text-lg font-semibold">Members</strong>

            <Button
              type="button"
              onClick={() => setAddMemberModalVisible(true)}
            >
              + Member
            </Button>
          </header>

          <div className="flex flex-col border rounded-lg p-4 divide-y">
            <div className="flex justify-between items-center gap-4 py-4 first:pt-0 last:pb-0">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <div className="flex-1 flex flex-col">
                <p className="text-sm font-medium">Jhon Doe</p>
                <span className="text-sm text-zinc-500">jhondoe@email.com</span>
              </div>

              <div className="flex mr-8">
                <span className="text-sm font-medium">OWNER</span>
              </div>

              <div className="flex justify-end min-w-32"></div>
            </div>

            <div className="flex justify-between items-center gap-4 py-4 first:pt-0 last:pb-0">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <div className="flex-1 flex flex-col">
                <p className="text-sm font-medium">Jhon Doe</p>
                <span className="text-sm text-zinc-500">jhondoe@email.com</span>
              </div>

              <div className="flex mr-8">
                <span className="text-sm font-medium">ADMIN</span>
              </div>

              <div className="flex justify-end min-w-32">
                <Button
                  type="button"
                  onClick={() => setRemoveAlertDialogVisible(true)}
                  variant="destructive"
                >
                  Remove
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center gap-4 py-4 first:pt-0 last:pb-0">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <div className="flex-1 flex flex-col">
                <p className="text-sm font-medium">Jhon Doe</p>
                <span className="text-sm text-zinc-500">jhondoe@email.com</span>
              </div>

              <div className="flex mr-8">
                <span className="text-sm font-medium">ADMIN</span>
              </div>

              <div className="flex justify-end min-w-32">
                <Button
                  type="button"
                  onClick={() => setRemoveAlertDialogVisible(true)}
                  variant="destructive"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </>
  )
}
