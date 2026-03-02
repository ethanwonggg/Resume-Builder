import { useResumeStore } from '@/store/resumeStore'
import Button from '@/components/ui/Button'
import ExperienceCard from './ExperienceCard'
import { useCollapsible } from '@/hooks/useCollapsible'
import { Plus } from 'lucide-react'

export default function ExperienceEditor() {
  const experience    = useResumeStore(s => s.resume.experience)
  const addExperience = useResumeStore(s => s.addExperience)

  const { isCollapsed, toggle } = useCollapsible()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Experience</h3>
        <Button size="sm" variant="ghost" onClick={addExperience}>
          <Plus size={12} /> Add Role
        </Button>
      </div>

      {experience.length === 0 && (
        <p className="text-sm text-gray-400 italic">No experience added yet.</p>
      )}

      {experience.map(exp => (
        <ExperienceCard
          key={exp.id}
          expId={exp.id}
          isCollapsed={isCollapsed(exp.id)}
          toggle={toggle}
        />
      ))}
    </div>
  )
}
