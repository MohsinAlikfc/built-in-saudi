import { lazyTool } from '../../lib/lazyTool'
import type { Tool } from '../types'
import { AsciiIcon } from '../../components/icons'

export const imageToAsciiTool: Tool = {
  id: 'image-to-ascii',
  name: 'Image to ASCII',
  tagline: 'Turn a photo into ASCII text art.',
  description:
    'Drop an image and convert it into ASCII art — choose the width, character set and light/dark inversion, then copy the text or download it. The image is processed entirely on your device and never uploaded.',
  category: 'Images',
  keywords: ['ascii', 'ascii art', 'image to text', 'text art', 'convert', 'photo', 'فن أسكي', 'صورة إلى نص'],
  status: 'stable',
  Icon: AsciiIcon,
  component: lazyTool(() => import('./ImageToAsciiTool')),
  ar: {
    name: 'صورة إلى ASCII',
    tagline: 'حوّل صورة إلى فنّ نصّي ASCII.',
    description:
      'أفلت صورة وحوّلها إلى فنّ ASCII — اختر العرض ومجموعة الرموز وعكس الفاتح/الداكن، ثم انسخ النص أو نزّله. تُعالَج الصورة بالكامل على جهازك ولا تُرفع أبدًا.',
  },
}
