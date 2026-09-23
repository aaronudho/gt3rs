import { useId, useMemo, useState } from 'react'
import { gearPath, toothedArcPath, meshedAngle, pitchRadius } from '../gears.js'

// Simplified, interactive model of the herringbone phone stand:
// a curved rack carries the phone and a pinion (the knob) drives it.
const C = { x: 190, y: 185 }
const M = 3.9            // module shared by rack and pinion
const RACK_TEETH = 72    // teeth on the full circle the rack is cut from
const PINION_TEETH = 16
const PHI = 45           // pinion sits at the lower right of the rack

export default function StandSim() {
  const [pos, setPos] = useState(90) // 0..180 slider position
  const [locked, setLocked] = useState(false)
  const inputId = useId()

  const geo = useMemo(() => {
    const rp = pitchRadius(RACK_TEETH, M)
    const dist = rp + pitchRadius(PINION_TEETH, M)
    return {
      rack: toothedArcPath(RACK_TEETH, M, -48, 138, rp - 22),
      pinion: gearPath(PINION_TEETH, M, 7),
      px: C.x + dist * Math.cos((PHI * Math.PI) / 180),
      py: C.y + dist * Math.sin((PHI * Math.PI) / 180),
      rp,
    }
  }, [])

  const tilt = pos - 90 // rotation of the rack and phone, degrees
  const pinionAngle = meshedAngle(tilt, RACK_TEETH, PINION_TEETH, PHI)

  return (
    <figure className="sim" aria-label="Interactive model of the herringbone gear phone stand">
      <div className="sim__screen">
        <svg viewBox="0 0 400 400" role="img" aria-label={`Phone stand tilted to position ${pos} of 180 degrees`}>
          {/* cradle and base (fixed) */}
          <path className="sim__cradle" d={toothlessBand(geo.rp + 10, geo.rp + 24, 62, 158)} />
          <rect className="sim__base" x="30" y="352" width="340" height="18" rx="4" />
          <line className="sim__axis" x1={C.x} y1={C.y - 8} x2={C.x} y2={C.y + 8} />
          <line className="sim__axis" x1={C.x - 8} y1={C.y} x2={C.x + 8} y2={C.y} />

          {/* rotating assembly: curved rack + plate + phone */}
          <g transform={`rotate(${tilt} ${C.x} ${C.y})`} className="sim__assembly">
            <g transform={`translate(${C.x} ${C.y})`}>
              <path className="sim__rack" d={geo.rack} />
              <rect className="sim__plate" x="-4" y="-128" width="8" height="244" rx="3" />
              <rect className="sim__lip" x="-34" y="104" width="34" height="10" rx="3" />
              <rect className="sim__phone" x="-30" y="-122" width="24" height="224" rx="7" />
              <rect className="sim__glass" x="-27" y="-114" width="18" height="208" rx="4" />
            </g>
          </g>

          {/* pinion + knob (fixed position, spins) */}
          <g transform={`translate(${geo.px} ${geo.py}) rotate(${pinionAngle})`}>
            <path className="sim__pinion" d={geo.pinion} fillRule="evenodd" />
            <line className="sim__mark" x1="0" y1="0" x2="0" y2="-24" />
          </g>
          <circle className={locked ? 'sim__pin sim__pin--in' : 'sim__pin'} cx={geo.px - 44} cy={geo.py + 24} r="6" />
        </svg>
        <div className="sim__readout" aria-hidden="true">
          <span>TILT</span>
          <strong>{String(pos).padStart(3, '0')}°</strong>
        </div>
      </div>

      <div className="sim__controls">
        <label htmlFor={inputId} className="sim__label">Turn the knob</label>
        <input
          id={inputId}
          type="range"
          min="0"
          max="180"
          step="1"
          value={pos}
          disabled={locked}
          onChange={(e) => setPos(Number(e.target.value))}
        />
        <button type="button" className="btn btn--small" onClick={() => setLocked((v) => !v)} aria-pressed={locked}>
          {locked ? 'Pull lock pin' : 'Push lock pin'}
        </button>
      </div>
      <figcaption className="sim__caption">
        Simplified model of my phone stand. Lock state: <b>{locked ? 'locked' : 'free to tilt'}</b>.
      </figcaption>
    </figure>
  )
}

// Plain curved band (no teeth) for the cradle the rack rides in.
function toothlessBand(r0, r1, startDeg, endDeg) {
  const p = (r, a) => {
    const t = (a * Math.PI) / 180
    return `${(C.x + r * Math.cos(t)).toFixed(1)} ${(C.y + r * Math.sin(t)).toFixed(1)}`
  }
  return `M ${p(r0, startDeg)} A ${r0} ${r0} 0 0 1 ${p(r0, endDeg)} L ${p(r1, endDeg)} A ${r1} ${r1} 0 0 0 ${p(r1, startDeg)} Z`
}
