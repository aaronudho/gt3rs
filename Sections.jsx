import { useState } from 'react'
import { skills, experience, achievements, player } from '../data.js'
import { SectionHead, projectLink } from './ui.jsx'

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-h">
      <SectionHead id="skills-h" kicker="Inventory" title="Skills and tools" />
      <div className="inv">
        {skills.map((grp) => (
          <div key={grp.group} className="inv__group">
            <h3 className="mini">{grp.group}</h3>
            <ul className="inv__grid">
              {grp.items.map((it) => (
                <li key={it.name} className="slot">
                  <span className="slot__tag" aria-hidden="true">
                    {it.tag}
                  </span>
                  <span className="slot__name">{it.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Experience({ onOpen }) {
  return (
    <section className="section" id="experience" aria-labelledby="experience-h">
      <SectionHead id="experience-h" kicker="Campaign" title="Experience" />
      <ol className="campaign">
        {experience.map((c) => (
          <li key={c.role} className="stage">
            <div className="stage__when">
              <span className="stage__dates">
                {c.dates.split(' – ').map((d, i, all) => (
                  <span key={d}>
                    {d}
                    {i < all.length - 1 ? ' –' : ''}
                  </span>
                ))}
              </span>
              <span className="stage__place">{c.place}</span>
            </div>
            <div className="stage__body">
              <h3 className="stage__role">{c.role}</h3>
              <p className="stage__org">{c.org}</p>
              <ul className="bullets">
                {c.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {c.project ? (
                <a className="btn btn--small stage__link" {...projectLink(c.project.id, onOpen)}>
                  {c.project.label} ▶
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Achievements() {
  return (
    <section className="section" id="achievements" aria-labelledby="ach-h">
      <SectionHead id="ach-h" kicker="Achievements" title="Certifications" />
      <ul className="ach">
        {achievements.map((a) => (
          <li key={a.title} className={a.unlocked ? 'badge' : 'badge badge--locked'}>
            <span className="badge__icon" aria-hidden="true">
              {a.unlocked ? '★' : '⚙'}
            </span>
            <span className="badge__text">
              <span className="badge__state">{a.unlocked ? 'Unlocked' : 'In progress'}</span>
              <strong>{a.title}</strong>
              <span>{a.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async (e) => {
    const row = e.currentTarget.parentElement
    try {
      await navigator.clipboard.writeText(player.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: select the address so it can be copied by hand.
      const el = row.querySelector('.save__email')
      const range = document.createRange()
      range.selectNodeContents(el)
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }
  return (
    <section className="section save" id="contact" aria-labelledby="save-h">
      <SectionHead id="save-h" kicker="Save point" title="Let’s talk" />
      <div className="save__box">
        <p className="save__lede">
          <span className="tag">Seeking</span> {player.seeking}
        </p>
        <div className="save__rows">
          <div className="save__row">
            <span className="mini">Email</span>
            <a className="save__email" href={`mailto:${player.email}`}>
              {player.email}
            </a>
            <button type="button" className="btn btn--small" onClick={copy}>
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="save__row">
            <span className="mini">LinkedIn</span>
            <a href={player.linkedin} target="_blank" rel="noreferrer">
              {player.linkedinLabel} ↗
            </a>
          </div>
          {player.github ? (
            <div className="save__row">
              <span className="mini">GitHub</span>
              <a href={player.github} target="_blank" rel="noreferrer">
                {player.githubLabel || player.github} ↗
              </a>
            </div>
          ) : null}
          <div className="save__row">
            <span className="mini">Base</span>
            <span>{player.location}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
