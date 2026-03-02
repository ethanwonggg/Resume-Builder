import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Trash2, Plus } from 'lucide-react'

export default function EducationEditor() {
  const education      = useResumeStore(s => s.resume.education)
  const addEducation   = useResumeStore(s => s.addEducation)
  const updateEdu      = useResumeStore(s => s.updateEducation)
  const removeEdu      = useResumeStore(s => s.removeEducation)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Education</h3>
        <Button size="sm" variant="ghost" onClick={addEducation}>
          <Plus size={12} /> Add
        </Button>
      </div>

      {education.length === 0 && (
        <p className="text-sm text-gray-400 italic">No education added yet.</p>
      )}

      {education.map(edu => (
        <div key={edu.id} className="border border-gray-200 rounded-md p-3 space-y-2">
          <div className="flex justify-between items-start">
            <p className="text-sm font-semibold text-gray-700">{edu.institution || 'Institution'}</p>
            <button onClick={() => removeEdu(edu.id)} className="text-gray-300 hover:text-red-400">
              <Trash2 size={13} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <Input
                label="Institution"
                value={edu.institution}
                onChange={e => updateEdu(edu.id, { institution: e.target.value })}
                placeholder="University of Melbourne"
              />
            </div>
            <Input
              label="Degree"
              value={edu.degree}
              onChange={e => updateEdu(edu.id, { degree: e.target.value })}
              placeholder="Bachelor of Science"
            />
            <Input
              label="Field of Study"
              value={edu.field}
              onChange={e => updateEdu(edu.id, { field: e.target.value })}
              placeholder="Computer Science"
            />
            <Input
              label="Location"
              value={edu.location}
              onChange={e => updateEdu(edu.id, { location: e.target.value })}
              placeholder="Melbourne, AU"
            />
            <Input
              label="GPA (optional)"
              value={edu.gpa ?? ''}
              onChange={e => updateEdu(edu.id, { gpa: e.target.value })}
              placeholder="3.9 / 4.0"
            />
            <Input
              label="Start Date"
              value={edu.startDate}
              onChange={e => updateEdu(edu.id, { startDate: e.target.value })}
              placeholder="Feb 2022"
            />
            <Input
              label="End Date"
              value={edu.endDate}
              onChange={e => updateEdu(edu.id, { endDate: e.target.value })}
              placeholder="Nov 2025"
            />
            <div className="col-span-2">
              <Input
                label="Honours / Awards (optional)"
                value={edu.honors ?? ''}
                onChange={e => updateEdu(edu.id, { honors: e.target.value })}
                placeholder="First Class Honours"
              />
            </div>
            <div className="col-span-2">
              <Input
                label="Relevant Courses (optional)"
                value={edu.relevantCourses ?? ''}
                onChange={e => updateEdu(edu.id, { relevantCourses: e.target.value })}
                placeholder="Algorithms, Machine Learning, Distributed Systems"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
