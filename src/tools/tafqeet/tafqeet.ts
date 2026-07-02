// تفقيط — spell a non-negative integer / amount in Arabic words. Handles the
// common grammar (مئة/مئتان/ثلاثمئة, ألف/ألفان/آلاف, مليون/ملايين, مليار/مليارات).
// Aims for the standard tafqeet output used on cheques/invoices.

const ONES = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة']
const TEENS = ['عشرة', 'أحد عشر', 'اثنا عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر']
const TENS = ['', '', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون']
const HUNDREDS = ['', 'مئة', 'مئتان', 'ثلاثمئة', 'أربعمئة', 'خمسمئة', 'ستمئة', 'سبعمئة', 'ثمانمئة', 'تسعمئة']

const SCALE_SING = ['', 'ألف', 'مليون', 'مليار', 'تريليون']
const SCALE_DUAL = ['', 'ألفان', 'مليونان', 'ملياران', 'تريليونان']
const SCALE_PLUR = ['', 'آلاف', 'ملايين', 'مليارات', 'تريليونات']

function underThousand(n: number): string {
  const parts: string[] = []
  const h = Math.floor(n / 100)
  const rest = n % 100
  if (h) parts.push(HUNDREDS[h])
  if (rest) {
    if (rest < 10) parts.push(ONES[rest])
    else if (rest < 20) parts.push(TEENS[rest - 10])
    else {
      const t = Math.floor(rest / 10)
      const o = rest % 10
      parts.push(o ? `${ONES[o]} و${TENS[t]}` : TENS[t])
    }
  }
  return parts.join(' و')
}

function scale(groupVal: number, idx: number): string {
  if (groupVal === 1) return SCALE_SING[idx]
  if (groupVal === 2) return SCALE_DUAL[idx]
  if (groupVal >= 3 && groupVal <= 10) return `${underThousand(groupVal)} ${SCALE_PLUR[idx]}`
  return `${underThousand(groupVal)} ${SCALE_SING[idx]}` // 11+ takes the singular (…ألفًا)
}

export function tafqeetInt(num: number): string {
  if (!isFinite(num) || num < 0) return ''
  num = Math.floor(num)
  if (num === 0) return 'صفر'
  const groups: number[] = []
  let n = num
  while (n > 0) { groups.push(n % 1000); n = Math.floor(n / 1000) }
  const parts: string[] = []
  for (let i = groups.length - 1; i >= 0; i--) {
    const g = groups[i]
    if (!g) continue
    parts.push(i === 0 ? underThousand(g) : scale(g, i))
  }
  return parts.join(' و')
}

// Amount in SAR: "فقط <riyals> ريالاً و<halalas> هللة لا غير".
export function tafqeetSAR(amount: number): string {
  if (!isFinite(amount) || amount < 0) return ''
  const riyals = Math.floor(amount)
  const halalas = Math.round((amount - riyals) * 100)
  const riyalWords = `${tafqeetInt(riyals)} ${riyals === 1 ? 'ريال' : riyals === 2 ? 'ريالان' : 'ريالاً'}`
  let out = riyalWords
  if (halalas) out += ` و${tafqeetInt(halalas)} ${halalas === 1 ? 'هللة' : halalas === 2 ? 'هللتان' : 'هللة'}`
  return `فقط ${out} لا غير`
}
