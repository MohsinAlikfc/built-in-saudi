import type { Locale } from "./index";

// Pure SEO data (no React imports) so the build-time prerender plugin in
// vite.config.ts can import it. When a tool goes LIVE, add its entry here.

export const siteMeta: Record<Locale, { title: string; description: string }> =
{
  en: {
    title: "Built In Saudi – Free Online Tools, Generators & Calculators",
    description:
      "Discover 90+ free online tools: QR codes, PDF editors, prayer times, Zakat calculator, image tools & more. Fast, secure, no sign-up. Built for Saudi Arabia.",
  },
  ar: {
    title: "بيلت إن سعودي – أدوات وحاسبات مجانية أونلاين",
    description:
      "أكثر من 90 أداة مجانية أونلاين: مولد QR، تحرير PDF، مواقيت الصلاة، حاسبة الزكاة، أدوات الصور والمزيد. سريعة وآمنة بدون تسجيل.",
  },
};

export interface ToolContent {
  seoTitle?: string;
  features?: string[];
  howItWorks?: string[];
  faq?: { q: string; a: string }[];
}

export interface ToolSeo {
  id: string;
  en: { name: string; description: string } & ToolContent;
  ar: { name: string; description: string } & ToolContent;
}

/** Standalone (non-tool) pages that also get prerendered at /<locale>/<id>/. */
export const staticPageSeo: ToolSeo[] = [
  {
    id: "privacy",
    en: {
      name: "Privacy Policy",
      description:
        "How Built in Saudi handles your data: almost everything runs in your browser and never leaves your device; the Book With Me scheduling tool and its Google Calendar use are explained in full.",
    },
    ar: {
      name: "سياسة الخصوصية",
      description:
        "كيف يتعامل «بُنِيَ في السعودية» مع بياناتك: يعمل كل شيء تقريبًا داخل متصفحك ولا يغادر جهازك؛ مع شرحٍ كامل لأداة «احجز معي» واستخدامها لتقويم جوجل.",
    },
  },
  {
    id: "terms",
    en: {
      name: "Terms of Use",
      description:
        "The simple terms covering your use of Built in Saudi and its free tools, including Book With Me.",
    },
    ar: {
      name: "شروط الاستخدام",
      description:
        "الشروط البسيطة التي تغطي استخدامك لـ«بُنِيَ في السعودية» وأدواته المجانية، بما في ذلك «احجز معي».",
    },
  },
];

