import { useResumeStore } from '@/store/resumeStore'
import Button from '@/components/ui/Button'
import ScoreRing from '@/components/ui/ScoreRing'
import QuantificationSection from './analysis/QuantificationSection'
import ATSSection from './analysis/ATSSection'
import AIDetectionSection from './analysis/AIDetectionSection'
import PageLengthSection from './analysis/PageLengthSection'
import BulletBreakdownSection from './analysis/BulletBreakdownSection'
import { RefreshCw } from 'lucide-react'

export default function AnalysisPanel() {
  const analysis    = useResumeStore(s => s.analysis)
  const runAnalysis = useResumeStore(s => s.runAnalysis)

  return (
    <div className="space-y-5 pb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Resume Analysis</h3>
        <Button size="sm" variant="primary" onClick={runAnalysis}>
          <RefreshCw size={12} /> Analyse
        </Button>
      </div>

      {!analysis && (
        <div className="rounded-md bg-gray-50 border border-gray-200 px-4 py-6 text-center">
          <p className="text-sm text-gray-500">Click <strong>Analyse</strong> to run a full resume check.</p>
        </div>
      )}

      {analysis && (
        <div className="space-y-5">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
            <ScoreRing score={analysis.overallScore} size={72} label="Overall" />
            <div className="flex-1 grid grid-cols-2 gap-2">
              <ScoreRing score={analysis.quantification.density}      size={48} label="Metrics" />
              <ScoreRing score={analysis.ats.plainTextScore}          size={48} label="ATS" />
              <ScoreRing score={analysis.aiDetection.lexicalDiversity} size={48} label="Diversity" />
              <ScoreRing score={Math.max(0, 100 - analysis.aiDetection.score)} size={48} label="Natural" />
            </div>
          </div>

          <QuantificationSection quantification={analysis.quantification} />
          <ATSSection            ats={analysis.ats} />
          <AIDetectionSection    aiDetection={analysis.aiDetection} />
          <PageLengthSection     pageLength={analysis.pageLength} />
          <BulletBreakdownSection bullets={analysis.bullets} />
        </div>
      )}
    </div>
  )
}
