import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

// Was the .btn / .btn--primary CSS primitive. Renders a <button>, an <a> when
// `href` is passed (download links), or a react-router <Link> when `to` is passed.
// Extra utilities pass through className.
const BASE =
  'inline-flex items-center gap-2 px-[1.15rem] py-[0.7rem] rounded-md border font-semibold text-[0.95rem]'
  + ' shadow-[var(--shadow-sm)] transition-[transform,box-shadow,background,border-color] duration-150'
  + ' active:translate-y-0 disabled:opacity-[0.42] disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none'
  + ' [&_svg]:size-[18px]'

const VARIANT = {
  default: 'border-[color:var(--line)] bg-[var(--surface)] text-ink hover:-translate-y-px hover:shadow-[var(--shadow-md)] hover:border-[color-mix(in_srgb,var(--color-ink)_22%,transparent)]',
  primary: 'border-green-700 bg-green-600 text-[color:var(--primary-ink)] hover:-translate-y-px hover:bg-green-500 hover:shadow-[var(--shadow-md)]',
} as const
type Variant = keyof typeof VARIANT

type AsButton = { variant?: Variant } & ButtonHTMLAttributes<HTMLButtonElement>
type AsAnchor = { variant?: Variant; href: string } & AnchorHTMLAttributes<HTMLAnchorElement>
type AsLink = { variant?: Variant } & LinkProps

export function Button({ variant = 'default', className = '', ...rest }: AsButton | AsAnchor | AsLink) {
  const cls = `${BASE} ${VARIANT[variant]}${className ? ` ${className}` : ''}`
  if ('to' in rest && rest.to != null) return <Link className={cls} {...(rest as AsLink)} />
  if ('href' in rest && rest.href != null) return <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />
  return <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />
}
