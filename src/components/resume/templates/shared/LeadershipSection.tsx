import type { TemplateConfig } from '@/lib/design/tokens'
import type { DesignSettings, LeadershipEntry } from '@/types/resume'
import { ATS_SECTION_LABELS } from '@/lib/design/tokens'
import SectionHeader from './SectionHeader'
import BulletList from './BulletList'

interface LeadershipSectionProps {
  entries: LeadershipEntry[]
  template: TemplateConfig
  settings: DesignSettings
  highlightIds?: Set<string>
}

export default function LeadershipSection({ entries, template, settings, highlightIds }: LeadershipSectionProps) {
  if (entries.length === 0) return null

  return (
    <div style={{ marginBottom: '8px' }}>
      <SectionHeader label={ATS_SECTION_LABELS.leadership} template={template} />
      {entries.map((entry, i) => (
        <div key={entry.id} style={{ marginBottom: i < entries.length - 1 ? '6px' : 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: `${settings.fontSize}pt`, fontWeight: '700', color: template.bodyColor }}>
              {entry.role} — {entry.organization}
            </span>
            <span style={{ fontSize: '9.5pt', color: template.metaColor }}>
              {entry.startDate} – {entry.endDate}
            </span>
          </div>
          <BulletList bullets={entry.bullets} template={template} settings={settings} highlightIds={highlightIds} />
        </div>
      ))}
    </div>
  )
}
