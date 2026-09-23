import { useEffect, useRef, useState } from 'react'
import { projects } from '../data.js'
import StandSim from './StandSim.jsx'
import { StatusChip, Loot } from './ui.jsx'

const pad = (n) => String(n).padStart(2, '0')

// Full-screen "open folder" view for one project.
export default function ProjectView({ id, onClose, onSwap }) {
  const idx = projects.findIndex((p) => p.id === id)
  const p = projects[idx]
  const n = projects.length
  const prev = projects[(idx - 1 + n) % n]
  const next = projects[(idx + 1) % n]
  const scroller = useRef(null)

  // Lock the page behind the folder while it is open.
  useEffect(() => {
    const html = document.documentElement
    const before = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = before
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    scroller.current?.scrollTo?.(0, 0)
  }, [id])

  if (!p) return null

  return (
    <div
      className="pv"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="pv__panel" role="dialog" aria-modal="true" aria-labelledby="pv-title">
        <div className="pv__bar">
          <svg className="pv__folder" viewBox="0 0 24 20" aria-hidden="true">
            <path d="M1 3a2 2 0 0 1 2-2h6l2 3h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z" />
          </svg>
          <p className="pv__path">
            PROJECTS\<b>{p.id.toUpperCase()}</b>
          </p>
          <span className="pv__lv">
            LV {pad(idx + 1)}/{pad(n)}
          </span>
          <button type="button" className="btn btn--small pv__close" onClick={onClose}>
            ✕ <span className="pv__esc">Close</span>
          </button>
        </div>

        <div className="pv__scroll" ref={scroller}>
          <ProjectBody key={p.id} p={p} />

          <nav className="pv__pager" aria-label="Other projects">
            <button type="button" onClick={() => onSwap(prev.id)}>
              <span className="mini">◀ Prev level</span>
              <strong>{prev.title}</strong>
            </button>
            <button type="button" className="pv__next" onClick={() => onSwap(next.id)}>
              <span className="mini">Next level ▶</span>
              <strong>{next.title}</strong>
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

function ProjectBody({ p }) {
  const [shot, setShot] = useState(0)
  const title = useRef(null)
  const count = p.photos.length
  const photo = p.photos[shot]
  const step = (d) => setShot((s) => (s + d + count) % count)

  useEffect(() => {
    title.current?.focus({ preventScroll: true })
  }, [])

  // Left / right arrow keys flip through photos (not while using the slider).
  useEffect(() => {
    if (count < 2) return
    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement) return
      if (e.key === 'ArrowLeft') setShot((s) => (s - 1 + count) % count)
      if (e.key === 'ArrowRight') setShot((s) => (s + 1) % count)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count])

  return (
    <div className="pv__grid">
      <div className="pv__media">
        <figure className="pv__shot">
          <div className="pv__frame">
            <img src={photo.src} alt={photo.alt} />
            {count > 1 ? (
              <>
                <button type="button" className="pv__nav pv__nav--prev" onClick={() => step(-1)} aria-label="Previous photo">
                  ‹
                </button>
                <button type="button" className="pv__nav pv__nav--next" onClick={() => step(1)} aria-label="Next photo">
                  ›
                </button>
              </>
            ) : null}
          </div>
          <figcaption>
            <span className="tag">
              {shot + 1}/{count}
            </span>{' '}
            {photo.caption}
          </figcaption>
        </figure>
        {count > 1 ? (
          <div className="pv__thumbs" role="group" aria-label="Choose a photo">
            {p.photos.map((ph, i) => (
              <button
                key={ph.caption}
                type="button"
                className={i === shot ? 'pv__thumb is-on' : 'pv__thumb'}
                onClick={() => setShot(i)}
                aria-label={`Show photo ${i + 1}: ${ph.caption}`}
                aria-pressed={i === shot}
              >
                <img src={ph.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        ) : null}
        {p.interactive ? (
          <div className="pv__sim">
            <p className="mini">Try it: interactive model</p>
            <StandSim />
          </div>
        ) : null}
      </div>

      <div className="pv__info">
        <p className="pv__meta">
          <StatusChip status={p.status} />
          <span>{p.when}</span>
          {p.team ? <span>{p.team}</span> : null}
        </p>
        <h2 id="pv-title" className="pv__title" tabIndex={-1} ref={title}>
          {p.title}
        </h2>
        <p className="pv__summary">{p.summary}</p>

        {p.stats ? (
          <ul className="pv__stats">
            {p.stats.map((s) => (
              <li key={s.label}>
                <span className="pv__statv">{s.value}</span>
                <span className="pv__statl">{s.label}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <h3 className="mini pv__h">{p.status === 'Complete' ? 'Objectives cleared' : 'Progress so far'}</h3>
        <ul className="checks">
          {p.did.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>

        {p.lesson ? (
          <div className="patch">
            <p className="mini">Patch notes</p>
            <p>{p.lesson}</p>
          </div>
        ) : null}

        <Loot items={p.tools} />

        {p.links?.length ? (
          <p className="pv__links">
            {p.links.map((l) => (
              <a key={l.href} className="btn btn--primary" href={l.href} target="_blank" rel="noreferrer">
                {l.label} ↗
              </a>
            ))}
          </p>
        ) : null}
      </div>
    </div>
  )
}
