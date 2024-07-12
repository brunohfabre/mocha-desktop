import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export function Organization() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-8">
      <header>
        <p className="text-lg font-semibold">Organization settings</p>
      </header>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="general" asChild>
          <div className="mt-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium">Info</p>

              <form className="overflow-hidden rounded-lg border">
                <div className="flex flex-col gap-12 px-4 py-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name" />
                  </div>
                </div>

                <footer className="flex justify-end border-t px-4 py-3">
                  <Button type="button">Save</Button>
                </footer>
              </form>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-base font-medium">Danger zone</p>

              <div className="overflow-hidden rounded-lg border border-red-200">
                <div className="flex items-center gap-4 p-4">
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm font-medium">Transfer ownership</p>
                    <p className="text-sm text-muted-foreground">
                      Transfer this organization to another user. You will no
                      longer be the owner.
                    </p>
                  </div>

                  <Button type="button" variant="destructive" disabled>
                    Transfer ownership
                  </Button>
                </div>

                <Separator orientation="horizontal" />

                <div className="flex items-center gap-4 p-4">
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm font-medium">
                      Delete this organization
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Once you delete a organization, there is no going back.
                      Please be certain.
                    </p>
                  </div>

                  <Button type="button" variant="destructive" disabled>
                    Delete organization
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="members" asChild>
          <div className="mt-8 flex flex-col gap-6">
            <div className="flex gap-2">
              <Input placeholder="Email" />
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="light">Admin</SelectItem>
                    <SelectItem value="dark">Member</SelectItem>
                    <SelectItem value="system">Billing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="button">Send invite</Button>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-base font-medium">Active</p>

              <div className="rounded-lg border">
                <div className="flex items-center p-4">
                  <div className="flex flex-1 items-center gap-4">
                    <Avatar className="size-11">
                      <AvatarImage src="https://github.com/shadcn.png" />

                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sm font-semibold">John Doe</p>
                      <p className="text-sm text-muted-foreground">
                        johndoe@email.com
                      </p>
                    </div>

                    <p className="ml-4 text-sm text-muted-foreground">
                      Joined 4 hours ago
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="light">Admin</SelectItem>
                        <SelectItem value="dark">Member</SelectItem>
                        <SelectItem value="system">Billing</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button type="button" variant="destructive">
                      Remove
                    </Button>
                  </div>
                </div>

                <Separator orientation="horizontal" />

                <div className="flex items-center p-4">
                  <div className="flex flex-1 items-center gap-4">
                    <Avatar className="size-11">
                      <AvatarImage src="https://github.com/shadcn.png" />

                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sm font-semibold">John Doe</p>
                      <p className="text-sm text-muted-foreground">
                        johndoe@email.com
                      </p>
                    </div>

                    <p className="ml-4 text-sm text-muted-foreground">
                      Joined 3 days ago
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="light">Admin</SelectItem>
                        <SelectItem value="dark">Member</SelectItem>
                        <SelectItem value="system">Billing</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button type="button" variant="destructive">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-base font-medium">Invited</p>

              <div className="rounded-lg border">
                <div className="flex items-center p-4">
                  <div className="flex flex-1 items-center gap-4">
                    <Avatar className="size-11">
                      <AvatarImage src="https://github.com/shadcn.png" />

                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sm font-semibold">John Doe</p>
                      <p className="text-sm text-muted-foreground">
                        johndoe@email.com
                      </p>
                    </div>
                  </div>

                  <Button type="button">Revoke</Button>
                </div>

                <Separator orientation="horizontal" />

                <div className="flex items-center p-4">
                  <div className="flex flex-1 items-center gap-4">
                    <Avatar className="size-11">
                      <AvatarImage src="https://github.com/shadcn.png" />

                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sm font-semibold">John Doe</p>
                      <p className="text-sm text-muted-foreground">
                        johndoe@email.com
                      </p>
                    </div>
                  </div>

                  <Button type="button">Revoke</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
