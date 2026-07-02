import { useEffect, useState } from 'react'
import { useLocale } from '../i18n'

const MSG = {
  en: 'Updated',
  ar: 'تم التحديث',
}

/** Shows a brief toast after an auto-reload triggered by a new deploy / stale chunk. */
export function UpdatedToast() {
  const { locale } = useLocale()
  const [show, setShow] = useState(() => {
    try { return sessionStorage.getItem('bis-reloaded') != null } catch { return false }
  })
  const [notes] = useState(() => {
    try { return sessionStorage.getItem('bis-update-notes') || '' } catch { return '' }
  })

  useEffect(() => {
    if (!show) return
    try {
      sessionStorage.removeItem('bis-reloaded')
      sessionStorage.removeItem('bis-chunk-reload')
      sessionStorage.removeItem('bis-update-notes')
    } catch { /* ignore */ }
    const id = window.setTimeout(() => setShow(false), notes ? 7000 : 4000)
    return () => window.clearTimeout(id)
  }, [show, notes])

  if (!show) return null
  return (
    <div className="updated-toast" role="status" data-testid="updated-toast">
      <strong className="updated-toast__label">{MSG[locale]}</strong>
      {notes && <span className="updated-toast__notes">{notes}</span>}
    </div>
  )
}
