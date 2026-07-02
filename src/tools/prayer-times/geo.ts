// Reverse-geocode coordinates to a "City, Country" label using BigDataCloud's
// free, key-less, client-side endpoint (no coordinates are stored by them).
// Best-effort: returns null on any failure so the caller can fall back.
export async function reverseGeocode(lat: number, lng: number, locale: 'en' | 'ar'): Promise<string | null> {
  try {
    const lang = locale === 'ar' ? 'ar' : 'en'
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=${lang}`,
    )
    if (!res.ok) return null
    const d = await res.json()
    const city = d.city || d.locality || d.principalSubdivision || ''
    const country = d.countryName || ''
    const sep = locale === 'ar' ? '، ' : ', '
    const label = [city, country].filter(Boolean).join(sep)
    return label || null
  } catch {
    return null
  }
}
