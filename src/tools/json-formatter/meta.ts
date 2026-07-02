import { lazyTool } from '../../lib/lazyTool'
import type { Tool } from '../types'
import { CodeIcon } from '../../components/icons'

export const jsonFormatterTool: Tool = {
  id: 'json-formatter',
  name: 'JSON Formatter',
  nameAr: 'منسّق JSON',
  tagline: 'Prettify, minify & validate JSON.',
  description:
    'Format, minify and validate JSON in your browser — 2/4-space indent, sort keys, and a precise line/column error when it’s invalid. Copy or download the result. Nothing is uploaded, so pasted tokens and PII stay on your device.',
  category: 'Developer',
  keywords: ['json', 'format', 'formatter', 'beautify', 'minify', 'validate', 'pretty print', 'json منسق', 'تنسيق'],
  status: 'stable',
  Icon: CodeIcon,
  component: lazyTool(() => import('./JsonFormatterTool')),
  ar: {
    name: 'منسّق JSON',
    tagline: 'تنسيق وتصغير والتحقّق من JSON.',
    description:
      'نسّق وصغّر وتحقّق من JSON داخل متصفحك — مسافة ٢/٤، ترتيب المفاتيح، ورسالة خطأ دقيقة بالسطر والعمود عند وجود خطأ. انسخ أو نزّل الناتج. لا يُرفع شيء، فتبقى الرموز والبيانات على جهازك.',
  },
}
