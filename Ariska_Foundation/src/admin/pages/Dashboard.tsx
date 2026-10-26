import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Users, HeartHandshake, Globe2 } from 'lucide-react'
import { api } from '../api'

export default function Dashboard() {
  const [counts, setCounts] = useState({ services: 0, clients: 0, team: 0, markets: 0 })

  useEffect(() => {
    Promise.all([
      api.get('/api/content/services'),
      api.get('/api/content/clients'),
      api.get('/api/content/team-members'),
      api.get('/api/content/markets'),
    ]).then(([services, clients, team, markets]) => {
      setCounts({
        services: services.data.length,
        clients: clients.data.length,
        team: team.data.length,
        markets: markets.data.length,
      })
    })
  }, [])

  const chips = [
    { label: 'Service Divisions', value: counts.services, icon: Briefcase },
    { label: 'Clients', value: counts.clients, icon: Users },
    { label: 'Team Members', value: counts.team, icon: HeartHandshake },
    { label: 'Global Markets', value: counts.markets, icon: Globe2 },
  ]

  const quickLinks = [
    { to: '/admin/company', label: 'Company Info' },
    { to: '/admin/mission-vision', label: 'Mission & Vision' },
    { to: '/admin/services', label: 'Services' },
    { to: '/admin/what-we-do', label: 'What We Do' },
    { to: '/admin/markets', label: 'Global Markets' },
    { to: '/admin/journey', label: 'Journey Stats' },
    { to: '/admin/clients', label: 'Clients' },
    { to: '/admin/team', label: 'Team Members' },
    { to: '/admin/team-values', label: 'Team Values' },
    { to: '/admin/why-ariska', label: 'Why Ariska' },
    { to: '/admin/business-values', label: 'Business Values' },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-teal-950">Dashboard</h1>
      <p className="text-sm text-teal-900/60 mt-1">Manage ARISKA's website content.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {chips.map((chip) => (
          <div key={chip.label} className="rounded-2xl border border-teal-900/10 bg-white p-5">
            <div className="h-10 w-10 rounded-xl bg-teal-950 flex items-center justify-center mb-3">
              <chip.icon size={18} className="text-amber-400" />
            </div>
            <p className="font-display text-2xl font-bold text-teal-950">{chip.value}</p>
            <p className="text-xs text-teal-900/60 mt-0.5">{chip.label}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-base font-semibold text-teal-950 mt-10 mb-4">Manage Content</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {quickLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="rounded-xl border border-teal-900/10 bg-white p-4 text-sm font-medium text-teal-950 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
