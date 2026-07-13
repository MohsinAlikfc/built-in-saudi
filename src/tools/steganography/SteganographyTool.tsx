import { useRef, useState } from 'react'
import { useLocale } from '../../i18n'
import { UploadIcon, DownloadIcon } from '../../components/icons'
import { Button, Stack, Seg, SegButton, Textarea, Field } from '../../components/ui'

const MAGIC = 0x42495342 // "BISB" marker so reveal can tell a real payload apart

const STR = {
  en: {
    hide: 'Hide', reveal: 'Reveal', drop: 'Drop an image (cover), or tap to choose', dropReveal: 'Drop an image with a hidden message',
    message: 'Secret message', embed: 'Hide & download PNG', revealed: 'Revealed message', none: 'No hidden message found in this image.',
    tooBig: 'Message is too long for this image. Use a larger image or shorter text.', change: 'Choose another image',
    note: 'This hides text in the pixels (LSB). It obscures a message but is not strong encryption — for real secrecy, encrypt first. Save as PNG; re-compressing to JPEG destroys the hidden data.',
    privacy: 'Everything runs on your device — nothing is uploaded.',
  },
  ar: {
    hide: 'إخفاء', reveal: 'كشف', drop: 'أفلت صورة (غطاء) أو اضغط للاختيار', dropReveal: 'أفلت صورة تحوي رسالة مخفية',
    message: 'الرسالة السرية', embed: 'أخفِ ونزّل PNG', revealed: 'الرسالة المكشوفة', none: 'لا رسالة مخفية في هذه الصورة.',
    tooBig: 'الرسالة أطول من سعة هذه الصورة. استخدم صورة أكبر أو نصًّا أقصر.', change: 'اختر صورة أخرى',
    note: 'يُخفي النص في البكسلات (LSB). يُخفي الرسالة لكنه ليس تشفيرًا قويًا — للسرية الحقيقية شفّر أولًا. احفظ كـPNG؛ فإعادة الضغط إلى JPEG تتلف البيانات المخفية.',
    privacy: 'كل شيء يجري على جهازك — لا يُرفع أي شيء.',
  },
}

function imageData(bmp: ImageBitmap): ImageData {
  const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height
  const ctx = c.getContext('2d', { willReadFrequently: true })!
  ctx.drawImage(bmp, 0, 0)
  return ctx.getImageData(0, 0, bmp.width, bmp.height)
}
const setBit = (v: number, bit: number) => (v & 0xfe) | bit

