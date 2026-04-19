'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Customer } from '@/lib/customers'
import CustomerSearch from './CustomerSearch'

interface CustomerTableProps {
  customers: Customer[]
}

const healthConfig = {
  green:  { color: '#4CAF50', label: 'God' },
  yellow: { color: '#E8C97A', label: 'Neutral' },
  red:    { color: '#E07070', label: 'Risk' },
}

const statusConfig = {
  active:   { label: 'AKTIV',   color: '#C4847A', bg: 'rgba(196,132,122,0.15)', border: 'rgba(196,132,122,0.4)' },
  inactive: { label: 'INAKTIV', color: '#A0A0A0', bg: 'rgba(160,160,160,0.1)',  border: 'rgba(160,160,160,0.3)' },
  paused:   { label: 'PAUSAD',  color: '#E8C97A', bg: 'rgba(232,201,122,0.1)',  border: 'rgba(232,201,122,0.4)' },
}

export default function CustomerTable({ customers }: CustomerTableProps) {
  const [search, setSearch]     = useState('')
  const [industry, setIndustry] = useState('')
  const [status, setStatus]     = useState('')

  const industries = [...new Set(customers.map((c) => c.industry))].sort()

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.contactPerson.toLowerCase().includes(q) ||
      c.industry.toLowerCase().includes(q) ||
      c.consultant.toLowerCase().includes(q)
    const matchIndustry = !industry || c.industry === industry
    const matchStatus   = !status   || c.status === status
    return matchSearch && matchIndustry && matchStatus
  })

  return (
    <div className="flex flex-col gap-4">
      <CustomerSearch
        search={search}
        industry={industry}
        status={status}
        industries={industries}
        onSearch={setSearch}
        onIndustry={setIndustry}
        onStatus={setStatus}
      />

      <div
        style={{ border: '1px solid rgba(255,255,255,0.08)', overflowX: 'auto' }}
      >
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
            >
              {['KUND', 'BRANSCH', 'KONSULT', 'TJÄNSTER', 'ARVODE/MÅN', 'HÄLSA', 'STATUS'].map(
                (col) => (
                  <th
                    key={col}
                    className="text-left px-4 py-3 font-medium"
                    style={{
                      color: '#A0A0A0',
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                    }}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center"
                  style={{ color: '#A0A0A0' }}
                >
                  Inga kunder matchar filtret.
                </td>
              </tr>
            )}
            {filtered.map((customer) => {
              const health = healthConfig[customer.health]
              const st     = statusConfig[customer.status]
              return (
                <tr
                  key={customer.id}
                  className="group cursor-pointer transition-colors"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                      'rgba(196,132,122,0.06)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                      'transparent'
                  }}
                  onClick={() => {
                    window.location.href = `/customers/${customer.id}`
                  }}
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/customers/${customer.id}`}
                      className="font-medium text-white hover:text-waye-pink transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {customer.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3" style={{ color: '#A0A0A0', fontSize: '12px' }}>
                    {customer.industry}
                  </td>
                  <td className="px-4 py-3" style={{ color: '#A0A0A0', fontSize: '12px' }}>
                    {customer.consultant}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {customer.services.slice(0, 2).map((svc) => (
                        <span
                          key={svc}
                          className="px-2 py-0.5 text-xs"
                          style={{
                            backgroundColor: 'rgba(196,132,122,0.15)',
                            border: '1px solid rgba(196,132,122,0.4)',
                            color: '#C4847A',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {svc}
                        </span>
                      ))}
                      {customer.services.length > 2 && (
                        <span
                          className="px-2 py-0.5 text-xs"
                          style={{ color: '#A0A0A0' }}
                        >
                          +{customer.services.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium" style={{ color: '#ffffff' }}>
                    {customer.monthlyFee.toLocaleString('sv-SE')} kr
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: health.color }}
                      />
                      <span className="text-xs" style={{ color: '#A0A0A0' }}>
                        {health.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 text-xs"
                      style={{
                        backgroundColor: st.bg,
                        border: `1px solid ${st.border}`,
                        color: st.color,
                        letterSpacing: '0.1em',
                      }}
                    >
                      {st.label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs" style={{ color: '#A0A0A0' }}>
        Visar {filtered.length} av {customers.length} kunder
      </p>
    </div>
  )
}
