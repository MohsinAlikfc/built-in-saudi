import { useMemo, useState } from 'react'
import { useLocale } from '../../i18n'

const STR = {
  en: {
    from: 'From', to: 'To', swap: 'Swap dates',
    duration: 'Duration', years: 'years', months: 'months', days: 'days',
    totalDays: 'Total days', totalWeeks: 'Total weeks',
    sameDay: 'Same day', and: ', ',
    year: 'year', month: 'month', day: 'day', week: 'weeks', weekOne: 'week',
  },
  ar: {
    from: 'من', to: 'إلى', swap: 'تبديل التاريخين',
    duration: 'المدة', years: 'سنوات', months: 'أشهر', days: 'أيام',
    totalDays: 'إجمالي الأيام', totalWeeks: 'إجمالي الأسابيع',
    sameDay: 'اليوم نفسه', and: '، ',
    year: 'سنة', month: 'شهر', day: 'يوم', week: 'أسابيع', weekOne: 'أسبوع',
  },
}

const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

function parse(iso: string): Date | null {
  const [y, m, d] = iso.split('-').map(Number)
  return y && m && d ? new Date(y, m - 1, d) : null
}

/** Calendar-accurate years/months/days between a ≤ b. */
function ymd(a: Date, b: Date) {
  let y = b.getFullYear() - a.getFullYear()
  let m = b.getMonth() - a.getMonth()
  let d = b.getDate() - a.getDate()
  if (d < 0) { m -= 1; d += new Date(b.getFullYear(), b.getMonth(), 0).getDate() }
  if (m < 0) { y -= 1; m += 12 }
  return { y, m, d }
}

export default function DateDiffTool() {
  const { locale } = useLocale()
  const s = STR[locale]
  const today = toISO(new Date())
  const [from, setFrom] = useState(today)
  const [to, setTo] = useState(today)

  const result = useMemo(() => {
    const a0 = parse(from)
    const b0 = parse(to)
    if (!a0 || !b0) return null
    const [a, b] = a0 <= b0 ? [a0, b0] : [b0, a0]
    const { y, m, d } = ymd(a, b)
    const totalDays = Math.round((b.getTime() - a.getTime()) / 86400000)
    return { y, m, d, totalDays, totalWeeks: Math.floor(totalDays / 7) }
  }, [from, to])

  const phrase = useMemo(() => {
    if (!result) return ''
    if (result.totalDays === 0) return s.sameDay
    const parts: string[] = []
    if (result.y) parts.push(`${result.y} ${result.y === 1 ? s.year : s.years}`)
    if (result.m) parts.push(`${result.m} ${result.m === 1 ? s.month : s.months}`)
    if (result.d) parts.push(`${result.d} ${result.d === 1 ? s.day : s.days}`)
    return parts.join(s.and)
  }, [result, s])

  return (
    <div className="stack" data-testid="date-diff">
      <div className="panel dd__inputs">
        <label className="field">
          <span className="field__label">{s.from}</span>
          <input className="input" type="date" value={from} data-testid="dd-from"
            onChange={(e) => setFrom(e.target.value)} />
        </label>
        <button className="btn dd__swap" data-testid="dd-swap" aria-label={s.swap} title={s.swap}
          onClick={() => { setFrom(to); setTo(from) }}>⇅</button>
        <label className="field">
          <span className="field__label">{s.to}</span>
          <input className="input" type="date" value={to} data-testid="dd-to"
            onChange={(e) => setTo(e.target.value)} />
        </label>
      </div>

      {result && (
        <>
          <div className="dd__hero" data-testid="dd-phrase">{phrase}</div>
          <div className="wc__stats">
            <div className="wc__stat"><span className="wc__stat-num" data-testid="dd-total-days">{result.totalDays}</span><span className="wc__stat-label">{s.totalDays}</span></div>
            <div className="wc__stat"><span className="wc__stat-num" data-testid="dd-total-weeks">{result.totalWeeks}</span><span className="wc__stat-label">{s.totalWeeks}</span></div>
          </div>
        </>
      )}
    </div>
  )
}
