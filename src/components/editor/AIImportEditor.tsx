import { useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import type {
  ResumeData,
  ExperienceEntry,
  ProjectEntry,
  EducationEntry,
  CertificationEntry,
  LeadershipEntry,
  PublicationEntry,
  SkillsSection,
  BulletPoint,
} from '@/types/resume'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(v => String(v).trim()).filter(Boolean)
  }
  if (typeof value === 'string') {
    return value
      .split(/[\n,;]+/)
      .map(v => v.trim())
      .filter(Boolean)
  }
  return []
}

function joinSkills(value: unknown): string {
  return toStringArray(value).join(', ')
}

function buildResumeFromImported(raw: any, current: ResumeData): ResumeData {
  const basics = raw?.basics ?? {}

  const experiencesSrc = Array.isArray(raw?.experiences) ? raw.experiences : []
  const educationSrc = Array.isArray(raw?.education) ? raw.education : []
  const projectsSrc = Array.isArray(raw?.projects) ? raw.projects : []
  const certsSrc = Array.isArray(raw?.certifications) ? raw.certifications : []
  const leadershipSrc = Array.isArray(raw?.leadership) ? raw.leadership : []
  const publicationsSrc = Array.isArray(raw?.publications) ? raw.publications : []
  const skillsSrc = raw?.skills ?? {}

  const experience: ExperienceEntry[] = experiencesSrc.map((exp: any): ExperienceEntry => {
    const highlights = Array.isArray(exp?.highlights) ? exp.highlights : []
    const bullets: BulletPoint[] = []

    if (typeof exp?.summary === 'string' && exp.summary.trim()) {
      bullets.push({ id: uid(), text: exp.summary.trim() })
    }

    for (const h of highlights) {
      if (typeof h === 'string' && h.trim()) {
        bullets.push({ id: uid(), text: h.trim() })
      }
    }

    return {
      id: uid(),
      company: exp?.company ?? '',
      role: exp?.title ?? exp?.position ?? '',
      location: exp?.location ?? '',
      startDate: exp?.start_date ?? exp?.startDate ?? '',
      endDate: exp?.is_current ? '' : (exp?.end_date ?? exp?.endDate ?? ''),
      current: Boolean(exp?.is_current),
      bullets,
    }
  })

  const education: EducationEntry[] = educationSrc.map((ed: any): EducationEntry => ({
    id: uid(),
    institution: ed?.institution ?? '',
    degree: ed?.degree ?? '',
    field: ed?.field_of_study ?? ed?.field ?? '',
    location: ed?.location ?? '',
    startDate: ed?.start_date ?? ed?.startDate ?? '',
    endDate: ed?.end_date ?? ed?.endDate ?? '',
    gpa: ed?.gpa ?? '',
    honors: ed?.honors ?? '',
    relevantCourses: ed?.relevant_courses ?? '',
  }))

  const projects: ProjectEntry[] = projectsSrc.map((proj: any): ProjectEntry => {
    const highlights = Array.isArray(proj?.highlights) ? proj.highlights : []
    const bullets: BulletPoint[] = []

    for (const h of highlights) {
      if (typeof h === 'string' && h.trim()) {
        bullets.push({ id: uid(), text: h.trim() })
      }
    }

    const techs = toStringArray(proj?.technologies)
    const techStack = techs.length ? techs.join(', ') : (proj?.tech_stack ?? proj?.techStack ?? '')

    return {
      id: uid(),
      name: proj?.name ?? '',
      techStack,
      link: proj?.link ?? proj?.url ?? '',
      startDate: proj?.start_date ?? proj?.startDate,
      endDate: proj?.end_date ?? proj?.endDate,
      bullets,
    }
  })

  const certifications: CertificationEntry[] = certsSrc.map((c: any): CertificationEntry => ({
    id: uid(),
    name: c?.name ?? '',
    issuer: c?.issuer ?? '',
    date: c?.date ?? '',
  }))

  const leadership: LeadershipEntry[] = leadershipSrc.map((l: any): LeadershipEntry => {
    const highlights = Array.isArray(l?.highlights) ? l.highlights : []
    const bullets: BulletPoint[] = []

    for (const h of highlights) {
      if (typeof h === 'string' && h.trim()) {
        bullets.push({ id: uid(), text: h.trim() })
      }
    }

    return {
      id: uid(),
      role: l?.role ?? '',
      organization: l?.organization ?? '',
      startDate: l?.start_date ?? l?.startDate ?? '',
      endDate: l?.end_date ?? l?.endDate ?? '',
      bullets,
    }
  })

  const publications: PublicationEntry[] = publicationsSrc.map((p: any): PublicationEntry => ({
    id: uid(),
    title: p?.title ?? '',
    venue: p?.venue ?? p?.publisher ?? '',
    date: p?.date ?? '',
    link: p?.link ?? p?.url ?? '',
  }))

  const skills: SkillsSection = {
    languages: joinSkills(skillsSrc.languages),
    frameworks: joinSkills(skillsSrc.frameworks),
    tools: joinSkills(skillsSrc.tools),
    platforms: joinSkills(skillsSrc.platforms),
    other: joinSkills(skillsSrc.other),
  }

  return {
    ...current,
    contact: {
      ...current.contact,
      name: basics.full_name ?? basics.name ?? current.contact.name,
      email: basics.email ?? current.contact.email,
      phone: basics.phone ?? current.contact.phone,
      location: basics.location ?? current.contact.location,
      linkedin: basics.linkedin ?? basics.linkedin_url ?? current.contact.linkedin ?? '',
      github: basics.github ?? basics.github_url ?? current.contact.github ?? '',
      portfolio: basics.portfolio ?? basics.website ?? current.contact.portfolio ?? '',
    },
    experience,
    education,
    projects,
    skills,
    certifications,
    leadership,
    publications,
  }
}

