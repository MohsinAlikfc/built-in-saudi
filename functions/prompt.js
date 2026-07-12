// Prompt Analyzer. One LLM call grades a system prompt on eight dimensions
// (1–5) and lists concrete issues. Google sign-in required; one analysis per
// rolling 24h per user. Same OpenAI + Firestore usage pattern as the CV tool.
import { http } from '@google-cloud/functions-framework'
import firestore from '@google-cloud/firestore'

const { Firestore } = firestore
const db = new Firestore()
const USAGE = 'promptUsage'
const SITE = 'https://built-in-saudi.com'
const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID || ''
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o'
const OWNER_EMAIL = 'bjorn.a.goransson@gmail.com'
const WINDOW_MS = 24 * 3600000
const ANALYZE_LIMIT = 1 // one analysis per rolling 24h per user

export const DIMENSIONS = [
  'purpose_coherence', 'context_instruction_harmony', 'even_signal', 'calm_tone',
  'non_contradictory', 'positive_framing', 'escape_hatch', 'stakes_clarity',
]

const SYSTEM = `You are an expert reviewer of LLM system prompts. Language models both draw conclusions from the context you give them and follow your explicit instructions — and the two can clash. A strong prompt is a tonally and factually coherent explanation of the situation and its purpose, so the model can reason with you; a weak one bolts on unreconciled commands ("ALWAYS", "NEVER"), shouts, contradicts itself or the model's own baseline, piles up prohibitions, or corners the model with no graceful way out. Weak prompts produce rambling, circular, contradictory, error-prone output.

Assess the author's prompt (given as the user message) on these eight dimensions. Score each an integer 1 (poor) to 5 (excellent); higher is ALWAYS healthier:
- purpose_coherence: reads as one coherent, consistent explanation of the scenario and purpose.
- context_instruction_harmony: the instructions follow from and are reconciled with the described context, not bolted on.
- even_signal: signal intensity is consistent — not "spiky" (some points shouted, others whispered).
- calm_tone: it builds its case rather than shouting (avoids MUST, NEVER, ALL CAPS, "!!!").
- non_contradictory: free of internal contradictions; doesn't needlessly fight the model's or vendor's baseline policies.
- positive_framing: says what to do, affirmatively and with reasons, rather than a pile of "don't".
- escape_hatch: gives the model a graceful way out of tricky or conflicting situations.
- stakes_clarity: explains how the output will be used downstream, which sharpens focus.

Return ONLY JSON: {"scores": {<each dimension>: integer 1-5}, "issues": [{"headline": string, "description": string}], "summary": string}. Provide 3 to 8 issues, each a short headline (<= 8 words) and a 1-2 sentence description that names the problem and how to fix it. Quote short fragments of the author's prompt where it helps. "summary" is one sentence. Judge THIS prompt specifically; if it is very short or empty, score what you can and say so.`

function cors(req, res) {
  const origin = (req.headers && req.headers.origin) || ''
  const ok = /^https:\/\/([a-z0-9-]+\.)?built-in-saudi\.com$/.test(origin)
  res.set('Access-Control-Allow-Origin', ok ? origin : SITE)
  res.set('Vary', 'Origin')
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
}
async function verifyGoogle(idToken) {
  if (!idToken) return null
  try {
    const r = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`)
    if (!r.ok) return null
    const p = await r.json()
    if (p.aud !== CLIENT_ID) return null
    if (p.exp && Date.now() / 1000 > Number(p.exp)) return null
    return { sub: p.sub, email: p.email }
  } catch { return null }
}

function clampScores(raw) {
  const out = {}
  for (const k of DIMENSIONS) { const n = Math.round(Number(raw && raw[k])); out[k] = Number.isFinite(n) ? Math.max(1, Math.min(5, n)) : 3 }
  return out
}

// POST { idToken, prompt } → { ok, scores, issues, summary }
http('analyzePrompt', async (req, res) => {
  cors(req, res)
  if (req.method === 'OPTIONS') return res.status(204).send('')
  if (req.method !== 'POST') return res.status(405).send('POST only')
  try {
    const { idToken, prompt } = req.body || {}
    const user = await verifyGoogle(idToken)
    if (!user) return res.status(401).json({ error: 'sign in with Google first' })
    const text = String(prompt || '').trim()
    if (text.length < 20) return res.status(400).json({ error: 'Paste a longer prompt to analyse.' })
    if (!OPENAI_API_KEY) return res.status(500).json({ error: 'analysis not configured' })

    const ref = db.collection(USAGE).doc(user.sub)
    const now = Date.now()
    const d = (await ref.get()).data() || {}
    const recent = (Array.isArray(d.runs) ? d.runs : []).filter((t) => now - Number(t) < WINDOW_MS)
    if (user.email !== OWNER_EMAIL && recent.length >= ANALYZE_LIMIT) {
      const wait = Math.ceil((Number(recent[0]) + WINDOW_MS - now) / 3600000)
      return res.status(429).json({ error: `One analysis per 24 hours — try again in about ${wait} hour${wait === 1 ? '' : 's'}.` })
    }

    const ai = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OPENAI_MODEL, temperature: 0.2, response_format: { type: 'json_object' },
        messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: text.slice(0, 24000) }],
      }),
    })
    if (!ai.ok) { const b = await ai.text(); console.error('openai', ai.status, b.slice(0, 300)); return res.status(502).json({ error: `AI service error (${ai.status})` }) }
    const data = await ai.json()
    let parsed
    try { parsed = JSON.parse(data.choices[0].message.content) } catch { return res.status(502).json({ error: 'AI returned malformed JSON' }) }

    const scores = clampScores(parsed.scores)
    const issues = (Array.isArray(parsed.issues) ? parsed.issues : []).slice(0, 8).map((i) => ({
      headline: String((i && i.headline) || '').slice(0, 80), description: String((i && i.description) || '').slice(0, 400),
    })).filter((i) => i.headline)
    const summary = String(parsed.summary || '').slice(0, 300)

    await ref.set({ runs: [...recent, now], email: user.email, updatedAt: new Date() }, { merge: true })
    res.json({ ok: true, scores, issues, summary })
  } catch (e) {
    res.status(500).json({ error: String((e && e.message) || e) })
  }
})
