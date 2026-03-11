import type { TemplateConfig } from '@/lib/design/tokens'

interface SectionHeaderProps {
  label: string
  template: TemplateConfig
}

export default function SectionHeader({ label, template }: SectionHeaderProps) {
  const style = template.sectionHeaderStyle

  if (style === 'uppercase-border') {
    return (
      <div style={{ margin: '18px 0 8px' }}>
        <div style={{
          fontSize: '12pt',
          fontWeight: '700',
          letterSpacing: '0.06em',
          color: template.sectionHeaderColor,
          textTransform: 'uppercase',
          borderBottom: `1.5px solid ${template.dividerColor}`,
          paddingBottom: '5px',
          marginBottom: '4px',
        }}>
          {label}
        </div>
      </div>
    )
  }

  if (style === 'bold-line') {
    return (
      <div style={{ margin: '16px 0 8px' }}>
        <div style={{
          fontSize: '12pt',
          fontWeight: '700',
          letterSpacing: '0.03em',
          color: template.sectionHeaderColor,
          paddingBottom: '5px',
          borderBottom: `1px solid ${template.dividerColor}`,
        }}>
          {label}
        </div>
      </div>
    )
  }

  return (
    <div style={{ margin: '16px 0 7px' }}>
      <div style={{
        fontSize: '12pt',
        fontWeight: '700',
        letterSpacing: '0.02em',
        color: template.sectionHeaderColor,
        fontVariant: 'small-caps',
        borderBottom: `1px solid ${template.dividerColor}`,
          paddingBottom: '5px',
      }}>
        {label}
      </div>
    </div>
  )
}
