import { useState } from 'react'
import ContactEditor from './ContactEditor'
import ExperienceEditor from './ExperienceEditor'
import ProjectEditor from './ProjectEditor'
import EducationEditor from './EducationEditor'
import SkillsEditor from './SkillsEditor'
import DesignEditor from './DesignEditor'
import AIImportEditor from './AIImportEditor'
import AnalysisPanel from '@/components/panels/AnalysisPanel'
import RecruiterPanel from '@/components/panels/RecruiterPanel'
import { clsx } from 'clsx'
import {
  User, Briefcase, Code2, GraduationCap, Wrench,
  Palette, BarChart3, Eye, Sparkles,
} from 'lucide-react'

type Tab =
  | 'contact'
  | 'experience'
  | 'projects'
  | 'education'
  | 'skills'
  | 'design'
  | 'analysis'
  | 'recruiter'
  | 'import'

interface TabConfig {
  id: Tab
  label: string
  icon: React.ReactNode
}

const TABS: TabConfig[] = [
  { id: 'contact',    label: 'Contact',    icon: <User size={14} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={14} /> },
  { id: 'projects',   label: 'Projects',   icon: <Code2 size={14} /> },
  { id: 'education',  label: 'Education',  icon: <GraduationCap size={14} /> },
  { id: 'skills',     label: 'Skills',     icon: <Wrench size={14} /> },
  { id: 'design',     label: 'Design',     icon: <Palette size={14} /> },
  { id: 'analysis',   label: 'Analysis',   icon: <BarChart3 size={14} /> },
  { id: 'import',     label: 'AI Import',  icon: <Sparkles size={14} /> },
  { id: 'recruiter',  label: 'Recruiter',  icon: <Eye size={14} /> },
]

export default function EditorSidebar() {
  const [activeTab, setActiveTab] = useState<Tab>('contact')

  return (
    <div className="flex h-full min-h-0">
      {/* Icon tab rail */}
      <nav className="flex flex-col items-center gap-0.5 border-r border-gray-200 bg-gray-50 w-11 py-3 shrink-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            title={tab.label}
            className={clsx(
              'flex flex-col items-center justify-center w-9 h-9 rounded-md transition-colors text-xs gap-0.5',
              activeTab === tab.id
                ? 'bg-accent-600 text-white shadow-sm'
                : 'text-gray-400 hover:bg-gray-200 hover:text-gray-700',
            )}
          >
            {tab.icon}
          </button>
        ))}
      </nav>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-w-0">
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-gray-800">
            {TABS.find(t => t.id === activeTab)?.label}
          </h2>
          <div className="h-px bg-gray-200 mt-2" />
        </div>

        {activeTab === 'contact'    && <ContactEditor />}
        {activeTab === 'experience' && <ExperienceEditor />}
        {activeTab === 'projects'   && <ProjectEditor />}
        {activeTab === 'education'  && <EducationEditor />}
        {activeTab === 'skills'     && <SkillsEditor />}
        {activeTab === 'design'     && <DesignEditor />}
        {activeTab === 'analysis'   && <AnalysisPanel />}
        {activeTab === 'import'     && <AIImportEditor />}
        {activeTab === 'recruiter'  && <RecruiterPanel />}
      </div>
    </div>
  )
}
