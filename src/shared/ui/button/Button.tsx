import type { MouseEventHandler, ReactNode } from 'react'

type ButtonColor = 'orange' | 'zinc'

type ButtonProps = {
  children: ReactNode
  color: ButtonColor
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const colorClasses: Record<ButtonColor, string> = {
  orange: 'bg-orange-500 hover:bg-orange-600',
  zinc: 'bg-zinc-700 hover:bg-zinc-600',
}

export default function Button({ children, color, onClick }: ButtonProps) {
  console.log(color)
  return (
    <button
      className={`w-full h-13 rounded-xl cursor-pointer ${colorClasses[color]}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
