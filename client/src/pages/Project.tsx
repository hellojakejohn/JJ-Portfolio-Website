import { useEffect } from 'react'
import { Link, useParams } from 'wouter'
import { projects } from '../data/site'
import NotFound from './NotFound'

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const i = projects.findIndex((p) => p.slug === slug)
  const project = projects[i]

  useEffect(() => {
    if (project) document.title = `${project.name} · hellojakejohn`
    return () => {
      document.title = 'Jake John · hellojakejohn'
    }
  }, [project])

  if (!project) return <NotFound />
  const next = projects[(i + 1) % projects.length]

  return (
    <article className="wrap case">
      <Link href="/" className="back">
        ← All work
      </Link>
      <header className="case-head">
        <div className="kicker">
          {project.role.toUpperCase()} · {project.when.toUpperCase()}
        </div>
        <h1>{project.name}</h1>
        <p className="lede">{project.oneLiner}</p>
        <div className="cta-row">
          {project.live ? (
            <a className="btn btn-primary" href={project.live.href} target="_blank" rel="noreferrer">
              Open {project.live.label} ↗
            </a>
          ) : null}
          {project.repo ? (
            <a className="btn btn-ghost" href={project.repo} target="_blank" rel="noreferrer">
              Source on GitHub ↗
            </a>
          ) : null}
        </div>
      </header>

      <div className="case-shot">
        <img src={project.image} alt={`${project.name} screenshot`} width={1200} height={630} />
      </div>

      <div className="case-grid">
        <section>
          <h2>What it is</h2>
          {project.about.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
          <h2>What I built</h2>
          <ul className="built">
            {project.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
        <aside>
          <dl className="parts-list parts-plain">
            <div className="parts-title">PARTS</div>
            {project.parts.map((p) => (
              <div key={p.label} className="parts-row">
                <dt>{p.label}</dt>
                <dd>{p.value}</dd>
              </div>
            ))}
          </dl>
          <p className={`status status-${project.status}`}>● {project.statusLabel}</p>
        </aside>
      </div>

      <Link href={`/work/${next.slug}`} className="next">
        <span className="kicker">NEXT</span>
        <span className="next-name">{next.name} →</span>
      </Link>
    </article>
  )
}
