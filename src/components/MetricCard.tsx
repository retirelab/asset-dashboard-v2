interface Props { label: string; value: string; sub?: string; accent?: 'default'|'green'|'amber'|'red'|'blue'; large?: boolean }
const accentMap = { default:'text-ink-primary', green:'text-accent-green', amber:'text-accent-amber', red:'text-accent-red', blue:'text-accent-blue' }
export default function MetricCard({ label, value, sub, accent='default', large=false }: Props) {
  return (
    <div className="bg-surface-card rounded-[10px] border border-surface-line px-4 py-3 flex flex-col gap-1">
      <div className="text-[10px] font-medium text-ink-label tracking-wide uppercase">{label}</div>
      <div className={`num font-medium leading-tight ${large ? 'text-[22px]' : 'text-[17px]'} ${accentMap[accent]}`}>{value}</div>
      {sub && <div className="text-[10px] text-ink-muted">{sub}</div>}
    </div>
  )
}
