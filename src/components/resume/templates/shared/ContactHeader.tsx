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
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <div style={{
        fontSize: `${namePt}pt`,
        fontWeight: '700',
        color: template.nameColor,
        letterSpacing: '-0.01em',
        lineHeight: 1.1,
        marginBottom: '8px',
      }}>
        {name || 'Your Name'}
      </div>
      <div
        style={{
          fontSize: '9.5pt',
          color: template.metaColor,
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '4px 18px',
          lineHeight: 1.5,
        }}
      >
        {contactItems.map((item, i) => (
          <span
            key={i}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            {i > 0 && <span style={{ opacity: 0.7 }}>•</span>}
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
