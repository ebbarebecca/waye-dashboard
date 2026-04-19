import { NextRequest, NextResponse } from 'next/server'
import { filterCustomers } from '@/lib/customers'

export const dynamic = 'force-dynamic'

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const status   = searchParams.get('status')   || undefined
  const industry = searchParams.get('industry') || undefined
  const search   = searchParams.get('search')   || undefined

  const customers = filterCustomers({ status, industry, search })

  return NextResponse.json({ customers, total: customers.length })
}
