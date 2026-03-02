import type { TemplateConfig } from '@/lib/design/tokens'
import type { DesignSettings, PublicationEntry } from '@/types/resume'
import { ATS_SECTION_LABELS } from '@/lib/design/tokens'
import SectionHeader from './SectionHeader'

interface PublicationsSectionProps {
  entries: PublicationEntry[]
  template: TemplateConfig
  settings: DesignSettings
}

export default function PublicationsSection({ entries, template, settings }: PublicationsSectionProps) {
  if (entries.length === 0) return null

  return (
    <div style={{ marginBottom: '8px' }}>
      <SectionHeader label={ATS_SECTION_LABELS.publications} template={template} />
      {entries.map(pub => (
        <div key={pub.id} style={{ marginBottom: '3px' }}>
          <div style={{ fontSize: `${settings.fontSize}pt`, fontWeight: '600', color: template.bodyColor }}>
            {pub.title}
          </div>
          <div style={{ fontSize: '9.5pt', color: template.metaColor }}>
            {pub.venue} · {pub.date}
          </div>
        </div>
      ))}
    </div>
  )
}
