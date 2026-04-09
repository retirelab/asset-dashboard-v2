import React, { useState, useEffect } from 'react'

// --- Mock 데이터 (기존 assetData 참조 구조 유지 및 독립 실행용) ---
const netWorthHistory = [
  { date: '24.01', total: 410000000, net: 330000000, debt: 80000000, financial: 65000000, realestate: 345000000 },
  { date: '24.02', total: 425000000, net: 345000000, debt: 80000000, financial: 70000000, realestate: 355000000 },
  { date: '24.03', total: 440000000, net: 360000000, debt: 80000000, financial: 75000000, realestate: 365000000 },
  { date: '24.04', total: 469500000, net: 382500000, debt: 87000000, financial: 82500000, realestate: 387000000 },
]

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
    new Set(['total', 'net', 'debt'])
  )
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const toggle = (key: string) =>
    setActive(prev => {
      const n = new Set(prev)
      n.has(key) ? n.delete(key) : n.add(key)
      return n
    })

  const W = 560; const H = 180
  const padL = 48; const padR = 12; const padT = 20; const padB = 32

  const activeLegends = legends.filter(l => active.has(l.key))
  const allVals = netWorthHistory.flatMap(d => activeLegends.map(l => d[l.key]))
  const max = allVals.length ? Math.max(...allVals) * 1.1 : 500_000_000
  
  const toY = (v: number) => padT + (1 - v / max) * (H - padT - padB)
  const toX = (i: number) => padL + i * ((W - padL - padR) / (netWorthHistory.length - 1))

  const line = (key: typeof legends[number]['key']) =>
    netWorthHistory
      .map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(d[key]).toFixed(1)}`)
      .join(' ')

  return (
    <div className={`bg-white rounded-[28px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      <div className="mb-6">
        <h3 className="text-lg font-extrabold text-[#191f28] mb-1">자산 흐름</h3>
        <p className="text-[#8b95a1] text-xs font-bold">최근 4개월간의 자산 변화입니다</p>
      </div>

      {/* 토스 스타일 칩 (범례 버튼) */}
      <div className="flex flex-wrap gap-2 mb-8">
        {legends.map(l => {
          const on = active.has(l.key)
          return (
            <button
              key={l.key}
              onClick={() => toggle(l.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-extrabold transition-all active:scale-95 ${
                on ? 'bg-[#f2f4f7] text-[#191f28]' : 'bg-transparent text-[#adb5bd]'
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: on ? l.color : '#e5e8eb' }} />
              {l.label}
            </button>
          )
        })}
      </div>

      {/* SVG 차트 */}
      <div className="relative h-[200px]">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full overflow-visible">
          <defs>
            {legends.map(l => (
              <linearGradient key={l.key} id={`g-${l.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={l.color} stopOpacity="0.15" />
                <stop offset="100%" stopColor={l.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>

          {/* 가이드 라인 */}
          {[0, 0.5, 1].map(r => (
            <line key={r}
              x1={padL} y1={toY(max * r)}
              x2={W - padR} y2={toY(max * r)}
              stroke="#f2f4f7" strokeWidth="1"
            />
          ))}

          {/* Y축 레이블 */}
          {[0, 0.5, 1].map(r => (
            <text key={r}
              x={padL - 8} y={toY(max * r) + 4}
              textAnchor="end" fontSize="10"
              fontWeight="700" fill="#adb5bd"
            >
              {fmt(max * r)}
            </text>
          ))}

          {/* 면적 + 선 애니메이션 */}
          {activeLegends.map((l, idx) => (
            <g key={l.key} className="transition-opacity duration-500">
              <path
                d={`${line(l.key)} L${toX(netWorthHistory.length - 1).toFixed(1)},${toY(0).toFixed(1)} L${padL},${toY(0).toFixed(1)} Z`}
                fill={`url(#g-${l.key})`}
                className={`transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
              <path
                d={line(l.key)} fill="none"
                stroke={l.color} strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray={l.dash ? '6 4' : undefined}
                className="transition-all duration-1000"
                style={{ 
                  strokeDasharray: isLoaded ? (l.dash ? '6 4' : '0') : '1000',
                  strokeDashoffset: isLoaded ? '0' : '1000'
                }}
              />
            </g>
          ))}

          {/* 포인트 강조 */}
          {activeLegends.map(l => {
            const last = netWorthHistory[netWorthHistory.length - 1]
            const x = toX(netWorthHistory.length - 1)
            const y = toY(last[l.key])
            return (
              <g key={l.key} className="animate-pulse">
                <circle cx={x} cy={y} r={4} fill={l.color} stroke="white" strokeWidth="2" />
                <circle cx={x} cy={y} r={8} fill={l.color} fillOpacity={0.1} />
              </g>
            )
          })}

          {/* X축 날짜 */}
          {netWorthHistory.map((d, i) => (
            <text key={d.date}
              x={toX(i)} y={H - 4}
              textAnchor="middle" fontSize="11"
              fontWeight="700" fill="#adb5bd"
            >
              {d.date}
            </text>
          ))}
        </svg>
      </div>
    </div>
  )
}