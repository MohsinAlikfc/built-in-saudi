import { useState } from 'react'
import { useLocale } from '../../i18n'
import { CopyIcon } from '../../components/icons'
import { Pill } from '../../components/ui'

// The du'ā of Ṣalāt al-Istikhāra — narrated by Jābir ibn ʿAbdillāh, recorded by
// al-Bukhārī. The Arabic is the public-domain prophetic text; the transliteration
// and English rendering here are written for this app (not taken from any
// copyrighted translation).
const DUA_AR =
  'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ. اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ ﴿…﴾ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ. وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ ﴿…﴾ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ، ثُمَّ أَرْضِنِي بِهِ.'

const TRANSLIT =
  'Allāhumma innī astakhīruka bi-ʿilmika, wa astaqdiruka bi-qudratika, wa asʾaluka min faḍlika l-ʿaẓīm. Fa-innaka taqdiru wa lā aqdir, wa taʿlamu wa lā aʿlam, wa anta ʿallāmu l-ghuyūb. Allāhumma in kunta taʿlamu anna hādhā l-amra (name your need) khayrun lī fī dīnī wa maʿāshī wa ʿāqibati amrī, fa-qdurhu lī wa yassirhu lī thumma bārik lī fīh. Wa in kunta taʿlamu anna hādhā l-amra sharrun lī fī dīnī wa maʿāshī wa ʿāqibati amrī, fa-ṣrifhu ʿannī wa-ṣrifnī ʿanhu, wa-qdur liya l-khayra ḥaythu kāna, thumma arḍinī bih.'

const TRANSLATION =
  'O Allah, I seek Your guidance by Your knowledge, and I seek strength through Your power, and I ask You of Your immense bounty — for You are able and I am not, You know and I do not, and You are the Knower of all that is hidden. O Allah, if You know that this matter (name your need) is good for me in my religion, my livelihood, and the outcome of my affairs, then decree it for me, make it easy for me, and bless me in it. And if You know that this matter is bad for me in my religion, my livelihood, and the outcome of my affairs, then turn it away from me and turn me away from it, decree for me what is good wherever it may be, and then make me content with it.'

const STR = {
  en: {
    lede: 'The Prophet ﷺ taught the prayer for guidance (istikhāra) for every matter, as he taught a chapter of the Qur’an. Use it whenever you face a permissible choice and want Allah to guide you to what is best.',
    stepsTitle: 'How to pray it',
    steps: [
      'Settle on the matter you are deciding.',
      'Pray two rakʿahs — voluntary, not one of the obligatory prayers.',
      'Then raise your hands and make this supplication, naming your need where marked ﴾…﴿.',
      'Proceed with what your heart inclines to and Allah eases; there is no set “sign”.',
    ],
    duaTitle: 'The supplication',
    translit: 'Transliteration',
    translation: 'Meaning',
    reference: 'Narrated by Jābir ibn ʿAbdillāh · Ṣaḥīḥ al-Bukhārī',
    copy: 'Copy Arabic', copied: 'Copied!',
    note: 'Arabic is the prophetic text; the transliteration and meaning here were written for this app.',
  },
  ar: {
    lede: 'كان النبي ﷺ يُعلّم أصحابه الاستخارة في الأمور كلها كما يُعلّمهم السورة من القرآن. استعملها عند كل أمرٍ مباح تريد أن يهديك الله فيه إلى خير الاختيار.',
    stepsTitle: 'كيفية صلاة الاستخارة',
    steps: [
      'استقرّ على الأمر الذي تستخير فيه.',
      'صلِّ ركعتين من غير الفريضة.',
      'ثم ادعُ بهذا الدعاء، وتُسمّي حاجتك عند الموضع ﴾…﴿.',
      'ثم امضِ فيما انشرح له صدرك ويسّره الله، وليس للاستخارة علامةٌ لازمة.',
    ],
    duaTitle: 'الدعاء',
    translit: 'النطق (Transliteration)',
    translation: 'المعنى (بالإنجليزية)',
    reference: 'رواه جابر بن عبد الله · صحيح البخاري',
    copy: 'نسخ الدعاء', copied: 'تم النسخ!',
    note: 'النص العربي هو الدعاء النبوي؛ وكُتب النطق والمعنى الإنجليزي خصيصًا لهذا التطبيق.',
  },
}

export default function IstikharaTool() {
  const { locale } = useLocale()
  const s = STR[locale]
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try { await navigator.clipboard.writeText(DUA_AR); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch { /* ignore */ }
  }

  return (
    <div className="flex flex-col gap-6 max-w-[46rem] mx-auto" data-testid="istikhara">
      <p className="text-[1.05rem] text-ink-soft leading-relaxed">{s.lede}</p>

      <section>
        <h2 className="font-display text-[1.15rem] text-green-700 mb-3">{s.stepsTitle}</h2>
        <ol className="flex flex-col gap-2">
          {s.steps.map((step, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="flex-none grid place-items-center w-6 h-6 rounded-full bg-[color-mix(in_srgb,var(--green-400)_16%,transparent)] text-green-700 text-[0.8rem] font-bold mt-[2px]">{i + 1}</span>
              <span className="text-ink-soft leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="border border-[color:var(--line-soft)] rounded-md bg-[var(--surface)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[color:var(--line-soft)]">
          <h2 className="font-display text-[1.1rem] text-green-700">{s.duaTitle}</h2>
          <Pill data-testid="istikhara-copy" onClick={copy}><CopyIcon /> {copied ? s.copied : s.copy}</Pill>
        </div>

        <p dir="rtl" lang="ar" className="font-ar text-[1.6rem] leading-[2.15] text-ink px-5 py-5" data-testid="istikhara-dua">{DUA_AR}</p>

        <div className="px-5 pb-5 flex flex-col gap-4">
          <div>
            <span className="block font-body text-[0.72rem] uppercase tracking-[0.07em] text-ink-faint mb-1">{s.translit}</span>
            <p className="text-ink-soft leading-relaxed italic">{TRANSLIT}</p>
          </div>
          <div>
            <span className="block font-body text-[0.72rem] uppercase tracking-[0.07em] text-ink-faint mb-1">{s.translation}</span>
            <p className="text-ink leading-relaxed">{TRANSLATION}</p>
          </div>
        </div>
      </section>

      <p className="text-[0.85rem] text-ink-faint">{s.reference}</p>
      <p className="text-[0.78rem] text-ink-faint">{s.note}</p>
    </div>
  )
}
