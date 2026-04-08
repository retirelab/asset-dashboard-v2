import { useState } from 'react'
import { netWorthHistory } from '../data/assetData'

const legends = [
  { key: 'total'      as const, label: '총자산',   color: '#3182F6' },
  { key: 'net'        as const, label: '순자산',   color: '#0DC381' },
  { key: 'debt'       as const, label: '총부채',   color: '#F04452' },
  { key: 'financial'  as const, label: '금융자산', color: '#FF9F0A' },
  { key: 'realestate' as const, label: '부동산',   color: '#A259FF' },
]

const fmt = (n: number) =>
  n >= 1_0000_0000 ? `${(n / 1_0000_0000).toFixed(1)}억` : `${Math.round(n / 1_000_0000)}천만`

export default function NetWorthChart() {
  const [active, setActive] = useState<Set<string>>(
    new Set(['total', 'net', 'debt', 'financial', 'realestate'])
  )
  const toggle = (key: string) =>
    setActive(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n })

  const activeLegends = legends.filter(l => active.has(l.key))
  const W = 560
  const H = 140
  const padL = 44
  const padR = 8
  const padT = 12
  const padB = 28

  const allVals = netWorthHistory.flatMap(d => activeLegends.map(l => d[l.key]))
  const max = allVals.length ? Math.max(...allVals) : 400_000_000
  const toY = (v: number) => padT + (1 - v / max) * (H - padT - padB)
  const chartW = W - padL - padR
  const groupW = chartW / netWorthHistory.length
  const barPad = 4
  const barW = activeLegends.length
    ? Math.max(2, (groupW - barPad * 2) / activeLegends.length - 1.5)
    : 8

  return (
    <div>
      {/* 범례 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {legends.map(l => {
          const on = active.has(l.key)
          return (
            <button key={l.key} onClick={() => toggle(l.key)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all"
              style={{
                backgroundColor: on ? `${l.color}18` : '#F2F4F6',
                color: on ? l.color : '#8B95A1',
                border: `1px solid ${on ? l.color + '40' : 'transparent'}`,
              }}>
              <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: on ? l.color : '#C5CCD4' }} />
              {l.label}
            </button>
          )
        })}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 160 }}>
        {/* 보조선 */}
        {[0.25, 0.5, 0.75, 1].map(r => (
          <g key={r}>
            <line x1={padL} y1={toY(max * r)} x2={W - padR} y2={toY(max * r)}
              stroke="#E5E8EB" strokeWidth="0.5" />
            <text x={padL - 4} y={toY(max * r) + 3}
              textAnchor="end" fontSize="9" fontFamily="SUIT" fill="#8B95A1">
              {fmt(max * r)}
            </text>
          </g>
        ))}

        {/* 막대 그룹 */}
        {netWorthHistory.map((d, gi) => {
          const groupX = padL + gi * groupW
          const isCurrent = d.isCurrent
          return (
            <g key={d.date}>
              {activeLegends.map((l, bi) => {
                const bx = groupX + barPad + bi * (barW + 1.5)
                const by = toY(d[l.key])
                const bh = toY(0) - by
                return (
                  <rect key={l.key}
                    x={bx} y={by} width={barW} height={Math.max(bh, 0)}
                    rx="2"
                    fill={l.color}
                    fillOpacity={isCurrent ? 1 : 0.55}
                  />
                )
              })}
              {/* X축 날짜 */}
              <text
                x={groupX + groupW / 2} y={H - 4}
                textAnchor="middle" fontSize="9" fontFamily="SUIT"
                fill={isCurrent ? '#191F28' : '#8B95A1'}
                fontWeight={isCurrent ? '600' : '400'}>
                {d.date}
              </text>
              {/* 현재 강조선 */}
              {isCurrent && (
                <line x1={groupX + 2} y1={padT} x2={groupX + 2} y2={H - padB}
                  stroke="#E5E8EB" strokeWidth="1" strokeDasharray="3 2" />
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}