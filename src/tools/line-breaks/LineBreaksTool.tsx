import { useMemo, useState } from 'react'
import { useLocale } from '../../i18n'
import { CopyIcon, ShareIcon } from '../../components/icons'
import { Button, Textarea, Stack } from '../../components/ui'

type Mode = 'single-to-double' | 'double-to-single' | 'mixed-to-double' | 'none'

// Split into non-empty "lines", recording whether each pair of adjacent lines was
// separated by a blank line ('double') or was directly adjacent ('single').
function convert(input: string): { output: string; mode: Mode; count: number } {
  const lines = input.replace(/\r\n?/g, '\n').split('\n')
  const paras: string[] = []
  const gaps: ('single' | 'double')[] = []
  let blanks = 0
  let started = false
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '')
    if (line.trim() === '') { if (started) blanks++; continue }
    if (started) gaps.push(blanks > 0 ? 'double' : 'single')
    paras.push(line)
    blanks = 0
    started = true
  }
  if (paras.length <= 1) return { output: paras.join('\n'), mode: 'none', count: paras.length }
  const hasSingle = gaps.includes('single')
  const hasDouble = gaps.includes('double')
  const mode: Mode = hasSingle && hasDouble ? 'mixed-to-double' : hasSingle ? 'single-to-double' : 'double-to-single'
  const sep = mode === 'double-to-single' ? '\n' : '\n\n'
  return { output: paras.join(sep), mode, count: paras.length }
}

const STR = {
  en: {
    placeholder: 'Paste text with single- or double-spaced lines…',
    hint: 'Paste text and it auto-detects: single-spaced lines become double-spaced (a blank line between each), double-spaced becomes single, and mixed spacing is normalised to double.',
    outLabel: 'Result',
    copy: 'Copy', copied: 'Copied!', share: 'Share',
    msg: {
      'single-to-double': (n: number) => `Detected single line breaks — added a blank line between all ${n} lines.`,
      'double-to-single': (n: number) => `Detected double line breaks — collapsed the blank lines so the ${n} lines are single-spaced.`,
      'mixed-to-double': (n: number) => `Detected mixed spacing — normalised all ${n} lines to double line breaks.`,
      none: () => 'Just one line — nothing to convert.',
    } as Record<Mode, (n: number) => string>,
  },
  ar: {
    placeholder: 'الصق نصًا بأسطر مفردة أو مزدوجة المسافات…',
    hint: 'الصق النص وسيتعرّف تلقائيًا: الأسطر المفردة تصبح مزدوجة (سطر فارغ بين كل سطر)، والمزدوجة تصبح مفردة، والمختلطة تُوحَّد إلى مزدوجة.',
    outLabel: 'الناتج',
    copy: 'نسخ', copied: 'تم النسخ!', share: 'مشاركة',
    msg: {
      'single-to-double': (n: number) => `اكتُشفت أسطر مفردة — أُضيف سطر فارغ بين الأسطر الـ${n.toLocaleString('ar')}.`,
      'double-to-single': (n: number) => `اكتُشفت أسطر مزدوجة — أُزيلت الأسطر الفارغة لتصبح الأسطر الـ${n.toLocaleString('ar')} مفردة.`,
      'mixed-to-double': (n: number) => `اكتُشفت مسافات مختلطة — وُحِّدت الأسطر الـ${n.toLocaleString('ar')} إلى مزدوجة.`,
      none: () => 'سطر واحد فقط — لا شيء لتحويله.',
    } as Record<Mode, (n: number) => string>,
  },
}

export default function LineBreaksTool() {
  const { locale } = useLocale()
  const s = STR[locale]
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const { output, mode, count } = useMemo(() => convert(text), [text])
  const hasResult = text.trim() !== '' && output !== ''

  async function copy() {
    if (!output) return
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { /* ignore */ }
  }
  async function share() {
    if (!output) return
    if (navigator.share) { try { await navigator.share({ text: output }); return } catch { /* cancelled or unsupported */ } }
    copy()
  }

  return (
    <Stack data-testid="line-breaks">
      <Textarea className="min-h-[8rem]" data-testid="newline-input"
        placeholder={s.placeholder} value={text} onChange={(e) => setText(e.target.value)} />

      {hasResult ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-body text-[0.68rem] uppercase tracking-[0.06em] text-ink-faint flex-1">{s.outLabel}</span>
            <Button className="flex-none px-3" onClick={share} aria-label={s.share} data-testid="newline-share">
              <ShareIcon /> {s.share}
            </Button>
            <Button className="flex-none px-3" onClick={copy} aria-label={s.copy} data-testid="newline-copy">
              <CopyIcon /> {copied ? s.copied : s.copy}
            </Button>
          </div>
          <Textarea readOnly className="min-h-[8rem]" data-testid="newline-output" value={output} onFocus={(e) => e.currentTarget.select()} />
          <p className="text-[0.9rem] text-green-700 rtl:font-ar" data-testid="newline-message">{s.msg[mode](count)}</p>
        </div>
      ) : (
        <p className="text-ink-faint text-[0.95rem]">{s.hint}</p>
      )}
    </Stack>
  )
}
