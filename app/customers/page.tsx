import { getAllCustomers } from '@/lib/customers'
import Sidebar from '@/components/Sidebar'
import CustomerTable from '@/components/CustomerTable'

export const dynamic = 'force-dynamic'

export default function CustomersPage() {
  const customers = getAllCustomers()

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <header
          className="flex items-center px-8 h-16 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div>
            <p
              className="text-xs uppercase"
              style={{ color: '#A0A0A0', letterSpacing: '0.15em' }}
            >
              WAYE DIGITAL
            </p>
            <h1 className="font-serif text-2xl font-light leading-tight">
              Alla kunder
            </h1>
          </div>
        </header>
        <div className="px-8 py-8">
          <CustomerTable customers={customers} />
        </div>
      </main>
    </div>
  )
}
