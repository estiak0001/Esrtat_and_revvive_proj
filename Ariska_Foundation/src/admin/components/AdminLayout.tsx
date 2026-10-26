import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Compass,
  Briefcase,
  ListChecks,
  Globe2,
  TrendingUp,
  Users,
  HeartHandshake,
  Award,
  Gem,
  Package,
  Newspaper,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'
import { useAuth } from '../AuthContext'
import wordmarkDark from '../../assets/logo/ariska-wordmark-dark.png'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/company', label: 'Company Info', icon: Building2 },
  { to: '/admin/mission-vision', label: 'Mission & Vision', icon: Compass },
  { to: '/admin/services', label: 'Services', icon: Briefcase },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/highlights', label: 'Highlights', icon: Newspaper },
  { to: '/admin/what-we-do', label: 'What We Do', icon: ListChecks },
  { to: '/admin/markets', label: 'Global Markets', icon: Globe2 },
  { to: '/admin/journey', label: 'Journey Stats', icon: TrendingUp },
  { to: '/admin/clients', label: 'Clients', icon: Users },
  { to: '/admin/team', label: 'Team Members', icon: HeartHandshake },
  { to: '/admin/team-values', label: 'Team Values', icon: Award },
  { to: '/admin/why-ariska', label: 'Why Ariska', icon: Gem },
  { to: '/admin/business-values', label: 'Business Values', icon: Gem },
]

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive ? 'bg-teal-950 text-white' : 'text-teal-900/70 hover:bg-teal-950/5'
    }`

  return (
    <div className="min-h-screen bg-teal-950/[0.02] flex">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-white border-b border-teal-900/10 px-4 h-14">
        <img src={wordmarkDark} alt="ARISKA Admin" className="h-5 w-auto" />
        <button onClick={() => setOpen((v) => !v)} className="text-teal-950 p-1">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-30 h-screen w-64 bg-white border-r border-teal-900/10 flex flex-col transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="hidden lg:flex items-center h-16 px-5 border-b border-teal-900/10">
          <img src={wordmarkDark} alt="ARISKA Admin" className="h-5 w-auto" />
          <span className="ml-2 text-[10px] uppercase tracking-wider text-amber-600 font-semibold">Admin</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 mt-14 lg:mt-0">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass} onClick={() => setOpen(false)}>
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-teal-900/10 p-3 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-teal-900/70 hover:bg-teal-950/5 transition-colors"
          >
            <ExternalLink size={17} />
            View Site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      {open && (
        <div className="lg:hidden fixed inset-0 bg-teal-950/40 z-20" onClick={() => setOpen(false)} />
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 pt-14 lg:pt-0">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
