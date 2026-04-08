import { netWorthHistory } from '../data/assetData'
export default function NetWorthChart() {
  const max = Math.max(...netWorthHistory.map(d => d.amount))
  const min = Math.min(...netWorthHistory.map(d => d.amount))
  const range = max - min
  return (
    <div className="flex items-end gap-2 h-[100px] w-full">
      {netWorthHistory.map((d) => {
        const heightPct = ((d.amount - min) / range) * 55 + 30
        return (
          <div key={d.date} className="flex flex-col items-center flex-1 gap-0">
            <div className={`num text-[10px] font-medium mb-1 ${d.isCurrent ? 'text-accent-blue' : 'text-ink-muted'}`}>
              {(d.amount / 1_0000_0000).toFixed(1)}억
            </div>
            <div className="w-full flex flex-col justify-end" style={{ height: '58px' }}>
              <div
                className={`w-full rounded-t-sm ${d.isCurrent ? 'bg-accent-blue' : 'bg-surface-hover'}`}
                style={{ height: `${heightPct}%` }}
              />
            </div>
            <div className="text-[9px] text-ink-muted mt-1 tracking-wide">{d.date}</div>
          </div>
        )
      })}
    </div>
  )
}
