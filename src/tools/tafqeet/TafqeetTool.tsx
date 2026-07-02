import { useMemo, useState } from 'react'
import { useLocale } from '../../i18n'
import { CopyIcon } from '../../components/icons'
import { tafqeetInt, tafqeetSAR } from './tafqeet'

const STR = {
  en: {
    sar: 'SAR amount', plain: 'Plain number', amount: 'Amount',
    result: 'In words', copy: 'Copy', copied: 'Copied!',
    empty: 'Enter a number to spell it in Arabic.', tooBig: 'Number is too large.',
  },
  ar: {
    sar: 'مبلغ بالريال', plain: 'رقم مجرّد', amount: 'المبلغ',
    result: 'كتابةً', copy: 'نسخ', copied: 'تم النسخ!',
    empty: 'أدخل رقمًا لتفقيطه.', tooBig: 'الرقم كبير جدًا.',
  },
}

export default function TafqeetTool() {
  const { locale } = useLocale()
  const s = STR[locale]
  const [mode, setMode] = useState<'sar' | 'plain'>('sar')
  const [value, setValue] = useState('1500')
  const [copied, setCopied] = useState(false)

  const words = useMemo(() => {
    const n = parseFloat(value)
    if (isNaN(n) || n < 0) return ''
    if (n > 999_999_999_999) return STR[locale].tooBig
    return mode === 'sar' ? tafqeetSAR(n) : tafqeetInt(Math.floor(n))
  }, [value, mode, locale])

  async function copy() {
    if (!words) return
    try { await navigator.clipboard.writeText(words); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { /* ignore */ }
  }

  return (
    <div className="stack" data-testid="tafqeet">
      <div className="seg self-start" role="group">
        {(['sar', 'plain'] as const).map((m) => (
          <button key={m} className={`seg__btn ${mode === m ? 'is-active' : ''}`} aria-pressed={mode === m}
            data-testid={`tafqeet-mode-${m}`} onClick={() => setMode(m)}>{s[m]}</button>
        ))}
      </div>

      <label className="field">
        <span className="field__label">{s.amount}</span>
        <input className="input font-mono text-[1.1rem]" type="number" inputMode="decimal" min="0" step={mode === 'sar' ? '0.01' : '1'}
          value={value} data-testid="tafqeet-input" onChange={(e) => setValue(e.target.value)} />
      </label>

      {words ? (
        <div className="flex flex-col gap-2">
          <span className="font-body text-[0.72rem] uppercase tracking-[0.06em] text-ink-faint">{s.result}</span>
          <div dir="rtl" lang="ar" className="font-ar text-[1.4rem] leading-[1.9] text-ink border border-[color:var(--line-soft)] rounded-md bg-[var(--surface)] px-4 py-4" data-testid="tafqeet-output">{words}</div>
          <button className="btn self-start" data-testid="tafqeet-copy" onClick={copy}><CopyIcon /> {copied ? s.copied : s.copy}</button>
        </div>
      ) : (
        <p className="text-ink-faint text-[0.95rem]">{s.empty}</p>
      )}
    </div>
  )
}
