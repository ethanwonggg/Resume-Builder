import { type InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className, ...props }: Props) {
  return (
    <div className="flex flex-col gap-0.5">
      {label && (
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          'w-full rounded border bg-white px-2.5 py-1.5 text-sm text-gray-900 placeholder-gray-400 transition-colors',
          'focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500',
          error ? 'border-red-400' : 'border-gray-300 hover:border-gray-400',
          className,
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
