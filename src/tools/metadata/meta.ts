import { lazyTool } from '../../lib/lazyTool'
import type { Tool } from '../types'
import { InfoIcon } from '../../components/icons'

export const metadataTool: Tool = {
  id: 'file-metadata',
  name: 'File Metadata',
  nameAr: 'بيانات الملف',
  tagline: 'See a file’s hidden metadata — EXIF, PDF info, and more.',
  description:
    'Reveal a file’s metadata in your browser: size and type, image dimensions, camera EXIF (make, model, date, exposure, GPS), PNG text, PDF document info, and WAV/AVI tags — nothing is uploaded.',
  category: 'Files',
  keywords: ['metadata', 'exif', 'file info', 'pdf', 'image', 'gps', 'camera', 'properties', 'بيانات', 'exif', 'معلومات الملف'],
  status: 'stable',
  Icon: InfoIcon,
  component: lazyTool(() => import('./MetadataTool')),
  ar: {
    name: 'بيانات الملف',
    tagline: 'اطّلع على البيانات الوصفية المخفية — EXIF ومعلومات PDF وغيرها.',
    description:
      'اكشف البيانات الوصفية لملفٍ داخل متصفحك: الحجم والنوع، أبعاد الصورة، بيانات EXIF للكاميرا (الصانع والطراز والتاريخ والتعريض وGPS)، ونصوص PNG، ومعلومات مستند PDF، ووسوم WAV/AVI — دون رفع أي شيء.',
  },
}
