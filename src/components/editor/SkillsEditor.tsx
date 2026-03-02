import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/Input'

export default function SkillsEditor() {
  const skills       = useResumeStore(s => s.resume.skills)
  const updateSkills = useResumeStore(s => s.updateSkills)

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Skills</h3>
      <p className="text-xs text-gray-400">
        Comma-separated values per category. These appear verbatim on the resume.
      </p>

      <div className="space-y-2">
        <Input
          label="Languages"
          value={skills.languages ?? ''}
          onChange={e => updateSkills({ languages: e.target.value })}
          placeholder="Python, TypeScript, Go, Java, C++"
        />
        <Input
          label="Frameworks / Libraries"
          value={skills.frameworks ?? ''}
          onChange={e => updateSkills({ frameworks: e.target.value })}
          placeholder="React, Node.js, FastAPI, Spring Boot"
        />
        <Input
          label="Tools / DevOps"
          value={skills.tools ?? ''}
          onChange={e => updateSkills({ tools: e.target.value })}
          placeholder="Docker, Kubernetes, Git, Terraform, CI/CD"
        />
        <Input
          label="Cloud / Platforms"
          value={skills.platforms ?? ''}
          onChange={e => updateSkills({ platforms: e.target.value })}
          placeholder="AWS, GCP, Azure, Vercel"
        />
        <Input
          label="Other"
          value={skills.other ?? ''}
          onChange={e => updateSkills({ other: e.target.value })}
          placeholder="Agile, System Design, SQL"
        />
      </div>
    </div>
  )
}
