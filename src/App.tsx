import { useState, useRef, useEffect, useCallback } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import EditorSidebar from '@/components/editor/EditorSidebar'
import ResumePreview from '@/components/resume/ResumePreview'
import { Eye, EyeOff, FileText } from 'lucide-react'

const SIDEBAR_MIN = 280
const SIDEBAR_MAX = 640
const SIDEBAR_DEFAULT = 360

export default function App() {
  const isRecruiterMode = useResumeStore(s => s.isRecruiterMode)
  const toggleRecruiter = useResumeStore(s => s.toggleRecruiterMode)
  const name            = useResumeStore(s => s.resume.contact.name)

  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT)
  const isResizing = useRef(false)

  const handleDragStart = useCallback((e: React.MouseEvent): void => {
    isResizing.current = true
    e.preventDefault()
  }, [])

  useEffect(() => {
    function onMouseMove(e: MouseEvent): void {
      if (!isResizing.current) return
      setSidebarWidth(Math.min(Math.max(e.clientX, SIDEBAR_MIN), SIDEBAR_MAX))
    }

    function onMouseUp(): void {
      isResizing.current = false
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

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
          <>
            <aside
              style={{ width: sidebarWidth }}
              className="shrink-0 bg-white flex flex-col min-h-0 overflow-hidden"
            >
              <EditorSidebar />
            </aside>

            <div
              onMouseDown={handleDragStart}
              className="group w-1 shrink-0 bg-gray-200 hover:bg-accent-500 active:bg-accent-600 cursor-col-resize transition-colors relative"
            >
              <div className="absolute inset-y-0 -left-1 -right-1" />
            </div>
          </>
        )}

        <main className="flex-1 min-w-0 overflow-hidden">
          <ResumePreview />
        </main>
      </div>
    </div>
  )
}
