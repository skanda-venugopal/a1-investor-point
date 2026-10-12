import { useEffect, useRef, useState } from 'react'

/** Adds an `is-in` state when the element scrolls into view. Content is never hidden without JS/IO support. */
export function useReveal() {
  const ref = useRef(null)
  const [armed, setArmed] = useState(false) // set after mount so SSR/no-JS shows content
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setShown(true); return }
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.95) { setShown(true); setArmed(true); return }
    setArmed(true)
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, armed ? `js-reveal${shown ? ' is-in' : ''}` : '']
}
