import type { TemplateConfig } from '@/lib/design/tokens'
import type { DesignSettings } from '@/types/resume'

interface RoleHeaderProps {
  company: string
  role: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  template: TemplateConfig
  settings: DesignSettings
}

export default function RoleHeader({
  company, role, location, startDate, endDate, current, template, settings,
}: RoleHeaderProps) {
  const tenure = current ? `${startDate} – Present` : `${startDate} – ${endDate}`

  return (
    <div style={{ marginBottom: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: `${settings.fontSize}pt`, fontWeight: '700', color: template.bodyColor }}>
          {company || 'Company Name'}
        </span>
        <span style={{ fontSize: '9.5pt', color: template.metaColor }}>
          {location}
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: `${settings.fontSize}pt`, fontStyle: 'italic', color: template.metaColor }}>
          {role || 'Role Title'}
        </span>
        <span style={{ fontSize: '9.5pt', color: template.metaColor }}>
          {tenure}
        </span>
      </div>
    </div>
  )
}
