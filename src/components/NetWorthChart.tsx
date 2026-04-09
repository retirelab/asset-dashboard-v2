import { useState } from 'react'
import { netWorthHistory } from '../data/assetData'

const legends = [
  { key: 'net'        as const, label: '순자산',   color: '#0DC381', dash: false },
  { key: 'total'      as const, label: '총자산',   color: '#3182F6', dash: false },
  { key: 'debt'       as const, label: '총부채',   color: '#F04452', dash: true  },
  { key: 'financial'  as const, label: '금융자산', color: '#FF9F0A', dash: false },
  { key: 'realestate' as const, label: '부동산',   color: '#A259FF', dash: false },
]

const fmt = (n: number) =>
  n >= 1_0000_0000
    ? `${(n / 1_0000_0000).toFixed(1)}억`
    : `${Math.round(n / 1_000_0000)}천만`

export default function NetWorthChart() {
  const [active, setActive] = useState<Set<string>>(
    new Set(['total', 'net', 'debt', 'financial', 'realestate'])
  )

  const toggle = (key: string) =>
    setActive(prev => {
      const n = new Set(prev)
      n.has(key) ? n.delete(key) : n.add(key)
      return n
    })

  const W = 560; const H = 140
  const padL = 44; const padR = 8; const padT = 12; const padB = 28

  const activeLegends = legends.filter(l => active.has(l.key))
  const allVals = netWorthHistory.flatMap(d => activeLegends.map(l => d[l.key]))
  const max = allVals.length ? Math.max(...allVals) : 400_000_000
  const toY = (v: number) => padT + (1 - v / max) * (H - padT - padB)
  const toX = (i: number) => padL + i * ((W - padL - padR) / (netWorthHistory.length - 1))

  const line = (key: typeof legends[number]['key']) =>
    netWorthHistory
      .map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(d[key]).toFixed(1)}`)
      .join(' ')

  return (
    <div>
      {/* 범례 버튼 */}
      <div className="flex flex-wrap gap-2 mb-3">
        {legends.map(l => {
          const on = active.has(l.key)
          return (
            <button
              key={l.key}
              onClick={() => toggle(l.key)}
              className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium transition-all"
              style={{
                backgroundColor: on ? `${l.color}18` : '#F2F4F6',
                color: on ? l.color : '#8B95A1',
                border: `1px solid ${on ? l.color + '40' : 'transparent'}`,
              }}
            >
              <div className="w-2 h-[2px] rounded-full"
                style={{ backgroundColor: on ? l.color : '#C5CCD4' }} />
              {l.label}
            </button>
          )
        })}
      </div>

      {/* SVG 차트 */}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 150 }}>
        <defs>
          {legends.map(l => (
            <linearGradient key={l.key} id={`g-${l.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={l.color} stopOpacity="0.12" />
              <stop offset="100%" stopColor={l.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {/* 보조선 */}
        {[0.25, 0.5, 0.75, 1].map(r => (
          <line key={r}
            x1={padL} y1={toY(max * r)}
            x2={W - padR} y2={toY(max * r)}
            stroke="#E5E8EB" strokeWidth="0.5"
          />
        ))}

        {/* Y축 레이블 */}
        {[0.5, 1].map(r => (
          <text key={r}
            x={padL - 4} y={toY(max * r) + 3}
            textAnchor="end" fontSize="9"
            fontFamily="SUIT" fill="#8B95A1"
          >
            {fmt(max * r)}
          </text>
        ))}

        {/* 면적 + 선 */}
        {activeLegends.map(l => (
          <g key={l.key}>
            <path
              d={`${line(l.key)} L${toX(netWorthHistory.length - 1).toFixed(1)},${toY(0).toFixed(1)} L${padL},${toY(0).toFixed(1)} Z`}
              fill={`url(#g-${l.key})`}
            />
            <path
              d={line(l.key)} fill="none"
              stroke={l.color} strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray={l.dash ? '4 3' : undefined}
            />
          </g>
        ))}

        {/* 마지막 포인트 강조 */}
        {activeLegends.map(l => {
          const last = netWorthHistory[netWorthHistory.length - 1]
          const x = toX(netWorthHistory.length - 1)
          const y = toY(last[l.key])
          return (
            <g key={l.key}>
              <circle cx={x} cy={y} r={3.5} fill={l.color} />
              <circle cx={x} cy={y} r={7} fill={l.color} fillOpacity={0.15} />
            </g>
          )
        })}

        {/* X축 날짜 */}
        {netWorthHistory.map((d, i) => (
          <text key={d.date}
            x={toX(i)} y={H - 4}
            textAnchor="middle" fontSize="10"
            fontFamily="SUIT" fill="#8B95A1"
          >
            {d.date}
          </text>
        ))}
      </svg>
    </div>
  )
}