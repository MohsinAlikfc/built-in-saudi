import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react'

// Was the .input / .input--area / select.input CSS primitives.
const BASE =
  'w-full px-[0.85rem] py-[0.7rem] [font:inherit] text-ink bg-[var(--surface)] border border-[color:var(--line)]'
  + ' rounded-sm shadow-[inset_0_1px_2px_rgba(18,33,27,0.04)] transition-[border-color,box-shadow] duration-150'
  + ' focus:outline-none focus:border-green-500 focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-green-500)_20%,transparent)]'
  + ' disabled:bg-sand-100 disabled:text-ink-faint'

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${BASE}${className ? ` ${className}` : ''}`} {...props} />
}

export function Textarea({ className = '', ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${BASE} resize-y min-h-[3.2rem] leading-normal${className ? ` ${className}` : ''}`} {...props} />
}

// Custom caret drawn with two gradients, mirroring the old select.input rule.
const SELECT_CARET =
  'appearance-none pr-8 bg-no-repeat'
  + ' [background-image:linear-gradient(45deg,transparent_50%,var(--ink-soft)_50%),linear-gradient(135deg,var(--ink-soft)_50%,transparent_50%)]'
  + ' [background-position:calc(100%-18px)_55%,calc(100%-13px)_55%] [background-size:5px_5px,5px_5px]'

export function Select({ className = '', children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { children?: ReactNode }) {
  return <select className={`${BASE} ${SELECT_CARET}${className ? ` ${className}` : ''}`} {...props}>{children}</select>
}
