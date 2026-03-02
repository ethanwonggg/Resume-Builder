import type { TemplateConfig } from '@/lib/design/tokens'
import type { CertificationEntry, DesignSettings } from '@/types/resume'
import { ATS_SECTION_LABELS } from '@/lib/design/tokens'
import SectionHeader from './SectionHeader'

interface CertificationsSectionProps {
  entries: CertificationEntry[]
  template: TemplateConfig
  settings: DesignSettings
}

export default function CertificationsSection({ entries, template, settings }: CertificationsSectionProps) {
  if (entries.length === 0) return null

  return (
    <div style={{ marginBottom: '8px' }}>
      <SectionHeader label={ATS_SECTION_LABELS.certifications} template={template} />
      {entries.map(cert => (
        <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: `${settings.fontSize}pt` }}>
          <span style={{ color: template.bodyColor }}>{cert.name} — {cert.issuer}</span>
          <span style={{ color: template.metaColor }}>{cert.date}</span>
        </div>
      ))}
    </div>
  )
}
