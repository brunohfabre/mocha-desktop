import { PencilLineIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export function AccountSettings() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-8">
      <header>
        <p className="text-lg font-semibold">Account settings</p>
      </header>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security" disabled>
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" disabled>
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" asChild>
          <div className="mt-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium">Personal info</p>

              <form className="overflow-hidden rounded-lg border">
                <div className="flex gap-12 px-4 py-6">
                  <div className="flex flex-1 flex-col gap-2">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Name" />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Email" />
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="size-32">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>

                    <Button type="button" variant="outline">
                      <PencilLineIcon className="mr-3 size-4" />
                      Edit
                    </Button>
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
                <div className="flex flex-col gap-4 p-6">
                  <p className="text-base font-medium">Delete account</p>

                  <p className="text-sm">
                    Permanently remove your Personal Account and all of its
                    contents from the Mocha platform. This action is not
                    reversible, so please continue with caution.
                  </p>
                </div>

                <footer className="flex justify-end border-t border-red-200 bg-red-50 px-4 py-3">
                  <Button type="button" variant="destructive" disabled>
                    Delete account
                  </Button>
                </footer>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <p>SECURITY</p>
        </TabsContent>

        <TabsContent value="billing">
          <p>BILLING</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
