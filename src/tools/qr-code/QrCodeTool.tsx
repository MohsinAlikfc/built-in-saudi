import { useEffect, useMemo, useRef, useState } from 'react'
import QRCode from 'qrcode'
import {
  LinkIcon, TextIcon, WifiIcon, MailIcon, PhoneIcon,
  DownloadIcon, CopyIcon,
} from '../../components/icons'
import {
  type QrContentType, type WifiFields, type EmailFields,
  normalizeUrl, buildWifi, buildEmail, buildPhone,
} from './build'

type EcLevel = 'L' | 'M' | 'Q' | 'H'

const TYPES: { id: QrContentType; label: string; Icon: typeof LinkIcon }[] = [
  { id: 'link', label: 'Link', Icon: LinkIcon },
  { id: 'text', label: 'Text', Icon: TextIcon },
  { id: 'wifi', label: 'Wi-Fi', Icon: WifiIcon },
  { id: 'email', label: 'Email', Icon: MailIcon },
  { id: 'phone', label: 'Phone', Icon: PhoneIcon },
]

const EC_LEVELS: { id: EcLevel; hint: string }[] = [
  { id: 'L', hint: '~7% recovery' },
  { id: 'M', hint: '~15% recovery' },
  { id: 'Q', hint: '~25% recovery' },
  { id: 'H', hint: '~30% recovery' },
]

