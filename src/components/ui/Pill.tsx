import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

// Was the interactive .pill / .pill--accent CSS primitive.
const VARIANT = {
  default: 'inline-flex items-center gap-[0.3rem] px-[0.8rem] py-[0.32rem] rounded-full border text-[0.8rem] font-semibold cursor-pointer transition-[border-color,color,background] duration-150 border-[color:var(--line)] bg-[var(--surface)] text-ink-soft hover:border-[color-mix(in_srgb,var(--color-green-500)_40%,transparent)] hover:text-green-700',
  accent: 'inline-flex items-center gap-[0.3rem] px-[0.8rem] py-[0.32rem] rounded-full border text-[0.8rem] font-semibold cursor-pointer transition-[border-color,color,background] duration-150 border-[color-mix(in_srgb,var(--color-green-500)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-green-500)_12%,transparent)] text-green-700 hover:border-[color-mix(in_srgb,var(--color-green-500)_40%,transparent)] hover:text-green-700',
} as const
type Variant = keyof typeof VARIANT

type AsButton = { variant?: Variant; href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>
type AsAnchor = { variant?: Variant; href: string } & AnchorHTMLAttributes<HTMLAnchorElement>

export function Pill({ variant = 'default', className = '', ...rest }: AsButton | AsAnchor) {
  const cls = `${VARIANT[variant]}${className ? ` ${className}` : ''}`
  if ('href' in rest && rest.href != null) {
    return <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />
  }
  return <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />
}
