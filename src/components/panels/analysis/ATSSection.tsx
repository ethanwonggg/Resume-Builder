import type { ATSReport } from '@/types/resume'
import Badge from '@/components/ui/Badge'
import Section from '@/components/ui/Section'
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'

interface ATSSectionProps {
  ats: ATSReport
}

export default function ATSSection({ ats }: ATSSectionProps) {
  return (
    <Section title="ATS Simulation">
      <div className="flex items-center gap-2 mb-2">
        {ats.isPassed ? (
          <Badge color="green"><CheckCircle size={10} className="mr-1" />Passed</Badge>
        ) : (
          <Badge color="red"><AlertCircle size={10} className="mr-1" />Failed</Badge>
        )}
        <Badge color={ats.isEmojiFree ? 'green' : 'red'}>Emoji-free</Badge>
        <Badge color={ats.isSpecialCharsFree ? 'green' : 'amber'}>Special chars</Badge>
      </div>
      {ats.issues.map((issue, i) => (
        <div key={i} className="flex items-start gap-1.5 text-xs mt-1">
          {issue.severity === 'error'
            ? <AlertCircle size={11} className="text-red-500 mt-0.5 shrink-0" />
            : <AlertTriangle size={11} className="text-amber-500 mt-0.5 shrink-0" />}
          <span className={issue.severity === 'error' ? 'text-red-600' : 'text-amber-700'}>
            {issue.message}
          </span>
        </div>
      ))}
      {ats.issues.length === 0 && (
        <p className="text-xs text-green-600">No ATS issues detected.</p>
      )}
    </Section>
  )
}
