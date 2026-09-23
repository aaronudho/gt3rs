import GearTrain from './GearTrain.jsx'
import StandSim from './StandSim.jsx'
import { projectLink } from './ui.jsx'
import { player, projects, highScores } from '../data.js'

const START = { x: 120, y: 520, teeth: 30 }
const CHAIN = [
  { teeth: 12, phi: -38 },
  { teeth: 20, phi: -95 },
  { teeth: 16, phi: 20, from: 0 },
]

export default function TitleScreen({ onOpen }) {
  return (
    <section className="title" id="top" aria-labelledby="title-name">
      <svg className="title__gears" viewBox="0 0 700 700" preserveAspectRatio="xMinYMax slice" aria-hidden="true">
        <GearTrain module={9} start={START} chain={CHAIN} degPerSec={9} tones={['gear--brass', 'gear--steel', 'gear--dim', 'gear--steel']} />
      </svg>

      <div className="title__copy">
        <p className="eyebrow">
          <span className="eyebrow__dot" aria-hidden="true" />
          Player 1 · {player.program} · {player.year}
        </p>
        <h1 id="title-name" className="title__name">
          Aaron Udho
        </h1>
        <p className="title__class">
          {player.program}, {player.minor}
          <br />
          {player.school} · {player.grad}
        </p>
        <p className="title__lede">
          I design mechanisms in SolidWorks, print them, find what I got wrong, and fix it. {projects.length} projects
          below, from a gear-driven phone stand to a flower I’m still printing.
        </p>
        <div className="title__actions">
          <a className="btn btn--primary" href="#projects">
            <span className="blink" aria-hidden="true">
              ▶
            </span>{' '}
            Press start: view projects
          </a>
          <a className="btn" href={player.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </div>
      </div>

      <div className="title__sim">
        <StandSim />
      </div>

      <div className="title__scores">
        <p className="mini">High scores</p>
        <ul className="scores">
          {highScores.map((s) => (
            <li key={s.label} className="score">
              <a {...projectLink(s.project, onOpen)}>
                <span className="score__value">{s.value}</span>
                <span className="score__label">{s.label}</span>
                <span className="score__note">
                  {s.note} <span aria-hidden="true">▶</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
