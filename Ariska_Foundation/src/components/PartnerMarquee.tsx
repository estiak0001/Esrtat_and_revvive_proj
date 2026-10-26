import { Building2 } from 'lucide-react'
import { useApi, assetUrl } from '../lib/api'
import type { Client } from '../lib/types'

export default function PartnerMarquee() {
  const { data: clients } = useApi<Client[]>('/api/content/clients', [])

  if (clients.length === 0) return null

  const set = [...clients, ...clients, ...clients]
  const track = [...set, ...set]

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max gap-5 animate-marquee hover:[animation-play-state:paused]">
        {track.map((c, i) => (
          <div
            key={`${c.name}-${i}`}
            className="flex items-center gap-3 shrink-0 rounded-xl border border-teal-900/[0.06] bg-white px-6 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 min-w-[240px]"
          >
            <div className="h-10 w-10 shrink-0 rounded-lg bg-teal-50 border border-teal-900/[0.06] flex items-center justify-center overflow-hidden">
              {c.logo_url ? (
                <img
                  src={assetUrl(c.logo_url)}
                  alt={c.name}
                  className="h-full w-full object-contain p-1"
                  draggable={false}
                />
              ) : (
                <div className="h-full w-full bg-teal-700 flex items-center justify-center">
                  <Building2 size={18} className="text-amber-400" />
                </div>
              )}
            </div>
            <div className="text-left">
              <p className="font-display font-semibold text-teal-950 text-sm leading-tight">{c.name}</p>
              <p className="text-[11px] text-teal-900/50 mt-0.5">Trusted Partner</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
