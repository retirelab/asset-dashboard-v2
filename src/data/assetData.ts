// ============================================================
// 우리집 자산 브리핑 — 중위가구 샘플 데이터
// Phase 2에서 사용자 직접 입력으로 교체 예정
// ============================================================

// ─── 사용자 프로필 (추후 입력 기능으로 대체) ─────────────────
export const userProfile = {
  name: '홍길동',
  birthYear: 1985,
  retireTargetAge: 60,
  get retireTargetYear() { return this.birthYear + this.retireTargetAge },
  get currentAge() { return new Date().getFullYear() - this.birthYear },
  get yearsToRetire() { return this.retireTargetYear - new Date().getFullYear() },
}

// ─── 핵심 지표 ───────────────────────────────────────────────
export const keyMetrics = {
  totalAssets:           382_500_000,
  totalLiabilities:       87_000_000,
  netWorth:              295_500_000,
  netWorthExHome:         95_500_000,
  financialAssets:        82_500_000,
  financialAssetReturn:    4.1,
  monthlyIncome:          5_500_000,
  monthlyEarned:          5_200_000,
  monthlyPassive:           300_000,
  todayReturn:            1_240_000,
  todayReturnPct:              0.42,
}

// ─── 금융 계좌 목록 ───────────────────────────────────────────
export const accounts = [
  {
    id: 'a1',
    bank: '미래에셋증권',
    bankColor: '#00428B',
    bankInitial: 'M',
    name: '종합 주식',
    number: '548-6056-8624-0',
    amount: 18_500_000,
    returnAmt:  760_000,
    returnPct:   4.3,
    type: '주식',
  },
  {
    id: 'a2',
    bank: '미래에셋증권',
    bankColor: '#00428B',
    bankInitial: 'M',
    name: 'ISA (중개형)',
    number: '548-6056-8624-1',
    amount: 7_000_000,
    returnAmt:  356_000,
    returnPct:   5.4,
    type: 'ISA',
  },
  {
    id: 'a3',
    bank: 'KB증권',
    bankColor: '#FFBC00',
    bankInitial: 'KB',
    name: '연금저축펀드',
    number: '33908130101',
    amount: 14_000_000,
    returnAmt: 1_120_000,
    returnPct:   8.7,
    type: '연금저축',
  },
  {
    id: 'a4',
    bank: 'KB증권',
    bankColor: '#FFBC00',
    bankInitial: 'KB',
    name: 'IRP',
    number: '33908130102',
    amount: 9_500_000,
    returnAmt:  640_000,
    returnPct:   7.2,
    type: 'IRP',
  },
  {
    id: 'a5',
    bank: '카카오뱅크',
    bankColor: '#FAE100',
    bankInitial: 'K',
    name: '예·적금',
    number: '3333-12-3456789',
    amount: 28_000_000,
    returnAmt:  840_000,
    returnPct:   3.1,
    type: '예금',
  },
  {
    id: 'a6',
    bank: '토스뱅크',
    bankColor: '#0064FF',
    bankInitial: 'T',
    name: 'CMA·비상예비금',
    number: '1000-1234-5678',
    amount: 5_500_000,
    returnAmt:   82_000,
    returnPct:   1.5,
    type: 'CMA',
  },
]

// ─── 부동산 목록 ──────────────────────────────────────────────
export const properties = [
  {
    id: 'p1',
    name: '수도권 아파트',
    address: '경기도 ○○시 ○○동 ○○아파트 ○○○호',
    type: '자가',
    area: '84㎡',
    amount: 280_000_000,
    purchaseAmt: 240_000_000,
    returnPct: 16.7,
    monthlyRent: 0,
    memo: '주거용 자가',
    color: '#3182F6',
  },
  {
    id: 'p2',
    name: '소형 오피스텔',
    address: '서울시 ○○구 ○○동 ○○○호',
    type: '임대',
    area: '33㎡',
    amount: 20_000_000,
    purchaseAmt: 20_000_000,
    returnPct: 0,
    monthlyRent: 150_000,
    memo: '전세보증금 2,000만 / 월세 15만',
    color: '#0DC381',
  },
]

