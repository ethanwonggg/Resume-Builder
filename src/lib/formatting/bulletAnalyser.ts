import type { BulletAnalysis, BulletPoint, BulletScore } from '@/types/resume'
import { analyseVerb } from './verbStrength'

// Patterns that indicate a quantified metric is present
const METRIC_PATTERNS = [
  /\d+\s*%/,                          // percentages
  /\$\s*[\d,.]+[kKmMbB]?/,           // dollar amounts
  /[\d,.]+\s*(ms|sec|s|min|hours?)/i, // time
  /\d+x\b/,                           // multipliers
  /\d+[\d,]*\s+(users?|customers?|requests?|records?|teams?|engineers?|services?)/i,
  /\b(from|by)\s+\d+/i,              // "from 12" / "by 40"
  /\breduced\b.*\d/i,
  /\bincreased\b.*\d/i,
  /\bimproved\b.*\d/i,
  /\b\d+\s*(lines?|loc|tests?|endpoints?)\b/i,
]

// Patterns that suggest technical context
const CONTEXT_PATTERNS = [
  /\b(using|with|via|in|through)\s+[A-Z][A-Za-z]+/,  // "using React"
  /\b(API|REST|GraphQL|SQL|NoSQL|CI\/CD|AWS|GCP|Azure|Docker|K8s|Kubernetes|React|Vue|Angular|Node|Python|Go|Java|TypeScript|JavaScript|Rust|C\+\+)\b/i,
  /\b(microservices?|monolith|database|backend|frontend|full.?stack|cloud|pipeline|infrastructure|architecture)\b/i,
]

// Patterns that suggest impact language
const IMPACT_PATTERNS = [
  /\b(reduc|increas|improv|optim|enhanc|accelerat|eliminat|cut|sav|decreas|boost|streamlin)\w*/i,
  /\b(deploy|ship|launch|release|deliver)\w*/i,
  /\b(result|impact|outcome|achiev|enabl)\w*/i,
]

// Vague impact language that lacks specificity
const VAGUE_IMPACT = [
  /\b(better|faster|improved|enhanced|optimized)\b(?!.*\d)/i,
  /\bmade.*better\b/i,
  /\bvarious\b/i,
  /\bseveral\b/i,
  /\bmany\b/i,
]

function scoreMetric(text: string): boolean {
  return METRIC_PATTERNS.some(p => p.test(text))
}

function scoreContext(text: string): boolean {
  return CONTEXT_PATTERNS.some(p => p.test(text))
}

function scoreImpact(text: string): boolean {
  return IMPACT_PATTERNS.some(p => p.test(text))
}

function computeScore(hasMetric: boolean, hasContext: boolean, hasImpact: boolean, verbStrength: string): BulletScore {
  const points =
    (verbStrength === 'strong' ? 2 : verbStrength === 'neutral' ? 1 : 0) +
    (hasMetric ? 3 : 0) +
    (hasContext ? 2 : 0) +
    (hasImpact ? 2 : 0)

  if (points >= 7) return 'excellent'
  if (points >= 5) return 'good'
  if (points >= 3) return 'needs-work'
  return 'poor'
}

function generateSuggestions(
  text: string,
  hasMetric: boolean,
  hasContext: boolean,
  hasImpact: boolean,
  verbStrength: string,
  weakVerbReplacement?: string[],
): string[] {
  const suggestions: string[] = []

  if (verbStrength === 'weak') {
    const alts = weakVerbReplacement?.slice(0, 2).join(' / ') ?? 'a stronger action verb'
    suggestions.push(`Start with a stronger verb — try ${alts}`)
  }

  if (!hasMetric) {
    suggestions.push('Add a quantified metric (%, $, time saved, users affected)')
  }

  if (!hasContext) {
    suggestions.push('Name the specific technology or tool used')
  }

  if (!hasImpact) {
    suggestions.push('Describe the business or engineering impact')
  }

  // Detect vague impact even if hasImpact flagged true
  if (VAGUE_IMPACT.some(p => p.test(text))) {
    suggestions.push('Replace vague language ("better", "faster") with a concrete number')
  }

  if (text.length < 40) {
    suggestions.push('Bullet is too short — expand with context and outcome')
  }

  if (text.length > 160) {
    suggestions.push('Bullet is too long — aim for one clear idea per bullet')
  }

  return suggestions
}

export function analyseBullet(bullet: BulletPoint): BulletAnalysis {
  const { text, id } = bullet
  const { strength, isOverused, replacement } = analyseVerb(text)

  const hasMetric  = scoreMetric(text)
  const hasContext = scoreContext(text)
  const hasImpact  = scoreImpact(text)
  const score      = computeScore(hasMetric, hasContext, hasImpact, strength)

  const suggestions = generateSuggestions(
    text, hasMetric, hasContext, hasImpact, strength, replacement,
  )

  return {
    bulletId: id,
    text,
    verbStrength: strength,
    hasMetric,
    hasContext,
    hasImpact,
    score,
    suggestions,
    weakVerbDetected: strength === 'weak' ? text.split(/\s+/)[0] : undefined,
    suggestedVerb: isOverused ? replacement?.[0] : undefined,
  }
}

export function analyseBullets(bullets: BulletPoint[]): BulletAnalysis[] {
  return bullets.map(analyseBullet)
}
