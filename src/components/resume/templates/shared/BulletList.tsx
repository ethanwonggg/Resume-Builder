import type { TemplateConfig } from '@/lib/design/tokens'
import type { BulletPoint, DesignSettings } from '@/types/resume'

interface BulletListProps {
  bullets: BulletPoint[]
  template: TemplateConfig
  settings: DesignSettings
  highlightIds?: Set<string>
}

export default function BulletList({ bullets, template, settings, highlightIds }: BulletListProps) {
  if (bullets.length === 0) return null

  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {bullets.map(b => {
        const isHighlighted = highlightIds?.has(b.id)
        return (
          <li key={b.id} style={{
            fontSize: `${settings.fontSize}pt`,
            lineHeight: settings.lineSpacing,
            color: template.bodyColor,
            marginBottom: '2px',
            paddingLeft: '14px',
            position: 'relative',
            // Highlight ring shown in editor mode only — never exported
            outline: isHighlighted ? '1.5px dashed #f59e0b' : undefined,
            backgroundColor: isHighlighted ? '#fffbeb' : undefined,
          }}>
            <span style={{ position: 'absolute', left: 0, top: 0, color: template.metaColor }}>
              {template.bulletMarker}
            </span>
            {b.text || <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>Add bullet text…</span>}
          </li>
        )
      })}
    </ul>
  )
}
