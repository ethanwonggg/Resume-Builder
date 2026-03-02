import { useMemo } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import { TEMPLATES, FONT_OPTIONS, RESUME_TYPOGRAPHY, RESUME_SPACING } from '@/lib/design/tokens'
import type { TemplateConfig } from '@/lib/design/tokens'
import type { TemplateId, FontFamily } from '@/types/resume'
import { clsx } from 'clsx'

interface TemplateSelectorProps {
  templates: TemplateConfig[]
  activeId: TemplateId
  onSelect: (id: TemplateId, font: FontFamily) => void
}

function TemplateSelector({ templates, activeId, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-gray-600">Template</p>
      <div className="grid grid-cols-1 gap-2">
        {templates.map(t => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id as TemplateId, t.defaultFont as FontFamily)}
            className={clsx(
              'text-left rounded-md border px-3 py-2.5 transition-colors',
              activeId === t.id
                ? 'border-accent-500 bg-accent-50 ring-1 ring-accent-500'
                : 'border-gray-200 hover:border-gray-300 bg-white',
            )}
          >
            <p className={clsx('text-sm font-semibold', activeId === t.id ? 'text-accent-700' : 'text-gray-800')}>
              {t.label}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{t.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

interface FontSelectorProps {
  activeFont: FontFamily
  onSelect: (font: FontFamily) => void
}

function FontSelector({ activeFont, onSelect }: FontSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-gray-600">Font (ATS-safe)</p>
      <div className="grid grid-cols-2 gap-1.5">
        {FONT_OPTIONS.map(f => (
          <button
            key={f.label}
            onClick={() => onSelect(f.label as FontFamily)}
            className={clsx(
              'text-left rounded border px-2.5 py-1.5 text-sm transition-colors',
              activeFont === f.label
                ? 'border-accent-500 bg-accent-50 text-accent-700 font-medium'
                : 'border-gray-200 hover:border-gray-300 text-gray-700',
            )}
            style={{ fontFamily: f.value }}
          >
            {f.label}
            <span className="ml-1 text-xs text-gray-400">({f.type})</span>
          </button>
        ))}
      </div>
    </div>
  )
}

interface DesignSliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  minLabel: string
  maxLabel: string
  onChange: (value: number) => void
}

function DesignSlider({ label, value, min, max, step, display, minLabel, maxLabel, onChange }: DesignSliderProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <p className="text-xs font-medium text-gray-600">{label}</p>
        <span className="text-xs font-mono text-gray-500">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full accent-indigo-600"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}

export default function DesignEditor() {
  const settings       = useResumeStore(s => s.settings)
  const updateSettings = useResumeStore(s => s.updateSettings)

  const templateList = useMemo(() => Object.values(TEMPLATES), [])

  return (
    <div className="space-y-5">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Design Settings</h3>

      <TemplateSelector
        templates={templateList}
        activeId={settings.templateId}
        onSelect={(id, font) => updateSettings({ templateId: id, fontFamily: font })}
      />

      <FontSelector
        activeFont={settings.fontFamily}
        onSelect={font => updateSettings({ fontFamily: font })}
      />

      <DesignSlider
        label="Body Font Size"
        value={settings.fontSize}
        min={RESUME_TYPOGRAPHY.body.sizeMin}
        max={RESUME_TYPOGRAPHY.body.sizeMax}
        step={0.5}
        display={`${settings.fontSize}pt`}
        minLabel={`${RESUME_TYPOGRAPHY.body.sizeMin}pt`}
        maxLabel={`${RESUME_TYPOGRAPHY.body.sizeMax}pt`}
        onChange={fontSize => updateSettings({ fontSize })}
      />

      <DesignSlider
        label="Line Spacing"
        value={settings.lineSpacing}
        min={RESUME_TYPOGRAPHY.lineSpacingMin}
        max={RESUME_TYPOGRAPHY.lineSpacingMax}
        step={0.01}
        display={`${settings.lineSpacing}`}
        minLabel={`Tight ${RESUME_TYPOGRAPHY.lineSpacingMin}`}
        maxLabel={`Relaxed ${RESUME_TYPOGRAPHY.lineSpacingMax}`}
        onChange={lineSpacing => updateSettings({ lineSpacing })}
      />

      <DesignSlider
        label="Page Margins"
        value={settings.marginInch}
        min={RESUME_SPACING.marginMin}
        max={RESUME_SPACING.marginMax}
        step={0.05}
        display={`${settings.marginInch}"`}
        minLabel='0.5" (min)'
        maxLabel='0.75" (max)'
        onChange={marginInch => updateSettings({ marginInch })}
      />

      <div className="rounded-md bg-blue-50 border border-blue-200 px-3 py-2.5 text-xs text-blue-700 leading-relaxed">
        <strong>ATS Safe:</strong> All templates use single-column layout, no graphics, no tables, and standard section names.
        Accent colours in the editor are never exported into the resume PDF.
      </div>
    </div>
  )
}
