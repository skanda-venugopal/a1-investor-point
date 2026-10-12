import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo.js'

export default function NotFound() {
  useSeo({ title: 'Page not found', description: 'The page you were looking for could not be found.', path: '/404' })
  return (
    <section className="section">
      <div className="container-page text-center">
        <p className="font-serif text-8xl font-bold text-navy-100">404</p>
        <h1 className="mt-4 text-4xl font-semibold">We couldn’t find that page</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">The link may be old or mistyped. Try the home page, or call us if you were looking for something specific.</p>
        <Link to="/" className="btn btn-primary mt-8">Back to home</Link>
      </div>
    </section>
  )
}
