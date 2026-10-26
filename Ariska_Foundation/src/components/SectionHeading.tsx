type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  center?: boolean
  light?: boolean
}

export default function SectionHeading({ eyebrow, title, subtitle, center = true, light = false }: Props) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-2xl mb-12`}>
      {eyebrow && (
        <p className={`uppercase tracking-[0.2em] text-xs font-semibold mb-3 ${light ? 'text-amber-400' : 'text-amber-600'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-snug ${light ? 'text-white' : 'text-teal-950'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed ${light ? 'text-white/70' : 'text-teal-900/70'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
