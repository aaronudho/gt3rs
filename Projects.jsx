import { useState } from 'react'
import { projects, categories } from '../data.js'
import { SectionHead, StatusChip, projectLink, TAB_COLOURS } from './ui.jsx'

const pad = (n) => String(n).padStart(2, '0')

export default function Projects({ onOpen, explored }) {
  const [filter, setFilter] = useState('all')
  const list = filter === 'all' ? projects : projects.filter((p) => p.cats.includes(filter))
  const count = (id) => (id === 'all' ? projects.length : projects.filter((p) => p.cats.includes(id)).length)

  // Size the featured card so the grid's last row is never left half empty.
  const hasFeatured = filter === 'all' && list.some((p) => p.featured)
  const others = list.length - 1
  const f3 = !hasFeatured ? 'none' : (others + 2) % 3 === 0 || others % 3 === 0 ? 'wide' : 'tall'
  const f2 = hasFeatured && others % 2 === 0 ? 'wide' : 'none'

  return (
    <section className="section" id="projects" aria-labelledby="projects-h">
      <SectionHead id="projects-h" kicker="Level select" title="Projects">
        Pick a level to open the full project: photos, what I did and what I learned.
      </SectionHead>

      <div className="lvlbar">
        <div className="filters" role="group" aria-label="Filter projects by type">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className="filter"
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
            >
              {c.label} <span className="filter__n">{count(c.id)}</span>
            </button>
          ))}
        </div>
        <p className="explored">
          <span className="mini">Explored</span>
          <span className="explored__pips" aria-hidden="true">
            {projects.map((p) => (
              <i key={p.id} className={explored.has(p.id) ? 'is-on' : undefined} />
            ))}
          </span>
          <span className="explored__n">
            {explored.size}/{projects.length}
            <span className="sr-only"> projects opened</span>
          </span>
        </p>
      </div>

      <ul className="lvl" data-f3={f3} data-f2={f2}>
        {list.map((p) => {
          const n = projects.indexOf(p)
          const wide = p.featured && filter === 'all'
          return (
            <li key={p.id} className={wide ? 'lvl__item lvl__item--wide' : 'lvl__item'}>
              <a className="cart" {...projectLink(p.id, onOpen)} style={{ '--tab': TAB_COLOURS[n % TAB_COLOURS.length] }}>
                <span className="cart__tab" aria-hidden="true">
                  LV {pad(n + 1)}
                </span>
                <span className="cart__media">
                  <img src={p.cover} alt="" loading="lazy" style={{ objectPosition: p.coverPos || '50% 50%' }} />
                  <StatusChip status={p.status} />
                  {explored.has(p.id) ? <span className="cart__seen">✓ Explored</span> : null}
                </span>
                <span className="cart__body">
                  <span className="cart__meta">
                    {p.when}
                    {p.team ? ` · ${p.team}` : ''}
                  </span>
                  <h3 className="cart__title">{p.title}</h3>
                  <span className="cart__text">{p.short}</span>
                  {wide && p.stats ? (
                    <span className="cart__stats">
                      {p.stats.map((st) => (
                        <span key={st.label} className="cart__stat">
                          <b>{st.value}</b> {st.label}
                        </span>
                      ))}
                    </span>
                  ) : null}
                  <span className="cart__tools">
                    {p.tools.slice(0, 3).map((t) => (
                      <span key={t} className="loot__item">
                        {t}
                      </span>
                    ))}
                  </span>
                  <span className="cart__go">
                    Open level <span aria-hidden="true">▶</span>
                  </span>
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
