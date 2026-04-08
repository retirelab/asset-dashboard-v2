interface Props { label: string; value: string; pct: number; color: string }
export default function BarRow({ label, value, pct, color }: Props) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] text-ink-secondary">{label}</span>
        <span className="num text-[11px] font-medium text-ink-primary">{value}</span>
      </div>
      <div className="h-[3px] rounded-full bg-surface-hover overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}
