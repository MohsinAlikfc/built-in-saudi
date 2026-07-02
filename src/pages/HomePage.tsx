import { useMemo, useRef, useState } from 'react'
import { tools } from '../tools'
import { ToolCard } from '../components/ToolCard'
import { SearchIcon } from '../components/icons'
import { scoreTool } from '../lib/fuzzy'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { useLocale, localizeTool } from '../i18n'

export function HomePage() {
  const { locale, t } = useLocale()
  useDocumentMeta(locale, '/')
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Keep each tool's original catalog number stable while filtering.
  // Search matches both the localized and English fields so either language works.
  const results = useMemo(() => {
    const indexed = tools.map((tool, i) => {
      const l = localizeTool(tool, locale)
      const searchable = {
        name: `${l.name} ${tool.name}`,
        tagline: `${l.tagline} ${tool.tagline}`,
        category: `${l.category} ${tool.category}`,
        keywords: tool.keywords,
      }
      return { tool, i, searchable }
    })
    if (!query.trim()) return indexed
    return indexed
      .map((r) => ({ ...r, score: scoreTool(query, r.searchable) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
  }, [query, locale])

  return (
    <>
      <section className="catalog catalog--home wrap" aria-labelledby="catalog-title">
        <h1 id="catalog-title" className="sr-only">{t.hero.title1} {t.hero.title2}</h1>

        <div className="tool-search" role="search">
          <SearchIcon className="tool-search__icon" />
          <input
            ref={inputRef}
            type="search"
            className="tool-search__input"
            placeholder={t.catalog.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t.catalog.searchAria}
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className="tool-search__clear"
              onClick={() => { setQuery(''); inputRef.current?.focus() }}
              aria-label={t.catalog.clear}
            >
              ✕
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <div className="tool-grid">
            {results.map(({ tool, i }) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>
        ) : (
          <p className="tool-search__empty">{t.catalog.empty(query)}</p>
        )}
      </section>
    </>
  )
}
