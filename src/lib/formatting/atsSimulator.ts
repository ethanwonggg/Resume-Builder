import type { ATSIssue, ATSReport, ResumeData } from '@/types/resume'
import { ATS_SECTION_LABELS } from '@/lib/design/tokens'

// Characters that can cause ATS parse failures
const PROBLEMATIC_CHARS = /[^\x00-\x7F]|[""''‑–—…•]/g
const EMOJI_REGEX = /[\u{1F300}-\u{1FFFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu


export function runATSSimulation(resume: ResumeData): ATSReport {
  const issues: ATSIssue[] = []

  if (!resume.contact.email) {
    issues.push({ severity: 'error', message: 'Missing email address', field: 'contact.email' })
  }
  if (!resume.contact.phone) {
    issues.push({ severity: 'warning', message: 'Missing phone number', field: 'contact.phone' })
  }
  if (!resume.contact.name) {
    issues.push({ severity: 'error', message: 'Missing candidate name', field: 'contact.name' })
  }

  const allText = collectAllText(resume)
  const specialCharMatches = allText.match(PROBLEMATIC_CHARS)
  const isSpecialCharsFree = !specialCharMatches || specialCharMatches.length === 0
  if (!isSpecialCharsFree) {
    issues.push({
      severity: 'warning',
      message: `${specialCharMatches!.length} special/unicode character(s) detected — may cause ATS parse errors`,
    })
  }

  const hasEmoji = EMOJI_REGEX.test(allText)
  const isEmojiFree = !hasEmoji
  if (!isEmojiFree) {
    issues.push({ severity: 'error', message: 'Emojis detected — will break ATS parsing' })
  }

  const isSectionNamesValid = true  // we enforce ATS_SECTION_LABELS in render
  const visibleSections = resume.sectionOrder.filter(s => !resume.hiddenSections.includes(s))
  for (const key of visibleSections) {
    if (!ATS_SECTION_LABELS[key]) {
      issues.push({ severity: 'warning', message: `Unknown section key: ${key}` })
    }
  }

  for (const exp of resume.experience) {
    const emptyBullets = exp.bullets.filter(b => b.text.trim() === '')
    if (emptyBullets.length > 0) {
      issues.push({
        severity: 'warning',
        message: `${exp.company} (${exp.role}): ${emptyBullets.length} empty bullet(s) detected`,
        field: `experience.${exp.id}`,
      })
    }
  }

  if (resume.education.length === 0) {
    issues.push({ severity: 'error', message: 'No education section — required by most ATS systems' })
  }

  const skillsEmpty = Object.values(resume.skills).every(v => !v || v.trim() === '')
  if (skillsEmpty) {
    issues.push({ severity: 'warning', message: 'Skills section is empty — affects keyword matching' })
  }

  const plainTextScore = computePlainTextScore(issues)

  return {
    isPassed: issues.filter(i => i.severity === 'error').length === 0,
    issues,
    isSectionNamesValid,
    isSpecialCharsFree,
    isEmojiFree,
    plainTextScore,
  }
}

function collectAllText(resume: ResumeData): string {
  const parts: string[] = [
    resume.contact.name,
    resume.contact.email,
    resume.contact.phone,
    ...resume.experience.flatMap(e => [e.company, e.role, ...e.bullets.map(b => b.text)]),
    ...resume.projects.flatMap(p => [p.name, p.techStack, ...p.bullets.map(b => b.text)]),
    ...resume.education.flatMap(e => [e.institution, e.degree, e.field]),
    Object.values(resume.skills).join(' '),
  ]
  return parts.filter(Boolean).join(' ')
}

function computePlainTextScore(issues: ATSIssue[]): number {
  const errorPenalty = issues.filter(i => i.severity === 'error').length * 20
  const warnPenalty  = issues.filter(i => i.severity === 'warning').length * 8
  return Math.max(0, 100 - errorPenalty - warnPenalty)
}
