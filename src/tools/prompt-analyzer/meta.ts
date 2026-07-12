import { lazyTool } from '../../lib/lazyTool'
import type { Tool } from '../types'
import { RadarIcon } from '../../components/icons'

export const promptAnalyzerTool: Tool = {
  id: 'prompt-analyzer',
  name: 'Prompt Analyzer',
  nameAr: 'محلّل الموجّهات',
  tagline: 'Grade your LLM prompt on a spider chart, with issues listed.',
  description:
    'Paste an LLM system prompt and one AI pass scores it 1–5 across eight dimensions — purpose coherence, context-vs-instruction harmony, spikiness, shoutiness, contradictions, positive framing, an escape hatch, and downstream stakes — shown as a spider chart, with concrete issues listed headline-first. Built on the idea that the best prompt is a coherent explanation, not a pile of shouted commands. One analysis per 24 hours.',
  category: 'Developer',
  keywords: ['prompt', 'llm', 'ai', 'prompt engineering', 'system prompt', 'analyze', 'grade', 'gpt', 'موجّه', 'ذكاء اصطناعي', 'هندسة الموجّهات', 'تحليل'],
  status: 'beta',
  Icon: RadarIcon,
  component: lazyTool(() => import('./PromptAnalyzerTool')),
  ar: {
    name: 'محلّل الموجّهات',
    tagline: 'قيّم موجّه نموذجك على مخطط عنكبوتي مع سرد المشكلات.',
    description:
      'الصق موجّه نظام لنموذج لغوي، فيقيّمه مرور واحد للذكاء الاصطناعي من ١ إلى ٥ عبر ثمانية أبعاد — تماسك الغرض، وتناغم السياق مع التعليمات، والحدّة، والصياح، والتناقضات، والصياغة الإيجابية، ومنفذ الخروج، ووضوح الاستخدام اللاحق — كمخطط عنكبوتي، مع سرد المشكلات بعناوينها. مبنيّ على فكرة أن أفضل موجّه شرحٌ متماسك لا كومة أوامر مصيحة. تحليل واحد كل ٢٤ ساعة.',
  },
}