// ─── 순자산 추이 ──────────────────────────────────────────────
export const netWorthHistory = [
  { date: '22.06', total: 285_000_000, debt: 110_000_000, net: 175_000_000, financial: 28_000_000, realestate: 257_000_000 },
  { date: '22.12', total: 305_000_000, debt: 105_000_000, net: 200_000_000, financial: 35_000_000, realestate: 270_000_000 },
  { date: '23.06', total: 288_000_000, debt: 108_000_000, net: 180_000_000, financial: 31_000_000, realestate: 257_000_000 },
  { date: '23.12', total: 312_000_000, debt: 102_000_000, net: 210_000_000, financial: 45_000_000, realestate: 267_000_000 },
  { date: '24.06', total: 338_000_000, debt:  96_000_000, net: 242_000_000, financial: 55_000_000, realestate: 283_000_000 },
  { date: '24.12', total: 352_000_000, debt:  93_000_000, net: 259_000_000, financial: 63_000_000, realestate: 289_000_000 },
  { date: '25.06', total: 361_000_000, debt:  90_000_000, net: 271_000_000, financial: 70_000_000, realestate: 291_000_000 },
  { date: '26.04', total: 382_500_000, debt:  87_000_000, net: 295_500_000, financial: 82_500_000, realestate: 300_000_000 },
]

// ─── 월별 수익 ────────────────────────────────────────────────
export const monthlyReturns = [
  { month: '25.10', amount:  520_000 },
  { month: '25.11', amount:  380_000 },
  { month: '25.12', amount: -120_000 },
  { month: '26.01', amount:  760_000 },
  { month: '26.02', amount:  430_000 },
  { month: '26.03', amount:  -80_000 },
  { month: '26.04', amount: 1_240_000 },
]

// ─── 목표 ─────────────────────────────────────────────────────
export const goals = {
  netWorthTarget:       500_000_000,
  netWorthCurrent:      295_500_000,
  passiveIncomeTarget:    2_000_000,
  passiveIncomeCurrent:     300_000,
  monthlySaving:            800_000,
  expectedReturn:               5.0,
}

// ─── 퇴직금 ───────────────────────────────────────────────────
export const retirement = {
  spouse1: {
    name: '배우자A', type: 'DC형', joinedYear: 2013,
    currentEstimate: 32_500_000, retireEstimate: 115_000_000,
  },
  spouse2: {
    name: '배우자B', type: 'DB형', joinedYear: 2016,
    currentEstimate: 18_200_000, retireEstimate:  92_000_000,
  },
}

// ─── 알림 ─────────────────────────────────────────────────────
export type AlertLevel = 'warn' | 'info' | 'green'
export const alerts: { level: AlertLevel; title: string; desc: string }[] = [
  { level: 'warn',  title: '마이너스통장 700만원 — 연 5.2% 이자 발생 중', desc: '비상예비금 CMA 활용해 우선 상환 검토' },
  { level: 'info',  title: 'ISA 납입 여유분 연 700만원 미사용', desc: '연말 전 추가 납입으로 배당소득세 비과세 가능' },
  { level: 'green', title: '연금저축 세액공제 한도 달성', desc: '부부 합산 연금저축+IRP 납입액 세액공제 기준 도달' },
]

// ─── 유틸 ─────────────────────────────────────────────────────
export function fmt억(n: number): string {
  const abs = Math.abs(n)
  const sign = n < 0 ? '-' : ''
  if (abs >= 1_0000_0000) return `${sign}${(abs / 1_0000_0000).toFixed(1)}억`
  if (abs >= 1_000_0000)  return `${sign}${(abs / 1_000_0000).toFixed(0)}천만`
  if (abs >= 10_000)      return `${sign}${Math.round(abs / 10_000)}만`
  return `${sign}${abs.toLocaleString()}원`
}
export const fmtWon  = (n: number) => n.toLocaleString('ko-KR') + '원'
export const fmtSign = (n: number) => n >= 0 ? `+${fmt억(n)}` : fmt억(n)
export const fmtPct  = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`