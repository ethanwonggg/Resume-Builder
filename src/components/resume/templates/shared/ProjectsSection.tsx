import type { TemplateConfig } from '@/lib/design/tokens'
import type { DesignSettings, ProjectEntry } from '@/types/resume'
import { ATS_SECTION_LABELS } from '@/lib/design/tokens'
import SectionHeader from './SectionHeader'
import BulletList from './BulletList'

interface ProjectsSectionProps {
  entries: ProjectEntry[]
  template: TemplateConfig
  settings: DesignSettings
  highlightIds?: Set<string>
}

export default function ProjectsSection({ entries, template, settings, highlightIds }: ProjectsSectionProps) {
  if (entries.length === 0) return null

  return (
    <div style={{ marginBottom: '8px' }}>
      <SectionHeader label={ATS_SECTION_LABELS.projects} template={template} />
      {entries.map((proj, i) => (
        <div key={proj.id} style={{ marginBottom: i < entries.length - 1 ? '6px' : 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
            <span style={{ fontSize: `${settings.fontSize}pt`, fontWeight: '700', color: template.bodyColor }}>
              {proj.name || 'Project Name'}
              {proj.link && (
                <span style={{ fontWeight: '400', color: template.metaColor }}> ↗</span>
              )}
            </span>
            <span style={{ fontSize: '9.5pt', color: template.metaColor, fontStyle: 'italic' }}>
              {proj.techStack}
            </span>
          </div>
          <BulletList bullets={proj.bullets} template={template} settings={settings} highlightIds={highlightIds} />
        </div>
      ))}
    </div>
  )
}
