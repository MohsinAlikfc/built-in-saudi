import { lazyTool } from '../../lib/lazyTool'
import type { Tool } from '../types'
import { MemeIcon } from '../../components/icons'

export const memeGeneratorTool: Tool = {
  id: 'meme-generator',
  name: 'Meme Generator',
  tagline: 'Add top and bottom captions to any image.',
  description:
    'Drop an image, add bold top and bottom captions in the classic meme style, tweak the font size, and download the result as a PNG. Everything is drawn on your device — the image is never uploaded.',
  category: 'Images',
  keywords: ['meme', 'caption', 'image text', 'impact', 'generator', 'funny', 'ميم', 'تعليق', 'صورة'],
  status: 'stable',
  Icon: MemeIcon,
  component: lazyTool(() => import('./MemeGeneratorTool')),
  ar: {
    name: 'مولّد الميمز',
    tagline: 'أضِف تعليقًا علويًا وسفليًا لأي صورة.',
    description:
      'أفلت صورة، وأضِف تعليقين علوي وسفلي بالنمط الكلاسيكي للميمز، واضبط حجم الخط، ونزّل الناتج كـPNG. كل شيء يُرسم على جهازك — لا تُرفع الصورة أبدًا.',
  },
}
