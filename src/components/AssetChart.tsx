import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { useTheme } from '../context/ThemeContext'
import { netWorthHistory, monthlyReturns } from '../data/assetData'

Chart.register(...registerables)

export default function AssetChart() {
  const { isDark } = useTheme()
  const lineRef   = useRef<HTMLCanvasElement>(null)
  const barRef    = useRef<HTMLCanvasElement>(null)
  const lineChart = useRef<Chart | null>(null)
  const barChart  = useRef<Chart | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const avgReturn = Math.round(
    monthlyReturns.reduce((s, d) => s + d.amount, 0) / monthlyReturns.length / 10_000
  )

  useEffect(() => {
    setIsLoaded(true)
    if (!lineRef.current || !barRef.current) return

    lineChart.current?.destroy()
    barChart.current?.destroy()

    const labelColor = isDark ? '#6B6B75' : '#adb5bd'
    const gridColor  = isDark ? '#2A2A2E' : '#f2f4f7'
    const tooltipBg  = isDark ? '#1A1A1C' : '#191f28'

    lineChart.current = new Chart(lineRef.current, {
      type: 'line',
      data: {
        labels: netWorthHistory.map(d => d.date),
        datasets: [
          {
            label: '총자산',
            data: netWorthHistory.map(d => d.total / 1_0000_0000),
            borderColor: '#3182F6',
            backgroundColor: 'rgba(49,130,246,0.05)',
            fill: true, tension: 0.4, borderWidth: 3,
            pointRadius: 0, hoverRadius: 5,
          },
          {
            label: '순자산',
            data: netWorthHistory.map(d => d.net / 1_0000_0000),
            borderColor: '#0DC381',
            backgroundColor: 'rgba(13,195,129,0.05)',
            fill: true, tension: 0.4, borderWidth: 3,
            pointRadius: 0, hoverRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1500, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: tooltipBg,
            padding: 12,
            titleFont: { size: 12, weight: 'bold' },
            bodyFont: { size: 12, weight: 'bold' },
            cornerRadius: 12,
            displayColors: true,
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${(ctx.parsed.y ?? 0).toFixed(1)}억`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: labelColor, font: { size: 11, weight: 'bold' } },
          },
          y: {
            border: { display: false },
            grid: { color: gridColor },
            ticks: {
              color: labelColor,
              font: { size: 11, weight: 'bold' },
              callback: v => `${v}억`,
            },
          },
        },
      },
    })

    barChart.current = new Chart(barRef.current, {
      type: 'bar',
      data: {
        labels: monthlyReturns.map(d => d.month),
        datasets: [{
          data: monthlyReturns.map(d => d.amount / 10_000),
          backgroundColor: monthlyReturns.map(d =>
            d.amount >= 0 ? '#f04452' : '#3182f6'
          ),
          borderRadius: 8,
          barThickness: 20,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1500, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: tooltipBg,
            padding: 12,
            cornerRadius: 12,
            callbacks: {
              label: ctx => {
                const v = ctx.parsed.y ?? 0
                return ` ${v > 0 ? '+' : ''}${v.toFixed(0)}만원`
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: labelColor, font: { size: 11, weight: 'bold' } },
          },
          y: {
            border: { display: false },
            grid: { color: gridColor },
            ticks: {
              color: labelColor,
              font: { size: 11, weight: 'bold' },
              callback: v => `${v}만`,
            },
          },
        },
      },
    })

    return () => {
      lineChart.current?.destroy()
      barChart.current?.destroy()
    }
  }, [isDark])

  const cardStyle = isDark
    ? 'bg-dk-card border border-dk-border rounded-[28px] p-8 transition-all duration-1000'
    : 'bg-white rounded-[28px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white transition-all duration-1000'

  const t = isDark ? 'text-dk-text'  : 'text-[#191f28]'
  const s = isDark ? 'text-dk-sub'   : 'text-[#4e5968]'
  const m = isDark ? 'text-dk-muted' : 'text-[#8b95a1]'

  return (
    <div className={`space-y-6 transition-all duration-700 ${
      isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`}>

      {/* 순자산 추이 카드 */}
      <div className={cardStyle}>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-6 bg-[#3182f6] rounded-full" />
          <h3 className={`text-xl font-extrabold ${t}`}>순자산 변화 추이</h3>
        </div>
        <div className="h-[200px] w-full">
          <canvas ref={lineRef} />
        </div>
        <div className="flex justify-center gap-6 mt-6">
          {[
            { label: '총자산', color: '#3182f6' },
            { label: '순자산', color: '#0dc381' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
              <span className={`text-xs font-bold ${s}`}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 월별 수익 카드 */}
      <div className={cardStyle}>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-6 bg-[#f04452] rounded-full" />
          <h3 className={`text-xl font-extrabold ${t}`}>월별 투자 수익</h3>
        </div>
        <div className="h-[160px] w-full">
          <canvas ref={barRef} />
        </div>
        <p className={`mt-4 text-[11px] font-bold text-center ${m}`}>
          최근 {monthlyReturns.length}개월 평균{' '}
          <span className={avgReturn >= 0 ? 'text-[#f04452]' : 'text-[#3182f6]'}>
            {avgReturn >= 0 ? '+' : ''}{avgReturn}만원
          </span>
          의 수익을 올렸어요
        </p>
      </div>

    </div>
  )
}