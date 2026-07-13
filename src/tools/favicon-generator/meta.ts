import { lazyTool } from '../../lib/lazyTool'
import type { Tool } from '../types'
import { FaviconIcon } from '../../components/icons'

export const faviconGeneratorTool: Tool = {
  id: 'favicon-generator',
  name: 'Favicon Generator',
  tagline: 'Make favicon and app-icon PNGs from an image.',
  description:
    'Drop a square image or logo and generate crisp favicon and app-icon PNGs at every common size (16 to 512, plus the Apple touch icon), with the ready-to-paste HTML link tags. Generated on your device — nothing is uploaded.',
  category: 'Images',
  keywords: ['favicon', 'app icon', 'icon', 'png', 'apple touch', 'generator', 'أيقونة', 'فايفكون', 'شعار'],
  status: 'stable',
  Icon: FaviconIcon,
  component: lazyTool(() => import('./FaviconGeneratorTool')),
  ar: {
    name: 'مولّد الأيقونات',
    tagline: 'أنشئ أيقونات favicon وتطبيقات من صورة.',
    description:
      'أفلت صورة مربّعة أو شعارًا وأنشئ أيقونات favicon وتطبيقات واضحة بكل المقاسات الشائعة (من 16 إلى 512، مع أيقونة Apple)، مع وسوم HTML الجاهزة للّصق. تُنشأ على جهازك — لا يُرفع أي شيء.',
  },
}
