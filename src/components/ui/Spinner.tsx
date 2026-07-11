import { useEffect } from 'react'
import { acquireWake, releaseWake } from '../../lib/wakeLock'

/** A small, reusable loading spinner (a spinning ring in the brand green).
 *  While one is on screen we hold a Screen Wake Lock so the device doesn't dim
 *  or sleep mid-load (e.g. during a long CV generation). */
export function Spinner({ className = '', label = 'Loading' }: { className?: string; label?: string }) {
  useEffect(() => { acquireWake(); return releaseWake }, [])
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-block size-6 rounded-full border-[2.5px] border-[color:var(--line)] border-t-green-600 animate-[spin_0.7s_linear_infinite] ${className}`}
    />
  )
}
