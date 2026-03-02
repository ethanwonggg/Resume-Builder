import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  ResumeData, DesignSettings, FullAnalysis,
  ExperienceEntry, ProjectEntry, EducationEntry, SectionKey,
  CertificationEntry, PublicationEntry, LeadershipEntry, SkillsSection,
} from '@/types/resume'
import { analyseResume } from '@/lib/formatting/analyser'

function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}

const DEFAULT_RESUME: ResumeData = {
  contact: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
  },
  experience: [],
  projects: [],
  education: [],
  skills: { languages: '', frameworks: '', tools: '', platforms: '', other: '' },
  certifications: [],
  publications: [],
  leadership: [],
  sectionOrder: ['experience', 'projects', 'education', 'skills'],
  hiddenSections: ['certifications', 'publications', 'leadership'],
}

const DEFAULT_SETTINGS: DesignSettings = {
  templateId: 'big-tech-classic',
  fontFamily: 'Inter',
  fontSize: 11,
  lineSpacing: 1.1,
  marginInch: 0.65,
}

interface ResumeStore {
  resume: ResumeData
  settings: DesignSettings
  analysis: FullAnalysis | null
  activeSection: SectionKey | 'contact' | null
  isRecruiterMode: boolean

  // ── Resume mutations ──────────────────────────────────────────────────────

  setContact: (contact: ResumeData['contact']) => void

  // Experience
  addExperience: () => void
  updateExperience: (id: string, patch: Partial<ExperienceEntry>) => void
  removeExperience: (id: string) => void
  addBulletToExperience: (expId: string) => void
  updateBullet: (expId: string, bulletId: string, text: string) => void
  removeBullet: (expId: string, bulletId: string) => void

  // Projects
  addProject: () => void
  updateProject: (id: string, patch: Partial<ProjectEntry>) => void
  removeProject: (id: string) => void
  addBulletToProject: (projId: string) => void
  updateProjectBullet: (projId: string, bulletId: string, text: string) => void
  removeProjectBullet: (projId: string, bulletId: string) => void

  // Education
  addEducation: () => void
  updateEducation: (id: string, patch: Partial<EducationEntry>) => void
  removeEducation: (id: string) => void

  // Skills
  updateSkills: (patch: Partial<SkillsSection>) => void

  // Certifications
  addCertification: () => void
  updateCertification: (id: string, patch: Partial<CertificationEntry>) => void
  removeCertification: (id: string) => void

  // Publications
  addPublication: () => void
  updatePublication: (id: string, patch: Partial<PublicationEntry>) => void
  removePublication: (id: string) => void

  // Leadership
  addLeadership: () => void
  updateLeadership: (id: string, patch: Partial<LeadershipEntry>) => void
  removeLeadership: (id: string) => void
  addBulletToLeadership: (leadId: string) => void
  updateLeadershipBullet: (leadId: string, bulletId: string, text: string) => void
  removeLeadershipBullet: (leadId: string, bulletId: string) => void

  // Section management
  toggleSectionVisibility: (key: SectionKey) => void
  reorderSections: (newOrder: SectionKey[]) => void

  // ── Settings mutations ────────────────────────────────────────────────────
  updateSettings: (patch: Partial<DesignSettings>) => void

  // ── UI state ──────────────────────────────────────────────────────────────
  setActiveSection: (section: SectionKey | 'contact' | null) => void
  toggleRecruiterMode: () => void

  // ── Analysis ──────────────────────────────────────────────────────────────
  runAnalysis: () => void
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resume: DEFAULT_RESUME,
      settings: DEFAULT_SETTINGS,
      analysis: null,
      activeSection: 'contact',
      isRecruiterMode: false,

      setContact: (contact) =>
        set(s => ({ resume: { ...s.resume, contact } })),

      // ── Experience ──────────────────────────────────────────────────────────

      addExperience: () =>
        set(s => ({
          resume: {
            ...s.resume,
            experience: [...s.resume.experience, {
              id: uid(), company: '', role: '', location: '',
              startDate: '', endDate: '', current: false, bullets: [],
            }],
          },
        })),

