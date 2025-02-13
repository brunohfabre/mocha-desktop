import LogoBlack from '@/assets/logo-black.svg'
// import { Search } from 'lucide-react'

import { Link } from 'react-router'
import { Separator } from './ui/separator'

export function TitleBar() {
  return (
    <>
      <header className="h-10 flex">
        <Link to="/" className="px-3 flex items-center">
          <img src={LogoBlack} alt="" className="w-7" />
        </Link>

        <Separator orientation="vertical" />

        <div className="flex-1" />

        {/* <Separator orientation="vertical" />

        <button
          type="button"
          className="size-10 cursor-pointer text-muted-foreground flex items-center justify-center transition-colors enabled:hover:bg-muted enabled:hover:text-primary disabled:cursor-not-allowed disabled:opacity-75"
          disabled
        >
          <Search className="size-4" />
        </button> */}
      </header>

      <Separator orientation="horizontal" />
    </>
  )
}
