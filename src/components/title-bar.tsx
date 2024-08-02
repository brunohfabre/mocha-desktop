import MinusIcon from '@/assets/icons/minus.svg'
import SquareDoubleIcon from '@/assets/icons/square-double.svg'
import SquareIcon from '@/assets/icons/square.svg'
import XIcon from '@/assets/icons/x.svg'

export function TitleBar() {
  return (
    <div className="flex h-10 justify-end">
      <button className="flex h-10 items-center justify-center px-4">-</button>
      <button className="flex h-10 items-center justify-center px-4">[]</button>
      <button className="flex h-10 items-center justify-center px-4">x</button>
    </div>
  )
}