export default function SteganographyTool() {
  const { locale } = useLocale()
  const s = STR[locale]
  const fileRef = useRef<HTMLInputElement>(null)
  const [mode, setMode] = useState<'hide' | 'reveal'>('hide')
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null)
  const [message, setMessage] = useState('')
  const [revealed, setRevealed] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function onFile(f: File | undefined) {
    if (!f || !f.type.startsWith('image/')) return
    setError(''); setRevealed(null)
    try { const bmp = await createImageBitmap(f); setBitmap(bmp); if (mode === 'reveal') doReveal(bmp) } catch { /* */ }
  }

  function bitsOf(bytes: Uint8Array): number[] {
    const bits: number[] = []
    for (const b of bytes) for (let i = 7; i >= 0; i--) bits.push((b >> i) & 1)
    return bits
  }

  function embed() {
    if (!bitmap) return
    const data = imageData(bitmap)
    const payload = new TextEncoder().encode(message)
    const header = new Uint8Array(8)
    new DataView(header.buffer).setUint32(0, MAGIC); new DataView(header.buffer).setUint32(4, payload.length)
    const bits = bitsOf(header).concat(bitsOf(payload))
    // 3 channels (RGB) per pixel carry one bit each
    const capacity = Math.floor((data.data.length / 4) * 3)
    if (bits.length > capacity) { setError(s.tooBig); return }
    let bi = 0
    for (let p = 0; p < data.data.length && bi < bits.length; p += 4) {
      for (let ch = 0; ch < 3 && bi < bits.length; ch++) data.data[p + ch] = setBit(data.data[p + ch], bits[bi++])
    }
    const c = document.createElement('canvas'); c.width = data.width; c.height = data.height
    c.getContext('2d')!.putImageData(data, 0, 0)
    c.toBlob((b) => { if (!b) return; const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'hidden.png'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000) }, 'image/png')
    setError('')
  }

  function doReveal(bmp: ImageBitmap) {
    const data = imageData(bmp)
    const readBits = (count: number, start: number) => {
      const out: number[] = []
      let idx = start
      for (let p = 0; p < data.data.length && out.length < count; p += 4) {
        for (let ch = 0; ch < 3 && out.length < count; ch++) { if (idx <= 0) out.push(data.data[p + ch] & 1); else idx-- }
      }
      return out
    }
    const bitsToBytes = (bits: number[]) => { const bytes = new Uint8Array(bits.length / 8); for (let i = 0; i < bytes.length; i++) { let v = 0; for (let j = 0; j < 8; j++) v = (v << 1) | bits[i * 8 + j]; bytes[i] = v } return bytes }
    const headerBits = readBits(64, 0)
    const header = bitsToBytes(headerBits)
    const dv = new DataView(header.buffer)
    if (dv.getUint32(0) !== MAGIC) { setRevealed(''); return }
    const len = dv.getUint32(4)
    if (len <= 0 || len > (data.data.length / 4) * 3) { setRevealed(''); return }
    const msgBits = readBits(len * 8, 64)
    setRevealed(new TextDecoder().decode(bitsToBytes(msgBits)))
  }

  const dropLabel = mode === 'hide' ? s.drop : s.dropReveal

  return (
    <Stack data-testid="steganography">
      <Seg className="self-start">
        <SegButton active={mode === 'hide'} onClick={() => { setMode('hide'); setBitmap(null); setRevealed(null); setError('') }} data-testid="stego-hide">{s.hide}</SegButton>
        <SegButton active={mode === 'reveal'} onClick={() => { setMode('reveal'); setBitmap(null); setRevealed(null); setError('') }} data-testid="stego-reveal">{s.reveal}</SegButton>
      </Seg>

      {!bitmap ? (
        <button className="relative flex flex-col items-center gap-[0.4rem] py-8 px-4 border-2 border-dashed border-[color:var(--line)] rounded-[var(--r-md)] bg-[var(--surface)] text-center cursor-pointer hover:border-[color:color-mix(in_srgb,var(--green-500)_45%,transparent)]" data-testid="stego-drop" onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files[0]) }}>
          <UploadIcon /><span>{dropLabel}</span>
          <input ref={fileRef} type="file" accept="image/*" className="absolute w-px h-px opacity-0" onChange={(e) => onFile(e.target.files?.[0])} />
        </button>
      ) : mode === 'hide' ? (
        <>
          <Field label={s.message}><Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} data-testid="stego-message" /></Field>
          {error && <p className="text-[color:var(--danger)] text-[0.9rem]" data-testid="stego-error">{error}</p>}
          <div className="flex gap-2">
            <Button variant="primary" onClick={embed} disabled={!message} data-testid="stego-embed"><DownloadIcon /> {s.embed}</Button>
            <Button onClick={() => setBitmap(null)}>{s.change}</Button>
          </div>
        </>
      ) : (
        <>
          {revealed
            ? <Field label={s.revealed}><Textarea value={revealed} readOnly rows={4} data-testid="stego-revealed" /></Field>
            : revealed === '' ? <p className="text-ink-soft text-[0.95rem]" data-testid="stego-none">{s.none}</p> : null}
          <Button onClick={() => { setBitmap(null); setRevealed(null) }}>{s.change}</Button>
        </>
      )}

      <p className="text-[0.78rem] text-ink-faint leading-relaxed">{s.note}</p>
      <p className="text-[0.8rem] text-ink-faint flex items-center gap-[0.4rem]"><span aria-hidden="true">🔒</span> {s.privacy}</p>
    </Stack>
  )
}
