'use client'

import { useEffect, useRef, useState } from 'react'

type FormatMode = 'number' | 'millions' | 'percentage'

interface KpiCardProps {
  label: string
  value: number
  prefix?: string
  suffix?: string
  accentColor?: string
  format?: FormatMode
}

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * ease))
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate)
      }
    }
    raf.current = requestAnimationFrame(animate)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [target, duration])

  return count
}

function formatValue(v: number, format?: FormatMode): string {
  if (format === 'millions') {
    return v >= 1_000_000
      ? `${(v / 1_000_000).toFixed(2)}M`
      : v.toLocaleString('sv-SE')
  }
  return v.toLocaleString('sv-SE')
}

export default function KpiCard({
  label,
  value,
  prefix = '',
  suffix = '',
  accentColor = '#C4847A',
  format,
}: KpiCardProps) {
  const count = useCountUp(value)
  const display = formatValue(count, format)

  return (
    <div
      className="p-6 flex flex-col gap-3"
      style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="w-6 h-px"
        style={{ backgroundColor: accentColor }}
      />
      <p
        className="text-xs uppercase"
        style={{ color: '#A0A0A0', letterSpacing: '0.15em' }}
      >
        {label}
      </p>
      <p
        className="font-serif leading-none"
        style={{ fontSize: '2.5rem', color: '#FFFFFF' }}
      >
        {prefix}
        {display}
        {suffix}
      </p>
      <div
        className="h-px mt-auto"
        style={{ backgroundColor: accentColor, opacity: 0.2 }}
      />
    </div>
  )
}
