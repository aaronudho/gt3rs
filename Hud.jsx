import { useEffect, useRef, useState } from 'react'
import { gearPath } from '../gears.js'
import { useSpin } from '../motion.jsx'
import { player } from '../data.js'

const NAV = [
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['achievements', 'Achievements'],
  ['contact', 'Contact'],
]

const LOGO_GEAR = gearPath(10, 2, 3)

export default function Hud() {
  const gear = useRef(null)
  const xp = useRef(null)
  const [active, setActive] = useState('')
  useSpin(40, (a) => gear.current?.setAttribute('transform', `rotate(${a})`))

  // XP bar = how far down the page you are.
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      xp.current?.style.setProperty('--xp', max > 0 ? (h.scrollTop / max).toFixed(4) : '0')
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Highlight the section currently on screen.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const els = NAV.map(([id]) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <header className="hud">
      <div className="hud__inner">
        <a className="hud__brand" href="#top" aria-label={`${player.name}, back to top`}>
          <svg viewBox="-14 -14 28 28" className="hud__logo" aria-hidden="true">
            <path ref={gear} d={LOGO_GEAR} fillRule="evenodd" />
          </svg>
          <span className="hud__p1">P1</span>
          <span className="hud__name">{player.name}</span>
        </a>
        <nav className="hud__nav" aria-label="Sections">
          <ul>
            {NAV.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="hud__xp" ref={xp} aria-hidden="true">
        <span />
      </div>
    </header>
  )
}
