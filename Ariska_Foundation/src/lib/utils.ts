import type { Client, ClientGroup } from './types'

export function groupClients(clients: Client[]): ClientGroup[] {
  const map = new Map<string, string[]>()
  for (const c of clients) {
    const list = map.get(c.category) ?? []
    list.push(c.name)
    map.set(c.category, list)
  }
  return Array.from(map.entries()).map(([category, names]) => ({ category, names }))
}

/** Same grouping as groupClients, but keeps the full Client record (incl. logo_url) per entry. */
export function groupClientsWithLogos(clients: Client[]): { category: string; items: Client[] }[] {
  const map = new Map<string, Client[]>()
  for (const c of clients) {
    const list = map.get(c.category) ?? []
    list.push(c)
    map.set(c.category, list)
  }
  return Array.from(map.entries()).map(([category, items]) => ({ category, items }))
}