export default function QrCodeTool() {
  const [type, setType] = useState<QrContentType>('link')
  const [link, setLink] = useState('https://built-in-saudi.com')
  const [text, setText] = useState('')
  const [wifi, setWifi] = useState<WifiFields>({
    ssid: '', password: '', encryption: 'WPA', hidden: false,
  })
  const [email, setEmail] = useState<EmailFields>({ to: '', subject: '', body: '' })
  const [phone, setPhone] = useState('')

  const [size, setSize] = useState(512)
  const [margin, setMargin] = useState(2)
  const [ecLevel, setEcLevel] = useState<EcLevel>('M')
  const [fg, setFg] = useState('#12211b')
  const [bg, setBg] = useState('#ffffff')

  const [svg, setSvg] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef<number | undefined>(undefined)

  const value = useMemo(() => {
    switch (type) {
      case 'link': return normalizeUrl(link)
      case 'text': return text.trim()
      case 'wifi': return buildWifi(wifi)
      case 'email': return buildEmail(email)
      case 'phone': return buildPhone(phone)
    }
  }, [type, link, text, wifi, email, phone])

  const opts = useMemo(
    () => ({
      errorCorrectionLevel: ecLevel,
      margin,
      color: { dark: fg, light: bg },
    }),
    [ecLevel, margin, fg, bg],
  )

  // Render the live SVG whenever content or styling changes.
  useEffect(() => {
    let cancelled = false
    if (!value) {
      setSvg('')
      setError('')
      return
    }
    QRCode.toString(value, { type: 'svg', width: size, ...opts })
      .then((markup) => {
        if (cancelled) return
        setSvg(markup)
        setError('')
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setSvg('')
        setError(err instanceof Error ? err.message : 'Could not generate QR code.')
      })
    return () => { cancelled = true }
  }, [value, size, opts])

  useEffect(() => () => window.clearTimeout(copyTimer.current), [])

  const hasCode = Boolean(svg) && !error

  function flashCopied() {
    setCopied(true)
    window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(false), 1600)
  }

  function download(href: string, ext: string) {
    const a = document.createElement('a')
    a.href = href
    a.download = `qr-code.${ext}`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  async function downloadPng() {
    if (!value) return
    const url = await QRCode.toDataURL(value, { width: size, ...opts })
    download(url, 'png')
  }

  function downloadSvg() {
    if (!svg) return
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
    download(url, 'svg')
    URL.revokeObjectURL(url)
  }

  async function copyPng() {
    if (!value) return
    try {
      const url = await QRCode.toDataURL(value, { width: size, ...opts })
      const blob = await (await fetch(url)).blob()
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      flashCopied()
    } catch {
      setError('Copying images isn’t supported in this browser — use Download instead.')
    }
  }

  return (
    <div className="qr">
      {/* ── Controls ─────────────────────────────── */}
      <div className="qr__panel">
        <div className="qr__types" role="tablist" aria-label="QR content type">
          {TYPES.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={type === t.id}
              className={`qr__type ${type === t.id ? 'is-active' : ''}`}
              onClick={() => { setType(t.id); setError('') }}
            >
              <t.Icon /> <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="qr__fields">
          {type === 'link' && (
            <Field label="Website / URL">
              <input
                className="input" type="url" inputMode="url" placeholder="example.com"
                value={link} onChange={(e) => setLink(e.target.value)} autoComplete="off"
              />
            </Field>
          )}

          {type === 'text' && (
            <Field label="Text">
              <textarea
                className="input input--area" rows={4} placeholder="Any text to encode…"
                value={text} onChange={(e) => setText(e.target.value)}
              />
            </Field>
          )}

          {type === 'wifi' && (
            <div className="qr__row">
              <Field label="Network name (SSID)">
                <input className="input" value={wifi.ssid} placeholder="MyNetwork"
                  onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })} />
              </Field>
              <Field label="Password">
                <input className="input" value={wifi.password} placeholder="••••••••"
                  disabled={wifi.encryption === 'nopass'}
                  onChange={(e) => setWifi({ ...wifi, password: e.target.value })} />
              </Field>
              <Field label="Security">
                <select className="input" value={wifi.encryption}
                  onChange={(e) => setWifi({ ...wifi, encryption: e.target.value as WifiFields['encryption'] })}>
                  <option value="WPA">WPA / WPA2 / WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None (open)</option>
                </select>
              </Field>
              <label className="check">
                <input type="checkbox" checked={wifi.hidden}
                  onChange={(e) => setWifi({ ...wifi, hidden: e.target.checked })} />
                Hidden network
              </label>
            </div>
          )}

          {type === 'email' && (
            <div className="qr__row">
              <Field label="To">
                <input className="input" type="email" placeholder="name@example.com"
                  value={email.to} onChange={(e) => setEmail({ ...email, to: e.target.value })} />
              </Field>
              <Field label="Subject">
                <input className="input" value={email.subject}
                  onChange={(e) => setEmail({ ...email, subject: e.target.value })} />
              </Field>
              <Field label="Message">
                <textarea className="input input--area" rows={3} value={email.body}
                  onChange={(e) => setEmail({ ...email, body: e.target.value })} />
              </Field>
            </div>
          )}

          {type === 'phone' && (
            <Field label="Phone number">
              <input className="input" type="tel" inputMode="tel" placeholder="+966 5X XXX XXXX"
                value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Field>
          )}
        </div>

        <fieldset className="qr__style">
          <legend>Style</legend>

          <div className="qr__control">
            <label>Error correction</label>
            <div className="seg" role="group" aria-label="Error correction level">
              {EC_LEVELS.map((l) => (
                <button key={l.id} title={l.hint}
                  className={`seg__btn ${ecLevel === l.id ? 'is-active' : ''}`}
                  onClick={() => setEcLevel(l.id)}>{l.id}</button>
              ))}
            </div>
          </div>

          <div className="qr__control">
            <label htmlFor="qr-size">Export size <span className="muted">{size}px</span></label>
            <input id="qr-size" type="range" min={128} max={1024} step={32}
              value={size} onChange={(e) => setSize(Number(e.target.value))} />
          </div>

          <div className="qr__control">
            <label htmlFor="qr-margin">Quiet zone <span className="muted">{margin}</span></label>
            <input id="qr-margin" type="range" min={0} max={8} step={1}
              value={margin} onChange={(e) => setMargin(Number(e.target.value))} />
          </div>

          <div className="qr__colors">
            <label className="swatch">
              <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} />
              <span>Foreground</span>
            </label>
            <label className="swatch">
              <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
              <span>Background</span>
            </label>
          </div>
        </fieldset>
      </div>

      {/* ── Preview + export ─────────────────────── */}
      <div className="qr__preview">
        <div className="qr__stage" style={{ background: bg }}>
          {hasCode ? (
            <div className="qr__svg" dangerouslySetInnerHTML={{ __html: svg }} />
          ) : (
            <div className="qr__empty">
              {error
                ? <span className="qr__error">{error}</span>
                : <span>Fill in the fields to generate your QR code.</span>}
            </div>
          )}
        </div>

        <div className="qr__actions">
          <button className="btn btn--primary" onClick={downloadPng} disabled={!hasCode}>
            <DownloadIcon /> PNG
          </button>
          <button className="btn" onClick={downloadSvg} disabled={!hasCode}>
            <DownloadIcon /> SVG
          </button>
          <button className="btn" onClick={copyPng} disabled={!hasCode}>
            <CopyIcon /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {hasCode && (
          <p className="qr__encoded" title="The exact text encoded in this QR code">
            <span className="qr__encoded-label">Encodes</span>
            <code>{value}</code>
          </p>
        )}

        <p className="qr__privacy">
          <span aria-hidden="true">🔒</span> Generated locally — nothing is uploaded.
        </p>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {children}
    </label>
  )
}
