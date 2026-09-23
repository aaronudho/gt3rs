import { useCallback, useEffect, useRef, useState } from 'react'

// Tiny hash router for project pages: yoursite/#engine opens the engine
// project. Opening pushes a history entry so the browser Back button closes
// the project again. Everything still works if the host blocks history calls.
export function useProjectRoute(ids) {
  const idsRef = useRef(ids)
  idsRef.current = ids

  const read = () => {
    try {
      const id = decodeURIComponent(window.location.hash.slice(1))
      return idsRef.current.includes(id) ? id : null
    } catch {
      return null
    }
  }

  const [openId, setOpenId] = useState(read)
  const pushed = useRef(false)

  useEffect(() => {
    const sync = () => {
      const id = read()
      setOpenId(id)
      if (!id) pushed.current = false
    }
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  const open = useCallback((id) => {
    setOpenId(id)
    try {
      window.history.pushState({ project: id }, '', `#${id}`)
      pushed.current = true
    } catch {
      /* history unavailable: state alone drives the view */
    }
  }, [])

  // Switch project without adding history (prev / next buttons).
  const swap = useCallback((id) => {
    setOpenId(id)
    try {
      window.history.replaceState({ project: id }, '', `#${id}`)
    } catch {
      /* ignore */
    }
  }, [])

  // Returns 'back' when we stepped back through history, 'replaced' when the
  // page was opened straight on a project link and there is nothing to go back to.
  const close = useCallback(() => {
    setOpenId(null)
    if (pushed.current) {
      pushed.current = false
      try {
        window.history.back()
        return 'back'
      } catch {
        /* fall through */
      }
    }
    try {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#projects`)
    } catch {
      /* ignore */
    }
    return 'replaced'
  }, [])

  return { openId, open, close, swap }
}
