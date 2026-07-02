import { useEffect } from 'react'

const DEFAULT_TITLE = 'Built in Saudi — Free, honest online tools'
const DEFAULT_DESC =
  'A growing toolbox of fast, free, privacy-first utilities — no ads, no sign-ups, nothing uploaded. Everything runs in your browser. Proudly built in Saudi Arabia.'

/** Update the document title + meta description for a page/tool (client-side SEO). */
export function useDocumentMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Built in Saudi` : DEFAULT_TITLE
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description ?? DEFAULT_DESC)
    return () => {
      document.title = DEFAULT_TITLE
      if (meta) meta.setAttribute('content', DEFAULT_DESC)
    }
  }, [title, description])
}
