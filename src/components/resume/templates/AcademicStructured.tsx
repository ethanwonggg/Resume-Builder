import type { TemplateProps } from '../ResumeDocument'
import { SectionRouter } from './shared'

export default function AcademicStructured({ resume, settings, template, marginPx, highlightBulletIds }: TemplateProps) {
  const visibleSections = resume.sectionOrder.filter(s => !resume.hiddenSections.includes(s))

  return (
    <div style={{ padding: `${marginPx}px` }}>
      <div style={{ marginBottom: '8px' }}>
        <div style={{
          fontSize: '20pt',
          fontWeight: '700',
          color: template.nameColor,
          lineHeight: 1.1,
        }}>
          {resume.contact.name || 'Your Name'}
        </div>
        <div style={{
          fontSize: '9.5pt',
          color: template.metaColor,
          marginTop: '3px',
          display: 'flex',
          gap: '0 14px',
          flexWrap: 'wrap',
        }}>
          {[resume.contact.email, resume.contact.phone, resume.contact.location, resume.contact.linkedin, resume.contact.github]
            .filter(Boolean)
            .map((v, i) => <span key={i}>{v}</span>)}
        </div>
        <div style={{ borderBottom: `1.5px solid ${template.dividerColor}`, marginTop: '6px' }} />
      </div>

      {visibleSections.map(key => (
        <SectionRouter
          key={key}
          sectionKey={key}
          resume={resume}
          template={template}
          settings={settings}
          highlightIds={highlightBulletIds}
        />
      ))}
    </div>
  )
}
