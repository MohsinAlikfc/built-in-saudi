import { Link, useLocation } from 'react-router-dom'
import { useLocale, localePath, localizeTool } from '../i18n'
import { tools } from '../tools'

export function Breadcrumbs() {
  const { locale, t } = useLocale()
  const location = useLocation()

  // Do not show on home page, booking standalone page, or root redirect
  const isHome = location.pathname === `/${locale}` || location.pathname === `/${locale}/` || location.pathname === '/'
  const isBooking = /\/book\//.test(location.pathname)
  if (isHome || isBooking) return null

  const homeName = locale === 'ar' ? 'الرئيسية' : 'Home'
  
  // Check if it's an app
  const appMatch = location.pathname.match(/\/apps\/([^/]+)/)
  const isApp = !!appMatch
  
  let currentName = ''
  if (isApp) {
    const tool = tools.find(tl => tl.id === appMatch[1])
    if (tool) {
      currentName = localizeTool(tool, locale).name
    }
  } else if (location.pathname.includes('/privacy')) {
    currentName = t.footer.privacy
  } else if (location.pathname.includes('/terms')) {
    currentName = t.footer.terms
  }

  if (!currentName) return null

  return (
    <nav aria-label="Breadcrumb" className="wrap pt-6 pb-0 text-[0.85rem] font-medium text-ink-faint">
      <ol className="flex flex-wrap items-center gap-2 list-none p-0 m-0">
        <li>
          <Link to={localePath(locale)} className="hover:text-ink transition-colors no-underline">
            {homeName}
          </Link>
        </li>
        <li aria-hidden="true" className="opacity-50 font-normal text-[1rem] select-none rtl:rotate-180">›</li>
        {isApp && (
          <>
            <li>
              <Link to={localePath(locale)} className="hover:text-ink transition-colors no-underline">
                {t.toolPage.breadcrumb}
              </Link>
            </li>
            <li aria-hidden="true" className="opacity-50 font-normal text-[1rem] select-none rtl:rotate-180">›</li>
          </>
        )}
        <li className="text-ink" aria-current="page">
          {currentName}
        </li>
      </ol>
    </nav>
  )
}
