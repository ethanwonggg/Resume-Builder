interface SectionProps {
  title: string
  children: React.ReactNode
}

export default function Section({ title, children }: SectionProps) {
  return (
    <div className="rounded-md border border-gray-200 overflow-hidden">
      <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{title}</h4>
      </div>
      <div className="px-3 py-2.5">{children}</div>
    </div>
  )
}
