import type { Intent, ChatMessage, SessionMemory, Recommendations, TripPlan } from './types';
import { detectIntent, intentToKnowledgeKey } from './intentResolver';
import {
  getRecommendationsByIntent,
  getRecommendationsByCity,
  getDefaultRecommendations,
  combineRecommendationsWithMemory,
  getAdviceForIntent,
} from './recommendationEngine';
import { planTrip } from './tripPlanner';
import { getSuggestionsForCity } from './suggestionEngine';

import destinationsData from '@/data/destinations.json';
import type { Destination } from './types';

const destinations: Destination[] = destinationsData as Destination[];

let _store: any = null;
function getStore() {
  if (!_store) {
    try { _store = require('@/lib/store').useAppStore; } catch {}
  }
  return _store;
}

function rememberPreference(key: string, value: any) {
  const store = getStore();
  if (store) {
    const state = store.getState();
    const current = state.aiMemory || {};
    if (JSON.stringify(current[key]) !== JSON.stringify(value)) {
      store.getState().setAiMemory(key, value);
    }
  }
}

function recallPreference(key: string): any {
  const store = getStore();
  if (store) {
    const state = store.getState();
    return state.aiMemory?.[key];
  }
  return null;
}

function loadTravelDna() {
  const store = getStore();
  if (store) {
    const state = store.getState();
    return state.travelDna || {};
  }
  return {};
}

function extractPreferences(text: string): Record<string, any> {
  const prefs: Record<string, any> = {};
  const lower = text.toLowerCase();

  if (/استرخا|راحة|هدو|spa|yoga|تأمل|peace|relax/.test(lower)) prefs.intent = 'relaxation';
  else if (/مغامر|إثارة|adventure|safari|desert|تحدي/.test(lower)) prefs.intent = 'adventure';
  else if (/ثقاف|تاريخ|متحف|culture|museum|history|معبد|فرعون/.test(lower)) prefs.intent = 'culture';
  else if (/أكل|طعام|مطعم|food|اكل|مأكولات/.test(lower)) prefs.intent = 'food';
  else if (/فخام|luxury|خمس.*نجوم|منتجع/.test(lower)) prefs.intent = 'luxury';
  else if (/عائل|أسرة|أطفال|family|kids/.test(lower)) prefs.intent = 'family';
  else if (/غوص|diving|غطس|snorkel|شعاب|مرجان/.test(lower)) prefs.intent = 'diving';

  const durationMatch = lower.match(/(\d+)\s*(أيام|يوم|ايام|days?)/i);
  if (durationMatch) prefs.tripDuration = parseInt(durationMatch[1]);

  if (/اقتصادي|budget|رخيص|أرخص/.test(lower)) prefs.budget = 'budget';
  else if (/فاخر|luxury|غالي/.test(lower)) prefs.budget = 'luxury';
  else if (/متوسط|mid/.test(lower)) prefs.budget = 'mid-range';

  if (/سريع|مزدحم|busy|packed|full/.test(lower)) prefs.pace = 'fast';
  else if (/هادئ|relax|slow|بطيء/.test(lower)) prefs.pace = 'slow';

  return prefs;
}

const WELCOME_MESSAGE: string = `أهلاً بيك في مصر يا صديقي 🇪🇬

أنا زينب، مرشدتك السياحية الذكية. أقدر أساعدك تكتشف مصر بطريقة مختلفة — من شواطئ البحر الأحمر لمعابد الأقصر، ومن سحر سيوة لصخب القاهرة.

قولي إيه اللي في بالك ⬇️`;

const GREETING_RESPONSES: string[] = [
  'أهلاً بيك! نورت مصر هب ❤️. قولي عاوز تشوف إيه في مصر النهاردة؟',
  'مرحباً! أنا زينب، تحت أمرك. عاوز تخطط لرحلة ولا عاوز اقتراحات لوجهات معينة؟',
  'يا هلا! أنا هنا عشان أساعدك تكتشف مصر. أخبرني إيه اللي نفسك فيه؟',
];

