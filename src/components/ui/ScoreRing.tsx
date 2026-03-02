// Circular score indicator

interface Props {
  score: number   // 0–100
  size?: number
  label?: string
}

function scoreColor(score: number) {
  if (score >= 75) return '#16a34a'  // green
  if (score >= 50) return '#d97706'  // amber
  return '#dc2626'                   // red
}

export default function ScoreRing({ score, size = 64, label }: Props) {
  const r = (size / 2) - 5
  const circumference = 2 * Math.PI * r
  const dash = (score / 100) * circumference
  const color = scoreColor(score)

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#e5e7eb" strokeWidth="5"
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
        <text
          x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
          fontSize={size * 0.22} fontWeight="700" fill={color}
        >
          {score}
        </text>
      </svg>
      {label && <span className="text-xs text-gray-500 font-medium">{label}</span>}
    </div>
  )
}
