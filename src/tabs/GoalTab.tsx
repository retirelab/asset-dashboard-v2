import { useTheme } from '../context/ThemeContext'
import { goals, retirement, userProfile, fmt억 } from '../data/assetData'

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

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  const { isDark } = useTheme()
  return (
    <div className={`h-2 rounded-full mt-2 ${isDark ? 'bg-dk-border' : 'bg-gray-100'}`}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }}
      />
    </div>
  )
}

export default function GoalTab() {
  const { isDark } = useTheme()
  const t = isDark ? 'text-dk-text'  : 'text-lt-text'
  const s = isDark ? 'text-dk-sub'   : 'text-lt-sub'
  const m = isDark ? 'text-dk-muted' : 'text-lt-muted'

  const netWorthPct = (goals.netWorthCurrent  / goals.netWorthTarget)  * 100
  const passivePct  = (goals.passiveIncomeCurrent / goals.passiveIncomeTarget) * 100

  const yearsLeft    = userProfile.yearsToRetire
  const annualSaving = goals.monthlySaving * 12
  const r            = goals.expectedReturn / 100

  const futureFinancial =
    82_500_000 * Math.pow(1 + r, yearsLeft) +
    annualSaving * ((Math.pow(1 + r, yearsLeft) - 1) / r)

  const retireTotalEst =
    futureFinancial +
    retirement.spouse1.retireEstimate +
    retirement.spouse2.retireEstimate +
    300_000_000

  const monthlyAtRetire = (retireTotalEst * 0.04) / 12

  return (
    <div className="px-4 py-4 space-y-3 pb-24">

      {/* 은퇴 목표 프로필 */}
      <Card className="fade-up">
        <div className="flex justify-between items-center">
          <div>
            <p className={`text-[12px] ${m}`}>은퇴 목표</p>
            <p className={`text-[24px] font-bold ${t}`}>
              {userProfile.retireTargetYear}년
            </p>
            <p className={`text-[12px] mt-0.5 ${s}`}>
              {userProfile.retireTargetAge}세 · {yearsLeft}년 남음
            </p>
          </div>
          <div className={`text-right text-[11px] ${m} leading-relaxed`}>
            <p>현재 나이 {userProfile.currentAge}세</p>
            <p className="mt-1 text-[10px] text-accent-blue">* 나중에 직접 설정 가능</p>
          </div>
        </div>
      </Card>

      {/* 목표 달성률 */}
      <Card className="fade-up delay-1 space-y-5">
        <p className={`text-[12px] font-semibold ${t}`}>목표 달성 현황</p>

        <div>
          <div className="flex justify-between items-end">
            <div>
              <p className={`text-[11px] ${m}`}>순자산 목표</p>
              <p className="text-[18px] font-bold num text-accent-blue">
                {fmt억(goals.netWorthCurrent)}
              </p>
            </div>
            <p className={`text-[12px] num ${s}`}>목표 {fmt억(goals.netWorthTarget)}</p>
          </div>
          <ProgressBar pct={netWorthPct} color="#3182F6" />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] font-bold text-accent-blue">
              {netWorthPct.toFixed(0)}%
            </span>
            <span className={`text-[10px] ${m}`}>{userProfile.retireTargetYear}년</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end">
            <div>
              <p className={`text-[11px] ${m}`}>월 자산소득 목표</p>
              <p className="text-[18px] font-bold num text-accent-amber">
                {fmt억(goals.passiveIncomeCurrent)}
              </p>
            </div>
            <p className={`text-[12px] num ${s}`}>목표 {fmt억(goals.passiveIncomeTarget)}</p>
          </div>
          <ProgressBar pct={passivePct} color="#FF9F0A" />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] font-bold text-accent-amber">
              {passivePct.toFixed(0)}%
            </span>
            <span className={`text-[10px] ${m}`}>{userProfile.retireTargetYear}년</span>
          </div>
        </div>
      </Card>

      {/* 은퇴 시뮬레이터 */}
      <Card className="fade-up delay-2">
        <div className="flex justify-between items-center mb-4">
          <p className={`text-[12px] font-semibold ${t}`}>은퇴 시뮬레이터</p>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
            isDark ? 'bg-dk-border text-dk-muted' : 'bg-gray-100 text-lt-muted'
          }`}>
            연 {goals.expectedReturn}% 수익 가정
          </span>
        </div>

        <div className="space-y-3">
          {[
            { label: '월 저축액',          value: fmt억(goals.monthlySaving),   color: '',                bold: false },
            { label: '은퇴 시 금융자산 추정', value: `~${fmt억(futureFinancial)}`,  color: 'text-accent-blue', bold: false },
            { label: '은퇴 시 총자산 추정',  value: `~${fmt억(retireTotalEst)}`,  color: 'text-accent-blue', bold: false },
            { label: '월 인출 가능액 추정',  value: `~${fmt억(monthlyAtRetire)}`, color: 'text-accent-green', bold: true },
          ].map(row => (
            <div key={row.label} className={`flex justify-between text-[13px] ${
              row.bold
                ? `pt-3 border-t ${isDark ? 'border-dk-border' : 'border-gray-100'}`
                : ''
            }`}>
              <span className={s}>{row.label}</span>
              <span className={`num ${row.bold ? 'font-bold' : 'font-medium'} ${row.color || t}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <p className={`text-[10px] mt-4 leading-relaxed ${m}`}>
          * 4% 인출률 기준 · 부동산 현가 반영 · 퇴직금 포함 단순 추정치입니다.
          추후 세부 입력 기능이 추가됩니다.
        </p>
      </Card>

      {/* 퇴직금 현황 */}
      <Card className="fade-up delay-3">
        <p className={`text-[12px] font-semibold mb-4 ${t}`}>퇴직금 현황</p>
        {[retirement.spouse1, retirement.spouse2].map((r, i) => (
          <div key={r.name} className={`${
            i > 0
              ? `pt-3 mt-3 border-t ${isDark ? 'border-dk-border' : 'border-gray-100'}`
              : ''
          }`}>
            <div className="flex justify-between items-center">
              <div>
                <p className={`text-[13px] font-medium ${t}`}>{r.name} · {r.type}</p>
                <p className={`text-[11px] mt-0.5 ${m}`}>입사 {r.joinedYear}년</p>
              </div>
              <div className="text-right">
                <p className={`text-[11px] ${s}`}>현재 {fmt억(r.currentEstimate)}</p>
                <p className="text-[13px] font-bold text-accent-green num">
                  은퇴 ~{fmt억(r.retireEstimate)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Card>

    </div>
  )
}