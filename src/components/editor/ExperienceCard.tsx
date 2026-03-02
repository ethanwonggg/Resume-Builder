import { useCallback } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/Input'
import BulletEditor from './BulletEditor'
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react'

interface ExperienceCardProps {
  expId: string
  isCollapsed: boolean
  toggle: (id: string) => void
}

export default function ExperienceCard({ expId, isCollapsed, toggle }: ExperienceCardProps) {
  const exp            = useResumeStore(s => s.resume.experience.find(e => e.id === expId)!)
  const updateExp      = useResumeStore(s => s.updateExperience)
  const removeExp      = useResumeStore(s => s.removeExperience)
  const addBullet      = useResumeStore(s => s.addBulletToExperience)
  const updateBullet   = useResumeStore(s => s.updateBullet)
  const removeBullet   = useResumeStore(s => s.removeBullet)

  const handleToggle       = useCallback(() => toggle(expId), [toggle, expId])
  const handleRemove       = useCallback(() => removeExp(expId), [removeExp, expId])
  const handleAddBullet    = useCallback(() => addBullet(expId), [addBullet, expId])
  const handleUpdateBullet = useCallback((bulletId: string, text: string) => updateBullet(expId, bulletId, text), [updateBullet, expId])
  const handleRemoveBullet = useCallback((bulletId: string) => removeBullet(expId, bulletId), [removeBullet, expId])

  if (!exp) return null

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div
        className="flex items-center justify-between px-3 py-2 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={handleToggle}
      >
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {exp.company || <span className="text-gray-400 font-normal">Company Name</span>}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {exp.role || 'Role Title'}
            {exp.startDate ? ` · ${exp.startDate}` : ''}
          </p>
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
            <Input label="Company"    value={exp.company}    onChange={e => updateExp(expId, { company: e.target.value })}    placeholder="Google" />
            <Input label="Role"       value={exp.role}       onChange={e => updateExp(expId, { role: e.target.value })}       placeholder="Software Engineer" />
            <Input label="Location"   value={exp.location}   onChange={e => updateExp(expId, { location: e.target.value })}   placeholder="Mountain View, CA" />
            <div className="col-span-1" />
            <Input label="Start Date" value={exp.startDate}  onChange={e => updateExp(expId, { startDate: e.target.value })}  placeholder="Jan 2023" />
            <Input label="End Date"   value={exp.endDate}    onChange={e => updateExp(expId, { endDate: e.target.value })}    placeholder="Present" disabled={exp.current} />
          </div>

          <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={e => updateExp(expId, { current: e.target.checked })}
              className="rounded border-gray-300 accent-indigo-600"
            />
            Currently working here
          </label>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Bullets</p>
            <BulletEditor
              bullets={exp.bullets}
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
