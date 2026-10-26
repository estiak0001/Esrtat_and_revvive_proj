import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import {
  LayoutDashboard, Images, Building2, Star, Briefcase,
  CheckSquare, Factory, Heart, Users, LogOut, Menu, UserCheck, MessageSquare
} from 'lucide-react';
import { useState } from 'react';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/slides', label: 'Hero Slides', icon: Images },
  { to: '/admin/company', label: 'Company Settings', icon: Building2 },
  { to: '/admin/stats', label: 'Stats', icon: Star },
  { to: '/admin/services', label: 'Services', icon: Briefcase },
  { to: '/admin/why-choose', label: 'Why Choose', icon: CheckSquare },
  { to: '/admin/industries', label: 'Industries', icon: Factory },
  { to: '/admin/core-values', label: 'Core Values', icon: Heart },
  { to: '/admin/partners', label: 'Partners', icon: Users },
  { to: '/admin/consultants', label: 'Consultants', icon: UserCheck },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-[#0D1B2A] text-white w-64 flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="text-[#C9A84C] font-bold text-lg">ESRAT Admin</div>
        <div className="text-white/40 text-xs mt-0.5">Content Management</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/30'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 h-full">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-1 rounded text-gray-600">
            <Menu size={20} />
          </button>
          <span className="font-semibold text-gray-700 text-sm">ESRAT Admin</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
