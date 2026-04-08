import SectionHeader from './components/SectionHeader'
import MetricCard from './components/MetricCard'
import Card from './components/Card'
import BarRow from './components/BarRow'
import DataRow from './components/DataRow'
import ReturnBadge from './components/ReturnBadge'
import NetWorthChart from './components/NetWorthChart'
import GoalProgress from './components/GoalProgress'
import {
  REPORT_DATE, keyMetrics, financialAssets, realEstate, realEstateRent,
  liabilities, hyeonjuIncome, hyeonjuGrowth, hyeonjuCore,
  namsukMiraeasset, namsukPension, retirement, goals2030, alerts,
  fmt억, fmtWon,
} from './data/assetData'

const passivePct  = (goals2030.passiveIncomeCurrent / goals2030.passiveIncomeTarget) * 100
const netWorthPct = (goals2030.netWorthCurrent / goals2030.netWorthTarget) * 100

export default function App() {
  return (
    <div className="min-h-screen bg-surface-bg text-ink-primary font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-[rgba(15,15,14,0.92)] border-b border-surface-line px-6 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-[13px] font-semibold tracking-wide">우리집 자산 브리핑</h1>
          <p className="text-[10px] text-ink-muted mt-0.5">기준일 {REPORT_DATE} · 자산관리 매니저 분석</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          <span className="text-[10px] text-ink-muted">2026.04.07</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-10">

        {/* ① 핵심지표 */}
        <section className="fade-in fade-in-1">
          <SectionHeader index="①" title="재무상태 핵심지표" sub="2026.04.07 기준" />
          <div className="grid grid-cols-3 gap-2 mb-2">
            <MetricCard label="총자산" value={fmt억(keyMetrics.totalAssets)} sub={fmtWon(keyMetrics.totalAssets)} large />
            <MetricCard label="총부채" value={`-${fmt억(keyMetrics.totalLiabilities)}`} sub={fmtWon(keyMetrics.totalLiabilities)} accent="red" large />
            <MetricCard label="순자산" value={fmt억(keyMetrics.netWorth)} sub={`거주제외 ${fmt억(keyMetrics.netWorthExHome)}`} large />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <MetricCard label="금융자산 합계" value={fmt억(keyMetrics.financialAssets)} sub={`매입대비 +${keyMetrics.financialAssetReturn}%`} accent="blue" />
            <MetricCard label="부부 월소득 합계" value={fmt억(keyMetrics.monthlyIncome)} sub={`근로 ${fmt억(keyMetrics.monthlyEarned)} + 자산 ${fmt억(keyMetrics.monthlyPassive)}`} />
            <MetricCard label="월 자산소득" value={fmt억(keyMetrics.monthlyPassive)} sub={`목표 ${fmt억(keyMetrics.monthlyPassiveGoal)} 대비 ${((keyMetrics.monthlyPassive / keyMetrics.monthlyPassiveGoal) * 100).toFixed(1)}%`} accent="amber" />
          </div>
        </section>

        {/* ② 자산 구성 */}
        <section className="fade-in fade-in-2">
          <SectionHeader index="②" title="자산 구성 상세" />
          <div className="grid grid-cols-2 gap-3">
            <Card title={`금융자산 · ${fmt억(keyMetrics.financialAssets)}`}>
              {financialAssets.map(a => (
                <BarRow key={a.label} label={a.label} value={fmt억(a.amount)} pct={a.pct} color={a.color} />
              ))}
            </Card>
            <Card title="부동산 · 22.25억">
              {realEstate.map(r => (
                <DataRow key={r.label} label={r.label} value={fmt억(r.amount)} />
              ))}
              <div className="mt-3 pt-2 border-t border-surface-line text-[10px] text-ink-muted">
                월세수입 {fmtWon(realEstateRent.amount)} (이튼브라운, 수익률 {realEstateRent.yield}%)
              </div>
            </Card>
          </div>
        </section>

        {/* ③ 부채 */}
        <section className="fade-in fade-in-3">
          <SectionHeader index="③" title="부채 상세" sub="967,800,000원" />
          <div className="grid grid-cols-2 gap-3">
            <Card title="사금융채무 (처분자금으로 상환 예정)">
              {liabilities.private.map(l => (
                <DataRow key={l.label} label={l.label} value={fmt억(l.amount)} valueColor={l.interest > 0 ? 'amber' : 'default'} />
              ))}
              <p className="text-[10px] text-accent-amber mt-2 pt-2 border-t border-surface-line">장모님 이자: 연 약 780만원 발생 중</p>
            </Card>
            <Card title="임대보증금 (전세·반전세)">
              {liabilities.deposit.map(l => (
                <DataRow key={l.label} label={l.label} value={fmt억(l.amount)} />
              ))}
              <p className="text-[10px] text-ink-muted mt-2 pt-2 border-t border-surface-line">임차인 퇴거 시 반환 의무</p>
            </Card>
          </div>
        </section>

        {/* ④ 현주 포트 */}
        <section className="fade-in fade-in-4">
          <SectionHeader index="④" title="현주 미래에셋 미국주식 포트" sub={`${fmt억(403_220_093)} (+5.4%)`} />
          <div className="grid grid-cols-2 gap-3">
            <Card title={`미국 인컴포트 · ${fmt억(hyeonjuIncome.total)}`}>
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-surface-line">
                <span className="text-[10px] text-ink-muted">포트 총수익률</span>
                <ReturnBadge value={hyeonjuIncome.totalReturn} />
              </div>
              {hyeonjuIncome.items.map(item => (
                <div key={item.ticker} className="flex justify-between items-center py-[5px] border-b border-surface-line last:border-b-0">
                  <div>
                    <span className="num text-[11px] font-medium text-ink-primary">{item.ticker}</span>
                    <span className="text-[10px] text-ink-muted ml-1.5">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="num text-[10px] text-ink-muted">{item.pct}%</span>
                    {item.return !== null
                      ? <ReturnBadge value={item.return} />
                      : item.amount != null && <span className="num text-[11px] text-ink-secondary">{fmt억(item.amount)}</span>
                    }
                  </div>
                </div>
              ))}
            </Card>
            <div className="space-y-3">
              <Card title="성장 · 코어 · 개별종목">
                {hyeonjuGrowth.map(g => (
                  <div key={g.label} className="flex justify-between items-center py-[5px] border-b border-surface-line last:border-b-0">
                    <span className="text-[11px] text-ink-secondary">{g.label}</span>
                    <ReturnBadge value={g.return} />
                  </div>
                ))}
              </Card>
              <Card title="미국코어성장 종목별">
                {hyeonjuCore.map(c => (
                  <div key={c.ticker} className="flex justify-between items-center py-[5px] border-b border-surface-line last:border-b-0">
                    <div>
                      <span className="num text-[11px] font-medium text-ink-primary">{c.ticker}</span>
                      {c.note && <span className="text-[9px] text-ink-muted ml-1.5">{c.note}</span>}
                    </div>
                    <ReturnBadge value={c.return} />
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </section>

        {/* ⑤ 남석 포트 */}
        <section className="fade-in fade-in-5">
          <SectionHeader index="⑤" title="남석 포트폴리오" sub={`${fmt억(268_596_444)} (+9.4%)`} />
          <div className="grid grid-cols-2 gap-3">
            <Card title={`미래에셋 종합 · ${fmt억(namsukMiraeasset.total)} (+${namsukMiraeasset.totalReturn}%)`}>
              {namsukMiraeasset.items.map(item => (
                <div key={item.label} className="flex justify-between items-center py-[5px] border-b border-surface-line last:border-b-0">
                  <span className="text-[11px] text-ink-secondary">{item.label}</span>
                  <ReturnBadge value={item.return} />
                </div>
              ))}
            </Card>
            <Card title="연금저축 · ISA · IRP">
              {namsukPension.map(p => (
                <div key={p.label} className="flex justify-between items-center py-[5px] border-b border-surface-line last:border-b-0">
                  <div>
                    <span className="text-[11px] text-ink-secondary">{p.label}</span>
                    {p.subtitle && <span className="text-[9px] text-ink-muted ml-1.5">{p.subtitle}</span>}
                  </div>
                  <ReturnBadge value={p.return} />
                </div>
              ))}
              <div className="mt-3 pt-2 border-t border-surface-line text-[10px] text-ink-muted leading-relaxed">
                연금저축2에 SOL CD금리&amp;MMF (7.6M) 단기자금 대기 중<br />
                KB연금저축1 KIWOOM200TR <span className="text-accent-green">+151.5%</span> (장기 보유 효과)
              </div>
            </Card>
          </div>
        </section>

        {/* ⑥ 퇴직금 */}
        <section className="fade-in fade-in-6">
          <SectionHeader index="⑥" title="퇴직금 현황 vs 은퇴 추정치" />
          <div className="grid grid-cols-2 gap-3">
            <Card title={`남석 · ${retirement.namsuk.type} · 입사 ${retirement.namsuk.joined}`}>
              <DataRow label="현재 예상퇴직금 (세전)"  value={fmt억(retirement.namsuk.currentEstimate)} />
              <DataRow label="일 평균임금"             value={`${retirement.namsuk.dailyAvgWage.toLocaleString()}원`} />
              <DataRow label={`${retirement.namsuk.retireYear}년 퇴직 추정치`} value={`~${fmt억(retirement.namsuk.retireEstimate)}`} valueColor="green" />
              <DataRow label="현재→은퇴 증가 배수"    value={`약 ${retirement.namsuk.multiplier}배`} />
              <div className="mt-2 pt-2 border-t border-surface-line text-[10px] text-ink-muted">재직 {retirement.namsuk.days.toLocaleString()}일 경과</div>
            </Card>
            <Card title={`현주 · ${retirement.hyeonju.type} · 입사 ${retirement.hyeonju.joined}`}>
              <DataRow label="현재 예상퇴직금 (세전)"  value={fmt억(retirement.hyeonju.currentEstimate)} />
              <DataRow label="일 평균임금"             value={`${retirement.hyeonju.dailyAvgWage.toLocaleString()}원`} />
              <DataRow label={`${retirement.hyeonju.retireYear}년 퇴직 추정치`} value={`~${fmt억(retirement.hyeonju.retireEstimate)}`} valueColor="green" />
              <DataRow label="현재 3개월 급여 환산"    value={`월 ${fmt억(retirement.hyeonju.monthlySalaryEquiv)}`} />
              <div className="mt-2 pt-2 border-t border-surface-line text-[10px] text-ink-muted">재직 {retirement.hyeonju.days.toLocaleString()}일 경과</div>
            </Card>
          </div>
        </section>

        {/* ⑦ 순자산 추이 */}
        <section className="fade-in fade-in-7">
          <SectionHeader index="⑦" title="순자산 성장 추이" />
          <Card>
            <NetWorthChart />
            <p className="text-[10px] text-ink-muted mt-3 pt-2 border-t border-surface-line">
              23년 부동산 시장 하락기에 일시 감소 후, 24~26년 회복·성장 중
            </p>
          </Card>
        </section>

        {/* ⑧ 2030 목표 */}
        <section className="fade-in fade-in-8">
          <SectionHeader index="⑧" title="2030년 목표 달성 현황" />
          <Card>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <GoalProgress label="순자산 목표" current={fmt억(goals2030.netWorthCurrent)} target="30억" pct={netWorthPct} accent="blue" />
              <GoalProgress label="월 자산소득 목표" current={fmt억(goals2030.passiveIncomeCurrent)} target={fmt억(goals2030.passiveIncomeTarget)} pct={passivePct} accent="amber" />
            </div>
            <p className="text-[11px] text-ink-secondary pt-3 border-t border-surface-line leading-relaxed">
              순자산은 {netWorthPct.toFixed(0)}% 달성 중이나, 월 자산소득은 {passivePct.toFixed(1)}%로 큰 격차 존재 — 금융자산 비중 확대 및 배당 포트 강화가 핵심 과제
            </p>
          </Card>
        </section>

        {/* ⑨ 주목 포인트 */}
        <section className="fade-in fade-in-9">
          <SectionHeader index="⑨" title="매니저 시각 — 주목 포인트" />
          <div className="space-y-2">
            {alerts.map((a, i) => {
              const accentMap = { warn:'warn' as const, info:'blue' as const, green:'green' as const }
              const titleColorMap = { warn:'text-accent-amber', info:'text-accent-blue', green:'text-accent-green' }
              return (
                <Card key={i} accent={accentMap[a.level]}>
                  <div className={`text-[12px] font-medium mb-1 ${titleColorMap[a.level]}`}>{a.title}</div>
                  <div className="text-[11px] text-ink-secondary">{a.desc}</div>
                </Card>
              )
            })}
          </div>
        </section>

        <footer className="text-[10px] text-ink-muted pt-4 pb-8 border-t border-surface-line">
          우리집 자산관리 브리핑 · 2026.04.07 · CRCL은 예외 유지 종목 (아내픽)
        </footer>
      </main>
    </div>
  )
}
