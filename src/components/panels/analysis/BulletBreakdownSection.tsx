import type { BulletAnalysis } from '@/types/resume'
import Badge from '@/components/ui/Badge'
import Section from '@/components/ui/Section'

interface BulletBreakdownSectionProps {
  bullets: BulletAnalysis[]
}

const SCORE_BORDER_BG: Record<BulletAnalysis['score'], string> = {
  excellent:   'border-green-200 bg-green-50',
  good:        'border-blue-200 bg-blue-50',
  'needs-work':'border-amber-200 bg-amber-50',
  poor:        'border-red-200 bg-red-50',
}

const SCORE_BADGE_COLOR: Record<BulletAnalysis['score'], 'green' | 'blue' | 'amber' | 'red'> = {
  excellent:   'green',
  good:        'blue',
  'needs-work':'amber',
  poor:        'red',
}

export default function BulletBreakdownSection({ bullets }: BulletBreakdownSectionProps) {
  return (
    <Section title="Bullet Analysis">
      {bullets.length === 0 && (
        <p className="text-xs text-gray-400">No bullets yet.</p>
      )}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {bullets.map(b => (
          <div key={b.bulletId} className={`rounded border px-2.5 py-1.5 text-xs ${SCORE_BORDER_BG[b.score]}`}>
            <p className="text-gray-700 leading-snug mb-1 line-clamp-2">
              {b.text || <em className="text-gray-400">empty</em>}
            </p>
            <div className="flex flex-wrap gap-1">
              <Badge color={SCORE_BADGE_COLOR[b.score]}>{b.score}</Badge>
              {!b.hasMetric && <Badge color="amber">no metric</Badge>}
              {b.verbStrength === 'weak' && <Badge color="red">weak verb</Badge>}
            </div>
            {b.suggestions[0] && (
              <p className="text-amber-700 mt-1 leading-snug">{b.suggestions[0]}</p>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
