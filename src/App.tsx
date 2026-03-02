import { useResumeStore } from '@/store/resumeStore'
import EditorSidebar from '@/components/editor/EditorSidebar'
import ResumePreview from '@/components/resume/ResumePreview'
import { Eye, EyeOff, FileText } from 'lucide-react'

export default function App() {
  const isRecruiterMode = useResumeStore(s => s.isRecruiterMode)
  const toggleRecruiter = useResumeStore(s => s.toggleRecruiterMode)
  const name            = useResumeStore(s => s.resume.contact.name)

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 font-sans">
      <header className="flex items-center justify-between px-5 py-2.5 bg-white border-b border-gray-200 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-accent-600 text-white">
            <FileText size={15} />
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-900">Resume Builder</span>
            {name && (
              <span className="ml-2 text-xs text-gray-400 font-normal">{name}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleRecruiter}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border transition-colors ${
              isRecruiterMode
                ? 'bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200'
                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {isRecruiterMode ? <EyeOff size={12} /> : <Eye size={12} />}
            {isRecruiterMode ? 'Exit Recruiter Mode' : 'View as Recruiter'}
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {!isRecruiterMode && (
          <aside className="w-[360px] shrink-0 border-r border-gray-200 bg-white flex flex-col min-h-0 overflow-hidden">
            <EditorSidebar />
          </aside>
        )}

        <main className="flex-1 min-w-0 overflow-hidden">
          <ResumePreview />
        </main>
      </div>
    </div>
  )
}
