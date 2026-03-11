import type { TemplateConfig } from '@/lib/design/tokens'
import type { DesignSettings, ExperienceEntry } from '@/types/resume'
import { ATS_SECTION_LABELS } from '@/lib/design/tokens'
import SectionHeader from './SectionHeader'
import RoleHeader from './RoleHeader'
import BulletList from './BulletList'

interface ExperienceSectionProps {
  entries: ExperienceEntry[]
  template: TemplateConfig
  settings: DesignSettings
  highlightIds?: Set<string>
}

export default function ExperienceSection({ entries, template, settings, highlightIds }: ExperienceSectionProps) {
  if (entries.length === 0) return null

  return (
    <div style={{ margin: '10px 0 8px' }}>
      <SectionHeader label={ATS_SECTION_LABELS.experience} template={template} />
      {entries.map((exp, i) => (
        <div key={exp.id} style={{ marginBottom: i < entries.length - 1 ? '6px' : 0 }}>
          <RoleHeader {...exp} template={template} settings={settings} />
          <BulletList bullets={exp.bullets} template={template} settings={settings} highlightIds={highlightIds} />
        </div>
      ))}
    </div>
  )
}
