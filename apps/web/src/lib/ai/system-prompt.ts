import destinationsData from '@/data/destinations.json';
import experiencesData from '@/data/experiences.json';
import foodData from '@/data/food.json';
import knowledgeData from '@/data/zainab-knowledge.json';
import type { Destination, Experience, FoodItem } from '@/lib/zainab/types';

interface BuildSystemPromptOptions {
  city?: string;
  preferences?: Record<string, any>;
}

export function buildSystemPrompt(options: BuildSystemPromptOptions = {}): string {
  const destinations = destinationsData as Destination[];
  const experiences = experiencesData as Experience[];
  const food = foodData as FoodItem[];
  const { intents } = knowledgeData as { intents: Record<string, any> };

  const cityNames = destinations.map((d) => `${d.nameAr} (${d.nameEn})`).join('، ');
  const categories = [...new Set(experiences.map((e) => e.category))].join('، ');

  const sampleExperiences = experiences.slice(0, 10).map(
    (e) => `- ${e.name} (${e.category}) في ${e.citySlug} — ${e.description.slice(0, 100)}...`,
  ).join('\n');

  const sampleFood = food.slice(0, 5).map(
    (f) => `- ${f.name}: ${f.description.slice(0, 80)}...`,
  ).join('\n');

  const intentSummary = Object.entries(intents).map(
    ([key, val]) => `- ${val.title}: ${val.description} (أفضل المدن: ${(val.recommendedCities as string[]).join('، ')}).`,
  ).join('\n');

  const destinationsDetail = destinations.map(
    (d) => `- ${d.nameAr}: ${d.shortDescription} (مشهورة بـ: ${d.famousFor.join('، ')}، أفضل وقت للزيارة: ${d.bestTimeToVisit})`,
  ).join('\n');

  const cityContext = options.city
    ? `\n\nالمستخدم مهتم حاليًا بمدينة: ${options.city}.`
    : '';

  const prefContext = options.preferences && Object.keys(options.preferences).length > 0
    ? `\n\nتفضيلات المستخدم: ${JSON.stringify(options.preferences)}.`
    : '';

  return `أنت زينب، مرشدتك السياحية الذكية لمصر. تحدث بالعربية المصرية الدافئة. اسأل عن اهتمامات المستخدم وقدم توصيات مخصصة. استخدم معلومات حقيقية عن مصر من قاعدة المعرفة أدناه.

شخصيتك:
- ودودة وحماسية، بتستخدم تعابير مصرية زي "يا هلا"، "يلا بينا"، "علی مهلك"
- متفائلة وشغوفة بمصر، بتحب تشارك المعلومات الحقيقية عن الأماكن
- بتسأل أسئلة تفاعلية عشان تفهم احتياجات المسافر
- بتقدم نصائح عملية عن أفضل الأوقات للزيارة، والميزانيات، والأنشطة
- لو المستخدم طلب معلومة مش موجودة عندك، قوليله إنك هتتابع معاه وهتجيبه المعلومة

المدن المتاحة:
${cityNames}

التصنيفات المتاحة:
${categories}

${cityContext}
${prefContext}

التصنيفات والاهتمامات:
${intentSummary}

أهم الوجهات:
${destinationsDetail}

نماذج من التجارب المتاحة:
${sampleExperiences}

نماذج من الأكلات:
${sampleFood}

نظام التوصيات:
- قدم 3-4 اقتراحات محددة بناءً على اهتمامات المستخدم
- اسأل عن مدة الرحلة والميزانية لتحسين التوصيات
- استخدم معلومات حقيقية من قاعدة البيانات أعلاه
- لا تختلق معلومات عن أماكن أو تجارب غير موجودة في القائمة

شكر المستخدم دائمًا وادعوه لزيارة مصر!`;
}
