import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { PieChart, ArrowUpRight, Home } from 'lucide-react'
import { accounts, properties, fmt억, fmtWon } from '../data/assetData'

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
    <div
      className="relative flex items-center justify-center animate-zoom-in"
      style={{ width: size, height: size }}
    >
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

export default function PortfolioTab() {
  const { isDark } = useTheme()
  const [tab, setTab] = useState<'financial' | 'realestate'>('financial')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => { setIsLoaded(true) }, [])

  const bg = isDark ? 'bg-dk-bg' : 'bg-[#f2f4f7]'
  const t  = isDark ? 'text-dk-text'  : 'text-[#191f28]'
  const m  = isDark ? 'text-dk-muted' : 'text-[#8b95a1]'

  const cardBase = isDark
    ? 'bg-dk-card border border-dk-border rounded-[28px] p-6 transition-all duration-300'
    : 'bg-white rounded-[28px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 active:scale-[0.98]'

  const headerCard = isDark
    ? 'bg-dk-card border border-dk-border rounded-[28px] p-8'
    : 'bg-white rounded-[28px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white'

  const tabBg   = isDark ? 'bg-dk-border'  : 'bg-[#f2f4f7]'
  const tabSlider = isDark ? 'bg-dk-card2' : 'bg-white'
  const divLine = isDark ? 'border-dk-border' : 'border-[#f2f4f7]'

  const totalFinancial = accounts.reduce((sum, a) => sum + a.amount, 0)
  const totalRE        = properties.reduce((sum, p) => sum + p.amount, 0)

  const financialSlices = accounts.map((a, i) => ({
    label: a.name,
    value: a.amount,
    color: ['#3182f6', '#00d082', '#8b5cf6', '#f59e0b', '#f04452', '#38b6b6'][i % 6],
  }))

  const reSlices = properties.map((p, i) => ({
    label: p.name,
    value: p.amount,
    color: ['#3182f6', '#00d082'][i % 2],
  }))

  return (
    <div className={`min-h-screen ${bg} pb-32 pt-6 px-5`}>

      {/* 헤더 카드 */}
      <div className={`mb-4 transition-all duration-700 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}>
        <div className={headerCard}>
          <div className="flex justify-between items-start mb-6">
            <h1 className={`text-[32px] font-extrabold ${t}`}>포트폴리오</h1>

            {/* 슬라이딩 탭 */}
            <div className={`flex ${tabBg} p-1.5 rounded-[18px] relative`}>
              <button
                onClick={() => setTab('financial')}
                className={`relative z-10 px-5 py-2.5 rounded-[14px] text-[13px] font-extrabold transition-all duration-300 ${
                  tab === 'financial' ? t : m
                }`}
              >
                금융
              </button>
              <button
                onClick={() => setTab('realestate')}
                className={`relative z-10 px-5 py-2.5 rounded-[14px] text-[13px] font-extrabold transition-all duration-300 ${
                  tab === 'realestate' ? t : m
                }`}
              >
                부동산
              </button>
              {/* 슬라이더 */}
              <div className={`absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-[14px] shadow-sm transition-transform duration-300 ease-out ${tabSlider} ${
                tab === 'realestate' ? 'translate-x-full' : 'translate-x-0'
              }`} />
            </div>
          </div>

          <div>
            <p className={`text-[15px] font-bold mb-1 ${m}`}>
              {tab === 'financial' ? '총 금융자산' : '총 부동산 가치'}
            </p>
            <p className="text-[32px] font-extrabold text-[#3182f6] tracking-tight">
              {fmtWon(tab === 'financial' ? totalFinancial : totalRE)}
            </p>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main
        key={tab}
        className={`mt-4 space-y-4 transition-all duration-500 delay-200 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {/* 도넛 차트 카드 */}
        <div className={cardBase}>
          <div className="flex items-center gap-2 mb-6">
            <PieChart size={18} className="text-[#3182f6] animate-pulse" />
            <h3 className={`text-base font-extrabold ${t}`}>보유 비중</h3>
          </div>
          <div className="flex flex-col items-center py-4">
            <DonutChart
              slices={tab === 'financial' ? financialSlices : reSlices}
              size={170}
              centerLabel={tab === 'financial' ? '금융' : '부동산'}
              centerValue={fmt억(tab === 'financial' ? totalFinancial : totalRE)}
              isDark={isDark}
            />
            {/* 범례 */}
            <div className="mt-6 w-full space-y-2">
              {(tab === 'financial' ? financialSlices : reSlices).map(sl => {
                const tot = (tab === 'financial' ? financialSlices : reSlices)
                  .reduce((a, b) => a + b.value, 0)
                const pct = ((sl.value / tot) * 100).toFixed(1)
                return (
                  <div key={sl.label} className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sl.color }} />
                      <span className={`text-sm font-bold ${m}`}>{sl.label}</span>
                    </div>
                    <span className={`text-sm font-extrabold ${t}`}>{pct}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 상세 내역 */}
        <div className="space-y-3">
          <p className={`text-[12px] font-bold ml-3 uppercase tracking-wider ${m}`}>상세 내역</p>

          {tab === 'financial' ? (
            accounts.map((a, i) => (
              <div
                key={a.id}
                className={`${cardBase} flex items-center gap-5 py-6 animate-slide-up`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-[17px] font-extrabold flex-shrink-0"
                  style={{ backgroundColor: a.bankColor }}
                >
                  {a.bankInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`text-base font-extrabold truncate mb-0.5 ${t}`}>{a.name}</p>
                      <p className={`text-[13px] font-bold ${m}`}>{a.bank}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-[17px] font-extrabold ${t}`}>{fmt억(a.amount)}</p>
                      <p className={`text-[12px] font-bold ${
                        a.returnAmt >= 0
                          ? isDark ? 'text-accent-red'  : 'text-[#f04452]'
                          : isDark ? 'text-accent-blue' : 'text-[#3182f6]'
                      }`}>
                        {a.returnAmt >= 0 ? '+' : ''}{fmt억(a.returnAmt)}
                      </p>
                    </div>
                  </div>
                  {/* 비중 바 */}
                  <div className={`mt-2 h-1 rounded-full ${isDark ? 'bg-dk-border' : 'bg-[#f2f4f7]'}`}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${(a.amount / totalFinancial) * 100}%`,
                        backgroundColor: financialSlices[i]?.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            properties.map((p, i) => (
              <div
                key={p.id}
                className={`${cardBase} animate-slide-up`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center text-[#3182f6] ${
                      isDark ? 'bg-dk-card2' : 'bg-[#f2f4f7]'
                    }`}>
                      <Home size={22} />
                    </div>
                    <div>
                      <h4 className={`text-base font-extrabold ${t}`}>{p.name}</h4>
                      <p className={`text-[12px] font-bold ${m}`}>{p.address}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold ${
                    p.type === '자가'
                      ? isDark ? 'bg-blue-900/40 text-accent-blue' : 'bg-[#e8f3ff] text-[#3182f6]'
                      : isDark ? 'bg-green-900/40 text-accent-green' : 'bg-[#e6f9f0] text-[#00d082]'
                  }`}>
                    {p.type}
                  </span>
                </div>

                <div className={`flex justify-between items-end border-t pt-5 mt-2 ${divLine}`}>
                  <div>
                    <p className={`text-[12px] font-bold mb-1 ${m}`}>현재 추정가</p>
                    <p className={`text-[19px] font-extrabold ${t}`}>{fmt억(p.amount)}</p>
                    {p.monthlyRent > 0 && (
                      <p className={`text-[12px] font-bold mt-1 ${isDark ? 'text-accent-green' : 'text-[#00d082]'}`}>
                        월세 +{fmt억(p.monthlyRent)}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={`text-[12px] font-bold mb-1 ${m}`}>매입가 {fmt억(p.purchaseAmt)}</p>
                    {p.returnPct > 0 && (
                      <span className={`text-sm font-extrabold flex items-center justify-end ${
                        isDark ? 'text-accent-red' : 'text-[#f04452]'
                      }`}>
                        <ArrowUpRight size={14} className="mr-0.5" />
                        +{p.returnPct.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
        .animate-zoom-in {
          animation: zoomIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  )
}