      updateExperience: (id, patch) =>
        set(s => ({
          resume: {
            ...s.resume,
            experience: s.resume.experience.map(e => e.id === id ? { ...e, ...patch } : e),
          },
        })),

      removeExperience: (id) =>
        set(s => ({
          resume: { ...s.resume, experience: s.resume.experience.filter(e => e.id !== id) },
        })),

      addBulletToExperience: (expId) =>
        set(s => ({
          resume: {
            ...s.resume,
            experience: s.resume.experience.map(e =>
              e.id === expId ? { ...e, bullets: [...e.bullets, { id: uid(), text: '' }] } : e,
            ),
          },
        })),

      updateBullet: (expId, bulletId, text) =>
        set(s => ({
          resume: {
            ...s.resume,
            experience: s.resume.experience.map(e =>
              e.id === expId
                ? { ...e, bullets: e.bullets.map(b => b.id === bulletId ? { ...b, text } : b) }
                : e,
            ),
          },
        })),

      removeBullet: (expId, bulletId) =>
        set(s => ({
          resume: {
            ...s.resume,
            experience: s.resume.experience.map(e =>
              e.id === expId ? { ...e, bullets: e.bullets.filter(b => b.id !== bulletId) } : e,
            ),
          },
        })),

      // ── Projects ────────────────────────────────────────────────────────────

      addProject: () =>
        set(s => ({
          resume: {
            ...s.resume,
            projects: [...s.resume.projects, {
              id: uid(), name: '', techStack: '', link: '', bullets: [],
            }],
          },
        })),

      updateProject: (id, patch) =>
        set(s => ({
          resume: {
            ...s.resume,
            projects: s.resume.projects.map(p => p.id === id ? { ...p, ...patch } : p),
          },
        })),

      removeProject: (id) =>
        set(s => ({
          resume: { ...s.resume, projects: s.resume.projects.filter(p => p.id !== id) },
        })),

      addBulletToProject: (projId) =>
        set(s => ({
          resume: {
            ...s.resume,
            projects: s.resume.projects.map(p =>
              p.id === projId ? { ...p, bullets: [...p.bullets, { id: uid(), text: '' }] } : p,
            ),
          },
        })),

      updateProjectBullet: (projId, bulletId, text) =>
        set(s => ({
          resume: {
            ...s.resume,
            projects: s.resume.projects.map(p =>
              p.id === projId
                ? { ...p, bullets: p.bullets.map(b => b.id === bulletId ? { ...b, text } : b) }
                : p,
            ),
          },
        })),

      removeProjectBullet: (projId, bulletId) =>
        set(s => ({
          resume: {
            ...s.resume,
            projects: s.resume.projects.map(p =>
              p.id === projId ? { ...p, bullets: p.bullets.filter(b => b.id !== bulletId) } : p,
            ),
          },
        })),

      // ── Education ───────────────────────────────────────────────────────────

      addEducation: () =>
        set(s => ({
          resume: {
            ...s.resume,
            education: [...s.resume.education, {
              id: uid(), institution: '', degree: '', field: '',
              location: '', startDate: '', endDate: '', gpa: '', honors: '', relevantCourses: '',
            }],
          },
        })),

      updateEducation: (id, patch) =>
        set(s => ({
          resume: {
            ...s.resume,
            education: s.resume.education.map(e => e.id === id ? { ...e, ...patch } : e),
          },
        })),

      removeEducation: (id) =>
        set(s => ({
          resume: { ...s.resume, education: s.resume.education.filter(e => e.id !== id) },
        })),

      // ── Skills ──────────────────────────────────────────────────────────────

      updateSkills: (patch) =>
        set(s => ({
          resume: { ...s.resume, skills: { ...s.resume.skills, ...patch } },
        })),

      // ── Certifications ──────────────────────────────────────────────────────

