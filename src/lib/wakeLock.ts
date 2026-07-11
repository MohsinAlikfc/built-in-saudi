// Keep the screen awake while something is loading. Ref-counted so overlapping
// spinners share a single Screen Wake Lock, and it re-acquires after the tab is
// hidden (browsers release the lock on visibility loss). No-ops where the Screen
// Wake Lock API is unavailable.
type Sentinel = { release: () => Promise<void>; addEventListener?: (t: 'release', cb: () => void) => void }
type WL = { request: (t: 'screen') => Promise<Sentinel> }

let count = 0
let sentinel: Sentinel | null = null
let requesting = false

function wl(): WL | null {
  if (typeof navigator === 'undefined') return null
  return (navigator as unknown as { wakeLock?: WL }).wakeLock ?? null
}

async function acquireLock() {
  if (sentinel || requesting) return
  const api = wl()
  if (!api || (typeof document !== 'undefined' && document.hidden)) return
  requesting = true
  try {
    const s = await api.request('screen')
    if (count === 0) { s.release().catch(() => {}) } // no longer needed
    else {
      sentinel = s
      s.addEventListener?.('release', () => { if (sentinel === s) sentinel = null })
    }
  } catch { /* denied / not visible — ignore */ } finally { requesting = false }
}

function releaseLock() {
  if (sentinel) { sentinel.release().catch(() => {}); sentinel = null }
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && count > 0) acquireLock() // re-acquire on return to the tab
  })
}

/** Call while a spinner is on screen; pair with releaseWake() on unmount. */
export function acquireWake() {
  count += 1
  if (count === 1) acquireLock()
}

export function releaseWake() {
  count = Math.max(0, count - 1)
  if (count === 0) releaseLock()
}