/** Live (routable) tools only — used to prerender /<locale>/tools/<id>/. */
export const liveToolSeo: ToolSeo[] = [
  {
    id: "calls",
    en: {
      name: "Calls",
      description:
        "Make free browser-based video and voice calls instantly. No app download, no account. Secure peer-to-peer calling tool.",
      seoTitle: "Free Online Video & Voice Calls – No Sign-up Required",
    },
    ar: {
      name: "مكالمات",
      description:
        "قم بإجراء مكالمات فيديو وصوت مجانية مباشرة من المتصفح دون تحميل تطبيق أو حساب. أداة مكالمات آمنة ومباشرة.",
      seoTitle: "مكالمات فيديو وصوت مجانية أونلاين بدون تسجيل",
    },
  },
  {
    id: "prompt-analyzer",
    en: {
      name: "Prompt Analyzer",
      description:
        "Analyze and improve your AI prompts for better results online for free. Fast prompt quality checker tool.",
      seoTitle: "Free AI Prompt Analyzer – Improve Your Prompts Online",
    },
    ar: {
      name: "محلّل الموجّهات",
      description:
        "حلل وحسّن برومبتات الذكاء الاصطناعي للحصول على نتائج أفضل مجانًا وفورًا.",
      seoTitle: "أداة تحليل وتحسين برومبت الذكاء الاصطناعي",
    },
  },
  {
    id: "regex-tester",
    en: {
      name: "Regex Tester",
      description:
        "Test and debug regular expressions (regex) online for free with real-time match highlighting for developers.",
      seoTitle: "Free Regex Tester – Test Regular Expressions Online",
    },
    ar: {
      name: "مختبِر التعابير النمطية",
      description:
        "اختبر وصحح التعابير النمطية (Regex) أونلاين مجانًا مع تظليل فوري للنتائج.",
      seoTitle: "أداة اختبار Regex (التعابير النمطية) مجانًا",
    },
  },
  {
    id: "jwt-decoder",
    en: {
      name: "JWT Decoder",
      description:
        "Decode and verify JWT (JSON Web Tokens) online for free instantly. Secure, client-side JWT decoder tool.",
      seoTitle: "Free JWT Decoder – Decode JSON Web Tokens Online",
    },
    ar: {
      name: "مفكّك رموز JWT",
      description:
        "فك تشفير والتحقق من رموز JWT مجانًا وفورًا بأمان تام داخل المتصفح.",
      seoTitle: "أداة فك تشفير JWT مجانًا أونلاين",
    },
  },
  {
    id: "cron-explainer",
    en: {
      name: "Cron Explainer",
      description:
        "Decode and understand any cron expression in plain English online for free. Instant cron schedule explainer.",
      seoTitle: "Free Cron Expression Explainer – Understand Cron Jobs",
    },
    ar: {
      name: "مفسّر Cron",
      description:
        "افهم واشرح أي تعبير Cron بلغة بسيطة مجانًا وفورًا لجدولة المهام.",
      seoTitle: "أداة شرح تعبيرات Cron مجانًا أونلاين",
    },
  },
  {
    id: "text-diff",
    en: {
      name: "Text Diff",
      description:
        "Compare two texts or files and highlight differences online for free, instantly. Simple text comparison tool.",
      seoTitle: "Free Text Diff Checker – Compare Two Texts Online",
    },
    ar: {
      name: "مقارنة النصوص",
      description:
        "قارن بين نصين أو ملفين وأبرز الفروقات بينهما مجانًا وفورًا.",
      seoTitle: "أداة مقارنة النصوص (Text Diff) مجانًا",
    },
  },
  {
    id: "unix-timestamp",
    en: {
      name: "Unix Timestamp",
      description:
        "Convert Unix timestamp to human-readable date and back online for free, instantly and accurately.",
      seoTitle: "Free Unix Timestamp Converter – Epoch Time Tool",
    },
    ar: {
      name: "الطابع الزمني يونكس",
      description:
        "حوّل الطابع الزمني Unix إلى تاريخ مقروء والعكس مجانًا وبدقة فورية.",
      seoTitle: "محول الطابع الزمني Unix Timestamp مجانًا",
    },
  },
  {
    id: "url-encoder",
    en: {
      name: "URL & HTML Encoder",
      description:
        "Encode or decode URLs online for free instantly. Simple, fast URL encoding tool for developers.",
      seoTitle: "Free URL Encoder & Decoder – Online Tool",
    },
    ar: {
      name: "مُرمِّز الروابط وHTML",
      description:
        "شفّر أو فك تشفير الروابط (URL) مجانًا وفورًا. أداة بسيطة وسريعة للمطورين.",
      seoTitle: "أداة ترميز وفك ترميز الروابط URL مجانًا",
    },
  },
  {
    id: "base-converter",
    en: {
      name: "Number Base Converter",
      description:
        "Convert numbers between binary, decimal, hexadecimal, and octal online for free, instantly and accurately.",
      seoTitle: "Free Number Base Converter – Binary, Hex, Decimal",
    },
    ar: {
      name: "محوّل أنظمة الأعداد",
      description:
        "حوّل الأرقام بين الثنائي والعشري والسادس عشر والثماني مجانًا وبدقة فورية.",
      seoTitle: "محول الأنظمة العددية Base Converter مجانًا",
    },
  },
  {
    id: "csv-json",
    en: {
      name: "CSV ⇄ JSON",
      description:
        "Convert CSV files to JSON format online for free, instantly. Also supports JSON to CSV conversion.",
      seoTitle: "Free CSV to JSON Converter – Online Tool",
    },
    ar: {
      name: "CSV ⇄ JSON",
      description:
        "حوّل ملفات CSV إلى صيغة JSON مجانًا وفورًا، مع دعم التحويل العكسي أيضًا.",
      seoTitle: "محول CSV إلى JSON مجانًا أونلاين",
    },
  },
  {
    id: "list-tools",
    en: {
      name: "List Tools",
      description:
        "Sort, deduplicate, shuffle, and format text lists online for free. Fast, all-in-one list management tool.",
      seoTitle: "Free Online List Tools – Sort, Dedupe & Format Lists",
    },
    ar: {
      name: "أدوات القوائم",
      description:
        "رتّب وأزل التكرار واخلط ونسّق قوائمك النصية مجانًا بأداة شاملة وسريعة.",
      seoTitle: "أدوات القوائم المجانية – ترتيب وتنظيف القوائم",
    },
  },
  {
    id: "color-contrast",
    en: {
      name: "Contrast Checker",
      description:
        "Check color contrast ratios for accessibility compliance (WCAG) online for free, instantly and accurately.",
      seoTitle: "Free Color Contrast Checker – WCAG Accessibility Tool",
    },
    ar: {
      name: "فاحص التباين",
      description:
        "افحص نسبة تباين الألوان للتوافق مع معايير إمكانية الوصول (WCAG) مجانًا وبدقة.",
      seoTitle: "أداة فحص تباين الألوان مجانًا (WCAG)",
    },
  },
  {
    id: "loan-calculator",
    en: {
      name: "Loan Calculator",
      description:
        "Calculate your loan's monthly payments, total interest, and repayment schedule online for free, instantly.",
      seoTitle: "Free Loan Calculator – Monthly Payment & Interest",
    },
    ar: {
      name: "حاسبة القروض",
      description:
        "احسب القسط الشهري وإجمالي الفوائد وجدول سداد قرضك مجانًا وبسرعة.",
      seoTitle: "حاسبة القروض المجانية – احسب القسط الشهري",
    },
  },
  {
    id: "percentage-calculator",
    en: {
      name: "Percentage Calculator",
      description:
        "Calculate percentages, percentage change, and increase/decrease online for free, fast and accurate.",
      seoTitle: "Free Percentage Calculator – Calculate Percentages Online",
    },
    ar: {
      name: "حاسبة النسبة المئوية",
      description:
        "احسب النسب المئوية والزيادة والنقصان مجانًا وبدقة وسرعة.",
      seoTitle: "حاسبة النسبة المئوية مجانًا أونلاين",
    },
  },
  {
    id: "split-bill",
    en: {
      name: "Bill Splitter",
      description:
        "Split bills and expenses fairly between friends or roommates online for free. Fast, simple bill-splitting calculator.",
      seoTitle: "Free Bill Splitter – Split Expenses Between Friends",
    },
    ar: {
      name: "مقسّم الفاتورة",
      description:
        "قسّم الفواتير والمصاريف بعدل بين الأصدقاء أو زملاء السكن مجانًا وبسرعة.",
      seoTitle: "أداة تقسيم الفاتورة مجانًا بين الأصدقاء",
    },
  },
  {
    id: "aspect-ratio",
    en: {
      name: "Aspect Ratio Calculator",
      description:
        "Calculate and convert image or video aspect ratios and dimensions online for free, fast and accurate.",
      seoTitle: "Free Aspect Ratio Calculator – Resize Dimensions Online",
    },
    ar: {
      name: "حاسبة نسبة الأبعاد",
      description:
        "احسب وحوّل أبعاد الصور والفيديوهات ونسبها مجانًا وبدقة.",
      seoTitle: "حاسبة نسبة الأبعاد Aspect Ratio مجانًا",
    },
  },
  {
    id: "pomodoro",
    en: {
      name: "Pomodoro Timer",
      description:
        "Boost your focus with a free online Pomodoro timer. Customizable work and break intervals, no sign-up needed.",
      seoTitle: "Free Pomodoro Timer – Focus & Productivity Tool Online",
    },
    ar: {
      name: "مؤقّت بومودورو",
      description:
        "عزز تركيزك وإنتاجيتك بمؤقت بومودورو مجاني أونلاين مع فترات عمل وراحة قابلة للتخصيص.",
      seoTitle: "مؤقت بومودورو المجاني لتعزيز التركيز",
    },
  },
  {
    id: "end-of-service",
    en: {
      name: "End-of-Service Calculator",
      description:
        "Calculate your end-of-service gratuity (Mukafaat Nihayat Khidmah) under Saudi labor law for free, instantly.",
      seoTitle: "End of Service Calculator Saudi Arabia – Free Tool",
    },
    ar: {
      name: "حاسبة نهاية الخدمة",
      description:
        "احسب مكافأة نهاية الخدمة حسب نظام العمل السعودي مجانًا وفوريًا وبدقة.",
      seoTitle: "حاسبة مكافأة نهاية الخدمة في السعودية مجانًا",
    },
  },
  {
    id: "zakat-calculator",
    en: {
      name: "Zakat Calculator",
      description:
        "Calculate your Zakat on cash, gold, and investments accurately online for free. Fast, Sharia-compliant Zakat calculator.",
      seoTitle: "Zakat Calculator Saudi Arabia – Free Online Tool",
    },
    ar: {
      name: "حاسبة الزكاة",
      description:
        "احسب زكاة أموالك وذهبك واستثماراتك بدقة أونلاين مجانًا وفق الضوابط الشرعية.",
      seoTitle: "حاسبة الزكاة أونلاين – احسب زكاتك مجانًا",
    },
  },
  {
    id: "age-calculator",
    en: {
      name: "Age Calculator",
      description:
        "Calculate your exact age in years, months, and days from your birth date online for free, instantly.",
      seoTitle: "Free Age Calculator – Calculate Your Exact Age Online",
    },
    ar: {
      name: "حاسبة العمر",
      description:
        "احسب عمرك بالضبط بالسنوات والأشهر والأيام من تاريخ ميلادك مجانًا وفوريًا.",
      seoTitle: "حاسبة العمر المجانية أونلاين",
    },
  },
  {
    id: "working-days",
    en: {
      name: "Working Days Calculator",
      description:
        "Calculate the number of working days between two dates online for free, excluding weekends and holidays.",
      seoTitle: "Working Days Calculator – Business Days Between Dates",
    },
    ar: {
      name: "حاسبة أيام العمل",
      description:
        "احسب عدد أيام العمل بين تاريخين مجانًا مع استثناء عطلات نهاية الأسبوع والإجازات.",
      seoTitle: "حاسبة أيام العمل بين تاريخين مجانًا",
    },
  },
  {
    id: "cubic-bezier",
    en: {
      name: "Cubic Bezier Editor",
      description:
        "Create and preview custom cubic-bezier CSS easing curves online for free. Copy the code instantly for animations.",
      seoTitle: "Cubic Bezier Curve Generator – CSS Easing Tool Free",
    },
    ar: {
      name: "محرّر منحنى بيزييه",
      description:
        "أنشئ وعاين منحنيات cubic-bezier المخصصة لـCSS مجانًا وانسخ الكود فورًا للحركات.",
      seoTitle: "مولد منحنى Cubic Bezier لتأثيرات CSS مجانًا",
    },
  },
  {
    id: "box-shadow",
    en: {
      name: "Box Shadow Generator",
      description:
        "Design and preview custom CSS box-shadow effects online for free. Copy the generated code instantly.",
      seoTitle: "CSS Box Shadow Generator – Free Online Tool",
    },
    ar: {
      name: "مولّد ظل الصندوق",
      description:
        "صمم وعاين تأثيرات box-shadow المخصصة في CSS مجانًا وانسخ الكود فورًا.",
      seoTitle: "مولد ظل الصندوق Box Shadow لـCSS مجانًا",
    },
  },
  {
    id: "gradient-generator",
    en: {
      name: "CSS Gradient Generator",
      description:
        "Create beautiful linear and radial CSS gradients online for free. Preview and copy gradient code instantly.",
      seoTitle: "Free CSS Gradient Generator – Create Color Gradients",
    },
    ar: {
      name: "مولّد تدرّجات CSS",
      description:
        "أنشئ تدرجات لونية خطية ودائرية جميلة لـCSS مجانًا وانسخ الكود فورًا.",
      seoTitle: "مولد التدرجات اللونية CSS Gradient مجانًا",
    },
  },
  {
    id: "ip-subnet",
    en: {
      name: "IP Subnet Calculator",
      description:
        "Calculate IP subnets, CIDR ranges, and network details online for free. Fast subnet calculator for network admins.",
      seoTitle: "Free IP Subnet Calculator – CIDR & Network Tool",
    },
    ar: {
      name: "حاسبة الشبكات الفرعية",
      description:
        "احسب الشبكات الفرعية ونطاقات CIDR وتفاصيل الشبكة مجانًا وبسرعة لمسؤولي الشبكات.",
      seoTitle: "حاسبة الشبكات الفرعية IP Subnet مجانًا",
    },
  },
  {
    id: "user-agent",
    en: {
      name: "User-Agent Parser",
      description:
        "Check and parse any browser user agent string online for free. Identify device, OS, and browser instantly.",
      seoTitle: "Free User Agent Checker & Parser – Online Tool",
    },
    ar: {
      name: "محلّل وكيل المستخدم",
      description:
        "افحص وحلل سلسلة user agent لأي متصفح مجانًا وحدد الجهاز ونظام التشغيل فورًا.",
      seoTitle: "أداة فحص وتحليل User Agent مجانًا",
    },
  },
  {
    id: "readability",
    en: {
      name: "Readability Scorer",
      description:
        "Check your text's readability score online for free using Flesch and other formulas. Improve your writing instantly.",
      seoTitle: "Free Readability Checker – Test Text Readability Score",
    },
    ar: {
      name: "مقياس المقروئية",
      description:
        "افحص درجة سهولة قراءة نصك مجانًا باستخدام معايير قياسية وحسّن كتابتك فورًا.",
      seoTitle: "أداة فحص سهولة قراءة النص مجانًا",
    },
  },
  {
    id: "random-picker",
    en: {
      name: "Random Picker Wheel",
      description:
        "Pick a random name, number, or item from your list instantly. Free, fair, and easy-to-use random picker tool.",
      seoTitle: "Free Random Picker – Pick a Random Name or Item Online",
    },
    ar: {
      name: "عجلة الاختيار العشوائي",
      description:
        "اختر اسمًا أو رقمًا أو عنصرًا عشوائيًا من قائمتك فورًا. أداة مجانية وعادلة وسهلة الاستخدام.",
      seoTitle: "أداة الاختيار العشوائي المجانية أونلاين",
    },
  },
  {
    id: "dice-roller",
    en: {
      name: "Dice Roller",
      description:
        "Roll one or multiple virtual dice online for free. Perfect for games, decisions, and tabletop play, no sign-up.",
      seoTitle: "Free Online Dice Roller – Roll Virtual Dice Instantly",
    },
    ar: {
      name: "رامي النرد",
      description:
        "ارمِ نردًا افتراضيًا واحدًا أو متعددًا مجانًا أونلاين. مثالية للألعاب واتخاذ القرارات بدون تسجيل.",
      seoTitle: "أداة رمي النرد الافتراضي مجانًا أونلاين",
    },
  },
  {
    id: "countdown",
    en: {
      name: "Countdown Timer",
      description:
        "Create a custom countdown timer for events, deadlines, or launches online for free. Fast and shareable.",
      seoTitle: "Free Online Countdown Timer – Set a Custom Countdown",
    },
    ar: {
      name: "العدّ التنازلي",
      description:
        "أنشئ عداد تنازلي مخصص للفعاليات والمواعيد النهائية مجانًا أونلاين وقابل للمشاركة.",
      seoTitle: "عداد تنازلي مجاني أونلاين للمناسبات",
    },
  },
  {
    id: "typing-test",
    en: {
      name: "Typing Speed Test",
      description:
        "Test your typing speed and accuracy online for free. Measure your words per minute (WPM) instantly.",
      seoTitle: "Free Typing Speed Test – Check Your WPM Online",
    },
    ar: {
      name: "اختبار سرعة الكتابة",
      description:
        "اختبر سرعة ودقة كتابتك مجانًا أونلاين وقِس عدد الكلمات في الدقيقة فورًا.",
      seoTitle: "اختبار سرعة الكتابة المجاني أونلاين",
    },
  },
  {
    id: "image-to-ascii",
    en: {
      name: "Image to ASCII",
      description:
        "Convert any image into ASCII art text online for free. Fast, fun, and easy image-to-text art generator.",
      seoTitle: "Image to ASCII Art Converter – Free Online Tool",
    },
    ar: {
      name: "صورة إلى ASCII",
      description:
        "حوّل أي صورة إلى فن ASCII نصي مجانًا. أداة سريعة وممتعة لتحويل الصور إلى فن الأسكي.",
      seoTitle: "محول الصور إلى فن ASCII مجانًا أونلاين",
    },
  },
  {
    id: "meme-generator",
    en: {
      name: "Meme Generator",
      description:
        "Make custom memes online for free with your own images and text. Fast, easy meme maker, no sign-up required.",
      seoTitle: "Free Meme Generator – Create Memes Online Instantly",
    },
    ar: {
      name: "مولّد الميمز",
      description:
        "أنشئ ميمز مخصصة مجانًا بصورك ونصوصك الخاصة. أداة سريعة وسهلة لإنشاء الميمز بدون تسجيل.",
      seoTitle: "مولد الميمز المجاني – أنشئ ميم أونلاين",
    },
  },
  {
    id: "favicon-generator",
    en: {
      name: "Favicon Generator",
      description:
        "Generate favicons for your website in all sizes and formats for free. Fast, easy favicon.ico generator tool.",
      seoTitle: "Free Favicon Generator – Create Website Icons Online",
    },
    ar: {
      name: "مولّد الأيقونات",
      description:
        "أنشئ أيقونة الفافيكون لموقعك بجميع الأحجام والصيغ مجانًا وبسرعة.",
      seoTitle: "مولد الفافيكون المجاني لموقعك أونلاين",
    },
  },
  {
    id: "steganography",
    en: {
      name: "Hide Text in Image",
      description:
        "Hide secret text or files inside images online for free using steganography. Secure, private, and easy to use.",
      seoTitle: "Free Steganography Tool – Hide Text & Files in Images",
    },
    ar: {
      name: "إخفاء نص في صورة",
      description:
        "أخفِ نصوصًا أو ملفات سرية داخل الصور مجانًا باستخدام تقنية الإخفاء (Steganography) بأمان وسهولة.",
      seoTitle: "أداة إخفاء المعلومات (ستيجانوغرافي) مجانًا",
    },
  },
  {
    id: "screen-recorder",
    en: {
      name: "Screen Recorder",
      description:
        "Record your screen online for free with audio, no software install. Fast, private browser-based screen recording tool.",
      seoTitle: "Free Online Screen Recorder – Record Your Screen Instantly",
    },
    ar: {
      name: "مسجّل الشاشة",
      description:
        "سجل شاشتك مجانًا مع الصوت مباشرة من المتصفح دون تثبيت برامج. أداة تسجيل شاشة سريعة وخاصة.",
      seoTitle: "تسجيل الشاشة مجانًا أونلاين بسهولة",
    },
  },
  {
    id: "photo-booth",
    en: {
      name: "Webcam Photo Booth",
      description:
        "Free online photo booth with filters and effects. Capture and download fun photos instantly from your browser, no app needed.",
      seoTitle: "Online Photo Booth – Take Fun Photos with Filters Free",
    },
    ar: {
      name: "كشك تصوير الويب كام",
      description:
        "استوديو صور مجاني أونلاين مع فلاتر وتأثيرات. التقط وحمّل صورك الممتعة فورًا من المتصفح بدون تطبيق.",
      seoTitle: "استوديو الصور أونلاين – التقط صورًا ممتعة مجانًا",
    },
  },
  {
    id: "image-redact",
    en: {
      name: "Image Redactor",
      description:
        "Redact, blur, or black out sensitive text and faces in images online for free. Secure, private, and works in your browser.",
      seoTitle: "Free Image Redaction Tool – Blur & Hide Sensitive Info",
    },
    ar: {
      name: "محرّر تمويه الصور",
      description:
        "أداة مجانية لتعتيم وإخفاء النصوص والوجوه الحساسة في الصور مباشرة من المتصفح بأمان وخصوصية تامة.",
      seoTitle: "أداة تعتيم الصور المجانية – إخفاء البيانات الحساسة",
    },
  },
  {
    id: "file-encrypt",
    en: {
      name: "File Encryptor",
      description:
        "Encrypt or decrypt any file securely online with password protection. Free, fast, browser-based file encryption tool.",
      seoTitle: "Free File Encryption Tool – Encrypt & Decrypt Files Online",
    },
    ar: {
      name: "مشفّر الملفات",
      description:
        "شفّر أو فك تشفير أي ملف بأمان باستخدام كلمة مرور مباشرة من المتصفح. أداة تشفير ملفات مجانية وسريعة.",
      seoTitle: "أداة تشفير الملفات المجانية أونلاين",
    },
  },
  {
    id: "meta-tags",
    en: {
      name: "Meta Tag Generator",
      description:
        "Generate SEO-optimized meta tags (title, description, Open Graph) for your website free and instantly.",
      seoTitle: "Free Meta Tags Generator – SEO Meta Tags Online",
    },
    ar: {
      name: "مولّد وسوم Meta",
      description:
        "أنشئ وسوم ميتا (Meta Tags) محسّنة لمحركات البحث لموقعك مجانًا وبسرعة.",
      seoTitle: "مولد الميتا تاغز المجاني لتحسين السيو",
    },
  },
  {
    id: "robots-txt",
    en: {
      name: "robots.txt Generator",
      description:
        "Generate and validate a robots.txt file for your website online for free. Control search engine crawling easily.",
      seoTitle: "Free Robots.txt Generator – Create & Test Robots.txt",
    },
    ar: {
      name: "مولّد robots.txt",
      description:
        "أنشئ واختبر ملف robots.txt لموقعك مجانًا للتحكم في زحف محركات البحث بسهولة.",
      seoTitle: "مولد ملف Robots.txt مجانًا أونلاين",
    },
  },
  {
    id: "gitignore",
    en: {
      name: ".gitignore Generator",
      description:
        "Generate a .gitignore file for any programming language or framework instantly. Free tool for developers.",
      seoTitle: "Free .gitignore Generator – Create Gitignore Files Online",
    },
    ar: {
      name: "مولّد .gitignore",
      description:
        "أنشئ ملف gitignore لأي لغة برمجة أو إطار عمل فورًا ومجانًا.",
      seoTitle: "مولد ملف .gitignore مجانًا للمطورين",
    },
  },
  {
    id: "json-to-types",
    en: {
      name: "JSON to TypeScript",
      description:
        "Convert JSON data into TypeScript interfaces or types instantly. Free, fast JSON-to-types generator for developers.",
      seoTitle: "JSON to TypeScript Types Converter – Free Online Tool",
    },
    ar: {
      name: "JSON إلى TypeScript",
      description:
        "حوّل بيانات JSON إلى واجهات وأنواع TypeScript فورًا ومجانًا لتسهيل عمل المطورين.",
      seoTitle: "محول JSON إلى أنواع TypeScript مجانًا",
    },
  },
  {
    id: "writer",
    en: {
      name: "Distraction-Free Writer",
      description:
        "Write, edit, and improve your text online for free with a distraction-free writing tool. Fast and simple.",
      seoTitle: "Free AI Writer – Write & Edit Text Online",
    },
    ar: {
      name: "محرّر بلا تشتيت",
      description:
        "اكتب وحرر ونقّح نصوصك أونلاين مجانًا بأداة كتابة بسيطة وخالية من المشتتات.",
      seoTitle: "أداة الكتابة المجانية أونلاين",
    },
  },
  {
    id: "flashcards",
    en: {
      name: "Flashcards",
      description:
        "Create and study digital flashcards online for free. Perfect for memorizing vocabulary, facts, and exam prep.",
      seoTitle: "Free Online Flashcards Maker – Study & Memorize",
    },
    ar: {
      name: "البطاقات التعليمية",
      description:
        "أنشئ وذاكر بطاقات تعليمية رقمية مجانًا. مثالية لحفظ المفردات والمعلومات والاستعداد للاختبارات.",
      seoTitle: "أداة البطاقات التعليمية المجانية للمذاكرة",
    },
  },
  {
    id: "kanban",
    en: {
      name: "Kanban Board",
      description:
        "Organize tasks and projects with a free online Kanban board. Drag, drop, and manage your workflow easily, no sign-up.",
      seoTitle: "Free Online Kanban Board – Task & Project Management",
    },
    ar: {
      name: "لوحة كانبان",
      description:
        "نظّم مهامك ومشاريعك بلوحة كانبان مجانية أونلاين. اسحب وأفلت وأدر سير عملك بسهولة بدون تسجيل.",
      seoTitle: "لوحة كانبان مجانية لإدارة المهام أونلاين",
    },
  },
  {
    id: "tier-list",
    en: {
      name: "Tier List Maker",
      description:
        "Create and share custom tier list rankings online for free. Drag and drop images to rank anything instantly.",
      seoTitle: "Free Tier List Maker – Create Ranking Lists Online",
    },
    ar: {
      name: "صانع قوائم التصنيف",
      description:
        "أنشئ وشارك قوائم تصنيف مخصصة أونلاين مجانًا بسحب وإفلات الصور لترتيب أي شيء فورًا.",
      seoTitle: "أداة إنشاء قوائم التصنيف (Tier List) مجانًا",
    },
  },
  {
    id: "readme-generator",
    en: {
      name: "README Generator",
      description:
        "Generate a professional README.md file for your GitHub project online for free. Fast, customizable readme builder.",
      seoTitle: "Free README Generator – Create GitHub README.md Online",
    },
    ar: {
      name: "مولّد README",
      description:
        "أنشئ ملف README.md احترافي لمشروعك على GitHub مجانًا وبسرعة وبتخصيص كامل.",
      seoTitle: "مولد ملف README مجاني لمشاريع GitHub",
    },
  },
  {
    id: "markdown-table",
    en: {
      name: "Markdown Table Generator",
      description:
        "Build and format Markdown tables online for free. Paste data, generate clean markdown table syntax instantly.",
      seoTitle: "Markdown Table Generator – Create Tables Online Free",
    },
    ar: {
      name: "مولّد جداول Markdown",
      description:
        "أنشئ وصمم جداول Markdown مجانًا. الصق بياناتك واحصل على كود الجدول فورًا.",
      seoTitle: "مولد جداول Markdown مجانًا أونلاين",
    },
  },
  {
    id: "fake-data",
    en: {
      name: "Fake Data Generator",
      description:
        "Generate realistic fake data (names, emails, addresses) for testing and development, free and instant.",
      seoTitle: "Free Fake Data Generator – Test Data for Developers",
    },
    ar: {
      name: "مولّد بيانات وهمية",
      description:
        "أنشئ بيانات وهمية واقعية (أسماء، إيميلات، عناوين) لأغراض الاختبار والتطوير مجانًا وفوريًا.",
      seoTitle: "مولد بيانات وهمية مجاني للمطورين",
    },
  },
  {
    id: "slugify",
    en: {
      name: "Slugify",
      description:
        "Convert any text into clean, SEO-friendly URL slugs instantly. Free slugify tool for developers and bloggers.",
      seoTitle: "Free Slug Generator – Convert Text to URL Slugs Online",
    },
    ar: {
      name: "مولّد الروابط اللطيفة",
      description:
        "حوّل أي نص إلى رابط URL نظيف ومناسب لمحركات البحث فورًا ومجانًا.",
      seoTitle: "مولد الرابط المختصر (Slug) مجانًا",
    },
  },
  {
    id: "book-me",
    en: {
      name: "Book Me",
      description:
        "A free, no-sign-up scheduling link — paint your weekly availability, set the meeting length with gaps and buffers, and share one link. People self-book an open slot without the email back-and-forth; you get a push, a Telegram DM and an email when they book.",
    },
    ar: {
      name: "احجز معي",
      description:
        "رابط جدولة مجاني بلا تسجيل — ارسم أوقات فراغك الأسبوعية، وحدِّد مدة الاجتماع بفواصل ومهل، وشارك رابطًا واحدًا. يحجز الناس وقتًا متاحًا دون تبادل رسائل، وتصلك إشعارات ورسالة تيليجرام وبريد عند الحجز.",
    },
  },
  {
    id: "cv-generator",
    en: {
      name: "CV Generator",
      description:
        "Upload your CV and get it rewritten into a clean, ATS-ready résumé — signal only, no noise. Photos, colours, GPAs and references stripped; skills and a punchy summary synthesised from your whole history. Export PDF or Word.",
      features: [
        "ATS-Optimized Formatting: Converts messy CVs into clean, parsable formats that pass automated screens.",
        "Noise Reduction: Automatically strips out unnecessary photos, colors, and irrelevant data to focus on what matters.",
        "Instant Export: Download your new CV as a professional PDF or editable Word document.",
        "100% Client-Side Processing: Your personal information and work history never leave your device.",
      ],
      howItWorks: [
        "Upload your existing CV or resume file directly in your browser.",
        "Our local processing engine analyzes and synthesizes your skills and work history.",
        "Review the newly generated, clean layout.",
        "Export as PDF or Word document instantly.",
      ],
      faq: [
        {
          q: "Is my data stored on your servers?",
          a: "No. All processing happens entirely within your web browser. We never see or store your CV data.",
        },
        {
          q: "What makes this CV ATS-ready?",
          a: "Applicant Tracking Systems (ATS) struggle with complex layouts, photos, and colors. Our generator strips these out and uses a standard, single-column text structure that software can parse accurately.",
        },
        {
          q: "Can I edit the generated CV?",
          a: "Yes! You can export it as a Word document (.docx) and make any adjustments you need before saving the final version.",
        },
      ],
    },
    ar: {
      name: "منشئ السيرة الذاتية",
      description:
        "ارفع سيرتك واحصل عليها معادةَ الكتابة في قالب نظيف متوافق مع أنظمة التتبّع — إشارة بلا ضجيج. تُزال الصور والألوان والمعدّلات والمراجع؛ وتُستخلص المهارات وملخّص موجز. صدّر PDF أو Word.",
      features: [
        "تنسيق متوافق مع أنظمة التتبع: يحول السير الذاتية الفوضوية إلى تنسيقات نظيفة تقرأها الأنظمة الآلية بنجاح.",
        "تقليل الضوضاء: يزيل تلقائياً الصور والألوان والبيانات غير الضرورية للتركيز على ما يهم.",
        "تصدير فوري: حمل سيرتك الجديدة كملف PDF احترافي أو مستند Word قابل للتعديل.",
        "معالجة محلية بالكامل: معلوماتك الشخصية وتاريخك المهني لا تغادر جهازك أبداً.",
      ],
      howItWorks: [
        "ارفع ملف سيرتك الذاتية الحالية مباشرة في متصفحك.",
        "يقوم محرك المعالجة المحلي لدينا بتحليل واستخلاص مهاراتك وتاريخك المهني.",
        "راجع التصميم الجديد والنظيف.",
        "قم بتصديره كملف PDF أو مستند Word فوراً.",
      ],
      faq: [
        {
          q: "هل يتم تخزين بياناتي على خوادمكم؟",
          a: "لا. كل المعالجة تتم بالكامل داخل متصفح الويب الخاص بك. نحن لا نرى أو نخزن بيانات سيرتك الذاتية أبداً.",
        },
        {
          q: "ما الذي يجعل هذه السيرة متوافقة مع أنظمة التتبع؟",
          a: "أنظمة تتبع المتقدمين (ATS) تواجه صعوبة مع التصاميم المعقدة والصور والألوان. يقوم منشئنا بإزالة هذه العناصر ويستخدم هيكل نصي قياسي بعمود واحد يمكن للبرامج قراءته بدقة.",
        },
        {
          q: "هل يمكنني تعديل السيرة الذاتية الناتجة؟",
          a: "نعم! يمكنك تصديرها كمستند Word (.docx) وإجراء أي تعديلات تحتاجها قبل حفظ النسخة النهائية.",
        },
      ],
    },
  },
  {
    id: "link-shortener",
    en: {
      name: "Link Shortener",
      description:
        "Shorten long URLs into short, trackable links for free. No sign-up needed. Fast, secure link shortener tool by Built In Saudi.",
      seoTitle: "Free Link Shortener – Shorten URLs Online Instantly",
    },
    ar: {
      name: "اختصار الروابط",
      description:
        "اختصر الروابط الطويلة إلى روابط قصيرة قابلة للتتبع مجانًا وبدون تسجيل. أداة اختصار روابط سريعة وآمنة.",
      seoTitle: "مختصر الروابط المجاني – اختصر الرابط أونلاين",
    },
  },
  {
    id: "color-tools",
    en: {
      name: "Color Picker & Palettes",
      description:
        "Pick colors, convert HEX/RGB/HSL, and generate palettes online for free, instantly for designers and developers.",
      seoTitle: "Free Color Tools – Picker, Converter & Palette Online",
    },
    ar: {
      name: "منتقي الألوان واللوحات",
      description:
        "اختر الألوان وحوّل بين HEX وRGB وHSL وأنشئ لوحات ألوان مجانًا وفوريًا.",
      seoTitle: "أدوات الألوان المجانية (منتقي، محول، لوحات)",
    },
  },
  {
    id: "invoice-generator",
    en: {
      name: "Invoice Generator",
      description:
        "Create professional invoices online for free with your logo and VAT details, instantly downloadable as PDF.",
      seoTitle: "Free Invoice Generator – Create Invoices Online",
    },
    ar: {
      name: "منشئ الفواتير",
      description:
        "أنشئ فواتير احترافية مجانًا بشعارك وتفاصيل الضريبة، وحمّلها كملف PDF فوريًا.",
      seoTitle: "مولد الفواتير المجاني أونلاين",
    },
  },
  {
    id: "pdf-split",
    en: {
      name: "Split PDF",
      description:
        "Split a PDF file into separate pages or documents online for free, instantly and securely.",
      seoTitle: "Free PDF Splitter – Split PDF Pages Online",
    },
    ar: {
      name: "تقسيم PDF",
      description:
        "قسّم ملف PDF إلى صفحات أو ملفات منفصلة مجانًا وبأمان فوريًا.",
      seoTitle: "أداة تقسيم ملفات PDF مجانًا أونلاين",
    },
  },
  {
    id: "pdf-merge",
    en: {
      name: "Merge PDF",
      description:
        "Merge multiple PDF files into one document online for free, instantly and securely, no sign-up required.",
      seoTitle: "Free PDF Merger – Combine Multiple PDF Files Online",
    },
    ar: {
      name: "دمج PDF",
      description:
        "ادمج عدة ملفات PDF في ملف واحد مجانًا وبأمان فوريًا بدون تسجيل.",
      seoTitle: "أداة دمج ملفات PDF مجانًا أونلاين",
    },
  },
  {
    id: "pdf-sign",
    en: {
      name: "Sign PDF",
      description:
        "Add your digital signature to any PDF document online for free, instantly and securely, no software needed.",
      seoTitle: "Free PDF Signer – Sign PDF Documents Online",
    },
    ar: {
      name: "توقيع PDF",
      description:
        "وقّع إلكترونيًا على أي ملف PDF مجانًا وبأمان فوريًا بدون برامج.",
      seoTitle: "أداة التوقيع على ملفات PDF مجانًا",
    },
  },
  {
    id: "pdf-fill",
    en: {
      name: "Fill PDF Form",
      description:
        "Fill out PDF forms online for free, instantly, then download or save. No software installation required.",
      seoTitle: "Free PDF Form Filler – Fill PDF Forms Online",
    },
    ar: {
      name: "تعبئة نموذج PDF",
      description:
        "املأ نماذج PDF مجانًا وفورًا ثم حمّلها أو احفظها بدون تثبيت برامج.",
      seoTitle: "أداة تعبئة نماذج PDF مجانًا أونلاين",
    },
  },
  {
    id: "pdf-edit",
    en: {
      name: "Edit PDF",
      description:
        "Edit text, images, and pages in any PDF document online for free, instantly and securely in your browser.",
      seoTitle: "Free PDF Editor – Edit PDF Text & Images Online",
    },
    ar: {
      name: "تحرير PDF",
      description:
        "حرر النصوص والصور والصفحات في أي ملف PDF مجانًا وبأمان مباشرة من المتصفح.",
      seoTitle: "أداة تحرير ملفات PDF مجانًا أونلاين",
    },
  },
  {
    id: "pdf-compress",
    en: {
      name: "Compress PDF",
      description:
        "Compress PDF files to reduce size online for free without losing quality, fast and secure, no sign-up.",
      seoTitle: "Free PDF Compressor – Reduce PDF File Size Online",
    },
    ar: {
      name: "ضغط PDF",
      description:
        "اضغط ملفات PDF لتقليل حجمها مجانًا دون فقدان الجودة بسرعة وأمان.",
      seoTitle: "أداة ضغط ملفات PDF مجانًا أونلاين",
    },
  },
  {
    id: "images-to-pdf",
    en: {
      name: "Images to PDF",
      description:
        "Convert and combine multiple images into a single PDF file online for free, instantly and securely.",
      seoTitle: "Free Images to PDF Converter – Combine Photos into PDF",
    },
    ar: {
      name: "الصور إلى PDF",
      description:
        "حوّل ودمج عدة صور في ملف PDF واحد مجانًا وبأمان فوريًا.",
      seoTitle: "تحويل الصور إلى PDF مجانًا أونلاين",
    },
  },
  {
    id: "image-cropper",
    en: {
      name: "Image Cropper",
      description:
        "Crop and resize images online for free, instantly. Simple, secure image cropping tool, no sign-up needed.",
      seoTitle: "Free Online Image Cropper – Crop Photos Instantly",
    },
    ar: {
      name: "أداة قص الصور",
      description:
        "قص وأعد تحجيم الصور مجانًا وفورًا بأداة بسيطة وآمنة بدون تسجيل.",
      seoTitle: "أداة قص الصور المجانية أونلاين",
    },
  },
  {
    id: "image-format-converter",
    en: {
      name: "Image Converter",
      description:
        "Convert images between JPG, PNG, WebP, and other formats online for free, instantly and securely.",
      seoTitle: "Free Image Format Converter – JPG, PNG, WebP Online",
    },
    ar: {
      name: "محوّل صيغ الصور",
      description:
        "حوّل الصور بين صيغ JPG وPNG وWebP وغيرها مجانًا وبأمان فوريًا.",
      seoTitle: "محول صيغ الصور مجانًا (JPG, PNG, WebP)",
    },
  },
  {
    id: "image-compressor",
    en: {
      name: "Image Compressor",
      description:
        "Compress JPG, PNG, and WebP images online for free without losing quality. Fast, secure image size reducer.",
      seoTitle: "Free Image Compressor – Reduce Image Size Online",
    },
    ar: {
      name: "ضاغط الصور",
      description:
        "اضغط صور JPG وPNG وWebP مجانًا دون فقدان الجودة، أداة سريعة وآمنة.",
      seoTitle: "أداة ضغط الصور المجانية أونلاين",
    },
  },
  {
    id: "qr-code",
    en: {
      name: "QR Code Generator",
      description:
        "Generate custom QR codes for links, text, or Wi-Fi online for free. Fast, downloadable QR code maker, no sign-up.",
      seoTitle: "Free QR Code Generator – Create QR Codes Online",
    },
    ar: {
      name: "مولّد الباركود",
      description:
        "أنشئ رموز QR مخصصة للروابط والنصوص والواي فاي مجانًا وحمّلها فورًا بدون تسجيل.",
      seoTitle: "مولد رمز QR المجاني أونلاين",
    },
  },
  {
    id: "password-generator",
    en: {
      name: "Password Generator",
      description:
        "Generate strong, random, secure passwords online for free. Customizable length and characters, instant and private.",
      seoTitle: "Free Strong Password Generator – Secure & Random",
    },
    ar: {
      name: "مولّد كلمات المرور",
      description:
        "أنشئ كلمات مرور قوية وعشوائية وآمنة مجانًا مع إمكانية تخصيص الطول والرموز.",
      seoTitle: "مولد كلمات المرور القوية مجانًا",
    },
  },
  {
    id: "prayer-times",
    en: {
      name: "Prayer Times",
      description:
        "Get accurate daily prayer times (Salah) for any city in Saudi Arabia and worldwide, free and updated instantly.",
      seoTitle: "Prayer Times Saudi Arabia – Accurate Salah Times Today",
    },
    ar: {
      name: "مواقيت الصلاة",
      description:
        "احصل على مواقيت الصلاة الدقيقة لليوم في أي مدينة بالسعودية والعالم مجانًا ومحدثة فوريًا.",
      seoTitle: "مواقيت الصلاة في السعودية اليوم بدقة",
    },
  },
  {
    id: "hijri-calendar",
    en: {
      name: "Hijri Calendar",
      description:
        "View the Hijri calendar and convert Hijri to Gregorian dates online for free, accurate and updated instantly.",
      seoTitle: "Hijri Calendar 2026 – Islamic Date Converter Online",
    },
    ar: {
      name: "التقويم الهجري",
      description:
        "اطلع على التقويم الهجري وحوّل التاريخ الهجري إلى ميلادي مجانًا وبدقة.",
      seoTitle: "التقويم الهجري 2026 وتحويل التاريخ أونلاين",
    },
  },
  {
    id: "tafqeet",
    en: {
      name: "Tafqeet (Number to Words)",
      description:
        "Convert numbers and amounts into written Arabic words (Tafqeet) online for free, instantly and accurately.",
      seoTitle: "Tafqeet – Convert Numbers to Arabic Words Free Online",
    },
    ar: {
      name: "التفقيط",
      description:
        "حوّل الأرقام والمبالغ إلى كتابة عربية (تفقيط) مجانًا وبدقة فورية.",
      seoTitle: "التفقيط – تحويل الأرقام إلى كلمات عربية مجانًا",
    },
  },
  {
    id: "iban-validator",
    en: {
      name: "IBAN Validator",
      description:
        "Validate any IBAN number online for free, instantly. Check Saudi and international IBAN format accuracy.",
      seoTitle: "Free IBAN Validator – Check IBAN Number Online",
    },
    ar: {
      name: "مدقّق الآيبان",
      description:
        "تحقق من صحة رقم الآيبان (IBAN) السعودي والدولي مجانًا وفوريًا.",
      seoTitle: "أداة التحقق من رقم الآيبان IBAN مجانًا",
    },
  },
  {
    id: "islamic-calendar",
    en: {
      name: "Islamic Calendar",
      description:
        "View the Islamic calendar with important Hijri dates and Islamic events for free, updated and accurate.",
      seoTitle: "Islamic Calendar 2026 – Hijri Events & Dates Online",
    },
    ar: {
      name: "التقويم الإسلامي",
      description:
        "اطلع على التقويم الإسلامي والمناسبات والتواريخ الهجرية المهمة مجانًا ومحدثة.",
      seoTitle: "التقويم الإسلامي 2026 والمناسبات الهجرية",
    },
  },
  {
    id: "hisn-al-muslim",
    en: {
      name: "Hisn al-Muslim",
      description:
        "Read Hisn Al-Muslim (Fortress of the Muslim) duas for daily life online for free, authentic and searchable.",
      seoTitle: "Hisn Al-Muslim Online – Fortress of the Muslim Duas",
    },
    ar: {
      name: "حصن المسلم",
      description:
        "اقرأ أدعية حصن المسلم كاملة مجانًا أونلاين، موثقة وقابلة للبحث.",
      seoTitle: "حصن المسلم أونلاين – الأدعية كاملة",
    },
  },
  {
    id: "adhkar",
    en: {
      name: "Morning & Evening Adhkar",
      description:
        "Read authentic morning and evening Adhkar (Islamic remembrances) online for free, with translation and audio.",
      seoTitle: "Adhkar – Morning & Evening Islamic Remembrances Free",
    },
    ar: {
      name: "أذكار الصباح والمساء",
      description:
        "اقرأ أذكار الصباح والمساء الصحيحة مجانًا مع الترجمة والصوت.",
      seoTitle: "أذكار الصباح والمساء كاملة مع الصوت",
    },
  },
  {
    id: "istikhara",
    en: {
      name: "Istikhara Du‘a",
      description:
        "Learn the correct way to perform Salat al-Istikhara with dua and steps, free guide updated with authentic sources.",
      seoTitle: "Istikhara Guide – How to Pray Salat al-Istikhara",
    },
    ar: {
      name: "دعاء الاستخارة",
      description:
        "تعلم الطريقة الصحيحة لأداء صلاة الاستخارة مع الدعاء والخطوات وفق مصادر موثوقة.",
      seoTitle: "دليل صلاة الاستخارة – الطريقة والدعاء",
    },
  },
  {
    id: "qibla",
    en: {
      name: "Qibla Locator",
      description:
        "Find the accurate Qibla direction from your exact location online for free, using GPS and compass, instant results.",
      seoTitle: "Qibla Direction Finder – Find Qibla from Your Location",
    },
    ar: {
      name: "اتجاه القبلة",
      description:
        "حدد اتجاه القبلة بدقة من موقعك الحالي مجانًا باستخدام GPS والبوصلة فوريًا.",
      seoTitle: "تحديد اتجاه القبلة من موقعك مجانًا",
    },
  },
  {
    id: "uuid-generator",
    en: {
      name: "UUID Generator",
      description:
        "Generate random UUID/GUID values (v1, v4) online for free, instantly. Bulk generation supported for developers.",
      seoTitle: "Free UUID Generator – Generate UUID/GUID Online",
    },
    ar: {
      name: "مولّد UUID",
      description:
        "أنشئ معرفات UUID/GUID عشوائية مجانًا وفورًا مع دعم التوليد الجماعي.",
      seoTitle: "مولد UUID/GUID مجانًا للمطورين",
    },
  },
  {
    id: "text-counter",
    en: {
      name: "Word Counter",
      description:
        "Count words, characters, sentences, and paragraphs in your text online for free, instantly and accurately.",
      seoTitle: "Free Word & Character Counter – Online Text Tool",
    },
    ar: {
      name: "عدّاد الكلمات والحروف",
      description:
        "احسب عدد الكلمات والأحرف والجمل والفقرات في نصك مجانًا وبدقة فورية.",
      seoTitle: "عداد الكلمات والأحرف المجاني أونلاين",
    },
  },
  {
    id: "detect-language",
    en: {
      name: "Language Detector",
      description:
        "Detect the language of any text online for free, instantly and accurately. Supports over 100 languages.",
      seoTitle: "Free Language Detector – Identify Text Language Online",
    },
    ar: {
      name: "كاشف اللغة",
      description:
        "اكتشف لغة أي نص مجانًا وبدقة فورية، مع دعم أكثر من 100 لغة.",
      seoTitle: "أداة كشف لغة النص مجانًا أونلاين",
    },
  },
  {
    id: "lorem-ipsum",
    en: {
      name: "Lorem Ipsum",
      description:
        "Generate Lorem Ipsum placeholder text online for free in words, sentences, or paragraphs, instantly.",
      seoTitle: "Free Lorem Ipsum Generator – Placeholder Text Online",
    },
    ar: {
      name: "نص بديل",
      description:
        "أنشئ نص Lorem Ipsum التجريبي مجانًا بالكلمات أو الجمل أو الفقرات فوريًا.",
      seoTitle: "مولد نص Lorem Ipsum التجريبي مجانًا",
    },
  },
  {
    id: "vat-calculator",
    en: {
      name: "VAT Calculator",
      description:
        "Calculate VAT (15%) for Saudi Arabia easily online for free. Add or remove VAT from any amount instantly.",
      seoTitle: "VAT Calculator Saudi Arabia – 15% Tax Calculator Free",
    },
    ar: {
      name: "حاسبة ضريبة القيمة المضافة",
      description:
        "احسب ضريبة القيمة المضافة 15% في السعودية بسهولة مجانًا، إضافة أو استخراج فوري.",
      seoTitle: "حاسبة ضريبة القيمة المضافة السعودية 15%",
    },
  },
  {
    id: "arabic-poetry",
    en: {
      name: "Arabic Poetry Meters",
      description:
        "Analyze Arabic poetry meter (Bahr) and rhyme online for free, instantly identify the poetic pattern.",
      seoTitle: "Arabic Poetry Analyzer – Meter & Rhyme Checker Free",
    },
    ar: {
      name: "بحور الشعر",
      description:
        "حلل بحر وقافية الشعر العربي مجانًا وحدد الوزن الشعري فوريًا.",
      seoTitle: "أداة تحليل الشعر العربي والبحور مجانًا",
    },
  },
  {
    id: "case-converter",
    en: {
      name: "Case Converter",
      description:
        "Convert text case to uppercase, lowercase, title case, or sentence case online for free, instantly.",
      seoTitle: "Free Case Converter – Change Text to Upper/Lower Case",
    },
    ar: {
      name: "محوّل حالة الأحرف",
      description:
        "حوّل حالة النص إلى أحرف كبيرة أو صغيرة أو حالة العنوان مجانًا وفورًا.",
      seoTitle: "أداة تحويل حالة الأحرف (كبيرة/صغيرة) مجانًا",
    },
  },
  {
    id: "line-breaks",
    en: {
      name: "Line Break Converter",
      description:
        "Remove or add line breaks in text online for free, instantly. Simple text formatting tool for writers.",
      seoTitle: "Free Line Break Remover & Adder – Text Formatter Online",
    },
    ar: {
      name: "محوّل فواصل الأسطر",
      description:
        "أزل أو أضف فواصل الأسطر في النص مجانًا وفورًا بأداة تنسيق بسيطة.",
      seoTitle: "أداة إزالة وإضافة فواصل الأسطر مجانًا",
    },
  },
  {
    id: "diacritize",
    en: {
      name: "Arabic Diacritizer",
      description:
        "Add Arabic diacritics (Tashkeel) to your text online for free, instantly and accurately using AI.",
      seoTitle: "Free Arabic Text Diacritizer – Add Tashkeel Online",
    },
    ar: {
      name: "مُشكِّل النصوص العربية",
      description:
        "أضف التشكيل إلى النصوص العربية مجانًا وفورًا وبدقة باستخدام الذكاء الاصطناعي.",
      seoTitle: "أداة تشكيل النصوص العربية مجانًا (تشكيل آلي)",
    },
  },
  {
    id: "arabic-verbs",
    en: {
      name: "Arabic Verb Conjugator",
      description:
        "Conjugate any Arabic verb across all tenses and pronouns online for free, instantly and accurately.",
      seoTitle: "Arabic Verb Conjugator – Free Conjugation Tool Online",
    },
    ar: {
      name: "مُصرِّف الأفعال العربية",
      description:
        "صرّف أي فعل عربي بجميع الأزمنة والضمائر مجانًا وبدقة فورية.",
      seoTitle: "مصرّف الأفعال العربية مجانًا أونلاين",
    },
  },
  {
    id: "paste-to-markdown",
    en: {
      name: "Paste Markdown",
      description:
        "Paste rich text or HTML and convert it to clean Markdown instantly, free and easy to use for writers.",
      seoTitle: "Free Paste to Markdown Converter – HTML to MD Online",
    },
    ar: {
      name: "لصق ماركداون",
      description:
        "الصق نصًا منسقًا أو HTML وحوّله إلى Markdown نظيف مجانًا وفورًا.",
      seoTitle: "أداة تحويل النص المنسوخ إلى Markdown مجانًا",
    },
  },
  {
    id: "hash-generator",
    en: {
      name: "Hash Generator",
      description:
        "Generate MD5, SHA1, SHA256, and other hash values from text or files online for free, instantly.",
      seoTitle: "Free Hash Generator – MD5, SHA1, SHA256 Online",
    },
    ar: {
      name: "مولّد البصمة (Hash)",
      description:
        "أنشئ قيم التجزئة MD5 وSHA1 وSHA256 من النص أو الملفات مجانًا وفورًا.",
      seoTitle: "مولد التجزئة Hash (MD5, SHA256) مجانًا",
    },
  },
  {
    id: "json-formatter",
    en: {
      name: "Code Formatter",
      description:
        "Format, validate, and beautify JSON data online for free, instantly. Detect errors and minify JSON too.",
      seoTitle: "Free JSON Formatter & Validator – Beautify JSON Online",
    },
    ar: {
      name: "منسّق الكود",
      description:
        "نسّق وتحقق من صحة بيانات JSON مجانًا وفورًا مع دعم الضغط أيضًا.",
      seoTitle: "أداة تنسيق والتحقق من JSON مجانًا",
    },
  },
  {
    id: "unit-converter",
    en: {
      name: "Unit Converter",
      description:
        "Convert units of length, weight, temperature, volume, and more online for free, instantly and accurately.",
      seoTitle: "Free Unit Converter – Length, Weight, Temperature Online",
    },
    ar: {
      name: "محوّل الوحدات",
      description:
        "حوّل وحدات الطول والوزن والحرارة والحجم وغيرها مجانًا وبدقة فورية.",
      seoTitle: "محول الوحدات المجاني (طول، وزن، حرارة)",
    },
  },
  {
    id: "base64",
    en: {
      name: "Base64 Convert",
      description:
        "Encode or decode Base64 text, images, and files online for free, instantly. Simple and secure Base64 converter.",
      seoTitle: "Free Base64 Encoder & Decoder – Online Tool",
    },
    ar: {
      name: "ترميز وفكّ Base64",
      description:
        "شفّر أو فك تشفير النصوص والصور والملفات بـ Base64 مجانًا وفورًا وبأمان.",
      seoTitle: "أداة ترميز وفك ترميز Base64 مجانًا",
    },
  },
  {
    id: "date-diff",
    en: {
      name: "Date Diff",
      description:
        "Calculate the exact number of days, months, or years between two dates online for free, instantly.",
      seoTitle: "Free Date Difference Calculator – Days Between Dates",
    },
    ar: {
      name: "الفرق بين تاريخين",
      description:
        "احسب عدد الأيام أو الأشهر أو السنوات بدقة بين تاريخين مجانًا وفوريًا.",
      seoTitle: "حاسبة الفرق بين تاريخين مجانًا",
    },
  },
  {
    id: "archive-inspector",
    en: {
      name: "Archive Inspector",
      description:
        "Inspect the contents of ZIP, RAR, and other archive files online for free without extracting or downloading.",
      seoTitle: "Free Archive Inspector – View ZIP/RAR Contents Online",
    },
    ar: {
      name: "فاحص الأرشيف",
      description:
        "افحص محتويات ملفات ZIP وRAR وغيرها مجانًا دون فك الضغط أو التحميل.",
      seoTitle: "أداة فحص محتويات الأرشيف ZIP/RAR مجانًا",
    },
  },
  {
    id: "file-metadata",
    en: {
      name: "File Metadata",
      description:
        "View and remove EXIF and metadata from images and files online for free, protecting your privacy instantly.",
      seoTitle: "Free File Metadata Viewer – Check EXIF & File Info",
    },
    ar: {
      name: "بيانات الملف",
      description:
        "اعرض واحذف بيانات EXIF والميتاداتا من الصور والملفات مجانًا لحماية خصوصيتك.",
      seoTitle: "أداة عرض بيانات الملف الوصفية (Metadata) مجانًا",
    },
  },
];