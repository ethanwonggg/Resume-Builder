import type { AIDetectionReport, BulletPoint } from '@/types/resume'

const BANNED_PHRASES = [
  'leveraged', 'utilized', 'synergized', 'spearheaded', 'facilitated',
  'streamlined', 'harnessed', 'galvanized', 'actualized', 'catalyzed',
  'operationalized', 'conceptualized', 'proactively', 'holistic',
  'robust solution', 'cutting-edge', 'best-in-class', 'world-class',
  'dynamic', 'innovative', 'impactful', 'passionate', 'results-driven',
  'detail-oriented', 'self-starter', 'go-getter', 'think outside the box',
  'game-changer', 'move the needle', 'deep dive', 'at the end of the day',
  'circle back', 'bandwidth', 'synergy',
]

/** Compute Type-Token Ratio (TTR) — higher = more diverse vocabulary. */
function computeLexicalDiversity(text: string): number {
  const tokens = text.toLowerCase().match(/\b[a-z]{3,}\b/g) ?? []
  if (tokens.length === 0) return 100
  const unique = new Set(tokens)
  return Math.round((unique.size / tokens.length) * 100)
}

/** Measure how similar the opening patterns of bullets are. */
function computePatternSimilarity(bullets: string[]): number {
  if (bullets.length < 2) return 0
  // Extract first 2 words of each bullet
  const patterns = bullets.map(b => {
    const words = b.trim().replace(/^[-•–]\s*/, '').split(/\s+/).slice(0, 2).join(' ').toLowerCase()
    return words
  })
  const total = patterns.length
  const unique = new Set(patterns).size
  // High similarity = low unique ratio
  const similarity = Math.round((1 - unique / total) * 100)
  return similarity
}

/** Count repeated sentences (near-duplicate bullets). */
function computeRepetitiveness(bullets: string[]): number {
  if (bullets.length < 2) return 0
  let duplicates = 0
  for (let i = 0; i < bullets.length; i++) {
    for (let j = i + 1; j < bullets.length; j++) {
      const a = bullets[i].toLowerCase().slice(0, 40)
      const b = bullets[j].toLowerCase().slice(0, 40)
      if (a === b || levenshteinSimilarity(a, b) > 0.8) {
        duplicates++
      }
    }
  }
  return Math.min(100, Math.round((duplicates / bullets.length) * 100))
}

function levenshteinSimilarity(a: string, b: string): number {
  const m = a.length, n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  )
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  const maxLen = Math.max(m, n)
  return maxLen === 0 ? 1 : 1 - dp[m][n] / maxLen
}

export function runAIDetection(bullets: BulletPoint[]): AIDetectionReport {
  const texts = bullets.map(b => b.text).filter(t => t.trim() !== '')

  if (texts.length === 0) {
    return {
      score: 0, repetitiveness: 0, lexicalDiversity: 100,
      bannedPhraseCount: 0, bannedPhrases: [], patternSimilarity: 0, verdict: 'natural',
    }
  }

  const fullText = texts.join(' ')
  const lowerText = fullText.toLowerCase()

  // Banned phrase detection
  const foundBanned = BANNED_PHRASES.filter(phrase => lowerText.includes(phrase))
  const bannedPhraseCount = foundBanned.length

  const lexicalDiversity  = computeLexicalDiversity(fullText)
  const patternSimilarity = computePatternSimilarity(texts)
  const repetitiveness    = computeRepetitiveness(texts)

  // Composite AI score (higher = more AI-like = worse)
  const score = Math.round(
    bannedPhraseCount * 6 +
    patternSimilarity * 0.4 +
    repetitiveness   * 0.3 +
    Math.max(0, 60 - lexicalDiversity) * 0.5,
  )

  const clamped = Math.min(100, Math.max(0, score))

  const verdict: AIDetectionReport['verdict'] =
    clamped < 25 ? 'natural' :
    clamped < 55 ? 'borderline' :
    'ai-like'

  return {
    score: clamped,
    repetitiveness,
    lexicalDiversity,
    bannedPhraseCount,
    bannedPhrases: foundBanned,
    patternSimilarity,
    verdict,
  }
}
