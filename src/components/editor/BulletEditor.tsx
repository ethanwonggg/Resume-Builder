import Textarea from '@/components/ui/Textarea'
import Badge from '@/components/ui/Badge'
import { analyseBullet } from '@/lib/formatting/bulletAnalyser'
import type { BulletPoint } from '@/types/resume'
import { Trash2, Plus } from 'lucide-react'

interface Props {
  bullets: BulletPoint[]
  onAdd: () => void
  onUpdate: (bulletId: string, text: string) => void
  onRemove: (bulletId: string) => void
  placeholder?: string
}

const scoreColors = {
  excellent:   'green',
  good:        'blue',
  'needs-work':'amber',
  poor:        'red',
} as const

const scoreLabels = {
  excellent:    'Excellent',
  good:         'Good',
  'needs-work': 'Needs Work',
  poor:         'Weak',
} as const

export default function BulletEditor({ bullets, onAdd, onUpdate, onRemove }: Props) {
  return (
    <div className="space-y-2 mt-1.5">
      {bullets.map(bullet => {
        const analysis = bullet.text.trim() ? analyseBullet(bullet) : null
        const warning = analysis?.suggestions[0]

        return (
          <div key={bullet.id} className="group relative">
            <div className="flex items-start gap-1.5">
              <span className="mt-2 text-gray-400 text-xs select-none">•</span>
              <div className="flex-1 min-w-0">
                <Textarea
                  value={bullet.text}
                  onChange={e => onUpdate(bullet.id, e.target.value)}
                  placeholder="Action Verb + Technology + Impact + Metric"
                  warning={analysis && analysis.score === 'poor' ? warning : undefined}
                />

                {/* Real-time analysis badge strip */}
                {analysis && bullet.text.trim() && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge color={scoreColors[analysis.score]}>
                      {scoreLabels[analysis.score]}
                    </Badge>
                    {!analysis.hasMetric && (
                      <Badge color="amber">No Metric</Badge>
                    )}
                    {analysis.verbStrength === 'weak' && (
                      <Badge color="red">Weak Verb</Badge>
                    )}
                    {analysis.hasContext && (
                      <Badge color="green">Has Context</Badge>
                    )}
                    {analysis.hasImpact && (
                      <Badge color="green">Has Impact</Badge>
                    )}
                  </div>
                )}

                {/* Top suggestion */}
                {analysis && analysis.suggestions.length > 0 && bullet.text.trim() && (
                  <p className="text-xs text-amber-600 mt-1 leading-snug">
                    {analysis.suggestions[0]}
                  </p>
                )}
              </div>

              <button
                onClick={() => onRemove(bullet.id)}
                className="mt-1.5 text-gray-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        )
      })}

      <button
        onClick={onAdd}
        className="flex items-center gap-1 text-xs text-accent-600 hover:text-accent-700 font-medium mt-1"
      >
        <Plus size={12} /> Add Bullet
      </button>
    </div>
  )
}
