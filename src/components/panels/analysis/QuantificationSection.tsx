import type { QuantificationReport } from '@/types/resume'
import Badge from '@/components/ui/Badge'
import Section from '@/components/ui/Section'

interface QuantificationSectionProps {
  quantification: QuantificationReport
}

export default function QuantificationSection({ quantification }: QuantificationSectionProps) {
  const densityColor = quantification.density >= 60 ? 'green' : quantification.density >= 40 ? 'amber' : 'red'

  return (
    <Section title="Quantification">
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span>{quantification.quantifiedBullets} / {quantification.totalBullets} bullets have metrics</span>
        <Badge color={densityColor}>{quantification.density}%</Badge>
      </div>
      {quantification.unquantifiedIds.length > 0 && (
        <p className="text-xs text-amber-600 mt-1">
          {quantification.unquantifiedIds.length} bullet(s) missing quantifiable impact — add %, $, or time metrics.
        </p>
      )}
    </Section>
  )
}
