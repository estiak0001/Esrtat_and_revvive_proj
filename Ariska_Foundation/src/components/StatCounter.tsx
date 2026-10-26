import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

type Props = {
  value: string
  className?: string
}

export default function StatCounter({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const match = value.match(/^(\d+)(.*)$/)
  const [display, setDisplay] = useState(match ? `0${match[2]}` : value)

  useEffect(() => {
    if (!inView || !match) return
    const target = parseInt(match[1], 10)
    const suffix = match[2]
    const controls = animate(0, target, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <span ref={ref} className={className}>
      {match ? display : value}
    </span>
  )
}
