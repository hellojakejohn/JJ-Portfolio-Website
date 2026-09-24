import { Link } from 'wouter'
import { Hand } from '../components/Chrome'

export default function NotFound() {
  return (
    <section className="wrap notfound">
      <Hand className="wave-loop" />
      <h1>Nothing here.</h1>
      <p className="lede">This page got taken apart and never put back together.</p>
      <Link href="/" className="btn btn-primary">
        Back home
      </Link>
    </section>
  )
}
