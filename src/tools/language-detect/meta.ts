import { lazyTool } from '../../lib/lazyTool'
import type { Tool } from '../types'
import { GlobeIcon } from '../../components/icons'

export const languageDetectTool: Tool = {
  id: 'detect-language',
  name: 'Language Detector',
  nameAr: 'كاشف اللغة',
  tagline: 'Guess what language a piece of text is in.',
  description:
    'Detect the language of any text in your browser — script detection for Arabic, CJK, Cyrillic and more, plus common-word matching across major Latin-script languages, with a confidence score. Nothing is uploaded.',
  category: 'Text',
  keywords: ['language', 'detect', 'identify', 'text', 'nlp', 'which language', 'كشف', 'لغة', 'تحديد اللغة'],
  status: 'stable',
  Icon: GlobeIcon,
  component: lazyTool(() => import('./LanguageDetectTool')),
  ar: {
    name: 'كاشف اللغة',
    tagline: 'خمّن لغة نصٍّ ما.',
    description:
      'اكتشف لغة أي نصٍّ داخل متصفحك — كشف النظام الكتابي للعربية والصينية والسيريلية وغيرها، مع مطابقة الكلمات الشائعة لكبرى اللغات اللاتينية، ودرجة ثقة. دون رفع أي شيء.',
  },
}
