import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllCustomers, getCustomerById } from '@/lib/customers'
import Sidebar from '@/components/Sidebar'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const customers = getAllCustomers()
  return customers.map((c) => ({ id: c.id }))
}

const healthConfig = {
  green:  { color: '#4CAF50', label: 'God hälsa',     bg: 'rgba(76,175,80,0.1)',   border: 'rgba(76,175,80,0.3)' },
  yellow: { color: '#E8C97A', label: 'Neutral',        bg: 'rgba(232,201,122,0.1)', border: 'rgba(232,201,122,0.3)' },
  red:    { color: '#E07070', label: 'Risk',           bg: 'rgba(224,112,112,0.1)', border: 'rgba(224,112,112,0.3)' },
}

const statusConfig = {
  active:   { label: 'AKTIV',   color: '#C4847A', bg: 'rgba(196,132,122,0.15)', border: 'rgba(196,132,122,0.4)' },
  inactive: { label: 'INAKTIV', color: '#A0A0A0', bg: 'rgba(160,160,160,0.1)',  border: 'rgba(160,160,160,0.3)' },
  paused:   { label: 'PAUSAD',  color: '#E8C97A', bg: 'rgba(232,201,122,0.1)',  border: 'rgba(232,201,122,0.4)' },
}

function contractProgress(start: string, end: string): number {
  const s = new Date(start).getTime()
  const e = new Date(end).getTime()
  const n = Date.now()
  if (n <= s) return 0
  if (n >= e) return 100
  return Math.round(((n - s) / (e - s)) * 100)
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function CustomerDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const customer = getCustomerById(params.id)
  if (!customer) notFound()

  const health   = healthConfig[customer.health]
  const st       = statusConfig[customer.status]
  const progress = contractProgress(customer.contractStart, customer.contractEnd)

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header
          className="flex items-center gap-6 px-8 h-16 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-xs transition-colors"
            style={{
              color: '#C4847A',
              letterSpacing: '0.15em',
            }}
          >
            ← ALLA KUNDER
          </Link>
          <div
            className="w-px h-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
          />
          <p className="text-xs" style={{ color: '#A0A0A0', letterSpacing: '0.1em' }}>
            {customer.industry.toUpperCase()}
          </p>
        </header>

        <div className="px-8 py-10 max-w-5xl">
          {/* Title row */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <h1 className="font-serif text-5xl font-light leading-tight mb-2">
                {customer.name}
              </h1>
              <p className="text-sm" style={{ color: '#A0A0A0' }}>
                Ansvarig konsult: {customer.consultant}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span
                className="px-3 py-1 text-xs"
                style={{
                  backgroundColor: health.bg,
                  border: `1px solid ${health.border}`,
                  color: health.color,
                  letterSpacing: '0.1em',
                }}
              >
                {health.label.toUpperCase()}
              </span>
              <span
                className="px-3 py-1 text-xs"
                style={{
                  backgroundColor: st.bg,
                  border: `1px solid ${st.border}`,
                  color: st.color,
                  letterSpacing: '0.1em',
                }}
              >
                {st.label}
              </span>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Contact */}
            <div
              className="p-6"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p
                className="text-xs uppercase mb-5"
                style={{ color: '#A0A0A0', letterSpacing: '0.15em' }}
              >
                KONTAKTINFORMATION
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs mb-1" style={{ color: '#A0A0A0' }}>
                    Kontaktperson
                  </p>
                  <p className="text-sm font-medium">{customer.contactPerson}</p>
                </div>
                <div
                  className="h-px"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                />
                <div>
                  <p className="text-xs mb-1" style={{ color: '#A0A0A0' }}>
                    E-post
                  </p>
                  <a
                    href={`mailto:${customer.email}`}
                    className="text-sm transition-colors"
                    style={{ color: '#C4847A' }}
                  >
                    {customer.email}
                  </a>
                </div>
                <div
                  className="h-px"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                />
                <div>
                  <p className="text-xs mb-1" style={{ color: '#A0A0A0' }}>
                    Telefon
                  </p>
                  <p className="text-sm">{customer.phone}</p>
                </div>
              </div>
            </div>

            {/* Contract */}
            <div
              className="p-6"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p
                className="text-xs uppercase mb-5"
                style={{ color: '#A0A0A0', letterSpacing: '0.15em' }}
              >
                KONTRAKTSINFORMATION
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs mb-1" style={{ color: '#A0A0A0' }}>
                    Månadsarvode
                  </p>
                  <p className="font-serif text-3xl">
                    {customer.monthlyFee.toLocaleString('sv-SE')}
                    <span className="text-lg ml-1" style={{ color: '#A0A0A0' }}>
                      kr
                    </span>
                  </p>
                </div>
                <div
                  className="h-px"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs mb-1" style={{ color: '#A0A0A0' }}>
                      Startdatum
                    </p>
                    <p className="text-sm">{formatDate(customer.contractStart)}</p>
                  </div>
                  <div>
                    <p className="text-xs mb-1" style={{ color: '#A0A0A0' }}>
                      Slutdatum
                    </p>
                    <p className="text-sm">{formatDate(customer.contractEnd)}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-xs" style={{ color: '#A0A0A0' }}>
                      Kontraktsperiod
                    </p>
                    <p className="text-xs" style={{ color: '#C4847A' }}>
                      {progress}%
                    </p>
                  </div>
                  <div
                    className="h-1 w-full"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <div
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: progress > 80 ? '#E07070' : '#C4847A',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div
              className="p-6"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p
                className="text-xs uppercase mb-5"
                style={{ color: '#A0A0A0', letterSpacing: '0.15em' }}
              >
                TJÄNSTER
              </p>
              <div className="flex flex-wrap gap-2">
                {customer.services.map((svc) => (
                  <span
                    key={svc}
                    className="px-3 py-1.5 text-xs"
                    style={{
                      border: '1px solid rgba(196,132,122,0.4)',
                      color: '#C4847A',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div
              className="p-6"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p
                className="text-xs uppercase mb-5"
                style={{ color: '#A0A0A0', letterSpacing: '0.15em' }}
              >
                NOTERINGAR
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#d0d0d0' }}>
                {customer.notes}
              </p>
            </div>
          </div>

          {/* Consultant card */}
          <div
            className="p-6 flex items-center gap-5"
            style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.08)',
              borderLeft: '2px solid #C4847A',
            }}
          >
            <div
              className="w-10 h-10 flex items-center justify-center text-sm font-medium shrink-0"
              style={{
                backgroundColor: 'rgba(196,132,122,0.15)',
                border: '1px solid rgba(196,132,122,0.4)',
                color: '#C4847A',
              }}
            >
              {customer.consultant
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: '#A0A0A0', letterSpacing: '0.1em' }}>
                ANSVARIG KONSULT
              </p>
              <p className="font-medium">{customer.consultant}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
