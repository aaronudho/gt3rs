import { useCallback, useEffect, useRef, useState } from 'react'
import { MotionProvider, useKonami } from './motion.jsx'
import { useProjectRoute } from './route.js'
import { projects } from './data.js'
import Hud from './components/Hud.jsx'
import TitleScreen from './components/TitleScreen.jsx'
import Projects from './components/Projects.jsx'
import ProjectView from './components/ProjectView.jsx'
import { Skills, Experience, Achievements, Contact } from './components/Sections.jsx'

const IDS = projects.map((p) => p.id)

export default function App() {
  const [overdrive, setOverdrive] = useState(false)
  const [toast, setToast] = useState('')
  const [explored, setExplored] = useState(() => new Set())
  const { openId, open, close, swap } = useProjectRoute(IDS)
  const trigger = useRef(null)

  // Konami code toggles "overdrive" (every gear spins 5x faster).
  const toggleOverdrive = useCallback(() => setOverdrive((v) => !v), [])
  useKonami(toggleOverdrive)
  const firstRun = useRef(true)
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    setToast(overdrive ? 'Overdrive unlocked: gears at 5x' : 'Overdrive off')
  }, [overdrive])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 3200)
    return () => clearTimeout(t)
  }, [toast])

  // Track which projects have been opened ("explored").
  useEffect(() => {
    if (!openId) return
    setExplored((prev) => {
      if (prev.has(openId)) return prev
      const next = new Set(prev)
      next.add(openId)
      return next
    })
  }, [openId])
  const allExplored = explored.size === IDS.length
  const wasAll = useRef(false)
  useEffect(() => {
    if (allExplored && !wasAll.current) setToast('Achievement unlocked: every project explored')
    wasAll.current = allExplored
  }, [allExplored])

  const openProject = useCallback(
    (id, el) => {
      trigger.current = el || null
      open(id)
    },
    [open],
  )

  const closeProject = useCallback(() => {
    const how = close()
    const el = trigger.current
    trigger.current = null
    requestAnimationFrame(() => {
      if (el && document.contains(el)) el.focus({ preventScroll: true })
      else if (how === 'replaced') document.getElementById('projects')?.scrollIntoView()
    })
  }, [close])

  return (
    <MotionProvider overdrive={overdrive}>
      <div className={overdrive ? 'app is-overdrive' : 'app'}>
        <div className="app__page" inert={openId ? true : undefined}>
          <a className="skip" href="#projects">
            Skip to projects
          </a>
          <Hud />
          <main className="wrap">
            <TitleScreen onOpen={openProject} />
            <Projects onOpen={openProject} explored={explored} />
            <Skills />
            <Experience onOpen={openProject} />
            <Achievements />
            <Contact />
          </main>
          <footer className="foot wrap">
            <p>Built with React and Vite · © 2026 Aaron Udho</p>
            <p className="foot__hint">
              {overdrive ? 'Overdrive on. Enter the code again to cool down.' : 'Cheat code: ↑ ↑ ↓ ↓ ← → ← → B A'}
            </p>
          </footer>
        </div>

        {openId ? <ProjectView id={openId} onClose={closeProject} onSwap={swap} /> : null}

        <p className={toast ? 'toast is-on' : 'toast'} role="status" aria-live="polite">
          {toast}
        </p>
      </div>
    </MotionProvider>
  )
}
