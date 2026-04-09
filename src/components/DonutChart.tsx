import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

interface Slice {
  label: string
  value: number
  color: string
}

interface Props {
  slices: Slice[]
  size?: number
  thickness?: number
  centerLabel?: string
  centerValue?: string
}

export default function DonutChart({
  slices,
  size = 160,
  thickness = 28,
  centerLabel = '총자산',
  centerValue = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width  = size * dpr
    canvas.height = size * dpr
    canvas.style.width  = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const cx = size / 2
    const cy = size / 2
    const r  = (size - thickness) / 2 - 4
    const total = slices.reduce((s, sl) => s + sl.value, 0)

    ctx.clearRect(0, 0, size, size)

    // 배경 원
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = isDark ? '#2A2A2E' : '#E5E8EB'
    ctx.lineWidth = thickness
    ctx.lineCap = 'butt'
    ctx.stroke()

    // 슬라이스
    let startAngle = -Math.PI / 2
    slices.forEach((sl, i) => {
      const sweep = (sl.value / total) * Math.PI * 2
      ctx.beginPath()
      ctx.arc(cx, cy, r, startAngle, startAngle + sweep)
      ctx.strokeStyle = sl.color
      ctx.lineWidth = thickness
      ctx.lineCap = i === slices.length - 1 ? 'butt' : 'butt'
      ctx.stroke()
      startAngle += sweep
    })

    // 중앙 텍스트
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const textColor = isDark ? '#FFFFFF' : '#191F28'
    const mutedColor = isDark ? '#6B6B75' : '#8B95A1'

    if (centerValue) {
      ctx.font = `800 ${size * 0.14}px "Nanum Gothic", sans-serif`
      ctx.fillStyle = textColor
      ctx.fillText(centerValue, cx, cy - size * 0.08)

      ctx.font = `400 ${size * 0.09}px "Nanum Gothic", sans-serif`
      ctx.fillStyle = mutedColor
      ctx.fillText(centerLabel, cx, cy + size * 0.1)
    } else {
      ctx.font = `400 ${size * 0.1}px "Nanum Gothic", sans-serif`
      ctx.fillStyle = mutedColor
      ctx.fillText(centerLabel, cx, cy)
    }

  }, [slices, size, thickness, centerLabel, centerValue, isDark])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, flexShrink: 0 }}
    />
  )
}