function stripCodeFences(input: string): string {
  let text = input.trim()

  if (text.startsWith('```')) {
    const firstNewline = text.indexOf('\n')
    if (firstNewline !== -1) {
      text = text.slice(firstNewline + 1)
    }
    const lastFence = text.lastIndexOf('```')
    if (lastFence !== -1) {
      text = text.slice(0, lastFence)
    }
  }

  return text.trim()
}

export default function AIImportEditor() {
  const [raw, setRaw] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const currentResume = useResumeStore(s => s.resume)
  const setResume = useResumeStore(s => s.setResume)

  function handleImport(): void {
    setError(null)
    setSuccess(null)

    const cleaned = stripCodeFences(raw)

    let parsed: any
    try {
      parsed = JSON.parse(cleaned)
    } catch (e) {
      setError('Could not parse JSON. Make sure you pasted only the JSON output from the AI.')
      return
    }

    try {
      const next = buildResumeFromImported(parsed, currentResume)
      setResume(next)
      setSuccess('Imported successfully. You can now fine-tune each section.')
    } catch (e) {
      setError('Something went wrong while transforming the data. Please check the format and try again.')
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
        AI Resume Import
      </h3>

      <p className="text-xs text-gray-500 leading-snug">
        Paste the JSON output from your AI assistant here. When you click
        <span className="font-semibold"> Import from AI</span>, this app will populate your
        contact, experience, education, projects, skills, and more.
      </p>

      <Textarea
        label="AI JSON output"
        value={raw}
        onChange={e => setRaw(e.target.value)}
        placeholder='Paste the JSON the AI returns here...'
        className="font-mono text-[11px] min-h-[160px]"
      />

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p className="text-xs text-emerald-600">
          {success}
        </p>
      )}

      <div className="flex justify-end">
        <Button
          variant="primary"
          size="sm"
          onClick={handleImport}
          disabled={!raw.trim()}
        >
          Import from AI
        </Button>
      </div>

      <p className="text-[11px] text-gray-400 leading-snug">
        Tip: if your AI returns the JSON wrapped in <code className="font-mono">```json</code> code
        fences, you can paste it as-is&mdash;we&apos;ll strip the fences automatically.
      </p>
    </div>
  )
}

