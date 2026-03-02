import type { TemplateConfig } from '@/lib/design/tokens'
import type { DesignSettings, SkillsSection as SkillsSectionData } from '@/types/resume'
import { ATS_SECTION_LABELS } from '@/lib/design/tokens'
import SectionHeader from './SectionHeader'

interface SkillsSectionProps {
  skills: SkillsSectionData
  template: TemplateConfig
  settings: DesignSettings
}

export default function SkillsSection({ skills, template, settings }: SkillsSectionProps) {
  const rows = [
    { label: 'Languages',  value: skills.languages },
    { label: 'Frameworks', value: skills.frameworks },
    { label: 'Tools',      value: skills.tools },
    { label: 'Platforms',  value: skills.platforms },
    { label: 'Other',      value: skills.other },
  ].filter(r => r.value && r.value.trim() !== '')

  if (rows.length === 0) return null

  return (
    <div style={{ marginBottom: '8px' }}>
      <SectionHeader label={ATS_SECTION_LABELS.skills} template={template} />
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: `${settings.fontSize}pt` }}>
        <tbody>
          {rows.map(row => (
            <tr key={row.label}>
              <td style={{
                fontWeight: '700',
                color: template.bodyColor,
                paddingRight: '8px',
                whiteSpace: 'nowrap',
                verticalAlign: 'top',
                width: '100px',
              }}>
                {row.label}:
              </td>
              <td style={{ color: template.bodyColor, lineHeight: settings.lineSpacing }}>
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
