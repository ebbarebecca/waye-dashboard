'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { Customer } from '@/lib/customers'

interface StatusChartProps {
  customers: Customer[]
}

const STATUS_COLORS = {
  active:   '#C4847A',
  paused:   '#E8C97A',
  inactive: '#A86660',
}

const STATUS_LABELS = {
  active:   'Aktiva',
  paused:   'Pausade',
  inactive: 'Inaktiva',
}

const CustomTooltip = ({ active, payload }: any) => {
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
        <p className="font-medium">{payload[0].name}</p>
        <p style={{ color: '#A0A0A0' }}>{payload[0].value} kunder</p>
      </div>
    )
  }
  return null
}

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  if (percent < 0.08) return null
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function StatusChart({ customers }: StatusChartProps) {
  const counts = customers.reduce(
    (acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const data = Object.entries(counts).map(([key, value]) => ({
    name: STATUS_LABELS[key as keyof typeof STATUS_LABELS] || key,
    value,
    key,
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
        Fördelning av status
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            dataKey="value"
            labelLine={false}
            label={renderCustomLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={STATUS_COLORS[entry.key as keyof typeof STATUS_COLORS] || '#C4847A'}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ color: '#A0A0A0', fontSize: 12 }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
