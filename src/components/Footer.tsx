import { Link } from 'react-router-dom'
import { SaduDivider } from './SaduDivider'
import { useLocale, localePath } from '../i18n'

export function Footer() {
  const { locale, t } = useLocale()
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <SaduDivider className="sadu--footer" />
      <div className="wrap site-footer__inner">
        <div className="site-footer__col">
          <p className="site-footer__made" lang="ar">
            صُنع بعناية في المملكة العربية السعودية
          </p>
        </div>
        <nav className="site-footer__links" aria-label="Footer">
          <Link to={localePath(locale)} data-testid="footer-all-tools">{t.footer.allTools}</Link>
          <a href="https://github.com/bjorn-ali-goransson/built-in-saudi" target="_blank" rel="noreferrer noopener" data-testid="footer-github">
            {t.footer.github}
          </a>
          <a
            href="https://github.com/bjorn-ali-goransson/built-in-saudi/issues/new"
            target="_blank"
            rel="noreferrer noopener"
            data-testid="footer-report-issue"
          >
            {t.footer.reportIssue}
          </a>
        </nav>
      </div>
      {/* Pilot: migrated to Tailwind utilities (brand tokens mapped in tailwind.css). */}
      <div className="wrap flex items-center gap-[0.6rem] mt-[1.8rem] text-[0.82rem] text-ink-faint font-mono">
        <span>© {year} Built in Saudi</span>
        <span className="opacity-50">·</span>
        <span>built-in-saudi.com</span>
      </div>
    </footer>
  )
}
