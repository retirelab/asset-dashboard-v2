import { useTheme } from '../context/ThemeContext'
import AssetChart from '../components/AssetChart'
import { keyMetrics, alerts, fmt억, fmtWon, fmtSign, fmtPct } from '../data/assetData'

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { isDark } = useTheme()
  return (
    <div className={`rounded-2xl p-4 ${
      isDark ? 'bg-dk-card border border-dk-border' : 'bg-white shadow-sm'
    } ${className}`}>
      {children}
    </div>
  )
}

export default function DashboardTab() {
  const { isDark } = useTheme()
  const t = isDark ? 'text-dk-text'  : 'text-lt-text'
  const s = isDark ? 'text-dk-sub'   : 'text-lt-sub'
  const m = isDark ? 'text-dk-muted' : 'text-lt-muted'

  const alertStyle = {
    warn:  { bar: 'bg-accent-amber', title: 'text-accent-amber' },
    info:  { bar: 'bg-accent-blue',  title: 'text-accent-blue'  },
    green: { bar: 'bg-accent-green', title: 'text-accent-green' },
  }

  return (
    <div className="px-4 py-4 space-y-3 pb-24">

      {/* 총자산 히어로 */}
      <Card className="fade-up">
        <p className={`text-[12px] mb-1 ${m}`}>총자산</p>
        <p className={`text-[32px] font-extrabold num leading-tight ${t}`}>
          {fmtWon(keyMetrics.totalAssets)}
        </p>
        <p className={`text-[13px] mt-1 ${
          keyMetrics.todayReturn >= 0 ? 'text-accent-red' : 'text-accent-blue'
        }`}>
          오늘의 수익 {fmtSign(keyMetrics.todayReturn)} ({fmtPct(keyMetrics.todayReturnPct)})
        </p>
      </Card>

      {/* 핵심 지표 3개 */}
      <div className="grid grid-cols-3 gap-2 fade-up delay-1">
        {[
          { label: '순자산',   value: fmt억(keyMetrics.netWorth),             color: 'text-accent-blue'  },
          { label: '총부채',   value: `-${fmt억(keyMetrics.totalLiabilities)}`, color: 'text-accent-red'   },
          { label: '금융자산', value: fmt억(keyMetrics.financialAssets),       color: 'text-accent-green' },
        ].map(item => (
          <Card key={item.label} className="text-center">
            <p className={`text-[10px] mb-1 ${m}`}>{item.label}</p>
            <p className={`text-[15px] font-bold num ${item.color}`}>{item.value}</p>
          </Card>
        ))}
      </div>

      {/* 월소득 요약 */}
      <Card className="fade-up delay-2">
        <p className={`text-[12px] font-semibold mb-3 ${t}`}>월 소득 현황</p>
        <div className="space-y-2">
          {[
            { label: '근로소득',    value: keyMetrics.monthlyEarned,  color: '',               bold: false },
            { label: '자산소득',    value: keyMetrics.monthlyPassive, color: 'text-accent-green', bold: false },
            { label: '합산 월소득', value: keyMetrics.monthlyIncome,  color: 'text-accent-blue',  bold: true  },
          ].map(r => (
            <div key={r.label} className={`flex justify-between items-center text-[13px] ${
              r.bold ? `pt-2 border-t ${isDark ? 'border-dk-border' : 'border-gray-100'}` : ''
            }`}>
              <span className={s}>{r.label}</span>
              <span className={`num font-medium ${r.color || t}`}>{fmt억(r.value)}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 차트 */}
      <Card className="fade-up delay-3">
        <p className={`text-[12px] font-semibold mb-4 ${t}`}>자산 추이</p>
        <AssetChart />
        <div className="flex gap-4 mt-3">
          {[
            { label: '총자산', color: '#3182F6' },
            { label: '순자산', color: '#0DC381' },
            { label: '총부채', color: '#F04452' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: l.color }} />
              <span className={`text-[10px] ${m}`}>{l.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 알림 */}
      <div className="space-y-2 fade-up delay-4">
        <p className={`text-[12px] font-semibold px-1 ${t}`}>주목 포인트</p>
        {alerts.map((a, i) => (
          <Card key={i} className="flex gap-3 items-start">
            <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${alertStyle[a.level].bar}`} />
            <div>
              <p className={`text-[12px] font-semibold mb-0.5 ${alertStyle[a.level].title}`}>
                {a.title}
              </p>
              <p className={`text-[11px] leading-relaxed ${s}`}>{a.desc}</p>
            </div>
          </Card>
        ))}
      </div>

    </div>
  )
}