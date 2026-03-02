import type { PageLengthReport } from '@/types/resume'
import Badge from '@/components/ui/Badge'
import Section from '@/components/ui/Section'

interface PageLengthSectionProps {
  pageLength: PageLengthReport
}

export default function PageLengthSection({ pageLength }: PageLengthSectionProps) {
  return (
    <Section title="Page Length">
      <div className="flex items-center gap-2 mb-1">
        <Badge color="gray">~{pageLength.estimatedPages} page{pageLength.estimatedPages > 1 ? 's' : ''}</Badge>
        <span className="text-xs text-gray-500">Target: {pageLength.recommendation}</span>
      </div>
      {pageLength.flags.map((flag, i) => (
        <p key={i} className="text-xs text-amber-700 mt-1">{flag}</p>
      ))}
      {pageLength.flags.length === 0 && (
        <p className="text-xs text-green-600">Page length looks good.</p>
      )}
    </Section>
  )
}
