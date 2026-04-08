interface Props { index: string; title: string; sub?: string }
export default function SectionHeader({ index, title, sub }: Props) {
  return (
    <div className="flex items-baseline gap-2 mb-4">
      <span className="num text-[10px] text-ink-muted font-medium tracking-widest">{index}</span>
      <h2 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-label">{title}</h2>
      {sub && <span className="text-[10px] text-ink-muted">{sub}</span>}
      <div className="flex-1 border-b border-surface-line" />
    </div>
  )
}
