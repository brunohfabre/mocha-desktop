import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function Notifications() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <header>
        <p className="text-lg font-semibold">Notifications</p>
      </header>

      <div className="rounded-lg border">
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">New invite</p>
              <div className="size-2 rounded-full bg-orange-500"></div>
            </div>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>

            <p className="mt-2 text-xs font-semibold text-muted-foreground">
              37 minutes ago
            </p>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline">
              Reject
            </Button>
            <Button type="button">Accept</Button>
          </div>
        </div>

        <Separator orientation="horizontal" />

        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">New invite</p>
              <div className="size-2 rounded-full bg-orange-500"></div>
            </div>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
            <p className="mt-2 text-xs font-semibold text-muted-foreground">
              3 hours ago
            </p>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline">
              Reject
            </Button>
            <Button type="button">Accept</Button>
          </div>
        </div>

        <Separator orientation="horizontal" />

        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">New invite</p>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
            <p className="mt-2 text-xs font-semibold text-muted-foreground">
              7 days ago
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
