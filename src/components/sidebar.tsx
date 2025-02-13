import { Separator } from './ui/separator'

export function Sidebar() {
  return (
    <>
      <aside className="w-64">
        <button type="button" className="h-[52px]" />

        <Separator orientation="horizontal" />

        <span>sidebar</span>
      </aside>

      <Separator orientation="vertical" />
    </>
  )
}
