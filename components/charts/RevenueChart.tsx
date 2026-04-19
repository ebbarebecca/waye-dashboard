'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { Customer } from '@/lib/customers'

interface RevenueChartProps {
  customers: Customer[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-3 py-2 text-sm"
        style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#ffffff',
        }}
      >
        <p className="text-xs mb-1" style={{ color: '#A0A0A0' }}>
          {label}
        </p>
        <p className="font-medium">
          {Number(payload[0].value).toLocaleString('sv-SE')} kr/mån
        </p>
      </div>
    )
  }
  return null
}

export default function RevenueChart({ customers }: RevenueChartProps) {
  const data = customers
    .filter((c) => c.status !== 'inactive')
    .sort((a, b) => b.monthlyFee - a.monthlyFee)
    .map((c) => ({
      name: c.name.split(' ')[0],
      fullName: c.name,
      value: c.monthlyFee,
      status: c.status,
    }))

  return (
    <div
      className="p-6"
      style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <p
        className="text-xs uppercase mb-6"
        style={{ color: '#A0A0A0', letterSpacing: '0.15em' }}
      >
        Månadsarvode per kund (SEK)
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={20}>
          <XAxis
            dataKey="name"
            tick={{ fill: '#A0A0A0', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#A0A0A0', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
            }
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(196,132,122,0.05)' }} />
          <Bar dataKey="value" radius={[0, 0, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.status === 'paused' ? '#A86660' : '#C4847A'}
                fillOpacity={entry.status === 'paused' ? 0.6 : 1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
