import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { BarChart3, DollarSign, ArrowUpRight } from 'lucide-react'
import AssetChart from '../components/AssetChart'
import {
  keyMetrics, accounts, properties, alerts,
  fmt억, fmtWon, fmtSign, fmtPct
} from '../data/assetData'

const donutSlices = [
  { label: '부동산',   value: 300_000_000, color: '#3182f6' },
  { label: '금융자산', value:  82_500_000, color: '#00d082' },
  { label: '부채',     value:  87_000_000, color: '#ff4d4d' },
]

function DonutChart({ slices, size, centerLabel, centerValue, isDark }: {
  slices: { label: string; value: number; color: string }[]
  size: number
  centerLabel: string
  centerValue: string
  isDark: boolean
}) {
  const total = slices.reduce((a, b) => a + b.value, 0)
  const circumference = 2 * Math.PI * 16
  let offset = 0

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
        <circle
          cx="20" cy="20" r="16"
          fill="transparent"
          stroke={isDark ? '#2A2A2E' : '#f2f4f7'}
          strokeWidth="4"
        />
        {slices.map((s, i) => {
          const pct  = s.value / total
          const dash = pct * circumference
          const gap  = circumference - dash
          const cur  = circumference - offset
          offset += dash
          return (
            <circle
              key={i}
              cx="20" cy="20" r="16"
              fill="transparent"
              stroke={s.color}
              strokeWidth="4.5"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={cur}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className={`text-[11px] font-bold uppercase ${isDark ? 'text-dk-muted' : 'text-[#8b95a1]'}`}>
          {centerLabel}
        </p>
        <p className={`text-base font-extrabold ${isDark ? 'text-dk-text' : 'text-[#191f28]'}`}>
          {centerValue}
        </p>
      </div>
    </div>
  )
}

export default function DashboardTab() {
  const { isDark } = useTheme()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => { setIsLoaded(true) }, [])

  const bg = isDark ? 'bg-dk-bg' : 'bg-[#f2f4f7]'
  const t  = isDark ? 'text-dk-text'  : 'text-[#191f28]'
  const s  = isDark ? 'text-dk-sub'   : 'text-[#4e5968]'
  const m  = isDark ? 'text-dk-muted' : 'text-[#8b95a1]'

  const cardBase = isDark
    ? 'bg-dk-card border border-dk-border rounded-[28px] p-6 transition-all duration-300'
    : 'bg-white rounded-[28px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 active:scale-[0.99]'

  const totalFinancial = accounts.reduce((sum, a) => sum + a.amount, 0)
  const totalRE = properties.reduce((sum, p) => sum + p.amount, 0)

  const alertStyle = {
    warn:  'bg-[#ff4d4d]/10 text-[#ff4d4d]',
    info:  'bg-[#3182f6]/10 text-[#3182f6]',
    green: 'bg-[#00d082]/10 text-[#00d082]',
  }

  return (
    <div className={`min-h-screen ${bg} pb-32 pt-6 px-5`}>

      {/* 히어로 헤더 카드 */}
      <div className={`mb-4 transition-all duration-700 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}>
        <div className={`${cardBase} border ${isDark ? 'border-dk-border' : 'border-white'} p-8`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3182f6] animate-pulse" />
            <h2 className={`text-[15px] font-bold ${m}`}>나의 총자산</h2>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer mb-3">
            <h1 className={`text-[32px] font-extrabold tracking-tight ${t}`}>
              {fmtWon(keyMetrics.totalAssets)}
            </h1>
            <ArrowUpRight
              className={`${isDark ? 'text-dk-muted' : 'text-[#adb5bd]'} group-hover:text-[#3182f6] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all`}
              size={32}
            />
          </div>
          <div className="flex items-center">
            <span className={`px-3 py-1.5 rounded-full text-[13px] font-black ${
              keyMetrics.todayReturn >= 0
                ? 'bg-[#f04452]/10 text-[#f04452]'
                : 'bg-[#3182f6]/10 text-[#3182f6]'
            }`}>
              오늘 {fmtSign(keyMetrics.todayReturn)} ({fmtPct(keyMetrics.todayReturnPct)})
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">

        {/* 핵심 3지표 */}
        <div className={`${cardBase} grid grid-cols-3 gap-2 py-7`}
          style={{ animation: isLoaded ? 'slideUp 0.6s ease-out 0.1s both' : 'none' }}>
          {[
            { label: '순자산',   value: fmt억(keyMetrics.netWorth),              color: 'text-[#3182f6]' },
            { label: '금융자산', value: fmt억(keyMetrics.financialAssets),       color: t },
            { label: '총부채',   value: `-${fmt억(keyMetrics.totalLiabilities)}`, color: 'text-[#f04452]' },
          ].map((item, i) => (
            <div key={item.label} className={`text-center ${
              i < 2 ? `border-r ${isDark ? 'border-dk-border' : 'border-[#f2f4f7]'}` : ''
            }`}>
              <p className={`text-[11px] font-bold mb-2 uppercase ${m}`}>{item.label}</p>
              <p className={`text-base font-extrabold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* 자산 구성 */}
        <div className={cardBase}
          style={{ animation: isLoaded ? 'slideUp 0.6s ease-out 0.2s both' : 'none' }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-[#3182f6]" />
              <h3 className={`text-base font-extrabold ${t}`}>자산 구성</h3>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <DonutChart
              slices={donutSlices}
              size={190}
              centerLabel="총자산"
              centerValue={fmt억(keyMetrics.totalAssets)}
              isDark={isDark}
            />
            <div className="mt-8 w-full grid grid-cols-1 gap-1">
              {donutSlices.map(sl => {
                const total = donutSlices.reduce((a, b) => a + b.value, 0)
                const pct = ((sl.value / total) * 100).toFixed(1)
                return (
                  <div key={sl.label}
                    className={`flex items-center justify-between p-4 rounded-[20px] transition-colors group ${
                      isDark ? 'hover:bg-dk-card2' : 'hover:bg-[#f9fafb]'
                    }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: sl.color }} />
                      <span className={`text-[15px] font-bold transition-colors ${
                        isDark
                          ? 'text-dk-sub group-hover:text-dk-text'
                          : 'text-[#4e5968] group-hover:text-[#191f28]'
                      }`}>{sl.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[13px] font-bold ${isDark ? 'text-dk-muted' : 'text-[#adb5bd]'}`}>
                        {pct}%
                      </span>
                      <span className={`text-[15px] font-extrabold ${t}`}>{fmt억(sl.value)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 월 소득 */}
        <div className={cardBase}
          style={{ animation: isLoaded ? 'slideUp 0.6s ease-out 0.3s both' : 'none' }}>
          <div className="flex items-center gap-2 mb-6">
            <DollarSign size={18} className="text-[#00d082]" />
            <h3 className={`text-base font-extrabold ${t}`}>이번 달 소득</h3>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className={`text-[13px] font-bold mb-1 ${m}`}>근로 + 자산소득</p>
                <p className={`text-[28px] font-extrabold leading-tight ${t}`}>
                  {fmt억(keyMetrics.monthlyIncome)}
                </p>
              </div>
              <div className="text-right pb-1">
                <span className="text-[13px] font-black text-[#00d082] bg-[#00d082]/10 px-3 py-1.5 rounded-full">
                  자산소득 {fmt억(keyMetrics.monthlyPassive)}
                </span>
              </div>
            </div>
            <div className={`h-3 w-full rounded-full overflow-hidden ${isDark ? 'bg-dk-border' : 'bg-[#f2f4f7]'}`}>
              <div
                className="h-full bg-[#00d082] rounded-full transition-all duration-1000 ease-out"
                style={{ width: isLoaded ? `${(keyMetrics.monthlyPassive / keyMetrics.monthlyIncome) * 100}%` : '0%' }}
              />
            </div>
            <p className={`text-[11px] font-bold ${m}`}>
              자산소득 비중 {((keyMetrics.monthlyPassive / keyMetrics.monthlyIncome) * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* 자산 추이 */}
        <div className={cardBase}
          style={{ animation: isLoaded ? 'slideUp 0.6s ease-out 0.4s both' : 'none' }}>
          <h3 className={`text-base font-extrabold mb-4 ${t}`}>자산 추이</h3>
          <div className="flex gap-4 mb-4">
            {[
              { label: '총자산', color: '#3B82F6' },
              { label: '순자산', color: '#10B981' },
              { label: '총부채', color: '#F43F5E' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1">
                <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: l.color }} />
                <span className={`text-[10px] font-bold ${m}`}>{l.label}</span>
              </div>
            ))}
          </div>
          <AssetChart />
        </div>

        {/* 부동산 요약 */}
        <div className={cardBase}
          style={{ animation: isLoaded ? 'slideUp 0.6s ease-out 0.45s both' : 'none' }}>
          <h3 className={`text-base font-extrabold mb-4 ${t}`}>부동산 요약</h3>
          <div className="space-y-3">
            {[
              { label: '부동산 합계',   value: fmt억(totalRE),        color: t },
              { label: '금융자산 합계', value: fmt억(totalFinancial),  color: t },
              { label: '부동산 비중',   value: `${((totalRE / keyMetrics.totalAssets) * 100).toFixed(1)}%`,
                color: isDark ? 'text-accent-amber' : 'text-amber-500' },
            ].map((row, i) => (
              <div key={row.label} className={`flex justify-between items-center ${
                i > 0 ? `pt-3 border-t ${isDark ? 'border-dk-border' : 'border-[#f2f4f7]'}` : ''
              }`}>
                <span className={`text-sm font-bold ${s}`}>{row.label}</span>
                <span className={`text-sm font-extrabold num ${row.color}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 알림 */}
        <div className="space-y-3"
          style={{ animation: isLoaded ? 'slideUp 0.6s ease-out 0.5s both' : 'none' }}>
          {alerts.map((a, i) => (
            <div key={i} className={`${
              isDark
                ? 'bg-dk-card border border-dk-border'
                : 'bg-white border border-white shadow-[0_4px_20px_rgb(0,0,0,0.02)]'
            } rounded-[24px] p-5 flex items-start gap-4`}>
              <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                a.level === 'warn' ? 'bg-[#ff4d4d]' :
                a.level === 'green' ? 'bg-[#00d082]' : 'bg-[#3182f6]'
              }`} />
              <div>
                <p className={`text-sm font-extrabold mb-0.5 ${
                  a.level === 'warn'
                    ? isDark ? 'text-accent-red'   : 'text-[#f04452]'
                    : a.level === 'green'
                    ? isDark ? 'text-accent-green' : 'text-[#00d082]'
                    : isDark ? 'text-accent-blue'  : 'text-[#3182f6]'
                }`}>{a.title}</p>
                <p className={`text-xs font-bold ${m}`}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}