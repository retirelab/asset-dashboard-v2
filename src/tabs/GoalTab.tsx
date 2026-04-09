import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { Calendar, Target, ShieldCheck } from 'lucide-react'
import { goals, retirement, userProfile, fmt억 } from '../data/assetData'

export default function GoalTab() {
  const { isDark } = useTheme()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => { setIsLoaded(true) }, [])

  const bg = isDark ? 'bg-dk-bg' : 'bg-[#f2f4f7]'
  const t  = isDark ? 'text-dk-text'  : 'text-[#191f28]'
  const s  = isDark ? 'text-dk-sub'   : 'text-[#4e5968]'
  const m  = isDark ? 'text-dk-muted' : 'text-[#8b95a1]'

  const cardBase = isDark
    ? 'bg-dk-card border border-dk-border rounded-[28px] p-6 transition-all duration-500'
    : 'bg-white rounded-[28px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]'

  const innerCard = isDark
    ? 'bg-dk-card2 p-5 rounded-[20px] transition-transform active:scale-95 cursor-pointer'
    : 'bg-[#f9fafb] p-5 rounded-[20px] transition-transform active:scale-95 cursor-pointer'

  const netWorthPct = (goals.netWorthCurrent / goals.netWorthTarget) * 100
  const passivePct  = (goals.passiveIncomeCurrent / goals.passiveIncomeTarget) * 100

  const yearsLeft    = userProfile.yearsToRetire
  const annualSaving = goals.monthlySaving * 12
  const r            = goals.expectedReturn / 100

  const futureFinancial = Math.max(0,
    82_500_000 * Math.pow(1 + r, yearsLeft) +
    annualSaving * ((Math.pow(1 + r, yearsLeft) - 1) / r)
  )

  const retireTotalEst =
    futureFinancial +
    retirement.spouse1.retireEstimate +
    retirement.spouse2.retireEstimate +
    300_000_000

  const monthlyAtRetire = (retireTotalEst * 0.04) / 12

  return (
    <div className={`min-h-screen ${bg} pb-32 pt-6 px-5`}>

      {/* 헤더 카드 */}
      <div className={`mb-4 transition-all duration-700 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}>
        <div className={`${cardBase} border ${isDark ? 'border-dk-border' : 'border-white'} p-8`}>
          <div className={`flex items-center gap-2 mb-2 ${
            isDark ? 'text-accent-blue' : 'text-[#3182f6]'
          }`}>
            <Calendar size={20} strokeWidth={2.5} />
            <span className="text-[15px] font-bold">은퇴까지 {yearsLeft}년</span>
          </div>
          <h1 className={`text-[32px] font-extrabold leading-tight mb-2 ${t}`}>
            {userProfile.retireTargetYear}년 은퇴
          </h1>
          <p className={`text-[15px] font-medium ${m}`}>
            목표 나이 {userProfile.retireTargetAge}세 · 현재 {userProfile.currentAge}세
          </p>
        </div>
      </div>

      <div className={`space-y-4 transition-all duration-700 delay-200 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}>

        {/* 목표 달성 현황 */}
        <div className={cardBase}>
          <div className="flex items-center gap-2 mb-8">
            <Target className={isDark ? 'text-accent-blue' : 'text-[#3182f6]'} size={18} />
            <h3 className={`text-base font-extrabold ${t}`}>목표 달성률</h3>
          </div>

          <div className="space-y-10">
            {/* 순자산 */}
            <div className="group">
              <div className="flex justify-between items-end mb-3">
                <span className={`text-sm font-bold ${s}`}>순자산 목표</span>
                <span className="text-xl font-extrabold text-[#3182f6] transition-transform group-hover:scale-110">
                  {netWorthPct.toFixed(0)}%
                </span>
              </div>
              <div className={`h-4 w-full rounded-full overflow-hidden ${isDark ? 'bg-dk-border' : 'bg-[#f2f4f7]'}`}>
                <div
                  className="h-full bg-[#3182f6] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: isLoaded ? `${Math.min(netWorthPct, 100)}%` : '0%' }}
                />
              </div>
              <div className={`flex justify-between mt-3 text-[12px] font-bold ${m}`}>
                <span>현재 {fmt억(goals.netWorthCurrent)}</span>
                <span>목표 {fmt억(goals.netWorthTarget)}</span>
              </div>
            </div>

            {/* 월 자산소득 */}
            <div className="group">
              <div className="flex justify-between items-end mb-3">
                <span className={`text-sm font-bold ${s}`}>월 자산소득 목표</span>
                <span className="text-xl font-extrabold text-[#00d082] transition-transform group-hover:scale-110">
                  {passivePct.toFixed(0)}%
                </span>
              </div>
              <div className={`h-4 w-full rounded-full overflow-hidden ${isDark ? 'bg-dk-border' : 'bg-[#f2f4f7]'}`}>
                <div
                  className="h-full bg-[#00d082] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: isLoaded ? `${Math.min(passivePct, 100)}%` : '0%' }}
                />
              </div>
              <div className={`flex justify-between mt-3 text-[12px] font-bold ${m}`}>
                <span>현재 {fmt억(goals.passiveIncomeCurrent)}</span>
                <span>목표 {fmt억(goals.passiveIncomeTarget)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 은퇴 시뮬레이터 */}
        <div className={cardBase}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Target className={isDark ? 'text-accent-amber' : 'text-amber-500'} size={18} />
              <h3 className={`text-base font-extrabold ${t}`}>은퇴 시뮬레이터</h3>
            </div>
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
              isDark ? 'bg-dk-border text-dk-muted' : 'bg-[#f2f4f7] text-[#8b95a1]'
            }`}>
              연 {goals.expectedReturn}% 수익 가정
            </span>
          </div>
          <div className="space-y-2">
            {[
              { label: '월 저축액',            value: fmt억(goals.monthlySaving),   color: t },
              { label: '은퇴 시 금융자산 추정', value: `~${fmt억(futureFinancial)}`,  color: isDark ? 'text-accent-blue'  : 'text-[#3182f6]' },
              { label: '은퇴 시 총자산 추정',  value: `~${fmt억(retireTotalEst)}`,   color: isDark ? 'text-accent-blue'  : 'text-[#3182f6]' },
              { label: '월 인출 가능액 추정',  value: `~${fmt억(monthlyAtRetire)}`,  color: isDark ? 'text-accent-green' : 'text-[#00d082]', bold: true },
            ].map((row, i, arr) => (
              <div key={row.label}
                className={`flex justify-between items-center py-3 ${
                  i < arr.length - 1
                    ? `border-b ${isDark ? 'border-dk-border' : 'border-[#f2f4f7]'}`
                    : ''
                }`}>
                <span className={`text-sm font-bold ${s}`}>{row.label}</span>
                <span className={`text-sm num ${'bold' in row && row.bold ? 'font-extrabold text-base' : 'font-bold'} ${row.color}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 퇴직금 예측 */}
        <div className={cardBase}>
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className={isDark ? 'text-accent-blue' : 'text-[#3182f6]'} size={18} />
            <h3 className={`text-base font-extrabold ${t}`}>퇴직금 예측</h3>
          </div>
          <div className="space-y-4">
            {[retirement.spouse1, retirement.spouse2].map((r, i) => (
              <div key={i} className={innerCard}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`text-[13px] font-bold mb-1 ${m}`}>{r.name} · {r.type}</p>
                    <p className={`text-base font-extrabold ${t}`}>예상 수령액</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-extrabold ${t}`}>{fmt억(r.retireEstimate)}</p>
                    <p className={`text-[12px] font-bold ${isDark ? 'text-accent-blue' : 'text-[#3182f6]'}`}>
                      현재 {fmt억(r.currentEstimate)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 안내 문구 */}
        <div className="px-3 py-6 opacity-60">
          <p className={`text-[12px] font-medium leading-relaxed ${m}`}>
            * 은퇴 시뮬레이션은 4% 인출률 법칙과 예상 연 수익률 {goals.expectedReturn}%를 가정한 결과입니다.
            실제 수치는 물가상승률 및 투자 환경에 따라 달라질 수 있습니다.
            추후 세부 입력 기능이 추가됩니다.
          </p>
        </div>

      </div>
    </div>
  )
}