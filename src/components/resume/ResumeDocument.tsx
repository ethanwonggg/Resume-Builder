import type { DesignSettings, ResumeData } from '@/types/resume'
import type { TemplateProps } from '@/types/templates'
import { TEMPLATES } from '@/lib/design/tokens'
import BigTechClassic from './templates/BigTechClassic'
import StartupClean from './templates/StartupClean'
import AcademicStructured from './templates/AcademicStructured'

interface ResumeDocumentProps {
  resume: ResumeData
  settings: DesignSettings
  highlightBulletIds?: Set<string>
  isRecruiterMode?: boolean
}

export default function ResumeDocument({ resume, settings, highlightBulletIds, isRecruiterMode }: ResumeDocumentProps) {
  const template = TEMPLATES[settings.templateId]
  const marginPx = Math.round(settings.marginInch * 96)  // 96 dpi

  const sharedProps: TemplateProps = {
    resume,
    settings,
    template,
    marginPx,
    highlightBulletIds,
    isRecruiterMode: isRecruiterMode ?? false,
  }

  return (
    <div
      id="resume-document"
      style={{
        width: '816px',       // 8.5" × 96dpi
        minHeight: '1056px',  // 11" × 96dpi
        backgroundColor: '#ffffff',
        fontFamily: settings.fontFamily,
        lineHeight: settings.lineSpacing,
        color: template.bodyColor,
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {settings.templateId === 'big-tech-classic'    && <BigTechClassic     {...sharedProps} />}
      {settings.templateId === 'startup-clean'       && <StartupClean       {...sharedProps} />}
      {settings.templateId === 'academic-structured' && <AcademicStructured {...sharedProps} />}
    </div>
  )
}

export type { TemplateProps }
