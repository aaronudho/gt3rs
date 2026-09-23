// Gear geometry. Every gear here uses the same module (tooth size),
// so any two of them mesh when their centres sit r1 + r2 apart.

const rad = (deg) => (deg * Math.PI) / 180
const pt = (r, a) => `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`

export const pitchRadius = (teeth, module) => (module * teeth) / 2

// Closed outline of a spur gear centred on (0, 0), with an optional bore.
export function gearPath(teeth, module, bore = 0) {
  const r = pitchRadius(teeth, module)
  const tip = r + module
  const root = r - 1.25 * module
  const p = (2 * Math.PI) / teeth
  let d = ''
  for (let i = 0; i < teeth; i++) {
    const a = i * p
    const seg = [
      pt(root, a - 0.27 * p),
      pt(tip, a - 0.12 * p),
      pt(tip, a + 0.12 * p),
      pt(root, a + 0.27 * p),
    ]
    d += (i === 0 ? `M ${seg[0]}` : ` L ${seg[0]}`) + ` L ${seg[1]} L ${seg[2]} L ${seg[3]}`
  }
  d += ' Z'
  if (bore > 0) {
    d += ` M ${bore} 0 A ${bore} ${bore} 0 1 0 ${-bore} 0 A ${bore} ${bore} 0 1 0 ${bore} 0 Z`
  }
  return d
}

// A toothed band covering only part of a circle (the curved rack on the stand).
// Angles in degrees, measured clockwise from +x (SVG coordinates).
export function toothedArcPath(teeth, module, startDeg, endDeg, innerR) {
  const r = pitchRadius(teeth, module)
  const tip = r + module
  const root = r - 1.25 * module
  const p = (2 * Math.PI) / teeth
  const a0 = rad(startDeg)
  const a1 = rad(endDeg)
  const first = Math.ceil(a0 / p)
  const last = Math.floor(a1 / p)
  let d = `M ${pt(innerR, a0)} L ${pt(root, a0)}`
  for (let i = first; i <= last; i++) {
    const a = i * p
    if (a - 0.27 * p < a0 || a + 0.27 * p > a1) continue
    d += ` L ${pt(root, a - 0.27 * p)} L ${pt(tip, a - 0.12 * p)} L ${pt(tip, a + 0.12 * p)} L ${pt(root, a + 0.27 * p)}`
  }
  d += ` L ${pt(root, a1)} L ${pt(innerR, a1)}`
  // inner edge back to the start
  const large = a1 - a0 > Math.PI ? 1 : 0
  d += ` A ${innerR} ${innerR} 0 ${large} 0 ${pt(innerR, a0)} Z`
  return d
}

// Rotation (degrees) of a gear meshing with a parent.
// phi: direction from parent centre to child centre, in degrees.
export function meshedAngle(parentAngle, parentTeeth, childTeeth, phi) {
  return phi + 180 - 180 / childTeeth - (parentAngle - phi) * (parentTeeth / childTeeth)
}

// Centre of a child gear meshing with a parent at direction phi.
export function meshedCentre(parent, childTeeth, module, phi) {
  const dist = pitchRadius(parent.teeth, module) + pitchRadius(childTeeth, module)
  return {
    x: parent.x + dist * Math.cos(rad(phi)),
    y: parent.y + dist * Math.sin(rad(phi)),
  }
}