const INTENT_GREETINGS: Record<string, string> = {
  relaxation: 'آه … رايق أنت! يلا نختارلك أحلى وجهة للاسترخاء.',
  adventure: 'يا سلام على الحماس! تعال نخطط لمغامرة جامدة جداً.',
  culture: 'أهلاً بعاشق التاريخ! فين نبدأ رحلتنا في الزمن الجميل؟',
  food: 'ياخبر أبيض، تعالى ناكل! أنا عارفة أحسن الأماكن.',
  luxury: 'فخامة ورقي، ده Style يستاهل. خليني أوريك أرقى الوجهات.',
  family: 'أهلاً بيكوا يا أحلى عيلة! عندي أماكن تناسب الكل.',
  honeymoon: 'مبروك يا أحلى عروسين! عندي أماكن رومانسية هتعجبكوا.',
  diving: 'غواص ولا أشطر! تحت الماء في مصر عالم تاني خالص.',
  photography: 'مصور فنان! عندي أماكن التصوير اللي هتجننك.',
  'digital-nomad': 'ترحالة رقمي! عندي أحسن الأماكن اللي فيها نت سريع وجو جميل.',
  history: 'عاشق تاريخ مثلي! هوريك عظمة المصريين القدماء.',
};

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function extractCity(text: string): string | null {
  const cityMap: Record<string, string> = {
    'القاهرة': 'cairo', 'cairo': 'cairo',
    'الإسكندرية': 'alexandria', 'الاسكندرية': 'alexandria', 'alexandria': 'alexandria',
    'الأقصر': 'luxor', 'الاقصر': 'luxor', 'luxor': 'luxor',
    'أسوان': 'aswan', 'aswan': 'aswan',
    'شرم الشيخ': 'sharm-el-sheikh', 'شرم': 'sharm-el-sheikh', 'sharm': 'sharm-el-sheikh',
    'الغردقة': 'hurghada', 'hurghada': 'hurghada',
    'دهب': 'dahab', 'dahab': 'dahab',
    'سيوة': 'siwa', 'siwa': 'siwa',
  };

  const lower = text.toLowerCase();
  for (const [key, slug] of Object.entries(cityMap)) {
    if (lower.includes(key)) return slug;
  }
  return null;
}

function extractDays(text: string): number | null {
  const patterns = [
    /(\d+)\s*(أيام|يوم|ايام)/i,
    /(\d+)\s*days?/i,
    /يوم\s*واحد|واحد\s*يوم/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const num = parseInt(match[1] || '1', 10);
      if (num >= 1 && num <= 30) return num;
      return 3;
    }
  }
  if (text.includes('رحلة') || text.includes('itinerary') || text.includes('خطط')) return 3;
  return null;
}

