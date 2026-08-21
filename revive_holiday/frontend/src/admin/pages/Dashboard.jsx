import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuMapPin, LuBriefcase, LuHeart, LuMessageSquare, LuChevronRight } from "react-icons/lu";
import { getDestinations, getAllServices, getContactMessages, getInquiries } from "../api";

const CARDS = [
  { label: "Destinations", icon: LuMapPin, href: "/admin/destinations", color: "bg-blue-50 text-blue-600" },
  { label: "Services", icon: LuBriefcase, href: "/admin/services", color: "bg-purple-50 text-purple-600" },
  { label: "Core Values", icon: LuHeart, href: "/admin/core-values", color: "bg-pink-50 text-pink-600" },
  { label: "Messages", icon: LuMessageSquare, href: "/admin/messages", color: "bg-amber-50 text-amber-600" },
];

export default function Dashboard() {
  const [summary, setSummary] = useState({ destinations: 0, services: 0, unread: 0 });

  useEffect(() => {
    Promise.all([getDestinations(), getAllServices(), getContactMessages(), getInquiries()])
      .then(([d, s, c, i]) => {
        const unread =
          c.data.filter((m) => !m.is_read).length + i.data.filter((m) => !m.is_read).length;
        setSummary({ destinations: d.data.length, services: s.data.length, unread });
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">Welcome back. Manage your website content below.</p>

      <div className="flex flex-wrap gap-3 mb-8">
        <div className="bg-[#0a1f2e] text-white rounded-xl px-5 py-3 text-sm">
          <span className="text-[#f98f0e] font-bold text-lg mr-1">{summary.destinations}</span> Destinations
        </div>
        <div className="bg-[#0a1f2e] text-white rounded-xl px-5 py-3 text-sm">
          <span className="text-[#f98f0e] font-bold text-lg mr-1">{summary.services}</span> Services
        </div>
        <div className="bg-[#0a1f2e] text-white rounded-xl px-5 py-3 text-sm">
          <span className="text-[#f98f0e] font-bold text-lg mr-1">{summary.unread}</span> Unread Messages
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map(({ label, icon: Icon, href, color }) => (
          <Link
            key={href}
            to={href}
            className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#f98f0e]/40 transition-all group"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
              <Icon size={20} />
            </div>
            <span className="font-medium text-gray-700 flex-1">{label}</span>
            <LuChevronRight size={16} className="text-gray-300 group-hover:text-[#f98f0e] transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
