// ============================================================
// 대한민국 중위가구 자산 브리핑 (2025년 통계청 기준 참고)
// 4인 맞벌이 가구 · 수도권 거주 기준
// ============================================================

export const REPORT_DATE = '2026년 4월 7일'

// ─── 핵심 지표 ───────────────────────────────────────────────
export const keyMetrics = {
  totalAssets:          382_500_000,   // 총자산 3.8억
  totalLiabilities:      87_000_000,   // 총부채 8,700만
  netWorth:             295_500_000,   // 순자산 2.96억
  netWorthExHome:        95_500_000,   // 거주 제외 순자산 9,550만
  financialAssets:       82_500_000,   // 금융자산 8,250만
  financialAssetReturn:   4.1,         // 매입대비 수익률
  monthlyIncome:          5_500_000,   // 부부 합산 월소득 550만
  monthlyEarned:          5_200_000,   // 근로소득 520만
  monthlyPassive:           300_000,   // 자산소득 30만
  monthlyPassiveGoal:     2_000_000,   // 목표 자산소득 200만
}

// ─── 금융자산 내역 ────────────────────────────────────────────
export const financialAssets = [
  { label: '은행 예·적금',             amount: 28_000_000, color: '#4b8ef5', pct: 33.9 },
  { label: '국내주식 (ETF·개별종목)',   amount: 18_500_000, color: '#4caf82', pct: 22.4 },
  { label: '연금저축 (부부 합산)',      amount: 14_000_000, color: '#7b6cf5', pct: 17.0 },
  { label: 'IRP (부부 합산)',           amount:  9_500_000, color: '#38b6b6', pct: 11.5 },
  { label: 'ISA',                       amount:  7_000_000, color: '#e8a94b', pct:  8.5 },
  { label: 'CMA · MMF (비상예비금)',    amount:  5_500_000, color: '#e05555', pct:  6.7 },
]

// ─── 부동산 ───────────────────────────────────────────────────
export const realEstate = [
  { label: '아파트 (수도권 외곽 · 자가)',   amount: 280_000_000 },
  { label: '전세보증금 (소형 오피스텔)',     amount: 20_000_000 },
]
export const realEstateRent = { amount: 150_000, yield: 3.6 }

// ─── 부채 ─────────────────────────────────────────────────────
export const liabilities = {
  private: [
    { label: '주택담보대출 (연 3.8%)',    amount: 60_000_000, interest: 3.8 },
    { label: '마이너스통장 (연 5.2%)',    amount:  7_000_000, interest: 5.2 },
  ],
  deposit: [
    { label: '오피스텔 전세보증금 반환',  amount: 20_000_000 },
  ],
}

// ─── 배우자A 포트폴리오 ────────────────────────────────────────
export const hyeonjuIncome = {
  total: 38_500_000,
  totalReturn: 3.2,
  items: [
    { ticker: 'TIGER 미국S&P500',  label: '미국 지수 추종',   pct: 28.0, amount: 10_780_000, return: null },
    { ticker: 'KODEX 배당성장',    label: '국내 배당',        pct: 18.0, amount:  6_930_000, return:  5.1 },
    { ticker: 'TIGER 국채10년',    label: '장기 국채',        pct: 15.0, amount: null,        return:  2.3 },
    { ticker: 'KODEX 금현물',      label: '금 ETF',           pct: 12.0, amount: null,        return:  8.7 },
    { ticker: 'ARIRANG 고배당주',  label: '고배당',           pct: 11.0, amount: null,        return:  4.2 },
    { ticker: 'TIGER CD금리투자',  label: '단기자금',         pct:  9.0, amount: null,        return:  3.7 },
    { ticker: 'KBSTAR ESG채권',    label: 'ESG 채권',         pct:  7.0, amount: null,        return:  1.9 },
  ],
}

export const hyeonjuGrowth = [
  { label: '국내 성장주 ETF (IT·반도체)', return:  9.4 },
  { label: '해외 배당성장 ETF (SCHD 등)', return:  6.7 },
  { label: '개별종목 (삼성전자·현대차)',  return: -3.1 },
]

export const hyeonjuCore = [
  { ticker: '삼성전자',   return:  -4.2, note: '' },
  { ticker: '현대차',     return:   8.3, note: '' },
  { ticker: 'SK하이닉스', return:  12.1, note: '' },
  { ticker: 'NAVER',      return:  -6.8, note: '' },
  { ticker: 'POSCO홀딩스',return:   3.5, note: '' },
  { ticker: 'KB금융',     return:  11.2, note: '' },
  { ticker: '카카오',     return: -18.4, note: '장기보유 중' },
]

