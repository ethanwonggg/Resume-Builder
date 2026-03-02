export const WEAK_VERBS = new Set([
  'helped', 'assisted', 'worked', 'involved', 'participated', 'contributed',
  'supported', 'aided', 'collaborated', 'was responsible', 'responsible for',
  'handled', 'did', 'made', 'used', 'tried', 'attempted', 'managed to',
  'was part of', 'took part', 'played a role',
])

export const OVERUSED_AI_VERBS = new Set([
  'leveraged', 'utilized', 'synergized', 'spearheaded', 'facilitated',
  'streamlined', 'harnessed', 'galvanized', 'actualized', 'catalyzed',
  'operationalized', 'conceptualized',
])

// Replacement suggestions keyed by weak verb (lower-case)
export const WEAK_VERB_REPLACEMENTS: Record<string, string[]> = {
  helped:           ['Supported', 'Contributed to', 'Assisted in'],
  assisted:         ['Supported', 'Collaborated on', 'Contributed to'],
  worked:           ['Built', 'Developed', 'Implemented', 'Engineered'],
  involved:         ['Contributed to', 'Participated in', 'Implemented'],
  participated:     ['Contributed to', 'Presented at', 'Led'],
  contributed:      ['Built', 'Developed', 'Delivered'],
  supported:        ['Maintained', 'Optimized', 'Enhanced'],
  handled:          ['Managed', 'Oversaw', 'Executed'],
  made:             ['Built', 'Designed', 'Created', 'Engineered'],
  used:             ['Implemented', 'Applied', 'Deployed'],
  managed:          ['Directed', 'Led', 'Oversaw', 'Coordinated'],
}

export const STRONG_VERB_EXAMPLES = [
  'Designed', 'Implemented', 'Optimized', 'Engineered', 'Architected',
  'Automated', 'Built', 'Deployed', 'Developed', 'Reduced', 'Increased',
  'Launched', 'Delivered', 'Migrated', 'Refactored', 'Integrated', 'Led',
  'Established', 'Defined', 'Created', 'Shipped', 'Scaled', 'Resolved',
  'Analysed', 'Researched', 'Authored', 'Mentored', 'Coordinated',
]

/** Extract the first word of a bullet and determine its strength. */
export function analyseVerb(bulletText: string): {
  verb: string
  strength: 'strong' | 'weak' | 'neutral'
  isOverused: boolean
  replacement?: string[]
} {
  const trimmed = bulletText.trim()
  // Strip leading bullet markers if any
  const cleaned = trimmed.replace(/^[-•–·]\s*/, '')
  const firstWord = cleaned.split(/\s+/)[0]?.toLowerCase() ?? ''

  // Check multi-word weak phrases
  const lowerCleaned = cleaned.toLowerCase()
  for (const phrase of WEAK_VERBS) {
    if (lowerCleaned.startsWith(phrase)) {
      return {
        verb: firstWord,
        strength: 'weak',
        isOverused: false,
        replacement: WEAK_VERB_REPLACEMENTS[phrase] ?? STRONG_VERB_EXAMPLES.slice(0, 3),
      }
    }
  }

  if (OVERUSED_AI_VERBS.has(firstWord)) {
    return {
      verb: firstWord,
      strength: 'neutral',
      isOverused: true,
      replacement: STRONG_VERB_EXAMPLES.slice(0, 3),
    }
  }

  // Strong if title-cased action verb (heuristic: starts with uppercase, no special chars)
  if (/^[A-Z][a-z]+$/.test(firstWord) || STRONG_VERB_EXAMPLES.map(v => v.toLowerCase()).includes(firstWord)) {
    return { verb: firstWord, strength: 'strong', isOverused: false }
  }

  return { verb: firstWord, strength: 'neutral', isOverused: false }
}
