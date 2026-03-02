import { useMemo } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import { buildScanHeatmap, computeScanScore } from '@/lib/formatting/scanOptimizer'
import ScoreRing from '@/components/ui/ScoreRing'
import Badge from '@/components/ui/Badge'
import { Eye, EyeOff } from 'lucide-react'

const PRIORITY_COLORS: Record<string, string> = {
  high:   'bg-red-100 border-red-300',
  medium: 'bg-amber-50 border-amber-200',
  low:    'bg-gray-50 border-gray-200',
}

const PRIORITY_BADGE: Record<string, 'red' | 'amber' | 'gray'> = {
  high: 'red', medium: 'amber', low: 'gray',
}

export default function RecruiterPanel() {
  const resume  = useResumeStore(s => s.resume)
  const heatmap = useMemo(() => buildScanHeatmap(resume), [resume])
  const score   = useMemo(() => computeScanScore(heatmap), [heatmap])

  return (
    <div className="space-y-4 pb-6">
      <div className="flex items-center gap-3">
        <ScoreRing score={score} size={60} label="Scan" />
        <div>
          <p className="text-sm font-semibold text-gray-800">6-Second Scan Score</p>
          <p className="text-xs text-gray-500 leading-snug">
            How much key information is visible at a glance? Red = seen first.
          </p>
        </div>
      </div>

      {heatmap.map(entry => (
        <div key={entry.sectionKey} className={`rounded-md border ${PRIORITY_COLORS[entry.priority]} overflow-hidden`}>
          <div className="flex items-center justify-between px-3 py-2 bg-white/70">
            <span className="text-xs font-semibold text-gray-700">{entry.label}</span>
            <Badge color={PRIORITY_BADGE[entry.priority]}>{entry.priority} priority</Badge>
          </div>
          <div className="divide-y divide-white/60">
            {entry.elements.map((el, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5">
                {el.visible && el.value ? (
                  <Eye size={11} className="text-green-500 shrink-0" />
                ) : (
                  <EyeOff size={11} className="text-gray-300 shrink-0" />
                )}
                <span className="text-xs font-medium text-gray-500 w-24 shrink-0">{el.label}</span>
                <span className={`text-xs truncate ${el.visible && el.value ? 'text-gray-800' : 'text-gray-300 italic'}`}>
                  {el.value || 'Not filled'}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-md bg-gray-50 border border-gray-200 px-3 py-2.5 text-xs text-gray-600 leading-relaxed">
        <strong>Recruiter heuristic:</strong> The average technical recruiter spends 6–10 seconds on first pass.
        High-priority signals (name, company, role, tech stack, metrics) must be immediately scannable.
      </div>
    </div>
  )
}
