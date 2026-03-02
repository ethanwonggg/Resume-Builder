import type { TemplateConfig } from '@/lib/design/tokens'
import type { ResumeData, DesignSettings } from '@/types/resume'
import ExperienceSection from './ExperienceSection'
import ProjectsSection from './ProjectsSection'
import EducationSection from './EducationSection'
import SkillsSection from './SkillsSection'
import CertificationsSection from './CertificationsSection'
import PublicationsSection from './PublicationsSection'
import LeadershipSection from './LeadershipSection'

interface SectionRouterProps {
  sectionKey: string
  resume: ResumeData
  template: TemplateConfig
  settings: DesignSettings
  highlightIds?: Set<string>
}

export default function SectionRouter({ sectionKey, resume, template, settings, highlightIds }: SectionRouterProps) {
  switch (sectionKey) {
    case 'experience':     return <ExperienceSection     entries={resume.experience}     template={template} settings={settings} highlightIds={highlightIds} />
    case 'projects':       return <ProjectsSection       entries={resume.projects}       template={template} settings={settings} highlightIds={highlightIds} />
    case 'education':      return <EducationSection      entries={resume.education}      template={template} settings={settings} />
    case 'skills':         return <SkillsSection         skills={resume.skills}          template={template} settings={settings} />
    case 'certifications': return <CertificationsSection entries={resume.certifications} template={template} settings={settings} />
    case 'publications':   return <PublicationsSection   entries={resume.publications}   template={template} settings={settings} />
    case 'leadership':     return <LeadershipSection     entries={resume.leadership}     template={template} settings={settings} highlightIds={highlightIds} />
    default:               return null
  }
}
