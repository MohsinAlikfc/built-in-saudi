import type { Tool } from './types'
import { qrCodeTool } from './qr-code/meta'
import {
  KeyIcon, ImageIcon, PaletteIcon, RulerIcon,
  BracesIcon, HashIcon, TextIcon, CodeIcon,
} from '../components/icons'

/**
 * The tool catalog. Stable/beta tools render inside the app at /tools/:id.
 * "coming-soon" entries advertise the roadmap and are not yet routable.
 *
 * Order here is the order shown on the home catalog.
 */
export const tools: Tool[] = [
  qrCodeTool,

  // ── Roadmap ──────────────────────────────────────────────
  {
    id: 'password-generator',
    name: 'Password Generator',
    tagline: 'Strong, memorable passwords — generated locally.',
    description: 'Create strong random passwords and passphrases entirely in your browser.',
    category: 'Generators',
    keywords: ['password', 'passphrase', 'random', 'secure'],
    status: 'coming-soon',
    Icon: KeyIcon,
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    tagline: 'Shrink JPG & PNG without uploading them anywhere.',
    description: 'Compress and resize images on-device — your files never leave your computer.',
    category: 'Images',
    keywords: ['image', 'compress', 'optimize', 'resize', 'jpg', 'png'],
    status: 'coming-soon',
    Icon: ImageIcon,
  },
  {
    id: 'color-tools',
    name: 'Color Picker & Palettes',
    tagline: 'Pick, convert and build palettes (HEX · RGB · HSL).',
    description: 'Pick colours, convert between formats and generate harmonious palettes.',
    category: 'Design',
    keywords: ['color', 'colour', 'palette', 'hex', 'rgb', 'hsl'],
    status: 'coming-soon',
    Icon: PaletteIcon,
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    tagline: 'Length, weight, temperature, data and more.',
    description: 'Convert between everyday units quickly and accurately.',
    category: 'Converters',
    keywords: ['convert', 'unit', 'length', 'weight', 'temperature'],
    status: 'coming-soon',
    Icon: RulerIcon,
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    tagline: 'Format, validate and minify JSON instantly.',
    description: 'Prettify, validate and minify JSON with clear error reporting.',
    category: 'Developer',
    keywords: ['json', 'format', 'validate', 'minify', 'pretty'],
    status: 'coming-soon',
    Icon: BracesIcon,
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    tagline: 'Generate v4 UUIDs in bulk.',
    description: 'Generate one or many RFC-4122 UUIDs with a click.',
    category: 'Developer',
    keywords: ['uuid', 'guid', 'id', 'random'],
    status: 'coming-soon',
    Icon: HashIcon,
  },
  {
    id: 'text-counter',
    name: 'Word & Character Counter',
    tagline: 'Live word, character, sentence & reading-time counts.',
    description: 'Count words, characters and sentences with live reading-time estimates.',
    category: 'Text',
    keywords: ['word', 'character', 'count', 'text', 'reading time'],
    status: 'coming-soon',
    Icon: TextIcon,
  },
  {
    id: 'base64',
    name: 'Base64 Encoder / Decoder',
    tagline: 'Encode and decode Base64 text and files.',
    description: 'Encode or decode Base64 for text and small files, locally.',
    category: 'Developer',
    keywords: ['base64', 'encode', 'decode', 'data uri'],
    status: 'coming-soon',
    Icon: CodeIcon,
  },
]

export function getTool(id: string | undefined): Tool | undefined {
  if (!id) return undefined
  return tools.find((t) => t.id === id)
}

export const liveTools = tools.filter((t) => t.status !== 'coming-soon')
export const comingSoonTools = tools.filter((t) => t.status === 'coming-soon')
