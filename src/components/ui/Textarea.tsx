import { type TextareaHTMLAttributes, useEffect, useRef } from 'react'
import { clsx } from 'clsx'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  warning?: string
}

export default function Textarea({ label, hint, warning, className, value, onChange, ...props }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null)

  // Auto-resize
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  }, [value])

  return (
    <div className="flex flex-col gap-0.5">
      {label && (
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        rows={1}
        {...props}
        className={clsx(
          'w-full resize-none overflow-hidden rounded border bg-white px-2.5 py-1.5 text-sm text-gray-900 placeholder-gray-400 transition-colors leading-snug',
          'focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500',
          warning ? 'border-amber-400 bg-amber-50/50' : 'border-gray-300 hover:border-gray-400',
          className,
        )}
      />
      {hint    && <p className="text-xs text-gray-400">{hint}</p>}
      {warning && <p className="text-xs text-amber-600">{warning}</p>}
    </div>
  )
}
