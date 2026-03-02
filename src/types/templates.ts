import type { TemplateConfig } from '@/lib/design/tokens'
import type { DesignSettings, ResumeData } from './resume'

export interface TemplateProps {
  resume: ResumeData
  settings: DesignSettings
  template: TemplateConfig
  marginPx: number
  highlightBulletIds?: Set<string>
  isRecruiterMode: boolean
}
