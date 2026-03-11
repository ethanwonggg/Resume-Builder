import type { TemplateConfig } from '@/lib/design/tokens'
import type { DesignSettings, EducationEntry } from '@/types/resume'
import { ATS_SECTION_LABELS } from '@/lib/design/tokens'
import SectionHeader from './SectionHeader'

interface EducationSectionProps {
  entries: EducationEntry[]
  template: TemplateConfig
  settings: DesignSettings
}

export default function EducationSection({ entries, template, settings }: EducationSectionProps) {
  if (entries.length === 0) return null

  return (
    <div style={{ margin: '10px 0 8px' }}>
      <SectionHeader label={ATS_SECTION_LABELS.education} template={template} />
      {entries.map((edu, i) => (
        <div key={edu.id} style={{ marginBottom: i < entries.length - 1 ? '6px' : 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: `${settings.fontSize}pt`, fontWeight: '700', color: template.bodyColor }}>
              {edu.institution || 'Institution'}
            </span>
            <span style={{ fontSize: '9.5pt', color: template.metaColor }}>{edu.location}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: `${settings.fontSize}pt`, fontStyle: 'italic', color: template.metaColor }}>
              {[edu.degree, edu.field].filter(Boolean).join(', ') || 'Degree'}
              {edu.honors ? ` — ${edu.honors}` : ''}
            </span>
            <span style={{ fontSize: '9.5pt', color: template.metaColor }}>
              {edu.startDate} – {edu.endDate}
            </span>
          </div>
          {edu.gpa && (
            <div style={{ fontSize: '9.5pt', color: template.metaColor }}>GPA: {edu.gpa}</div>
          )}
          {edu.relevantCourses && (
            <div style={{ fontSize: '9.5pt', color: template.metaColor }}>
              Relevant Courses: {edu.relevantCourses}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
