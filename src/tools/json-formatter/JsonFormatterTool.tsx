import { useState } from 'react'
import { useLocale } from '../../i18n'
import { CopyIcon, DownloadIcon } from '../../components/icons'

const STR = {
  en: {
    placeholder: 'Paste JSON here…',
    format: 'Format', minify: 'Minify', sortKeys: 'Sort keys',
    copy: 'Copy', copied: 'Copied!', download: 'Download',
    indent: 'Indent', chars: (n: number) => `${n.toLocaleString()} chars`,
    errAt: (l: number, c: number) => `Invalid JSON — line ${l}, column ${c}`,
    empty: 'Enter some JSON, then Format or Minify.',
    privacy: 'Runs entirely in your browser — nothing is uploaded.',
  },
  ar: {
    placeholder: 'الصق JSON هنا…',
    format: 'تنسيق', minify: 'تصغير', sortKeys: 'ترتيب المفاتيح',
    copy: 'نسخ', copied: 'تم النسخ!', download: 'تنزيل',
    indent: 'المسافة', chars: (n: number) => `${n.toLocaleString('ar')} حرف`,
    errAt: (l: number, c: number) => `JSON غير صالح — السطر ${l}، العمود ${c}`,
    empty: 'أدخل JSON ثم اضغط تنسيق أو تصغير.',
    privacy: 'يعمل بالكامل داخل متصفحك — لا يُرفع أي شيء.',
  },
}

function sortDeep(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(sortDeep)
  if (v && typeof v === 'object') {
    return Object.keys(v as Record<string, unknown>).sort().reduce((o, k) => {
      o[k] = sortDeep((v as Record<string, unknown>)[k]); return o
    }, {} as Record<string, unknown>)
  }
  return v
}

function locate(raw: string, message: string): { line: number; col: number } {
  const lc = message.match(/line (\d+) column (\d+)/i)
  if (lc) return { line: +lc[1], col: +lc[2] }
  const p = message.match(/position (\d+)/i)
  if (p) {
    const pos = +p[1]
    const before = raw.slice(0, pos)
    return { line: before.split('\n').length, col: pos - before.lastIndexOf('\n') }
  }
  return { line: 1, col: 1 }
}

export default function JsonFormatterTool() {
  const { locale } = useLocale()
  const s = STR[locale]
  const [raw, setRaw] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<{ line: number; col: number } | null>(null)
  const [indent, setIndent] = useState(2)
  const [sort, setSort] = useState(false)
  const [copied, setCopied] = useState(false)

  function run(minify: boolean) {
    if (!raw.trim()) { setOutput(''); setError(null); return }
    try {
      const obj = sort ? sortDeep(JSON.parse(raw)) : JSON.parse(raw)
      setOutput(minify ? JSON.stringify(obj) : JSON.stringify(obj, null, indent))
      setError(null)
    } catch (e) {
      setError(locate(raw, e instanceof Error ? e.message : String(e)))
      setOutput('')
    }
  }

  async function copy() {
    if (!output) return
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { /* ignore */ }
  }
  function download() {
    if (!output) return
    const url = URL.createObjectURL(new Blob([output], { type: 'application/json' }))
    const a = document.createElement('a')
    a.href = url; a.download = 'formatted.json'; document.body.appendChild(a); a.click(); a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="stack" data-testid="json-formatter">
      <textarea
        className="input input--area font-mono text-[0.9rem] min-h-[9rem]" data-testid="json-input"
        placeholder={s.placeholder} value={raw} spellCheck={false} dir="ltr"
        onChange={(e) => setRaw(e.target.value)}
      />

      <div className="flex flex-wrap items-center gap-[0.6rem]">
        <button className="btn btn--primary" data-testid="json-format" onClick={() => run(false)}>{s.format}</button>
        <button className="btn" data-testid="json-minify" onClick={() => run(true)}>{s.minify}</button>
        <div className="seg" role="group" aria-label={s.indent}>
          {[2, 4].map((n) => (
            <button key={n} className={`seg__btn ${indent === n ? 'is-active' : ''}`} aria-pressed={indent === n}
              onClick={() => setIndent(n)}>{n}</button>
          ))}
        </div>
        <label className="check"><input type="checkbox" checked={sort} onChange={(e) => setSort(e.target.checked)} data-testid="json-sort" /> {s.sortKeys}</label>
      </div>

      {error ? (
        <p className="px-[0.9rem] py-[0.8rem] bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] border border-[color-mix(in_srgb,var(--danger)_35%,transparent)] rounded-[5px] text-[color:var(--danger)] font-semibold" data-testid="json-error">
          {s.errAt(error.line, error.col)}
        </p>
      ) : output ? (
        <>
          <pre className="code-out overflow-x-auto p-4 bg-sand-100 border border-[color:var(--line-soft)] rounded-md text-ink whitespace-pre" dir="ltr" data-testid="json-output">{output}</pre>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span className="text-[0.82rem] text-ink-faint font-mono">{s.chars(output.length)}</span>
            <div className="flex gap-[0.6rem]">
              <button className="btn" data-testid="json-copy" onClick={copy}><CopyIcon /> {copied ? s.copied : s.copy}</button>
              <button className="btn" onClick={download}><DownloadIcon /> {s.download}</button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-ink-faint text-[0.95rem]">{s.empty}</p>
      )}

      <p className="text-[0.8rem] text-ink-faint flex items-center gap-[0.4rem]"><span aria-hidden="true">🔒</span> {s.privacy}</p>
    </div>
  )
}
