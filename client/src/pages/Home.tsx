import { useState, type FormEvent } from 'react'
import { Link } from 'wouter'
import { SectionLink, SocialPills } from '../components/Chrome'
import ProjectCard, { FeatureCard } from '../components/ProjectCard'
import { credentials, email, projects, socials, stack, xChallenge } from '../data/site'

function challengeDay(): number | null {
  // Today's date in Saint Paul, as YYYY-MM-DD
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date())
  const ms = Date.parse(today) - Date.parse(xChallenge.start)
  const day = Math.floor(ms / 86_400_000) + 1
  return day >= 1 && day <= xChallenge.days ? day : null
}

function Hero() {
  return (
    <section className="hero wrap">
      <div className="hero-text">
        <div className="tagline">TAKING THINGS APART</div>
        <h1>
          Full-stack engineer who ships <span className="accent">onchain.</span>
        </h1>
        <p className="lede">
          Hi, I'm Jake. Founding engineer at TripQuest, building AI travel quests with Solana rewards. On X and YouTube I take
          crypto and code apart to see how they work.
        </p>
        <div className="cta-row">
          <SectionLink id="work" className="btn btn-primary">
            See the work
          </SectionLink>
          <Link href="/resume" className="btn btn-ghost">
            Resume
          </Link>
        </div>
        <SocialPills />
      </div>
      <div className="hero-photo">
        <img src="/img/jake.jpg" alt="Jake John" width={720} height={720} />
      </div>
    </section>
  )
}

function Now() {
  const day = challengeDay()
  return (
    <section className="wrap">
      <div className="now">
        <div className="now-prompt">$ cat now.txt</div>
        <div className="now-body">
          building TripQuest · a teardown every Wednesday on YouTube · 2 posts a day on X
          {day ? <span className="now-day"> · day {day} of {xChallenge.days}</span> : null}
        </div>
      </div>
    </section>
  )
}

function Work() {
  const featured = projects.find((p) => p.featured)!
  const rest = projects.filter((p) => !p.featured)
  return (
    <section id="work" className="wrap section">
      <div className="section-head">
        <h2>Work</h2>
        <div className="kicker">HOVER TO TAKE ONE APART</div>
      </div>
      <FeatureCard project={featured} />
      <div className="card-grid">
        {rest.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  )
}

function Teardown() {
  const x = socials.find((s) => s.id === 'x')!
  const yt = socials.find((s) => s.id === 'youtube')!
  return (
    <section className="wrap">
      <div className="teardown">
        <div>
          <div className="kicker">EVERY WEDNESDAY</div>
          <div className="teardown-title">One crypto project, taken apart.</div>
          <p>A thread on X and a screen-recorded walkthrough on YouTube. What it does, how it works, whether it holds up.</p>
        </div>
        <div className="cta-row">
          <a className="btn btn-primary" href={x.href} target="_blank" rel="noreferrer">
            Follow on X
          </a>
          <a className="btn btn-ghost" href={yt.href} target="_blank" rel="noreferrer">
            Watch on YouTube
          </a>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="wrap section about">
      <div className="about-text">
        <h2>About</h2>
        <p>
          I'm Jake, a full-stack engineer in Saint Paul, MN. Before code I worked in kitchens and on film sets. I learned to build
          through Metana's full-stack and Solidity programs, and I've been shipping since.
        </p>
        <p>
          I work across the whole thing: contracts, APIs, the app people actually touch. I build fast with AI tooling like Claude
          Code and post what I learn along the way.
        </p>
        <h3>Credentials</h3>
        <ul className="creds">
          {credentials.map((c) => (
            <li key={c.title}>
              {c.url ? (
                <a className="cred-title" href={c.url} target="_blank" rel="noreferrer">
                  {c.title} ↗
                </a>
              ) : (
                <span className="cred-title">{c.title}</span>
              )}
              <span className="cred-meta">
                {c.issuer}
                {c.date ? ` · ${c.date}` : ''}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="about-stack">
        <h3>What I use</h3>
        {stack.map((g) => (
          <div key={g.group} className="stack-group">
            <div className="stack-label">{g.group}</div>
            <div className="chips">
              {g.items.map((i) => (
                <span key={i} className="chip">
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

type SendState = { kind: 'idle' } | { kind: 'sending' } | { kind: 'ok'; msg: string } | { kind: 'error'; msg: string }

function Contact() {
  const [state, setState] = useState<SendState>({ kind: 'idle' })
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked: the address is visible and selectable */
    }
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setState({ kind: 'sending' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok || !body.success) throw new Error(body.message || 'Could not send.')
      form.reset()
      setState({ kind: 'ok', msg: "Sent. I'll get back to you soon." })
    } catch (err) {
      setState({ kind: 'error', msg: `${(err as Error).message} You can also email ${email}.` })
    }
  }

  return (
    <section id="contact" className="wrap section contact">
      <div>
        <h2>Say hello</h2>
        <p className="lede">Hiring, building something onchain, or want your project in a Wednesday teardown? Send a note.</p>
        <div className="email-row">
          <code className="email">{email}</code>
          <button type="button" className="btn btn-ghost btn-sm" onClick={copy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <label htmlFor="c-name">Name</label>
        <input id="c-name" name="name" required autoComplete="name" />
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" required autoComplete="email" />
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" rows={5} required />
        <button type="submit" className="btn btn-primary" disabled={state.kind === 'sending'}>
          {state.kind === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        {state.kind === 'ok' || state.kind === 'error' ? (
          <p className={`form-status ${state.kind}`} role="status">
            {state.msg}
          </p>
        ) : null}
      </form>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Now />
      <Work />
      <Teardown />
      <About />
      <Contact />
    </>
  )
}
