import { lazyTool } from '../../lib/lazyTool'
import type { Tool } from '../types'
import { ParagraphIcon } from '../../components/icons'

export const loremTool: Tool = {
  id: 'lorem-ipsum',
  name: 'Lorem Ipsum',
  nameAr: 'نص بديل',
  tagline: 'Placeholder text — classic Latin or Arabic.',
  description:
    'Generate placeholder text by paragraphs, sentences or words — the classic Lorem ipsum, or an Arabic filler variant. Copy it in one tap. Runs entirely in your browser.',
  category: 'Text',
  keywords: ['lorem', 'ipsum', 'placeholder', 'dummy text', 'filler', 'نص بديل', 'لوريم', 'نص وهمي'],
  status: 'stable',
  Icon: ParagraphIcon,
  component: lazyTool(() => import('./LoremTool')),
  ar: {
    name: 'نص بديل',
    tagline: 'نص حشو — لاتيني كلاسيكي أو عربي.',
    description:
      'ولّد نصًا بديلًا بالفقرات أو الجُمل أو الكلمات — نص Lorem ipsum الكلاسيكي، أو نص حشو عربي. انسخه بلمسة واحدة. يعمل بالكامل داخل متصفحك.',
  },
}
