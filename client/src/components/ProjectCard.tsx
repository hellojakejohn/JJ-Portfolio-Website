import { Link } from 'wouter'
import type { Project } from '../data/site'

// Where each part flies to when the card is taken apart (percent of the image box).
const spots = [
  { x: '28%', y: '18%', r: '-6deg' },
  { x: '72%', y: '24%', r: '5deg' },
  { x: '30%', y: '80%', r: '4deg' },
  { x: '70%', y: '76%', r: '-5deg' },
]

function Exploded({ project }: { project: Project }) {
  return (
    <div className="explode" aria-hidden="true">
      <img src={project.image} alt="" className="explode-img" loading="lazy" width={1200} height={630} />
      {project.parts.map((part, i) => (
        <span
          key={part.label}
          className="part"
          style={{ ['--x' as string]: spots[i % 4].x, ['--y' as string]: spots[i % 4].y, ['--r' as string]: spots[i % 4].r, ['--d' as string]: `${i * 40}ms` }}
        >
          {part.value}
        </span>
      ))}
    </div>
  )
}

function StatusDot({ project }: { project: Project }) {
  return <span className={`status status-${project.status}`}>● {project.statusLabel}</span>
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card takeapart">
      <Link href={`/work/${project.slug}`} className="card-media" aria-label={`${project.name} case study`}>
        <Exploded project={project} />
      </Link>
      <div className="card-body">
        <div className="card-head">
          <h3>
            <Link href={`/work/${project.slug}`}>{project.name}</Link>
          </h3>
          <StatusDot project={project} />
        </div>
        <p>{project.oneLiner}</p>
        <div className="parts-line">{project.parts.map((p) => p.value.split(' · ')[0]).join(' · ')}</div>
        <div className="card-links">
          <Link href={`/work/${project.slug}`}>Case study →</Link>
          {project.live ? (
            <a href={project.live.href} target="_blank" rel="noreferrer">
              {project.live.label} ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export function FeatureCard({ project }: { project: Project }) {
  return (
    <article className="feature takeapart">
      <div className="feature-text">
        <div className="kicker kicker-feature">
          {project.role.toUpperCase()} · {project.when.toUpperCase()}
        </div>
        <h3>{project.name}</h3>
        <p>
          {project.oneLiner} I've built the mobile app, the onchain program and the backend since the first commit.
        </p>
        <Link href={`/work/${project.slug}`} className="feature-link">
          Read the case study →
        </Link>
      </div>
      <div className="feature-side">
        <Link href={`/work/${project.slug}`} className="card-media feature-media" aria-label={`${project.name} case study`}>
          <Exploded project={project} />
        </Link>
        <dl className="parts-list">
          <div className="parts-title">PARTS</div>
          {project.parts.map((p) => (
            <div key={p.label} className="parts-row">
              <dt>{p.label}</dt>
              <dd>{p.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}
