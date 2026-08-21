import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Images, Building2, Star, Briefcase, Users, ChevronRight } from 'lucide-react';
import { getSlides, getCompany, getStats } from '../api';

const CARDS = [
  { label: 'Hero Slides', icon: Images, href: '/admin/slides', color: 'bg-blue-50 text-blue-600' },
  { label: 'Company Settings', icon: Building2, href: '/admin/company', color: 'bg-amber-50 text-amber-600' },
  { label: 'Stats', icon: Star, href: '/admin/stats', color: 'bg-green-50 text-green-600' },
  { label: 'Services', icon: Briefcase, href: '/admin/services', color: 'bg-purple-50 text-purple-600' },
  { label: 'Partners', icon: Users, href: '/admin/partners', color: 'bg-pink-50 text-pink-600' },
];

export default function Dashboard() {
  const [summary, setSummary] = useState({ slides: 0, company: '', stats: 0 });

  useEffect(() => {
    Promise.all([getSlides(), getCompany(), getStats()]).then(([s, c, st]) => {
      setSummary({ slides: s.data.length, company: c.data.name, stats: st.data.length });
    }).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">Welcome back. Manage your website content below.</p>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="bg-[#0D1B2A] text-white rounded-xl px-5 py-3 text-sm">
          <span className="text-[#C9A84C] font-bold text-lg mr-1">{summary.slides}</span> Active Slides
        </div>
        <div className="bg-[#0D1B2A] text-white rounded-xl px-5 py-3 text-sm">
          <span className="text-[#C9A84C] font-bold text-lg mr-1">{summary.stats}</span> Stats
        </div>
        <div className="bg-[#0D1B2A] text-white rounded-xl px-5 py-3 text-sm">
          Site: <span className="text-[#C9A84C] font-semibold ml-1">{summary.company || '…'}</span>
        </div>
      </div>

      {/* Quick access cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map(({ label, icon: Icon, href, color }) => (
          <Link
            key={href}
            to={href}
            className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#C9A84C]/40 transition-all group"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
              <Icon size={20} />
            </div>
            <span className="font-medium text-gray-700 flex-1">{label}</span>
            <ChevronRight size={16} className="text-gray-300 group-hover:text-[#C9A84C] transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
