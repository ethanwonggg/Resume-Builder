import type { ResumeData, ScanHeatmapEntry } from '@/types/resume'

/** Generate the heatmap data structure for the "View as Recruiter" mode. */
export function buildScanHeatmap(resume: ResumeData): ScanHeatmapEntry[] {
  const entries: ScanHeatmapEntry[] = []

  // Name + contact — always highest priority
  entries.push({
    sectionKey: 'contact',
    label: 'Contact Header',
    priority: 'high',
    elements: [
      { label: 'Name', value: resume.contact.name, visible: !!resume.contact.name },
      { label: 'Email', value: resume.contact.email, visible: !!resume.contact.email },
      { label: 'Phone', value: resume.contact.phone, visible: !!resume.contact.phone },
      { label: 'LinkedIn', value: resume.contact.linkedin ?? '', visible: !!resume.contact.linkedin },
      { label: 'GitHub', value: resume.contact.github ?? '', visible: !!resume.contact.github },
    ],
  })

  // Most recent role — recruiter lands here first
  if (resume.experience.length > 0) {
    const recent = resume.experience[0]
    const firstBullet = recent.bullets[0]?.text ?? ''
    const metricBullet = recent.bullets
      .find(b => /\d+\s*%|\$\d|\d+x/.test(b.text))?.text ?? firstBullet

    entries.push({
      sectionKey: 'experience',
      label: 'Most Recent Role',
      priority: 'high',
      elements: [
        { label: 'Company', value: recent.company, visible: !!recent.company },
        { label: 'Role', value: recent.role, visible: !!recent.role },
        { label: 'Tenure', value: `${recent.startDate} – ${recent.current ? 'Present' : recent.endDate}`, visible: true },
        { label: 'First Bullet', value: firstBullet, visible: !!firstBullet },
        { label: 'Top Metric', value: metricBullet, visible: !!metricBullet },
      ],
    })
  }

  entries.push({
    sectionKey: 'skills',
    label: 'Tech Stack / Skills',
    priority: 'high',
    elements: [
      { label: 'Languages', value: resume.skills.languages ?? '', visible: !!resume.skills.languages },
      { label: 'Frameworks', value: resume.skills.frameworks ?? '', visible: !!resume.skills.frameworks },
      { label: 'Tools', value: resume.skills.tools ?? '', visible: !!resume.skills.tools },
    ],
  })

  // Education
  if (resume.education.length > 0) {
    const edu = resume.education[0]
    entries.push({
      sectionKey: 'education',
      label: 'Education',
      priority: 'medium',
      elements: [
        { label: 'Institution', value: edu.institution, visible: !!edu.institution },
        { label: 'Degree', value: `${edu.degree} in ${edu.field}`, visible: !!edu.degree },
        { label: 'GPA', value: edu.gpa ?? '', visible: !!edu.gpa },
      ],
    })
  }

  // Projects
  if (resume.projects.length > 0) {
    entries.push({
      sectionKey: 'projects',
      label: 'Projects',
      priority: 'medium',
      elements: resume.projects.slice(0, 2).map(p => ({
        label: p.name,
        value: p.techStack,
        visible: !!p.name,
      })),
    })
  }

  return entries
}

/** Determine the overall scan score (0–100): how fast can a recruiter extract key signals? */
export function computeScanScore(heatmap: ScanHeatmapEntry[]): number {
  const highPriority = heatmap.filter(e => e.priority === 'high')
  const visibleHighSignals = highPriority.flatMap(e => e.elements).filter(e => e.visible && e.value.trim() !== '')
  const totalHighSignals   = highPriority.flatMap(e => e.elements).length

  if (totalHighSignals === 0) return 0
  return Math.round((visibleHighSignals.length / totalHighSignals) * 100)
}
