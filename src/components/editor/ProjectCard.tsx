import { useCallback } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/Input'
import BulletEditor from './BulletEditor'
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react'

interface ProjectCardProps {
  projId: string
  isCollapsed: boolean
  toggle: (id: string) => void
}

export default function ProjectCard({ projId, isCollapsed, toggle }: ProjectCardProps) {
  const proj           = useResumeStore(s => s.resume.projects.find(p => p.id === projId)!)
  const updateProj     = useResumeStore(s => s.updateProject)
  const removeProj     = useResumeStore(s => s.removeProject)
  const addBullet      = useResumeStore(s => s.addBulletToProject)
  const updateBullet   = useResumeStore(s => s.updateProjectBullet)
  const removeBullet   = useResumeStore(s => s.removeProjectBullet)

  const handleToggle       = useCallback(() => toggle(projId), [toggle, projId])
  const handleRemove       = useCallback(() => removeProj(projId), [removeProj, projId])
  const handleAddBullet    = useCallback(() => addBullet(projId), [addBullet, projId])
  const handleUpdateBullet = useCallback((bulletId: string, text: string) => updateBullet(projId, bulletId, text), [updateBullet, projId])
  const handleRemoveBullet = useCallback((bulletId: string) => removeBullet(projId, bulletId), [removeBullet, projId])

  if (!proj) return null

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div
        className="flex items-center justify-between px-3 py-2 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={handleToggle}
      >
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {proj.name || <span className="text-gray-400 font-normal">Project Name</span>}
          </p>
          <p className="text-xs text-gray-500 truncate">{proj.techStack || 'Tech Stack'}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={e => { e.stopPropagation(); handleRemove() }}
            className="text-gray-300 hover:text-red-400 transition-colors"
          >
            <Trash2 size={13} />
          </button>
          {isCollapsed
            ? <ChevronDown size={14} className="text-gray-400" />
            : <ChevronUp size={14} className="text-gray-400" />}
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-3 space-y-2 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-2">
            <Input label="Project Name" value={proj.name}      onChange={e => updateProj(projId, { name: e.target.value })}      placeholder="Resume Builder" />
            <Input label="Tech Stack"   value={proj.techStack} onChange={e => updateProj(projId, { techStack: e.target.value })} placeholder="React, TypeScript, Node.js" />
            <div className="col-span-2">
              <Input label="Link (optional)" value={proj.link ?? ''} onChange={e => updateProj(projId, { link: e.target.value })} placeholder="github.com/user/project" />
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Bullets</p>
            <BulletEditor
              bullets={proj.bullets}
              onAdd={handleAddBullet}
              onUpdate={handleUpdateBullet}
              onRemove={handleRemoveBullet}
            />
          </div>
        </div>
      )}
    </div>
  )
}
