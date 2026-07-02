import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { liveTools } from '../tools'
import { useLocale, localePath, localizeTool } from '../i18n'
import { GridIcon } from './icons'

/** A 9-dot app launcher: opens a panel listing the live tools (apps). */
export function AppLauncher() {
  const { locale, t } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div className="launcher" ref={ref}>
      <button
        className="launcher__btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.nav.tools}
        data-testid="app-launcher"
        onClick={() => setOpen((o) => !o)}
      >
        <GridIcon />
      </button>

      {open && (
        <div className="launcher__panel" role="menu" data-testid="app-launcher-panel">
          <p className="launcher__title">{t.nav.tools}</p>
          <div className="launcher__grid">
            {liveTools.map((tool) => {
              const l = localizeTool(tool, locale)
              const Icon = tool.Icon
              return (
                <Link
                  key={tool.id}
                  to={localePath(locale, `/tools/${tool.id}`)}
                  className="launcher__app"
                  role="menuitem"
                  data-testid={`launcher-${tool.id}`}
                  onClick={() => setOpen(false)}
                >
                  <span className="launcher__app-icon" aria-hidden="true"><Icon /></span>
                  <span className="launcher__app-name">{l.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
