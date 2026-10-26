import flagCn from 'flag-icons/flags/1x1/cn.svg'
import flagId from 'flag-icons/flags/1x1/id.svg'
import flagLk from 'flag-icons/flags/1x1/lk.svg'
import logoMark from '../assets/logo/ariska-wordmark-light.png'

type Node = { label: string; x: number; y: number; angle: number; flag: string }

// Positions as % of the container, radius = 36% from center (50, 50)
const nodes: Node[] = [
  { label: 'China', x: 50, y: 14, angle: -90, flag: flagCn },
  { label: 'Indonesia', x: 81.2, y: 68, angle: 30, flag: flagId },
  { label: 'Sri Lanka', x: 18.8, y: 68, angle: 150, flag: flagLk },
]

export default function ConnectionsDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-[300px]">
      {/* Star-burst spokes from hub to each node */}
      {nodes.map((node) => (
        <div
          key={`spoke-${node.label}`}
          className="absolute left-1/2 top-1/2 h-0 border-t-2 border-dashed border-amber-400/50"
          style={{ width: '36%', transformOrigin: '0% 0%', transform: `rotate(${node.angle}deg)` }}
        />
      ))}

      {/* Hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
        <div className="flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-teal-950 shadow-xl p-2">
          <img src={logoMark} alt="ARISKA" className="h-full w-full object-contain select-none" draggable={false} />
        </div>
      </div>

      {/* Destination nodes */}
      {nodes.map((node) => (
        <div
          key={node.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-10"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full shadow-lg border-2 border-dotted border-teal-950 overflow-hidden bg-white">
            <img src={node.flag} alt={`${node.label} flag`} className="h-full w-full object-cover select-none" draggable={false} />
          </div>
          <span className="text-[11px] sm:text-xs font-semibold text-white whitespace-nowrap">
            {node.label}
          </span>
        </div>
      ))}
    </div>
  )
}
