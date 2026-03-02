import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/Input'

export default function ContactEditor() {
  const contact = useResumeStore(s => s.resume.contact)
  const setContact = useResumeStore(s => s.setContact)

  function update(field: keyof typeof contact, value: string): void {
    setContact({ ...contact, [field]: value })
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Contact Information</h3>

      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2">
          <Input
            label="Full Name"
            value={contact.name}
            onChange={e => update('name', e.target.value)}
            placeholder="Jane Smith"
          />
        </div>
        <Input
          label="Email"
          type="email"
          value={contact.email}
          onChange={e => update('email', e.target.value)}
          placeholder="jane@email.com"
        />
        <Input
          label="Phone"
          type="tel"
          value={contact.phone}
          onChange={e => update('phone', e.target.value)}
          placeholder="+1 (555) 000-0000"
        />
        <div className="col-span-2">
          <Input
            label="Location"
            value={contact.location}
            onChange={e => update('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
        <Input
          label="LinkedIn"
          value={contact.linkedin ?? ''}
          onChange={e => update('linkedin', e.target.value)}
          placeholder="linkedin.com/in/janesmith"
        />
        <Input
          label="GitHub"
          value={contact.github ?? ''}
          onChange={e => update('github', e.target.value)}
          placeholder="github.com/janesmith"
        />
        <div className="col-span-2">
          <Input
            label="Portfolio / Website"
            value={contact.portfolio ?? ''}
            onChange={e => update('portfolio', e.target.value)}
            placeholder="janesmith.dev"
          />
        </div>
      </div>
    </div>
  )
}