      addCertification: () =>
        set(s => ({
          resume: {
            ...s.resume,
            certifications: [...s.resume.certifications, { id: uid(), name: '', issuer: '', date: '' }],
          },
        })),

      updateCertification: (id, patch) =>
        set(s => ({
          resume: {
            ...s.resume,
            certifications: s.resume.certifications.map(c => c.id === id ? { ...c, ...patch } : c),
          },
        })),

      removeCertification: (id) =>
        set(s => ({
          resume: { ...s.resume, certifications: s.resume.certifications.filter(c => c.id !== id) },
        })),

      // ── Publications ────────────────────────────────────────────────────────

      addPublication: () =>
        set(s => ({
          resume: {
            ...s.resume,
            publications: [...s.resume.publications, { id: uid(), title: '', venue: '', date: '' }],
          },
        })),

      updatePublication: (id, patch) =>
        set(s => ({
          resume: {
            ...s.resume,
            publications: s.resume.publications.map(p => p.id === id ? { ...p, ...patch } : p),
          },
        })),

      removePublication: (id) =>
        set(s => ({
          resume: { ...s.resume, publications: s.resume.publications.filter(p => p.id !== id) },
        })),

      // ── Leadership ──────────────────────────────────────────────────────────

      addLeadership: () =>
        set(s => ({
          resume: {
            ...s.resume,
            leadership: [...s.resume.leadership, {
              id: uid(), role: '', organization: '', startDate: '', endDate: '', bullets: [],
            }],
          },
        })),

      updateLeadership: (id, patch) =>
        set(s => ({
          resume: {
            ...s.resume,
            leadership: s.resume.leadership.map(l => l.id === id ? { ...l, ...patch } : l),
          },
        })),

      removeLeadership: (id) =>
        set(s => ({
          resume: { ...s.resume, leadership: s.resume.leadership.filter(l => l.id !== id) },
        })),

      addBulletToLeadership: (leadId) =>
        set(s => ({
          resume: {
            ...s.resume,
            leadership: s.resume.leadership.map(l =>
              l.id === leadId ? { ...l, bullets: [...l.bullets, { id: uid(), text: '' }] } : l,
            ),
          },
        })),

      updateLeadershipBullet: (leadId, bulletId, text) =>
        set(s => ({
          resume: {
            ...s.resume,
            leadership: s.resume.leadership.map(l =>
              l.id === leadId
                ? { ...l, bullets: l.bullets.map(b => b.id === bulletId ? { ...b, text } : b) }
                : l,
            ),
          },
        })),

      removeLeadershipBullet: (leadId, bulletId) =>
        set(s => ({
          resume: {
            ...s.resume,
            leadership: s.resume.leadership.map(l =>
              l.id === leadId ? { ...l, bullets: l.bullets.filter(b => b.id !== bulletId) } : l,
            ),
          },
        })),

      // ── Sections ────────────────────────────────────────────────────────────

      toggleSectionVisibility: (key) =>
        set(s => {
          const hidden = s.resume.hiddenSections
          const isHidden = hidden.includes(key)
          return {
            resume: {
              ...s.resume,
              hiddenSections: isHidden ? hidden.filter(k => k !== key) : [...hidden, key],
            },
          }
        }),

      reorderSections: (newOrder) =>
        set(s => ({ resume: { ...s.resume, sectionOrder: newOrder } })),

      // ── Settings ────────────────────────────────────────────────────────────

      updateSettings: (patch) =>
        set(s => ({ settings: { ...s.settings, ...patch } })),

      // ── UI ──────────────────────────────────────────────────────────────────

      setActiveSection: (section) => set({ activeSection: section }),

      toggleRecruiterMode: () => set(s => ({ isRecruiterMode: !s.isRecruiterMode })),

      // ── Analysis ────────────────────────────────────────────────────────────

      runAnalysis: () => {
        const analysis = analyseResume(get().resume)
        set({ analysis })
      },
    }),
    { name: 'resume-builder-v1' },
  ),
)
