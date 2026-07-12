import { useEffect, useRef, useState } from 'react'
import { useLocale } from '../../i18n'
import { Stack, Button, Textarea } from '../../components/ui'
import { loadGis, GOOGLE_CLIENT_ID } from '../../lib/cvApi'

const FN = 'https://us-central1-blitz-ksa.cloudfunctions.net'

const DIMS = [
  { key: 'purpose_coherence', short: 'Purpose', full: 'Purpose coherence' },
  { key: 'context_instruction_harmony', short: 'Harmony', full: 'Context–instruction harmony' },
  { key: 'even_signal', short: 'Even signal', full: 'Even signal (low spikiness)' },
  { key: 'calm_tone', short: 'Calm tone', full: 'Calm tone (low shoutiness)' },
  { key: 'non_contradictory', short: 'Consistent', full: 'Non-contradictory' },
  { key: 'positive_framing', short: 'Positive', full: 'Positive framing' },
  { key: 'escape_hatch', short: 'Escape hatch', full: 'Escape hatch' },
  { key: 'stakes_clarity', short: 'Stakes', full: 'Stakes clarity' },
] as const

interface Result { scores: Record<string, number>; issues: { headline: string; description: string }[]; summary: string }

const STR = {
  en: {
    lead: 'Paste an LLM system prompt and one AI pass grades it — for spikiness, context-vs-instruction harmony, contradictions, shoutiness and more — as a spider chart, with the issues listed out. One analysis per 24 hours.',
    placeholder: 'Paste your system prompt here…', signin: 'Sign in to analyse', analyse: 'Analyse prompt', working: 'Analysing…',
    signinNote: 'Free — signing in just keeps the AI budget fair (one run per 24h).', overall: 'Overall', issues: 'Issues', again: 'Analyse another',
    scale: '1 = poor · 5 = healthy', privacy: 'Your prompt is sent once to the AI for this analysis and not stored.',
  },
  ar: {
    lead: 'الصق موجّه نظام لنموذج لغوي، وتقيّمه الأداة بمرور واحد للذكاء الاصطناعي — للحدّة، وتناغم السياق مع التعليمات، والتناقضات، والصياح وغيرها — كمخطط عنكبوتي، مع سرد المشكلات. تحليل واحد كل ٢٤ ساعة.',
    placeholder: 'الصق موجّه النظام هنا…', signin: 'سجّل الدخول للتحليل', analyse: 'حلّل الموجّه', working: 'جارٍ التحليل…',
    signinNote: 'مجاني — تسجيل الدخول فقط لضبط ميزانية الذكاء الاصطناعي (مرة كل ٢٤ ساعة).', overall: 'الإجمالي', issues: 'المشكلات', again: 'حلّل آخر',
    scale: '١ = ضعيف · ٥ = سليم', privacy: 'يُرسل موجّهك مرة واحدة للذكاء الاصطناعي لهذا التحليل ولا يُخزَّن.',
  },
}

function Radar({ scores }: { scores: Record<string, number> }) {
  const N = DIMS.length, cx = 200, cy = 200, R = 135
  const ang = (i: number) => ((-90 + (i * 360) / N) * Math.PI) / 180
  const pt = (i: number, r: number): [number, number] => [cx + r * Math.cos(ang(i)), cy + r * Math.sin(ang(i))]
  const ring = (v: number) => DIMS.map((_, i) => pt(i, (R * v) / 5).join(',')).join(' ')
  const poly = DIMS.map((d, i) => pt(i, (R * (scores[d.key] || 0)) / 5).join(',')).join(' ')
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-[420px] mx-auto" role="img" aria-label="Prompt scores">
      {[1, 2, 3, 4, 5].map((v) => <polygon key={v} points={ring(v)} fill="none" stroke="color-mix(in srgb, var(--ink) 12%, transparent)" strokeWidth={1} />)}
      {DIMS.map((_, i) => { const [x, y] = pt(i, R); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="color-mix(in srgb, var(--ink) 8%, transparent)" /> })}
      <polygon points={poly} fill="color-mix(in srgb, var(--green-500) 22%, transparent)" stroke="var(--green-600)" strokeWidth={2} strokeLinejoin="round" />
      {DIMS.map((d, i) => { const [x, y] = pt(i, (R * (scores[d.key] || 0)) / 5); return <circle key={d.key} cx={x} cy={y} r={3.5} fill="var(--green-700)" /> })}
      {DIMS.map((d, i) => { const [x, y] = pt(i, R + 22); return <text key={d.key} x={x} y={y} fontSize={11} fontWeight={600} textAnchor="middle" dominantBaseline="middle" fill="var(--ink-soft)">{d.short}</text> })}
    </svg>
  )
}

