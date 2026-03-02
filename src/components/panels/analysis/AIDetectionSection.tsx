import type { AIDetectionReport } from '@/types/resume'
import Badge from '@/components/ui/Badge'
import Section from '@/components/ui/Section'

interface AIDetectionSectionProps {
  aiDetection: AIDetectionReport
}

const VERDICT_COLOR: Record<AIDetectionReport['verdict'], 'green' | 'amber' | 'red'> = {
  natural:    'green',
  borderline: 'amber',
  'ai-like':  'red',
}

const VERDICT_LABEL: Record<AIDetectionReport['verdict'], string> = {
  natural:    'Sounds Natural',
  borderline: 'Borderline',
  'ai-like':  'AI-Like',
}

export default function AIDetectionSection({ aiDetection }: AIDetectionSectionProps) {
  return (
    <Section title="AI Detectability">
      <div className="flex items-center gap-2 mb-2">
        <Badge color={VERDICT_COLOR[aiDetection.verdict]}>
          {VERDICT_LABEL[aiDetection.verdict]}
        </Badge>
        <span className="text-xs text-gray-500">Score: {aiDetection.score}/100</span>
      </div>
      {aiDetection.bannedPhrases.length > 0 && (
        <div>
          <p className="text-xs text-amber-700 font-medium">Overused / AI phrases detected:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {aiDetection.bannedPhrases.map(p => (
              <Badge key={p} color="amber">{p}</Badge>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-600">
        <span>Lexical diversity: <strong>{aiDetection.lexicalDiversity}%</strong></span>
        <span>Pattern similarity: <strong>{aiDetection.patternSimilarity}%</strong></span>
      </div>
    </Section>
  )
}
