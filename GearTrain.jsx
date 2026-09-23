import { useMemo, useRef } from 'react'
import { gearPath, meshedAngle, meshedCentre } from '../gears.js'
import { useSpin } from '../motion.jsx'

// A chain of meshing gears. `chain` lists each gear after the first as
// { teeth, phi } where phi is the direction (deg) from the previous gear.
export default function GearTrain({ module, start, chain, degPerSec = 12, className, tones }) {
  const gears = useMemo(() => {
    const list = [{ ...start, parent: -1, phi: 0 }]
    chain.forEach((g, i) => {
      const parent = list[g.from ?? i]
      const c = meshedCentre(parent, g.teeth, module, g.phi)
      list.push({ ...c, teeth: g.teeth, parent: g.from ?? i, phi: g.phi })
    })
    return list.map((g) => ({ ...g, d: gearPath(g.teeth, module, module * 1.6) }))
  }, [module, start, chain])

  const refs = useRef([])

  useSpin(degPerSec, (a) => {
    const angles = []
    gears.forEach((g, i) => {
      angles[i] = i === 0 ? a : meshedAngle(angles[g.parent], gears[g.parent].teeth, g.teeth, g.phi)
      const el = refs.current[i]
      if (el) el.setAttribute('transform', `translate(${g.x} ${g.y}) rotate(${angles[i]})`)
    })
  })

  return (
    <g className={className}>
      {gears.map((g, i) => (
        <path
          key={i}
          ref={(el) => (refs.current[i] = el)}
          d={g.d}
          fillRule="evenodd"
          className={tones?.[i % tones.length]}
          transform={`translate(${g.x} ${g.y})`}
        />
      ))}
    </g>
  )
}
