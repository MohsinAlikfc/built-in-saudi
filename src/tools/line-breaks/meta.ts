import { lazyTool } from '../../lib/lazyTool'
import type { Tool } from '../types'
import { ParagraphIcon } from '../../components/icons'

export const lineBreaksTool: Tool = {
  id: 'line-breaks',
  name: 'Line Break Converter',
  nameAr: 'محوّل فواصل الأسطر',
  tagline: 'Single ⇄ double line spacing, auto-detected',
  description:
    'Paste text and it flips the line spacing automatically: single-spaced lines gain a blank line between each, double-spaced lines collapse to single, and mixed spacing is normalised to double. See the result in a box with copy and share, and a note on exactly what changed. Runs entirely in your browser.',
  category: 'Text',
  keywords: ['line breaks', 'newlines', 'double space', 'single space', 'blank lines', 'paragraphs', 'أسطر', 'فواصل', 'مسافات'],
  status: 'stable',
  Icon: ParagraphIcon,
  component: lazyTool(() => import('./LineBreaksTool')),
  ar: {
    name: 'محوّل فواصل الأسطر',
    tagline: 'تبديل تلقائي بين الأسطر المفردة والمزدوجة',
    description:
      'الصق النص فيبدّل تباعد الأسطر تلقائيًا: الأسطر المفردة تُضاف بينها أسطر فارغة، والمزدوجة تُدمج إلى مفردة، والمختلطة تُوحَّد إلى مزدوجة. يظهر الناتج في صندوق مع نسخ ومشاركة وملاحظة بما تغيّر. يعمل بالكامل داخل متصفحك.',
  },
}
