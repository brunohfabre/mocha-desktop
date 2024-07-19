import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export function CreateCollection() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8">
      <header>
        <p className="text-lg font-semibold">Create collection</p>
        <p className="text-sm text-muted-foreground">
          Collections allow you to collaborate on shared projects and assign
          members permissions.
        </p>
      </header>

      <form className="rounded-lg border">
        <div className="px-4 py-6">
          <div>
            <Label htmlFor="name">Collection name</Label>
            <Input id="name" placeholder="Acme org" />
          </div>
        </div>

        <Separator orientation="horizontal" />

        <footer className="flex justify-end gap-2 px-4 py-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="button">Create collection</Button>
        </footer>
      </form>
    </div>
  )
}
