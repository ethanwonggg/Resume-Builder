import { useRef, useState, useMemo } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import ResumeDocument from './ResumeDocument'
import Button from '@/components/ui/Button'
import { exportToPDF } from '@/lib/formatting/pdfExport'
import { Download, Loader } from 'lucide-react'

export default function ResumePreview() {
  const resume          = useResumeStore(s => s.resume)
  const settings        = useResumeStore(s => s.settings)
  const isRecruiterMode = useResumeStore(s => s.isRecruiterMode)
  const analysis        = useResumeStore(s => s.analysis)
  const docRef          = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [exportMsg, setExportMsg]     = useState<string | null>(null)

  const weakBulletIds = useMemo(() =>
    new Set(
      analysis?.bullets
        .filter(b => b.score === 'poor' || b.score === 'needs-work')
        .map(b => b.bulletId) ?? [],
    ),
  [analysis])

  async function handleExport(): Promise<void> {
    if (!docRef.current) return
    setIsExporting(true)
    setExportMsg(null)
    try {
      const result = await exportToPDF(docRef.current, resume, `${resume.contact.name || 'resume'}.pdf`)
      if (result.errors.length > 0) {
        setExportMsg(`ATS issues: ${result.errors.join('; ')}`)
      } else if (result.warnings.length > 0) {
        setExportMsg(`Exported with warnings: ${result.warnings[0]}`)
      } else {
        setExportMsg('PDF exported successfully!')
      }
    } catch {
      setExportMsg('Export failed — please try again.')
    } finally {
      setIsExporting(false)
      setTimeout(() => setExportMsg(null), 5000)
    }
  }

  return (
    <div className="flex flex-col h-full min-h-0 bg-stone-100">
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Preview</span>
          {isRecruiterMode && (
            <span className="text-xs bg-amber-100 text-amber-700 border border-amber-300 rounded px-1.5 py-0.5 font-medium">
              Recruiter Mode
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {exportMsg && (
            <span className="text-xs text-gray-600">{exportMsg}</span>
          )}
          <Button size="sm" variant="primary" onClick={handleExport} disabled={isExporting}>
            {isExporting ? <Loader size={12} className="animate-spin" /> : <Download size={12} />}
            {isExporting ? 'Exporting…' : 'Export PDF'}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 flex justify-center">
        <div style={{ transformOrigin: 'top center', boxShadow: '0 4px 32px 0 rgba(0,0,0,0.12)' }}>
          <div ref={docRef}>
            <ResumeDocument
              resume={resume}
              settings={settings}
              highlightBulletIds={analysis ? weakBulletIds : undefined}
              isRecruiterMode={isRecruiterMode}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
