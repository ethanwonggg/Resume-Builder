import { clsx } from 'clsx'

type Color = 'green' | 'amber' | 'red' | 'blue' | 'gray'

interface Props {
  color?: Color
  children: React.ReactNode
  className?: string
}

const colorClasses: Record<Color, string> = {
  green: 'bg-green-50 text-green-700 border-green-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  red:   'bg-red-50 text-red-600 border-red-200',
  blue:  'bg-blue-50 text-blue-700 border-blue-200',
  gray:  'bg-gray-100 text-gray-600 border-gray-200',
}

export default function Badge({ color = 'gray', children, className }: Props) {
  return (
    <span className={clsx(
      'inline-flex items-center rounded border px-1.5 py-0.5 text-xs font-medium',
      colorClasses[color],
      className,
    )}>
      {children}
    </span>
  )
}
