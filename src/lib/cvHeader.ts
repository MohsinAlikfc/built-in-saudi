// A tiny external store so the (async-loaded) CV Generator can drive a Log in /
// Log out control in the shared Header — mirroring how Book Me does it. `active`
// is false whenever the CV tool isn't mounted, so the Header shows nothing.
export type CvAuth = { active: boolean; signedIn: boolean; login: () => void; logout: () => void }

const NOOP = () => {}
let state: CvAuth = { active: false, signedIn: false, login: NOOP, logout: NOOP }
const subs = new Set<() => void>()

export const cvHeaderStore = {
  set(v: CvAuth) {
    state = v
    subs.forEach((f) => f())
  },
  subscribe(f: () => void) {
    subs.add(f)
    return () => { subs.delete(f) }
  },
  get() {
    return state
  },
}
