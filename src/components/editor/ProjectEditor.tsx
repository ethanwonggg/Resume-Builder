import { useResumeStore } from '@/store/resumeStore'
import Button from '@/components/ui/Button'
import ProjectCard from './ProjectCard'
import { useCollapsible } from '@/hooks/useCollapsible'
import { Plus } from 'lucide-react'

export default function ProjectEditor() {
  const projects   = useResumeStore(s => s.resume.projects)
  const addProject = useResumeStore(s => s.addProject)

  const { isCollapsed, toggle } = useCollapsible()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Projects</h3>
        <Button size="sm" variant="ghost" onClick={addProject}>
          <Plus size={12} /> Add Project
        </Button>
      </div>

      {projects.length === 0 && (
        <p className="text-sm text-gray-400 italic">No projects added yet.</p>
      )}

      {projects.map(proj => (
        <ProjectCard
          key={proj.id}
          projId={proj.id}
          isCollapsed={isCollapsed(proj.id)}
          toggle={toggle}
        />
      ))}
    </div>
  )
}
