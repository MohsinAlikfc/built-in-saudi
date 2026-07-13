import { lazyTool } from '../../lib/lazyTool'
import type { Tool } from '../types'
import { StegoIcon } from '../../components/icons'

export const steganographyTool: Tool = {
  id: 'steganography',
  name: 'Hide Text in Image',
  tagline: 'Conceal a secret message inside a picture.',
  description:
    'Hide a text message inside an image by tweaking the least-significant bits of its pixels — the picture looks unchanged — then reveal it later from the saved PNG. Everything happens on your device; nothing is uploaded. Note: this is obfuscation, not strong encryption.',
  category: 'Images',
  keywords: ['steganography', 'hide text', 'secret', 'lsb', 'image', 'conceal', 'إخفاء', 'رسالة سرية', 'ستيغانوغرافيا'],
  status: 'stable',
  Icon: StegoIcon,
  component: lazyTool(() => import('./SteganographyTool')),
  ar: {
    name: 'إخفاء نص في صورة',
    tagline: 'أخفِ رسالة سرية داخل صورة.',
    description:
      'أخفِ رسالة نصية داخل صورة بتعديل البتات الأقل أهمية في بكسلاتها — تبدو الصورة دون تغيير — ثم اكشفها لاحقًا من ملف PNG المحفوظ. كل شيء يجري على جهازك؛ لا يُرفع أي شيء. ملاحظة: هذا إخفاء وليس تشفيرًا قويًا.',
  },
}