export default function PromptAnalyzerTool() {
  const { locale } = useLocale()
  const s = STR[locale]
  const [text, setText] = useState('')
  const [idToken, setIdToken] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const btnRef = useRef<HTMLDivElement>(null)
  const pending = useRef(false)

  useEffect(() => {
    let stop = false
    loadGis().then((gis) => {
      if (stop) return
      gis.initialize({ client_id: GOOGLE_CLIENT_ID, callback: (r: { credential: string }) => { setIdToken(r.credential); if (pending.current) { pending.current = false; run(r.credential) } } })
      if (btnRef.current) gis.renderButton(btnRef.current, { theme: 'outline', size: 'large', text: 'signin_with', shape: 'pill' })
    }).catch(() => { /* offline */ })
    return () => { stop = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function run(token: string) {
    setBusy(true); setErr(''); setResult(null)
    try {
      const r = await fetch(`${FN}/analyze-prompt`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken: token, prompt: text }) })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(d.error || `HTTP ${r.status}`)
      setResult(d)
    } catch (e) { setErr((e as Error).message) }
    finally { setBusy(false) }
  }
  function analyse() {
    if (text.trim().length < 20) { setErr(locale === 'ar' ? 'الصق موجّهًا أطول.' : 'Paste a longer prompt.'); return }
    if (idToken) run(idToken)
    else { pending.current = true; loadGis().then((gis) => gis.prompt()).catch(() => { /* use the button */ }) }
  }

  const overall = result ? Math.round((DIMS.reduce((a, d) => a + (result.scores[d.key] || 0), 0) / DIMS.length) * 10) / 10 : 0

  return (
    <Stack data-testid="prompt-analyzer">
      {!result && (
        <>
          <p className="text-[0.95rem] text-ink-soft leading-relaxed">{s.lead}</p>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={s.placeholder} className="min-h-[38vh] resize-y font-mono text-[0.88rem]" data-testid="pa-input" />
          {err && <p className="text-[color:var(--danger)] text-[0.9rem]" data-testid="pa-err">{err}</p>}
          <div className="flex items-center gap-3 flex-wrap">
            <Button variant="primary" disabled={busy} onClick={analyse} data-testid="pa-run">{busy ? s.working : (idToken ? s.analyse : s.signin)}</Button>
            {!idToken && <div ref={btnRef} className="[color-scheme:light]" />}
          </div>
          {!idToken && <p className="text-[0.8rem] text-ink-faint">{s.signinNote}</p>}
        </>
      )}

      {result && (
        <div className="flex flex-col gap-5" data-testid="pa-result">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 min-w-0"><Radar scores={result.scores} /></div>
            <div className="flex flex-col gap-2 w-full sm:w-[15rem]">
              <div className="flex items-baseline gap-2"><span className="text-[2.4rem] font-display font-bold text-green-700 leading-none">{overall}</span><span className="text-ink-faint text-[0.9rem]">/ 5 · {s.overall}</span></div>
              <p className="text-[0.72rem] text-ink-faint">{s.scale}</p>
              <ul className="flex flex-col gap-1 mt-1">
                {DIMS.map((d) => { const v = result.scores[d.key] || 0; return (
                  <li key={d.key} className="flex items-center gap-2 text-[0.82rem]">
                    <span className="flex-1 text-ink-soft truncate">{d.full}</span>
                    <span className="flex gap-0.5">{[1, 2, 3, 4, 5].map((n) => <span key={n} className={`w-1.5 h-3.5 rounded-[1px] ${n <= v ? 'bg-green-600' : 'bg-[color-mix(in_srgb,var(--ink)_10%,transparent)]'}`} />)}</span>
                  </li>) })}
              </ul>
            </div>
          </div>
          {result.summary && <p className="text-[0.95rem] text-ink leading-relaxed border-s-[3px] border-green-500 ps-3">{result.summary}</p>}
          <div className="flex flex-col gap-3">
            <h2 className="text-[1.05rem] font-semibold text-ink">{s.issues} · {result.issues.length}</h2>
            {result.issues.map((i, n) => (
              <div key={n} className="border border-[color:var(--line-soft)] rounded-md bg-[var(--surface)] p-3">
                <div className="flex items-start gap-2"><span className="text-gold-500 font-bold flex-none">{n + 1}.</span><div><p className="font-semibold text-ink text-[0.95rem]">{i.headline}</p><p className="text-[0.9rem] text-ink-soft leading-relaxed mt-0.5">{i.description}</p></div></div>
              </div>
            ))}
          </div>
          <Button className="self-start" onClick={() => { setResult(null); setErr('') }}>{s.again}</Button>
        </div>
      )}

      <p className="text-[0.8rem] text-ink-faint flex items-center gap-[0.4rem]"><span aria-hidden="true">🔒</span> {s.privacy}</p>
    </Stack>
  )
}
