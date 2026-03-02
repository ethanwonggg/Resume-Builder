import type { ResumeData } from '@/types/resume'
import { runATSSimulation } from './atsSimulator'

export interface ExportResult {
  isSuccess: boolean
  isAtsPreflightPassed: boolean
  warnings: string[]
  errors: string[]
}

export async function exportToPDF(
  resumeElement: HTMLElement,
  resume: ResumeData,
  filename = 'resume.pdf',
): Promise<ExportResult> {
  const errors: string[] = []
  const warnings: string[] = []

  const atsReport = runATSSimulation(resume)
  atsReport.issues.forEach(issue => {
    if (issue.severity === 'error') errors.push(issue.message)
    else warnings.push(issue.message)
  })

  const isAtsPreflightPassed = atsReport.isPassed

  // Dynamic imports so bundle stays lean
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ])

  const canvas = await html2canvas(resumeElement, {
    scale: 3,           // 3× for crisp 300 dpi output
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    // Ensure page-break lines are hidden during capture
    onclone: (doc) => {
      doc.querySelectorAll('[data-page-break]').forEach(el => {
        (el as HTMLElement).style.display = 'none'
      })
    },
  })

  const imgData    = canvas.toDataURL('image/png')
  const pdfWidth   = 215.9  // 8.5" in mm
  const pdfHeight  = 279.4  // 11" in mm

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
  })

  const imgWidth  = pdfWidth
  const imgHeight = (canvas.height / canvas.width) * imgWidth

  let yPosition = 0
  while (yPosition < imgHeight) {
    if (yPosition > 0) pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, -yPosition, imgWidth, imgHeight)
    yPosition += pdfHeight
  }

  pdf.save(filename)

  return { isSuccess: true, isAtsPreflightPassed, warnings, errors }
}
