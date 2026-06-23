import type { Intent } from './types';

const INTENT_PATTERNS: Record<Intent, RegExp[]> = {
  relaxation: [
    /استرخا|راحة|هدو[ءؤ]|سكينة|spa|سپا|مساج|يوجا|تأمل|سلام|nile.*غروب|شاطئ|بحر| beach/i,
    /quiet|peace|relax|calm|chill|zen|meditation|yoga/i,
  ],
  adventure: [
    /مغامر|إثارة|تحدي|أدرينالين|سفاري|صحرا|كواد|غوص|سنوركل|تريك|هايكنج|تسلق|قفز/i,
    /adventure|thrill|challenge|safari|desert|hiking|trekking|climb|quad|buggy/i,
  ],
  culture: [
    /ثقاف|تراث|متحف|متاحف|فن|حرفة|سوق|خان|تاريخي|بلدي|شعبي|عادات|تقاليد|مهرجان/i,
    /culture|cultural|museum|heritage|art|craft|bazaar|souq|traditional/i,
  ],
  food: [
    /أكل|طعام|مأكولات|مطعم|مطاعم|كشري|سمك|فول|طعمية|نوبي|بحري|سوق.*أكل/i,
    /food|eat|restaurant|cuisine|dining|dinner|lunch|breakfast|taste|flavor|street food/i,
  ],
  luxury: [
    /فخام|رفاهي|خمس.*نجوم|lobby|منتجع|سبا|يخت|خاص|فاخر|VIP|فندق.*فخم/i,
    /luxury|luxurious|five.?star|resort|premium|exclusive|private|butler/i,
  ],
  family: [
    /عائل|أسرة|أطفال|عيال|ولاد|kids|family|children|kid.?friendly|لعبة|ملاهي/i,
    /family|kids|children|child|parent/i,
  ],
  honeymoon: [
    /شهر.*عسل|رومانس|عروسين|honeymoon|romantic|couple|زوجين|حبيبي/i,
    /honeymoon|romantic|couple|newlywed|love/i,
  ],
  diving: [
    /غوص|غطس|سنوركل|بلوهول|شعاب.*مرجان| reef|dive|diving|snorkel|underwater/i,
    /diving|dive|scuba|snorkeling|reef|coral/i,
  ],
  photography: [
    /تصوير|كاميرا|عدسة|فوتوغرافي|photo|photography|صور|منظر|بانوراما|sunset|sunrise/i,
    /photography|photo|camera|landscape|sunset|sunrise|golden.?hour/i,
  ],
  'digital-nomad': [
    /رقمي|عن.?بعد|remote|work|شغل|إنترنت|واي.?فاي|co.?work|مساحة.*عمل/i,
    /digital.?nomad|remote.?work|coworking|wifi|internet|laptop|work.?from/i,
  ],
  history: [
    /تاريخ|فرعون|معبد|آثار|مومياء|هرم|أبو.?الهول|متحف|حضارة|فراعنة|مقبرة|تمثال/i,
    /history|ancient|pharaoh|pyramid|temple|tomb|valley.*kings|egyptian.*museum/i,
  ],
  greeting: [
    /^(السلام|أهلا|مرحبا|صباح|مساء|hi|hello|hey|howdy|يا.*هلا)/i,
    /^(مرحبا|أهلاً|هلا|hello|hi|hey|good morning|good evening)/i,
  ],
  destination: [
    /القاهرة|الإسكندرية|الأقصر|أسوان|شرم.*الشيخ|الغردقة|دهب|سيوة|cairo|alexandria|luxor|aswan|sharm|hurghada|dahab|siwa/i,
  ],
  'trip-planning': [
    /خطط|برنامج|رحلة| itinerary|trip.*plan|جدول|أيام|يومين|3.*أيام|5.*أيام|أسبوع|مدة/i,
    /plan|itinerary|schedule|trip|tour|day.*trip|route/i,
  ],
  general: [],
};

export function detectIntent(message: string): { primary: Intent; secondary: Intent[] } {
  const normalized = message.trim();
  const matches: { intent: Intent; score: number }[] = [];

  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    if (intent === 'general') continue;
    let score = 0;
    for (const pattern of patterns) {
      if (pattern.test(normalized)) {
        score += 1;
      }
    }
    if (score > 0) {
      matches.push({ intent: intent as Intent, score });
    }
  }

  matches.sort((a, b) => b.score - a.score);

  const primary = matches.length > 0 ? matches[0].intent : 'general';
  const secondary = matches.slice(1, 3).map(m => m.intent);

  return { primary, secondary };
}

export function intentToKnowledgeKey(intent: Intent): string {
  const mapping: Record<string, string> = {
    relaxation: 'relaxation',
    adventure: 'adventure',
    culture: 'culture',
    food: 'food',
    luxury: 'luxury',
    family: 'family',
    honeymoon: 'honeymoon',
    diving: 'diving',
    photography: 'photography',
    'digital-nomad': 'digital-nomad',
    history: 'culture',
  };
  return mapping[intent] || 'culture';
}
