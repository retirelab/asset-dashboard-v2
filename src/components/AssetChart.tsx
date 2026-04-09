import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { netWorthHistory, monthlyReturns } from '../data/assetData'
import { useTheme } from '../context/ThemeContext'

Chart.register(...registerables)

export default function AssetChart() {
  const { isDark } = useTheme()
  const lineRef = useRef<HTMLCanvasElement>(null)
  const barRef  = useRef<HTMLCanvasElement>(null)
  const lineChart = useRef<Chart | null>(null)
  const barChart  = useRef<Chart | null>(null)

  const grid  = isDark ? '#222226' : '#E5E8EB'
  const label = isDark ? '#6B6B75' : '#8B95A1'

  useEffect(() => {
    if (!lineRef.current || !barRef.current) return
    lineChart.current?.destroy()
    barChart.current?.destroy()

    lineChart.current = new Chart(lineRef.current, {
      type: 'line',
      data: {
        labels: netWorthHistory.map(d => d.date),
        datasets: [
          {
            label: '총자산',
            data: netWorthHistory.map(d => d.total / 1_0000_0000),
            borderColor: '#3182F6',
            backgroundColor: 'rgba(49,130,246,0.08)',
            fill: true, tension: 0.4, borderWidth: 2,
            pointRadius: 3, pointBackgroundColor: '#3182F6',
          },
          {
            label: '순자산',
            data: netWorthHistory.map(d => d.net / 1_0000_0000),
            borderColor: '#0DC381',
            backgroundColor: 'rgba(13,195,129,0.08)',
            fill: true, tension: 0.4, borderWidth: 2,
            pointRadius: 3, pointBackgroundColor: '#0DC381',
          },
          {
            label: '총부채',
            data: netWorthHistory.map(d => d.debt / 1_0000_0000),
            borderColor: '#F04452',
            borderDash: [4, 3],
            backgroundColor: 'transparent',
            fill: false, tension: 0.4, borderWidth: 1.5,
            pointRadius: 2, pointBackgroundColor: '#F04452',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? '#1A1A1C' : '#fff',
            titleColor: isDark ? '#fff' : '#191F28',
            bodyColor: isDark ? '#B0B0B8' : '#4E5968',
            borderColor: isDark ? '#333' : '#E5E8EB',
            borderWidth: 1, padding: 10,
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${(ctx.parsed.y ?? 0).toFixed(1)}억`,
            },
          },
        },
        scales: {
          x: { grid: { color: grid }, ticks: { color: label, font: { size: 10 } } },
          y: {
            grid: { color: grid },
            ticks: { color: label, font: { size: 10 }, callback: v => `${v}억` },
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
            d.amount >= 0 ? 'rgba(240,68,82,0.75)' : 'rgba(49,130,246,0.75)'
          ),
          borderRadius: 3,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? '#1A1A1C' : '#fff',
            titleColor: isDark ? '#fff' : '#191F28',
            bodyColor: isDark ? '#B0B0B8' : '#4E5968',
            borderColor: isDark ? '#333' : '#E5E8EB',
            borderWidth: 1,
            callbacks: {
              label: ctx => {
                const v = ctx.parsed.y ?? 0
                return ` ${v > 0 ? '+' : ''}${v.toFixed(0)}만원`
              },
            },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: label, font: { size: 10 } } },
          y: {
            grid: { color: grid },
            ticks: { color: label, font: { size: 10 }, callback: v => `${v}만` },
          },
        },
      },
    })

    return () => {
      lineChart.current?.destroy()
      barChart.current?.destroy()
    }
  }, [isDark])

  return (
    <div className="space-y-4">
      <div>
        <p className={`text-[11px] font-medium mb-2 ${isDark ? 'text-dk-muted' : 'text-lt-muted'}`}>
          순자산 추이 (억원)
        </p>
        <div className="h-[160px]"><canvas ref={lineRef} /></div>
      </div>
      <div>
        <p className={`text-[11px] font-medium mb-2 ${isDark ? 'text-dk-muted' : 'text-lt-muted'}`}>
          월별 수익 (만원)
        </p>
        <div className="h-[100px]"><canvas ref={barRef} /></div>
      </div>
    </div>
  )
}