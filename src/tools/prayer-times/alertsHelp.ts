// Platform-specific instructions for turning on notifications, shown only when
// enabling push fails (blocked/unsupported). Keep noise away unless needed.
export interface AlertsHelp { title: string; steps: string[] }

export function alertsHelp(locale: 'en' | 'ar'): AlertsHelp {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : ''
  const isIOS = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && typeof document !== 'undefined' && 'ontouchend' in document)
  const isAndroid = /Android/.test(ua)
  const isEdge = /Edg\//.test(ua)
  const isFirefox = /Firefox\//.test(ua)

  const EN: Record<string, AlertsHelp> = {
    ios: { title: 'Turn on alerts — iPhone / iPad', steps: [
      'Tap the Share button in Safari',
      'Choose “Add to Home Screen”, then Add',
      'Open Built in Saudi from your Home Screen',
      'Tap “Enable alerts” again, then Allow',
    ] },
    android: { title: 'Turn on alerts — Android', steps: [
      'Open the ⋮ menu → Settings → Notifications',
      'Set “How to show requests” to “Expand all requests” (the browser may be quietly hiding the prompt)',
      'If built-in-saudi.com is under “Not allowed”, tap it → “Allow”',
      'Reload the page, tap “Enable alerts”, then “Allow” on the prompt',
    ] },
    edge: { title: 'Turn on alerts — Edge', steps: [
      'Open ⋮ → Settings → Notifications',
      'Set “How to show requests” to “Expand all requests” (Edge quietly hides some prompts → “default”)',
      'If built-in-saudi.com is under “Not allowed”, tap it → “Allow”',
      'Reload the page, tap “Enable alerts”, then “Allow” on the prompt',
    ] },
    firefox: { title: 'Turn on alerts — Firefox', steps: [
      'Click the lock icon in the address bar',
      'Clear the blocked Notifications permission',
      'Reload the page, then tap “Enable alerts”',
    ] },
    other: { title: 'Turn on alerts', steps: [
      'Click the lock (or tune) icon left of the address bar',
      'Set Notifications to Allow',
      'Reload the page, then tap “Enable alerts”',
    ] },
  }
  const AR: Record<string, AlertsHelp> = {
    ios: { title: 'تفعيل التنبيهات — آيفون / آيباد', steps: [
      'اضغط زر المشاركة في Safari',
      'اختر «إضافة إلى الشاشة الرئيسية» ثم إضافة',
      'افتح «بُنِيَ في السعودية» من الشاشة الرئيسية',
      'اضغط «تفعيل التنبيهات» مرة أخرى ثم اسمح',
    ] },
    android: { title: 'تفعيل التنبيهات — أندرويد', steps: [
      'افتح قائمة ⋮ ← الإعدادات ← الإشعارات',
      'اجعل «طريقة عرض الطلبات» على «توسيع كل الطلبات» (قد يُخفي المتصفح الطلب بهدوء)',
      'إذا كان built-in-saudi.com ضمن «غير مسموح» فاضغط عليه ← «السماح»',
      'أعد تحميل الصفحة واضغط «تفعيل التنبيهات» ثم «السماح» في النافذة',
    ] },
    edge: { title: 'تفعيل التنبيهات — Edge', steps: [
      'افتح ⋮ ← الإعدادات ← الإشعارات',
      'اجعل «طريقة عرض الطلبات» على «توسيع كل الطلبات» (يُخفي Edge بعض الطلبات فتظهر النتيجة default)',
      'إذا كان built-in-saudi.com ضمن «غير مسموح» فاضغط عليه ← «السماح»',
      'أعد تحميل الصفحة واضغط «تفعيل التنبيهات» ثم «السماح» في النافذة',
    ] },
    firefox: { title: 'تفعيل التنبيهات — Firefox', steps: [
      'اضغط رمز القفل في شريط العنوان',
      'أزل حظر إذن الإشعارات',
      'أعد تحميل الصفحة ثم اضغط «تفعيل التنبيهات»',
    ] },
    other: { title: 'تفعيل التنبيهات', steps: [
      'اضغط رمز القفل يسار شريط العنوان',
      'اجعل الإشعارات على «السماح»',
      'أعد تحميل الصفحة ثم اضغط «تفعيل التنبيهات»',
    ] },
  }

  const table = locale === 'ar' ? AR : EN
  const key = isIOS ? 'ios' : isAndroid ? 'android' : isEdge ? 'edge' : isFirefox ? 'firefox' : 'other'
  return table[key]
}
