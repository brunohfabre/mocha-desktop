import { Separator } from './ui/separator'

export function Sidebar() {
  return (
    <div className="flex w-64 flex-col">
      <header>header</header>

      <Separator orientation="horizontal" />

      <div>organization</div>

      <Separator orientation="horizontal" />

      <div className="flex-1">content</div>

      <Separator orientation="horizontal" />

      <footer>footer</footer>
    </div>
  )
}
