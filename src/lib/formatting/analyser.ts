import type { FullAnalysis, ResumeData } from '@/types/resume'
import { analyseBullets } from './bulletAnalyser'
import { buildQuantificationReport } from './quantificationEngine'
import { runATSSimulation } from './atsSimulator'
import { runAIDetection } from './aiDetector'
import { estimatePageLength } from './pageLengthIntelligence'

/** Collect every bullet from every section into a flat list. */
function collectAllBullets(resume: ResumeData) {
  return [
    ...resume.experience.flatMap(e => e.bullets),
    ...resume.projects.flatMap(p => p.bullets),
    ...resume.leadership.flatMap(l => l.bullets),
  ]
}

/** Calculate years of experience from experience entries. */
function estimateYearsOfExperience(resume: ResumeData): number {
  if (resume.experience.length === 0) return 0
  const earliestYear = Math.min(
    ...resume.experience.map(e => {
      const year = parseInt(e.startDate?.slice(0, 4) ?? '2020')
      return isNaN(year) ? 2020 : year
    }),
  )
  return new Date().getFullYear() - earliestYear
}

export function analyseResume(resume: ResumeData): FullAnalysis {
  const allBullets = collectAllBullets(resume)
  const yearsExp   = estimateYearsOfExperience(resume)

  const bullets        = analyseBullets(allBullets)
  const quantification = buildQuantificationReport(allBullets)
  const ats            = runATSSimulation(resume)
  const aiDetection    = runAIDetection(allBullets)
  const pageLength     = estimatePageLength(resume, yearsExp)

  // Overall score (0–100)
  const bulletScoreMap: Record<string, number> = { excellent: 100, good: 75, 'needs-work': 40, poor: 15 }
  const avgBulletScore = bullets.length > 0
    ? bullets.reduce((sum, b) => sum + (bulletScoreMap[b.score] ?? 0), 0) / bullets.length
    : 50

  const overallScore = Math.round(
    avgBulletScore * 0.35 +
    quantification.density * 0.25 +
    ats.plainTextScore * 0.25 +
    (100 - aiDetection.score) * 0.15,
  )

  return { bullets, quantification, ats, aiDetection, pageLength, overallScore }
}
