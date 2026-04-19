import { getAllCustomers } from '@/lib/customers'
import Sidebar from '@/components/Sidebar'
import KpiCard from '@/components/KpiCard'
import CustomerTable from '@/components/CustomerTable'
import RevenueChart from '@/components/charts/RevenueChart'
import StatusChart from '@/components/charts/StatusChart'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const customers = getAllCustomers()

  const activeCount   = customers.filter((c) => c.status === 'active').length
  const totalRevenue  = customers
    .filter((c) => c.status !== 'inactive')
    .reduce((sum, c) => sum + c.monthlyFee, 0)

  const healthScore = Math.round(
    (customers.filter((c) => c.health === 'green').length / customers.length) * 100
  )

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header
          className="flex items-center justify-between px-8 h-16 border-b shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div>
            <p
              className="text-xs uppercase"
              style={{ color: '#A0A0A0', letterSpacing: '0.15em' }}
            >
              WAYE DIGITAL
            </p>
            <h1
              className="font-serif text-2xl leading-tight"
              style={{ color: '#ffffff' }}
            >
              Kundöversikt
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: '#4CAF50' }}
            />
            <span className="text-xs" style={{ color: '#A0A0A0' }}>
              Live
            </span>
          </div>
        </header>

        <div className="px-8 py-8 space-y-8">
          {/* KPI grid */}
          <section>
            <p
              className="text-xs uppercase mb-4"
              style={{ color: '#A0A0A0', letterSpacing: '0.15em' }}
            >
              NYCKELTAL
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard
                label="Totalt antal kunder"
                value={customers.length}
              />
              <KpiCard
                label="Aktiva engagemang"
                value={activeCount}
                accentColor="#E8AEA8"
              />
              <KpiCard
                label="Total månadsfakturering"
                value={totalRevenue}
                suffix=" kr"
                format="millions"
                accentColor="#A86660"
              />
              <KpiCard
                label="Andel grön hälsostatus"
                value={healthScore}
                suffix="%"
                accentColor="#4CAF50"
              />
            </div>
          </section>

          {/* Charts */}
          <section>
            <p
              className="text-xs uppercase mb-4"
              style={{ color: '#A0A0A0', letterSpacing: '0.15em' }}
            >
              INSIKTER
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <RevenueChart customers={customers} />
              </div>
              <div>
                <StatusChart customers={customers} />
              </div>
            </div>
          </section>

          {/* Customer table */}
          <section>
            <p
              className="text-xs uppercase mb-4"
              style={{ color: '#A0A0A0', letterSpacing: '0.15em' }}
            >
              KUNDLISTA
            </p>
            <CustomerTable customers={customers} />
          </section>
        </div>
      </main>
    </div>
  )
}
