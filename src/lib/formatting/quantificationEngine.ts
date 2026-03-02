import type { BulletPoint, QuantificationReport } from '@/types/resume'

const METRIC_REGEX = [
  /\d+\s*%/,
  /\$\s*[\d,.]+/,
  /\d+x\b/,
  /\b\d{2,}\b/,  // any 2+ digit number is likely a metric
  /\b(ms|sec|min|hours?|days?|weeks?|months?)\b/i,
]

export function hasQuantification(text: string): boolean {
  return METRIC_REGEX.some(r => r.test(text))
}

export function buildQuantificationReport(allBullets: BulletPoint[]): QuantificationReport {
  const total = allBullets.length
  if (total === 0) {
    return { totalBullets: 0, quantifiedBullets: 0, density: 0, unquantifiedIds: [] }
  }

  const unquantifiedIds: string[] = []
  let quantifiedCount = 0

  for (const b of allBullets) {
    if (hasQuantification(b.text)) {
      quantifiedCount++
    } else {
      unquantifiedIds.push(b.id)
    }
  }

  return {
    totalBullets: total,
    quantifiedBullets: quantifiedCount,
    density: Math.round((quantifiedCount / total) * 100),
    unquantifiedIds,
  }
}
