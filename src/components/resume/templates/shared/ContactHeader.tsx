import type { TemplateConfig } from '@/lib/design/tokens'

interface ContactHeaderProps {
  name: string
  email: string
  phone: string
  location: string
  linkedin?: string
  github?: string
  portfolio?: string
  template: TemplateConfig
  namePt?: number
}

export default function ContactHeader({
  name, email, phone, location, linkedin, github, portfolio, template, namePt = 20,
}: ContactHeaderProps) {
  const contactItems = [email, phone, location, linkedin, github, portfolio].filter(Boolean)

  return (
    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
      <div style={{
        fontSize: `${namePt}pt`,
        fontWeight: '700',
        color: template.nameColor,
        letterSpacing: '-0.01em',
        lineHeight: 1.1,
        marginBottom: '4px',
      }}>
        {name || 'Your Name'}
      </div>
      <div style={{
        fontSize: '9.5pt',
        color: template.metaColor,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '0 12px',
        lineHeight: 1.4,
      }}>
        {contactItems.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  )
}
