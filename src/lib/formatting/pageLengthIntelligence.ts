import type { PageLengthReport, ResumeData } from '@/types/resume'

/** Rough heuristic: estimate how many "content lines" the resume has. */
export function estimatePageLength(resume: ResumeData, yearsOfExperience: number): PageLengthReport {
  let contentLines = 0

  // Contact header ~3 lines
  contentLines += 3

  // Experience
  for (const exp of resume.experience) {
    contentLines += 2  // company + role line
    contentLines += exp.bullets.length * 1.5
  }

  // Projects
  for (const proj of resume.projects) {
    contentLines += 2
    contentLines += proj.bullets.length * 1.5
  }

  contentLines += resume.education.length * 2

  // Skills
  const skillEntries = Object.values(resume.skills).filter(v => v && v.trim() !== '')
  contentLines += skillEntries.length + 1

  // Certifications / Publications / Leadership
  contentLines += resume.certifications.length * 1.5
  contentLines += resume.publications.length  * 1.5
  contentLines += resume.leadership.length    * 3

  // Section headers (roughly 8pt + 4px gap each)
  const visibleSections = resume.sectionOrder.filter(s => !resume.hiddenSections.includes(s))
  contentLines += visibleSections.length * 1.5

  // Estimate: ~42 content lines per page at 11pt / 1.1 spacing / 0.65" margins
  const estimatedPages = Math.max(1, Math.round(contentLines / 42))

  const recommendation: PageLengthReport['recommendation'] =
    yearsOfExperience >= 5 ? '1-2-pages' : '1-page'

  const flags: string[] = []

  if (recommendation === '1-page' && estimatedPages > 1) {
    flags.push('Resume exceeds 1 page — trim experience bullets or remove older roles')
  }
  if (estimatedPages > 2) {
    flags.push('Resume exceeds 2 pages — significantly reduce content')
  }

  // Detect underfill (less than ~60% of a page)
  if (estimatedPages === 1 && contentLines < 25) {
    flags.push('Resume appears sparse — add more bullets or projects to fill the page')
  }

  // Detect overly long bullets
  const allBulletTexts = [
    ...resume.experience.flatMap(e => e.bullets),
    ...resume.projects.flatMap(p => p.bullets),
    ...resume.leadership.flatMap(l => l.bullets),
  ]
  const longBullets = allBulletTexts.filter(b => b.text.length > 160)
  if (longBullets.length > 0) {
    flags.push(`${longBullets.length} bullet(s) are too long (>160 chars) — each bullet should be one concise idea`)
  }

  return { estimatedPages, recommendation, flags }
}
