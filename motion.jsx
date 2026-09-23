import { createContext, useContext, useEffect, useRef, useState } from 'react'

// Shared "game clock": one speed setting for every gear on the page.
// Overdrive (Konami code) multiplies it; reduced-motion users get a still page.
const MotionContext = createContext({ speed: 1, reduced: false })

export function MotionProvider({ overdrive, children }) {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])
  return (
    <MotionContext.Provider value={{ speed: overdrive ? 5 : 1, reduced }}>
      {children}
    </MotionContext.Provider>
  )
}

export const useMotion = () => useContext(MotionContext)

// Calls onFrame(angleDegrees) every animation frame. Angle advances at
// degPerSec x speed. Nothing runs when the viewer prefers reduced motion.
export function useSpin(degPerSec, onFrame) {
  const { speed, reduced } = useMotion()
  const angle = useRef(0)
  const cb = useRef(onFrame)
  cb.current = onFrame

  useEffect(() => {
    cb.current(angle.current)
    if (reduced) return
    let raf
    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      angle.current = (angle.current + degPerSec * speed * dt) % 360000
      cb.current(angle.current)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [degPerSec, speed, reduced])
}

// Konami code: up up down down left right left right B A
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export function useKonami(onUnlock) {
  useEffect(() => {
    let pos = 0
    const onKey = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      pos = key === KONAMI[pos] ? pos + 1 : key === KONAMI[0] ? 1 : 0
      if (pos === KONAMI.length) {
        pos = 0
        onUnlock()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onUnlock])
}
