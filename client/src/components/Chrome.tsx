import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { Link, useLocation } from 'wouter'
import { socials } from '../data/site'
import SocialIcon from './SocialIcon'

type Theme = 'dark' | 'light'

function readTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')
  useEffect(() => setTheme(readTheme()), [])

  function flip() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#0F1813' : '#F2E9DC')
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage blocked: theme still flips for this visit */
    }
    setTheme(next)
  }

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  return (
    <button type="button" className="theme-toggle" onClick={flip} aria-label={label} title={label}>
      {theme === 'dark' ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  )
}

/** Link to a section on the home page that works from any route. */
export function SectionLink({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  const [location, navigate] = useLocation()
  function go(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (location !== '/') {
      navigate('/')
      setTimeout(scroll, 60)
    } else {
      scroll()
    }
    history.replaceState(null, '', `/#${id}`)
  }
  return (
    <a href={`/#${id}`} onClick={go} className={className}>
      {children}
    </a>
  )
}

export function Hand({ className = '' }: { className?: string }) {
  return <img src="/img/hand.png" alt="" className={`hand ${className}`} width={157} height={203} />
}

export function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="brand" aria-label="hellojakejohn home">
          <span className="brand-badge">
            <Hand className="wave-once" />
          </span>
          <span className="wordmark">
            <span className="w-a">hello</span>
            <span className="w-b">jakejohn</span>
          </span>
        </Link>
        <nav className="nav-links" aria-label="Main">
          <SectionLink id="work">Work</SectionLink>
          <SectionLink id="about">About</SectionLink>
          <Link href="/resume">Resume</Link>
          <span className="nav-socials">
            {socials.map((s) => (
              <a key={s.id} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}>
                <SocialIcon id={s.id} />
              </a>
            ))}
          </span>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

export function SocialPills() {
  return (
    <ul className="social-pills">
      {socials.map((s) => (
        <li key={s.id}>
          <a href={s.href} target="_blank" rel="noreferrer">
            <SocialIcon id={s.id} size={15} /> {s.handle}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="tagline">TAKING THINGS APART</div>
        <div className="footer-links">
          {socials.map((s) => (
            <a key={s.id} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}>
              <SocialIcon id={s.id} size={20} />
            </a>
          ))}
        </div>
        <div className="footer-meta">© {new Date().getFullYear()} Jakob Johnson · Saint Paul, MN</div>
      </div>
    </footer>
  )
}
