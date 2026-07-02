import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link to="/" className="brand" aria-label="Built in Saudi — home">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="34" height="34">
              <rect width="64" height="64" rx="14" fill="var(--green-700)" />
              <path d="M32 12 L46 34 L18 34 Z" fill="none" stroke="var(--gold-400)" strokeWidth="3" strokeLinejoin="round" />
              <path d="M32 24 L39 36 L25 36 Z" fill="var(--sand-100)" />
              <rect x="18" y="40" width="28" height="3" fill="var(--green-500)" />
              <g fill="var(--gold-400)">
                <circle cx="21" cy="49" r="2.4" />
                <circle cx="32" cy="49" r="2.4" />
                <circle cx="43" cy="49" r="2.4" />
              </g>
            </svg>
          </span>
          <span className="brand__text">
            <span className="brand__name">Built in Saudi</span>
            <span className="brand__ar" lang="ar">بُنِيَ في السعودية</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <Link to="/" className="site-nav__link">Tools</Link>
          <a
            className="site-nav__link"
            href="https://github.com/bjorn-ali-goransson/built-in-saudi"
            target="_blank"
            rel="noreferrer noopener"
          >
            Source
          </a>
        </nav>
      </div>
    </header>
  )
}
