import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import {
  LuLayoutDashboard, LuMapPin, LuBriefcase, LuHeart, LuSquareCheck,
  LuBuilding2, LuStamp, LuSettings, LuMessageSquare, LuLogOut, LuMenu, LuImages,
} from "react-icons/lu";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LuLayoutDashboard, end: true },
  { to: "/admin/destinations", label: "Destinations", icon: LuMapPin },
  { to: "/admin/albums", label: "Albums", icon: LuImages },
  { to: "/admin/services", label: "Services", icon: LuBriefcase },
  { to: "/admin/core-values", label: "Core Values", icon: LuHeart },
  { to: "/admin/why-choose", label: "Why Choose Us", icon: LuSquareCheck },
  { to: "/admin/corporate-services", label: "Corporate Services", icon: LuBuilding2 },
  { to: "/admin/visa-support", label: "Visa Support", icon: LuStamp },
  { to: "/admin/settings", label: "Site Settings", icon: LuSettings },
  { to: "/admin/messages", label: "Messages", icon: LuMessageSquare },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-[#0a1f2e] text-white w-64 flex-shrink-0">
      <div className="px-6 py-5 border-b border-white/10">
        <div className="text-[#f98f0e] font-bold text-lg">Revive Holidays Admin</div>
        <div className="text-white/40 text-xs mt-0.5">Content Management</div>
      </div>

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
                  ? "bg-[#f98f0e]/15 text-[#f98f0e] border border-[#f98f0e]/30"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
        >
          <LuLogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 h-full">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-1 rounded text-gray-600">
            <LuMenu size={20} />
          </button>
          <span className="font-semibold text-gray-700 text-sm">Revive Holidays Admin</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
