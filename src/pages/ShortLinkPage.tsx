import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { resolveLink } from '../lib/shortenApi'
import { Spinner } from '../components/ui'

/** built-in-saudi.com/s/<code> — resolve the short code and redirect. A bare,
 *  chrome-free page (top-level route, outside the localized Layout). */
export function ShortLinkPage() {
  const { code } = useParams()
  const [status, setStatus] = useState<'loading' | 'gone'>('loading')

  useEffect(() => {
    document.title = 'Redirecting… — Built in Saudi'
    if (!code) { setStatus('gone'); return }
    let cancelled = false
    resolveLink(code).then((url) => {
      if (cancelled) return
      if (url) window.location.replace(url)
      else setStatus('gone')
    })
    return () => { cancelled = true }
  }, [code])

  return (
    <div className="min-h-[100dvh] grid place-items-center bg-[var(--sand-50)] px-6 text-center">
      {status === 'loading' ? (
        <div className="flex flex-col items-center gap-4 text-ink-soft" role="status">
          <Spinner className="size-9" />
          <span className="text-[0.95rem]">Redirecting…</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 max-w-[28rem]">
          <h1 className="font-display text-[1.4rem] text-ink">Link not found</h1>
          <p className="text-[0.95rem] text-ink-soft leading-relaxed">This short link doesn’t exist or has expired (links are kept for 6 months).</p>
          <a href="https://built-in-saudi.com" className="mt-1 inline-flex items-center h-9 px-4 rounded-md bg-green-600 text-sand-100 text-[0.9rem] font-semibold no-underline hover:bg-green-700">Go to Built in Saudi</a>
        </div>
      )}
    </div>
  )
}
