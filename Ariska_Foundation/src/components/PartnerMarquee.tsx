import { Building2 } from 'lucide-react'
import { clients } from '../data/content'

const set = [...clients, ...clients, ...clients]
const track = [...set, ...set]

export default function PartnerMarquee() {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max gap-5 animate-marquee hover:[animation-play-state:paused]">
        {track.map((c, i) => (
          <div
            key={`${c.name}-${i}`}
            className="flex items-center gap-3 shrink-0 rounded-xl border border-teal-900/10 bg-white px-6 py-4 shadow-sm min-w-[240px]"
          >
            <div className="h-10 w-10 shrink-0 rounded-lg bg-teal-700 flex items-center justify-center text-amber-400">
              <Building2 size={18} />
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
