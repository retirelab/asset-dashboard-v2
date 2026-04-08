interface Props { label: string; value: string; valueColor?: 'default'|'green'|'amber'|'red'; sub?: string }
const colorMap = { default:'text-ink-primary', green:'text-accent-green', amber:'text-accent-amber', red:'text-accent-red' }
export default function DataRow({ label, value, valueColor='default', sub }: Props) {
  return (
    <div className="flex justify-between items-center py-[6px] border-b border-surface-line last:border-b-0">
      <span className="text-[11px] text-ink-secondary">{label}</span>
      <div className="text-right">
        <span className={`num text-[11px] font-medium ${colorMap[valueColor]}`}>{value}</span>
        {sub && <span className="block text-[10px] text-ink-muted">{sub}</span>}
      </div>
    </div>
  )
}