// ─── 배우자B 포트폴리오 ───────────────────────────────────────
export const namsukMiraeasset = {
  total: 24_000_000,
  totalReturn: 5.8,
  items: [
    { label: 'KODEX 미국배당다우존스',  return: 14.3 },
    { label: 'TIGER 미국나스닥100',     return:  8.6 },
    { label: 'KODEX 국고채10년',        return:  2.1 },
    { label: 'TIGER KRX금현물',         return: 11.4 },
    { label: 'ARIRANG 미국단기채권',    return:  4.2 },
    { label: 'KODEX 한국부동산리츠',    return:  3.7 },
  ],
}

export const namsukPension = [
  { label: '연금저축펀드 (배우자B)', subtitle: '세공O', return:  9.2 },
  { label: 'IRP (배우자B)',          subtitle: '세공O', return:  7.8 },
  { label: 'ISA (배우자B)',          subtitle: '',      return:  5.1 },
  { label: '연금저축펀드 (배우자A)', subtitle: '세공O', return:  6.3 },
]

// ─── 퇴직금 ───────────────────────────────────────────────────
export const retirement = {
  namsuk: {
    joined: '2016.03',
    type: 'DB형',
    days: 3_684,
    currentEstimate: 18_200_000,
    dailyAvgWage: 158_000,
    retireYear: 2046,
    retireEstimate: 92_000_000,
    multiplier: 5.1,
  },
  hyeonju: {
    joined: '2013.07',
    type: 'DC형',
    days: 4_659,
    currentEstimate: 32_500_000,
    dailyAvgWage: 210_000,
    retireYear: 2043,
    retireEstimate: 115_000_000,
    monthlySalaryEquiv: 6_300_000,
  },
}

// ─── 순자산 추이 ──────────────────────────────────────────────
export const netWorthHistory = [
  { date: '22.06', total: 285_000_000, debt: 110_000_000, net: 175_000_000, financial:  28_000_000, realestate: 257_000_000, isCurrent: false },
  { date: '22.12', total: 305_000_000, debt: 105_000_000, net: 200_000_000, financial:  35_000_000, realestate: 270_000_000, isCurrent: false },
  { date: '23.06', total: 288_000_000, debt: 108_000_000, net: 180_000_000, financial:  31_000_000, realestate: 257_000_000, isCurrent: false },
  { date: '23.12', total: 312_000_000, debt: 102_000_000, net: 210_000_000, financial:  45_000_000, realestate: 267_000_000, isCurrent: false },
  { date: '24.06', total: 338_000_000, debt:  96_000_000, net: 242_000_000, financial:  55_000_000, realestate: 283_000_000, isCurrent: false },
  { date: '24.12', total: 352_000_000, debt:  93_000_000, net: 259_000_000, financial:  63_000_000, realestate: 289_000_000, isCurrent: false },
  { date: '25.06', total: 361_000_000, debt:  90_000_000, net: 271_000_000, financial:  70_000_000, realestate: 291_000_000, isCurrent: false },
  { date: '26.04', total: 382_500_000, debt:  87_000_000, net: 295_500_000, financial:  82_500_000, realestate: 300_000_000, isCurrent: true  },
]

// ─── 2030 목표 ────────────────────────────────────────────────
export const goals2030 = {
  netWorthTarget:        500_000_000,   // 목표 순자산 5억
  netWorthCurrent:       295_500_000,
  passiveIncomeTarget:   2_000_000,     // 목표 월 자산소득 200만
  passiveIncomeCurrent:    300_000,
}

// ─── 알림 ─────────────────────────────────────────────────────
export type AlertLevel = 'warn' | 'info' | 'green'
export const alerts: { level: AlertLevel; title: string; desc: string }[] = [
  {
    level: 'warn',
    title: '마이너스통장 잔액 700만원 — 연 5.2% 이자 발생 중',
    desc: '월 약 3만원 이자 비용. 비상예비금(CMA) 550만원 활용해 우선 상환 검토 필요',
  },
  {
    level: 'info',
    title: 'ISA 납입 여유분 연 2,000만 한도 중 700만 미사용',
    desc: '절세 계좌 여유 구간 활용 미흡. 연말 전 추가 납입으로 배당소득세 비과세 혜택 가능',
  },
  {
    level: 'green',
    title: '연금저축 세액공제 한도 900만원 — 현재 달성률 양호',
    desc: '부부 합산 연금저축+IRP 납입액이 세액공제 기준 도달. 연말 납입 스케줄 유지 중',
  },
]

// ─── 유틸 ─────────────────────────────────────────────────────
export function fmt억(n: number): string {
  if (n >= 1_0000_0000) return `${(n / 1_0000_0000).toFixed(1)}억`
  if (n >= 1_000_0000)  return `${(n / 1_000_0000).toFixed(0)}천만`
  if (n >= 10_000)      return `${Math.round(n / 10_000)}만`
  return n.toLocaleString('ko-KR') + '원'
}
export function fmtWon(n: number): string {
  return n.toLocaleString('ko-KR') + '원'
}
