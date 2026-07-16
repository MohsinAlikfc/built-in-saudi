import { Link, useParams } from 'react-router-dom'
import { getTool, tools } from '../tools'
import type { Tool } from '../tools/types'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { useLocale, localizeTool } from '../i18n'
import { NotFoundPage } from './NotFoundPage'

export function ToolPage() {
  const { toolId } = useParams()
  const tool = getTool(toolId)

  // Unknown id, or a roadmap tool that isn't routable yet.
  if (!tool || !tool.component) {
    return <NotFoundPage kind={tool ? 'coming-soon' : 'not-found'} tool={tool} />
  }

  return <LoadedTool tool={tool} />
}

function LoadedTool({ tool }: { tool: Tool }) {
  const { locale, t } = useLocale()
  const l = localizeTool(tool, locale)
  // The tool name now lives in the app-bar (Header); the page goes straight to the tool.
  useDocumentMeta(locale, `/apps/${tool.id}`, l.name, l.description)

  const ToolComponent = tool.component!
  
  const related = tools
    .filter((tl) => tl.id !== tool.id && tl.category === tool.category)
    .slice(0, 6)

  return (
    <>
      <div className="wrap py-[clamp(1.5rem,4vw,2.5rem)] animate-[fadeUp_0.5s_ease_both]">
        <h1 className="sr-only">{l.name}</h1>
        <ToolComponent />
      </div>
      
      {related.length > 0 && (
        <section className="wrap py-10 mt-10 border-t border-[color:var(--line-soft)] animate-[fadeUp_0.5s_ease_both_0.1s]">
          <h2 className="font-display font-semibold text-xl mb-6 text-ink">
            {t.toolPage.moreTools}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
            {related.map((rt) => {
              const rtl = localizeTool(rt, locale)
              return (
                <Link key={rt.id} to={`/${locale}/apps/${rt.id}`} className="block p-4 rounded-xl border border-[color:var(--line)] bg-[var(--surface)] hover:border-green-500 hover:shadow-[var(--shadow-sm)] transition-[border-color,box-shadow] no-underline">
                  <div className="flex items-center gap-3 mb-2">
                    <rt.Icon className="w-[1.4rem] h-[1.4rem] text-green-600 flex-none" />
                    <h3 className="font-semibold text-[1.05rem] text-ink m-0">{rtl.name}</h3>
                  </div>
                  <p className="text-[0.9rem] text-ink-soft m-0 leading-relaxed">{rtl.tagline}</p>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </>
  )
}