function buildContextualResponse(
  intent: Intent,
  message: string,
  memory: SessionMemory,
): { text: string; recommendations?: Recommendations; tripPlan?: TripPlan } {
  const city = extractCity(message);
  const days = extractDays(message);
  const preferences = extractPreferences(message);
  const travelDna = loadTravelDna();

  if (Object.keys(preferences).length > 0) {
    rememberPreference('lastPreferences', preferences);
  }

  const budgetFromStore = travelDna.budget || recallPreference('budget');
  const travelerTypeFromStore = travelDna.travelerType || recallPreference('travelerType');

  if (city && days) {
    const tripPlan = planTrip(city, days, {
      budget: budgetFromStore,
      travelerType: travelerTypeFromStore,
      preferences,
    });
    if (tripPlan) {
      rememberPreference('lastCity', city);
      rememberPreference('tripDuration', days);
      return {
        text: `جميل! خليني أرتبلك برنامج كامل لـ ${tripPlan.city.nameAr} لمدة ${days} أيام 🎯`,
        recommendations: {
          destinations: [tripPlan.city],
          experiences: tripPlan.days.flatMap(d => d.experiences),
          food: [],
          stories: [],
        },
        tripPlan,
      };
    }
  }

  if (city && intent === 'trip-planning') {
    const recs = getRecommendationsByCity(city, { budget: budgetFromStore, travelerType: travelerTypeFromStore });
    const dest = recs.destinations[0];
    memory.preferredCity = city;
    rememberPreference('lastCity', city);
    return {
      text: `${dest?.nameAr || 'هذه'} مدينة رائعة! عندي كذا اقتراح لتجارب هناك 👇`,
      recommendations: recs,
    };
  }

  if (city) {
    const recs = getRecommendationsByCity(city, { budget: budgetFromStore, travelerType: travelerTypeFromStore });
    const dest = recs.destinations[0];
    memory.preferredCity = city;
    memory.mentionedCities.push(city);
    rememberPreference('lastCity', city);
    return {
      text: `أهلاً بيك في ${dest?.nameAr || city}! 🎉 مدينة مليانة حكايات وتجارب. ده بعض اللي أقترحه عليك 👇`,
      recommendations: recs,
    };
  }

  if (days) {
    const targetCity = memory.preferredCity || recallPreference('lastCity') || 'cairo';
    const tripPlan = planTrip(targetCity, days, {
      budget: budgetFromStore,
      travelerType: travelerTypeFromStore,
      preferences,
    });
    if (tripPlan) {
      rememberPreference('tripDuration', days);
      return {
        text: `خلاص كده! هخططلك ${days} أيام في ${tripPlan.city.nameAr} 👇`,
        tripPlan,
      };
    }
  }

  if (intent === 'greeting') {
    const pastCity = recallPreference('lastCity');
    if (pastCity) {
      return { text: `أهلاً بيك تاني! لسه مهتم بـ ${pastCity}؟ ولا عاوز حاجة جديدة النهاردة؟` };
    }
    return { text: pickRandom(GREETING_RESPONSES) };
  }

  if (intent === 'general' && memory.knownIntents.length === 0) {
    const pastPrefs = recallPreference('lastPreferences');
    if (pastPrefs?.intent) {
      const recs = getRecommendationsByIntent(pastPrefs.intent, memory);
      return {
        text: `أهلاً بيك تاني! أتذكر إنك كنت مهتم بـ ${INTENT_GREETINGS[pastPrefs.intent as Intent] || 'رحلات في مصر'}. عاوز تكمل ولا تجرب حاجة جديدة؟`,
        recommendations: recs,
      };
    }
    return {
      text: 'أنا في خدمتك! ممكن أساعدك في:\n🌴 وجهات ومغامرات\n🏛️ تاريخ وثقافة\n🍽️ أكل ومطاعم\n🛏️ فخامة واستجمام\n\nقولي عاوز إيه بالضبط.',
      recommendations: getDefaultRecommendations(),
    };
  }

  const advice = getAdviceForIntent(intent);
  const greeting = INTENT_GREETINGS[intent];
  const enhancedRecs = memory.knownIntents.length > 0
    ? combineRecommendationsWithMemory(intent, memory, { budget: budgetFromStore, travelerType: travelerTypeFromStore })
    : getRecommendationsByIntent(intent, memory, { budget: budgetFromStore, travelerType: travelerTypeFromStore });

  if (!memory.knownIntents.includes(intent)) {
    memory.knownIntents.push(intent);
  }

  if (preferences.intent) {
    rememberPreference('lastIntent', preferences.intent);
  }

  return {
    text: [greeting, advice].filter(Boolean).join('\n\n'),
    recommendations: enhancedRecs,
  };
}

export function generateResponse(
  message: string,
  history: ChatMessage[],
  memory: SessionMemory,
): { text: string; recommendations?: Recommendations; tripPlan?: TripPlan } {
  const { primary, secondary } = detectIntent(message);

  if (message === '/start' || history.length === 0) {
    return {
      text: WELCOME_MESSAGE,
      recommendations: getDefaultRecommendations(),
    };
  }

  const isGoodbye = /(مع السلامة|باي|bye|شكراً|شكرا|thanks|thank you|القاء|再见)/i.test(message);
  if (isGoodbye) {
    return {
      text: 'كان معاكي وقت حلو يا صديقي! 😊 لو احتجت حاجة تاني، أنا هنا. مصر هب دايماً في خدمتك. مع السلامة! 🌴✨',
    };
  }

  if (memory.preferredCity && !extractCity(message) && primary === 'general') {
    const city = memory.preferredCity;
    const suggestions = getSuggestionsForCity(city);
    return {
      text: `لسه مهتم بـ ${suggestions.cityName}؟ عندي كمان اقتراحات تانية حلوة 👇`,
      recommendations: {
        destinations: suggestions.relatedDestinations,
        experiences: suggestions.experiences.slice(0, 4),
        food: suggestions.food.slice(0, 3),
        stories: suggestions.stories.slice(0, 3),
      },
    };
  }

  return buildContextualResponse(primary, message, memory);
}

export function createSessionMemory(): SessionMemory {
  return {
    preferredActivities: [],
    knownIntents: [],
    mentionedCities: [],
  };
}
