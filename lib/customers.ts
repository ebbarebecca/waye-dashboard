import { readFileSync } from 'fs'
import path from 'path'

export type CustomerHealth = 'green' | 'yellow' | 'red'
export type CustomerStatus = 'active' | 'inactive' | 'paused'

export interface Customer {
  id: string
  name: string
  industry: string
  status: CustomerStatus
  monthlyFee: number
  contractStart: string
  contractEnd: string
  contactPerson: string
  email: string
  phone: string
  services: string[]
  skills: string[]
  notes: string
  health: CustomerHealth
  consultant: string
}

interface FilterParams {
  status?: string
  industry?: string
  search?: string
}

function loadCustomers(): Customer[] {
  const filePath = path.join(process.cwd(), 'data', 'customers.json')
  const raw = readFileSync(filePath, 'utf-8')
  const data = JSON.parse(raw) as { customers: Customer[] }
  return data.customers
}

export function getAllCustomers(): Customer[] {
  return loadCustomers()
}

export function getCustomerById(id: string): Customer | undefined {
  return loadCustomers().find((c) => c.id === id)
}

export function filterCustomers(params: FilterParams): Customer[] {
  let customers = loadCustomers()

  if (params.status) {
    customers = customers.filter((c) => c.status === params.status)
  }

  if (params.industry) {
    customers = customers.filter(
      (c) => c.industry.toLowerCase() === params.industry!.toLowerCase()
    )
  }

  if (params.search) {
    const q = params.search.toLowerCase()
    customers = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.contactPerson.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.consultant.toLowerCase().includes(q)
    )
  }

  return customers
}
