import type { TemplateProps } from '../ResumeDocument'
import { ContactHeader, SectionRouter } from './shared'

export default function StartupClean({ resume, settings, template, marginPx, highlightBulletIds }: TemplateProps) {
  const visibleSections = resume.sectionOrder.filter(s => !resume.hiddenSections.includes(s))

  return (
    <div style={{ padding: `${marginPx}px` }}>
      <ContactHeader
        name={resume.contact.name}
        email={resume.contact.email}
        phone={resume.contact.phone}
        location={resume.contact.location}
        linkedin={resume.contact.linkedin}
        github={resume.contact.github}
        portfolio={resume.contact.portfolio}
        template={template}
        namePt={22}
      />

      {/* Light gray rule between header and body */}
      <div style={{
        borderTop: `1px solid #d1d5db`,
        marginBottom: '10px',
      }} />

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
