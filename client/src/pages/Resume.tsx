import { useEffect } from 'react'
import { credentials, email, projects, stack } from '../data/site'

const pdf = '/JakobJohnsonResume.pdf'

export default function Resume() {
  useEffect(() => {
    document.title = 'Resume · Jakob Johnson'
    return () => {
      document.title = 'Jake John · hellojakejohn'
    }
  }, [])

  const tq = projects.find((p) => p.slug === 'tripquest')!
  const side = projects.filter((p) => p.slug !== 'tripquest')

  return (
    <section className="wrap resume-page">
      <div className="resume-actions">
        <a className="btn btn-primary" href={pdf} download>
          Download PDF
        </a>
      </div>
      <div className="resume">
        <header className="r-head">
          <h1>Jakob Johnson</h1>
          <div className="r-role">Full-Stack Engineer · Web3</div>
          <div className="r-contact">
            Saint Paul, MN · {email} · hellojakejohn.com · github.com/hellojakejohn · linkedin.com/in/hellojakejohn · x.com/hellojakejohn
          </div>
        </header>

        <section>
          <h2>Summary</h2>
          <p>
            Full-stack engineer building on Web2 and onchain. Founding engineer at TripQuest. Ships fast with AI tooling (Claude
            Code, agentic workflows). Came to software from professional kitchens and film production.
          </p>
        </section>

        <section>
          <h2>Experience</h2>
          <div className="r-item">
            <div className="r-line">
              <strong>Founding Engineer, TripQuest</strong>
              <span>{tq.when.replace('to now', 'to present')}</span>
            </div>
            <p>{tq.oneLiner}</p>
            <ul>
              {tq.built.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2>Projects</h2>
          {side.map((p) => (
            <div className="r-item" key={p.slug}>
              <div className="r-line">
                <strong>
                  {p.name}
                  {p.live ? <span className="r-url"> · {p.live.label}</span> : null}
                </strong>
                <span>{p.when}</span>
              </div>
              <p>
                {p.oneLiner} {p.parts.map((x) => x.value).join(', ')}.
              </p>
            </div>
          ))}
        </section>

        <section>
          <h2>Skills</h2>
          {stack.map((g) => (
            <p key={g.group} className="r-skill">
              <strong>{g.group}:</strong> {g.items.join(', ')}
            </p>
          ))}
        </section>

        <section>
          <h2>Education + certifications</h2>
          {credentials.map((c) => (
            <div className="r-line" key={c.title}>
              <span>
                <strong>{c.title}</strong>, {c.issuer}
              </span>
              <span>{c.date}</span>
            </div>
          ))}
        </section>
      </div>
    </section>
  )
}
