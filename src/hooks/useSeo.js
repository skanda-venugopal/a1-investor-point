import { useEffect } from 'react'
import { SITE } from '../data/site.js'

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.setAttribute('content', value)
}

/** Per-page title, description, Open Graph and (once VITE_SITE_URL is set) canonical URL. */
export function useSeo({ title, description, path = '/' }) {
  useEffect(() => {
    const full = title ? `${title} | ${SITE.name}` : `${SITE.name} | Mutual Funds & Insurance in Bokaro`
    document.title = full
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    if (SITE.url) {
      const url = SITE.url + (path === '/' ? '/' : path)
      setMeta('property', 'og:url', url)
      setMeta('property', 'og:image', `${SITE.url}/og-image.png`)
      let link = document.head.querySelector('link[rel="canonical"]')
      if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
      link.href = url
    }
  }, [title, description, path])
}
