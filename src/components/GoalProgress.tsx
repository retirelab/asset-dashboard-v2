interface Props { label: string; current: string; target: string; pct: number; accent?: 'blue'|'amber' }
export default function GoalProgress({ label, current, target, pct, accent='blue' }: Props) {
  const barColor = accent === 'blue' ? 'bg-accent-blue' : 'bg-accent-amber'
  const textColor = accent === 'blue' ? 'text-accent-blue' : 'text-accent-amber'
  return (
    <div>
      <div className="text-[10px] text-ink-label uppercase tracking-wide mb-1">{label}</div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className={`num text-[15px] font-semibold ${textColor}`}>{current}</span>
        <span className="text-[11px] text-ink-muted">/ {target}</span>
      </div>
      <div className="h-[6px] rounded-full bg-surface-hover overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between mt-1">
        <span className={`num text-[10px] font-medium ${textColor}`}>{pct.toFixed(0)}%</span>
        <span className="text-[10px] text-ink-muted">2030년</span>
      </div>
    </div>
  )
}
