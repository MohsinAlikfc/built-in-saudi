import { useMemo, useRef, useState } from 'react'
import { useLocale } from '../../i18n'
import { CopyIcon } from '../../components/icons'
import { Button, Textarea, Field, Check, Stack, StackActions, Seg, SegButton } from '../../components/ui'

type Mode = 'encode' | 'decode'

const STR = {
  en: {
    encode: 'Encode', decode: 'Decode', urlSafe: 'URL-safe',
    inputEncode: 'Text to encode', inputDecode: 'Base64 to decode',
    output: 'Result', copy: 'Copy', copied: 'Copied!',
    placeholder: 'Type or paste here…', error: 'That isn’t valid Base64.',
    privacy: 'Processed locally — your data is never uploaded.',
  },
  ar: {
    encode: 'ترميز', decode: 'فكّ الترميز', urlSafe: 'آمن للروابط',
    inputEncode: 'النص المراد ترميزه', inputDecode: 'Base64 المراد فكّه',
    output: 'النتيجة', copy: 'نسخ', copied: 'تم النسخ!',
    placeholder: 'اكتب أو الصق هنا…', error: 'هذا ليس Base64 صالحًا.',
    privacy: 'تتم المعالجة محليًا — لا تُرفع بياناتك.',
  },
}

function encodeB64(str: string, urlSafe: boolean): string {
  const bytes = new TextEncoder().encode(str)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  let b64 = btoa(bin)
  if (urlSafe) b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  return b64
}

function decodeB64(input: string, urlSafe: boolean): string {
  let b64 = input.trim().replace(/\s/g, '')
  if (urlSafe) b64 = b64.replace(/-/g, '+').replace(/_/g, '/')
  while (b64.length % 4) b64 += '='
  const bin = atob(b64) // throws on invalid characters
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes)
}

export default function Base64Tool() {
  const { locale } = useLocale()
  const s = STR[locale]
  const [mode, setMode] = useState<Mode>('encode')
  const [urlSafe, setUrlSafe] = useState(false)
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const { output, error } = useMemo(() => {
    if (!input) return { output: '', error: false }
    try {
      return { output: mode === 'encode' ? encodeB64(input, urlSafe) : decodeB64(input, urlSafe), error: false }
    } catch {
      return { output: '', error: true }
    }
  }, [input, mode, urlSafe])

  async function copy() {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1600)
    } catch { /* ignore */ }
  }

  return (
    <Stack data-testid="base64">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Seg role="group" aria-label={`${s.encode} / ${s.decode}`}>
          {(['encode', 'decode'] as Mode[]).map((m) => (
            <SegButton key={m} active={mode === m}
              aria-pressed={mode === m} data-testid={`b64-mode-${m}`} onClick={() => setMode(m)}>
              {s[m]}
            </SegButton>
          ))}
        </Seg>
        <Check>
          <input type="checkbox" checked={urlSafe} data-testid="b64-urlsafe"
            onChange={(e) => setUrlSafe(e.target.checked)} /> {s.urlSafe}
        </Check>
      </div>

      <Field label={mode === 'encode' ? s.inputEncode : s.inputDecode}>
        <Textarea rows={5} placeholder={s.placeholder}
          data-testid="b64-input" value={input} dir={mode === 'decode' ? 'ltr' : undefined}
          onChange={(e) => setInput(e.target.value)} />
      </Field>

      <Field label={s.output}>
        {error ? (
          <p className="px-[0.9rem] py-[0.8rem] bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] border border-[color-mix(in_srgb,var(--danger)_35%,transparent)] rounded-[5px] text-[color:var(--danger)] font-semibold" data-testid="b64-error" role="alert">{s.error}</p>
        ) : (
          <Textarea className="font-mono text-[0.9rem]" rows={5} readOnly dir="ltr"
            data-testid="b64-output" value={output} />
        )}
      </Field>

      <StackActions>
        <Button variant="primary" onClick={copy} disabled={!output} data-testid="b64-copy">
          <CopyIcon /> {copied ? s.copied : s.copy}
        </Button>
      </StackActions>

      <p className="text-[0.8rem] text-ink-faint flex items-center gap-[0.4rem]"><span aria-hidden="true">🔒</span> {s.privacy}</p>
    </Stack>
  )
}
