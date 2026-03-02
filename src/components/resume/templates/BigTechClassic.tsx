import type { TemplateProps } from '../ResumeDocument'
import { ContactHeader, SectionRouter } from './shared'

export default function BigTechClassic({ resume, settings, template, marginPx, highlightBulletIds }: TemplateProps) {
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
        namePt={20}
      />

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
