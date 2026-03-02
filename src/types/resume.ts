export type TemplateId = 'big-tech-classic' | 'startup-clean' | 'academic-structured'

export type FontFamily =
  | 'Inter'
  | 'Calibri'
  | 'Arial'
  | 'Helvetica'
  | 'IBM Plex Sans'
  | 'Georgia'
  | 'Times New Roman'

export interface ContactInfo {
  name: string
  email: string
  phone: string
  location: string
  linkedin?: string
  github?: string
  portfolio?: string
}

export interface BulletPoint {
  id: string
  text: string
}

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  bullets: BulletPoint[]
}

export interface ProjectEntry {
  id: string
  name: string
  techStack: string
  link?: string
  startDate?: string
  endDate?: string
  bullets: BulletPoint[]
}

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
  honors?: string
  relevantCourses?: string
}

export interface SkillsSection {
  languages?: string
  frameworks?: string
  tools?: string
  platforms?: string
  other?: string
}

export interface CertificationEntry {
  id: string
  name: string
  issuer: string
  date: string
}

export interface PublicationEntry {
  id: string
  title: string
  venue: string
  date: string
  link?: string
}

export interface LeadershipEntry {
  id: string
  role: string
  organization: string
  startDate: string
  endDate: string
  bullets: BulletPoint[]
}

export interface ResumeData {
  contact: ContactInfo
  experience: ExperienceEntry[]
  projects: ProjectEntry[]
  education: EducationEntry[]
  skills: SkillsSection
  certifications: CertificationEntry[]
  publications: PublicationEntry[]
  leadership: LeadershipEntry[]
  // section visibility & order
  sectionOrder: SectionKey[]
  hiddenSections: SectionKey[]
}

export type SectionKey =
  | 'experience'
  | 'projects'
  | 'education'
  | 'skills'
  | 'certifications'
  | 'publications'
  | 'leadership'

export interface DesignSettings {
  templateId: TemplateId
  fontFamily: FontFamily
  fontSize: number        // 10.5 – 11.5 pt  (body)
  lineSpacing: number     // 1.05 – 1.15
  marginInch: number      // 0.5 – 0.75
}

export type VerbStrength = 'strong' | 'weak' | 'neutral'
export type BulletScore = 'excellent' | 'good' | 'needs-work' | 'poor'

export interface BulletAnalysis {
  bulletId: string
  text: string
  verbStrength: VerbStrength
  hasMetric: boolean
  hasContext: boolean
  hasImpact: boolean
  score: BulletScore
  suggestions: string[]
  weakVerbDetected?: string
  suggestedVerb?: string
}

export interface QuantificationReport {
  totalBullets: number
  quantifiedBullets: number
  density: number  // 0–100
  unquantifiedIds: string[]
}

export interface ATSReport {
  isPassed: boolean
  issues: ATSIssue[]
  isSectionNamesValid: boolean
  isSpecialCharsFree: boolean
  isEmojiFree: boolean
  plainTextScore: number  // 0–100
}

export interface ATSIssue {
  severity: 'error' | 'warning'
  message: string
  field?: string
}

export interface AIDetectionReport {
  score: number              // 0–100 (higher = more AI-like)
  repetitiveness: number     // 0–100
  lexicalDiversity: number   // 0–100 (higher = more diverse = better)
  bannedPhraseCount: number
  bannedPhrases: string[]
  patternSimilarity: number  // 0–100
  verdict: 'natural' | 'borderline' | 'ai-like'
}

export interface PageLengthReport {
  estimatedPages: number
  recommendation: '1-page' | '1-2-pages'
  flags: string[]
}

export interface ScanHeatmapEntry {
  sectionKey: string
  label: string
  priority: 'high' | 'medium' | 'low'
  elements: ScanElement[]
}

export interface ScanElement {
  label: string
  value: string
  visible: boolean
}

export interface FullAnalysis {
  bullets: BulletAnalysis[]
  quantification: QuantificationReport
  ats: ATSReport
  aiDetection: AIDetectionReport
  pageLength: PageLengthReport
  overallScore: number  // 0–100
}
