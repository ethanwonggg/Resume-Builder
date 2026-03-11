import type { TemplateId } from '@/types/resume'

export const RESUME_TYPOGRAPHY = {
  name: {
    sizeMin: 18,
    sizeDefault: 20,
    sizeMax: 22,
    weight: '700',
    letterSpacing: '0em',
  },
  sectionHeader: {
    sizeMin: 12,
    sizeDefault: 12,
    sizeMax: 13,
    weight: '700',
    letterSpacingMin: '0.02em',
    letterSpacingDefault: '0.03em',
    letterSpacingMax: '0.04em',
  },
  body: {
    sizeMin: 10.5,
    sizeDefault: 11,
    sizeMax: 11.5,
  },
  meta: {
    size: 9.5,
  },
  lineSpacingMin: 1.05,
  lineSpacingDefault: 1.1,
  lineSpacingMax: 1.15,
} as const

export const RESUME_SPACING = {
  marginMin: 0.5,
  marginDefault: 0.65,
  marginMax: 0.75,
  sectionGapPx: 8,
  bulletGapPx: 4,
} as const

export const FONT_OPTIONS = [
  { label: 'Inter', value: 'Inter', type: 'sans' as const },
  { label: 'Calibri', value: 'Calibri, Inter, sans-serif', type: 'sans' as const },
  { label: 'Arial', value: 'Arial, sans-serif', type: 'sans' as const },
  { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif', type: 'sans' as const },
  { label: 'IBM Plex Sans', value: '"IBM Plex Sans", Inter, sans-serif', type: 'sans' as const },
  { label: 'Georgia', value: 'Georgia, serif', type: 'serif' as const },
  { label: 'Times New Roman', value: '"Times New Roman", Times, serif', type: 'serif' as const },
] as const

export interface TemplateConfig {
  id: TemplateId
  label: string
  description: string
  defaultFont: string
  sectionHeaderStyle: 'uppercase-border' | 'bold-line' | 'formal-indent'
  dividerStyle: 'solid' | 'light-gray' | 'none'
  dividerColor: string
  sectionHeaderColor: string
  nameColor: string
  bodyColor: string
  metaColor: string
  bulletMarker: '•' | '‑' | '–'
}

export const TEMPLATES: Record<TemplateId, TemplateConfig> = {
  'big-tech-classic': {
    id: 'big-tech-classic',
    label: 'Big Tech Classic',
    description: 'Ultra-minimal, tight spacing. Used in Google/Meta/Amazon accepted resumes.',
    defaultFont: 'Inter',
    sectionHeaderStyle: 'uppercase-border',
    dividerStyle: 'solid',
    dividerColor: '#111111',
    sectionHeaderColor: '#111111',
    nameColor: '#111111',
    bodyColor: '#111111',
    metaColor: '#374151',
    bulletMarker: '•',
  },
  'startup-clean': {
    id: 'startup-clean',
    label: 'Startup Clean',
    description: 'Slightly more breathing room with light gray section dividers.',
    defaultFont: 'Inter',
    sectionHeaderStyle: 'bold-line',
    dividerStyle: 'light-gray',
    dividerColor: '#d1d5db',
    sectionHeaderColor: '#111111',
    nameColor: '#111111',
    bodyColor: '#1f2937',
    metaColor: '#4b5563',
    bulletMarker: '•',
  },
  'academic-structured': {
    id: 'academic-structured',
    label: 'Academic Structured',
    description: 'Formal typography with serif option, suitable for research roles.',
    defaultFont: 'Georgia',
    sectionHeaderStyle: 'formal-indent',
    dividerStyle: 'solid',
    dividerColor: '#374151',
    sectionHeaderColor: '#111111',
    nameColor: '#111111',
    bodyColor: '#111111',
    metaColor: '#374151',
    bulletMarker: '–',
  },
}

export const ATS_SECTION_LABELS: Record<string, string> = {
  experience: 'EXPERIENCE',
  projects: 'PROJECTS',
  education: 'EDUCATION',
  skills: 'SKILLS',
  certifications: 'CERTIFICATIONS',
  publications: 'PUBLICATIONS',
  leadership: 'LEADERSHIP',
}
