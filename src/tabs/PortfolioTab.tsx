import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { accounts, properties, fmt억, fmtWon } from '../data/assetData'

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

export default function PortfolioTab() {
  const { isDark } = useTheme()
  const [tab, setTab] = useState<'financial' | 'realestate'>('financial')
  const t = isDark ? 'text-dk-text'  : 'text-lt-text'
  const s = isDark ? 'text-dk-sub'   : 'text-lt-sub'
  const m = isDark ? 'text-dk-muted' : 'text-lt-muted'

  const totalFinancial = accounts.reduce((sum, a) => sum + a.amount, 0)
  const totalRE = properties.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="px-4 py-4 space-y-3 pb-24">

      {/* 탭 전환 */}
      <div className={`flex rounded-xl p-1 gap-1 ${isDark ? 'bg-dk-card' : 'bg-gray-100'}`}>
        {(['financial', 'realestate'] as const).map(key => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-all ${
              tab === key
                ? isDark ? 'bg-dk-border text-dk-text' : 'bg-white text-lt-text shadow-sm'
                : isDark ? 'text-dk-muted' : 'text-lt-muted'
            }`}
          >
            {key === 'financial' ? '💰 금융자산' : '🏠 부동산'}
          </button>
        ))}
      </div>

      {tab === 'financial' && (
        <>
          {/* 금융자산 합계 */}
          <Card className="fade-up">
            <p className={`text-[11px] mb-1 ${m}`}>금융자산 합계</p>
            <p className={`text-[26px] font-extrabold num ${t}`}>{fmtWon(totalFinancial)}</p>
          </Card>

          {/* 계좌 카드 목록 */}
          <Card className="fade-up delay-1 space-y-4">
            <p className={`text-[12px] font-semibold ${t}`}>계좌별 현황</p>
            {accounts.map((a, i) => (
              <div key={a.id} className={`flex items-center gap-3 ${
                i > 0 ? `pt-4 border-t ${isDark ? 'border-dk-border' : 'border-gray-100'}` : ''
              }`}>
                {/* 뱅크 로고 */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold"
                  style={{
                    backgroundColor: a.bankColor,
                    color: a.bankInitial === 'KB' || a.bankInitial === 'K' ? '#5c4a16' : '#fff',
                  }}
                >
                  {a.bankInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`text-[13px] font-semibold ${t}`}>{a.name}</p>
                      <p className={`text-[11px] mt-0.5 ${m}`}>{a.bank}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-[14px] font-bold num ${t}`}>{fmt억(a.amount)}</p>
                      <p className={`text-[11px] num mt-0.5 ${
                        a.returnAmt >= 0 ? 'text-accent-red' : 'text-accent-blue'
                      }`}>
                        {a.returnAmt >= 0 ? '+' : ''}{fmt억(a.returnAmt)} ({a.returnPct >= 0 ? '+' : ''}{a.returnPct.toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                  {/* 비중 바 */}
                  <div className={`mt-2 h-1 rounded-full ${isDark ? 'bg-dk-border' : 'bg-gray-100'}`}>
                    <div
                      className="h-full rounded-full bg-accent-blue transition-all duration-700"
                      style={{ width: `${(a.amount / totalFinancial) * 100}%` }}
                    />
                  </div>
                  <p className={`text-[10px] mt-1 ${m}`}>
                    {((a.amount / totalFinancial) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </Card>
        </>
      )}

      {tab === 'realestate' && (
        <>
          {/* 부동산 합계 */}
          <Card className="fade-up">
            <p className={`text-[11px] mb-1 ${m}`}>부동산 자산 합계</p>
            <p className={`text-[26px] font-extrabold num ${t}`}>{fmtWon(totalRE)}</p>
          </Card>

          {/* 부동산 카드 목록 */}
          {properties.map((p, i) => (
            <Card key={p.id} className={`fade-up delay-${i + 1}`}>
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-[18px]"
                  style={{ backgroundColor: p.color + '22' }}
                >
                  🏠
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`text-[14px] font-bold ${t}`}>{p.name}</p>
                      <p className={`text-[11px] mt-0.5 ${m}`}>{p.address}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      p.type === '자가'
                        ? isDark ? 'bg-blue-900/50 text-accent-blue' : 'bg-blue-50 text-accent-blue'
                        : isDark ? 'bg-green-900/50 text-accent-green' : 'bg-green-50 text-accent-green'
                    }`}>
                      {p.type}
                    </span>
                  </div>
                  <div className={`mt-3 pt-3 border-t space-y-2 ${
                    isDark ? 'border-dk-border' : 'border-gray-100'
                  }`}>
                    {[
                      { label: '현재 추정가', value: fmt억(p.amount),         color: `font-bold ${t}` },
                      { label: '매입가',      value: fmt억(p.purchaseAmt),    color: t },
                      ...(p.returnPct > 0 ? [{ label: '평가 수익률', value: `+${p.returnPct.toFixed(1)}%`, color: 'text-accent-red' }] : []),
                      ...(p.monthlyRent > 0 ? [{ label: '월 임대수익', value: `+${fmt억(p.monthlyRent)}`, color: 'text-accent-green' }] : []),
                    ].map(row => (
                      <div key={row.label} className="flex justify-between text-[12px]">
                        <span className={s}>{row.label}</span>
                        <span className={`num ${row.color}`}>{row.value}</span>
                      </div>
                    ))}
                    {p.memo && <p className={`text-[11px] mt-1 ${m}`}>{p.memo}</p>}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </>
      )}
    </div>
  )
}