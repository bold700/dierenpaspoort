import type { Locale } from '../i18n/translations'
import { LEER_CONTENT } from './leerContent'

export type DierCategorie = 'zoogdier' | 'vogel' | 'reptiel' | 'insect' | 'water' | 'dinosaurus' | 'fantasie' | 'overig'

export interface LeerDierBase {
  id: string
  emoji: string
  categorie: DierCategorie
}

export interface LeerDier extends LeerDierBase {
  naam: string
  kort?: string
  beschrijving: string
  weetjes: string[]
}

type FactContext = {
  naam: string
  beschrijving: string
  categorie: DierCategorie
}

const CATEGORY_LABELS: Record<Locale, Record<DierCategorie, string>> = {
  nl: {
    zoogdier: 'zoogdieren',
    vogel: 'vogels',
    reptiel: 'reptielen',
    insect: 'insecten',
    water: 'waterdieren',
    dinosaurus: "dino's",
    fantasie: 'fantasiedieren',
    overig: 'dieren',
  },
  en: {
    zoogdier: 'mammals',
    vogel: 'birds',
    reptiel: 'reptiles',
    insect: 'insects',
    water: 'water animals',
    dinosaurus: 'dinosaurs',
    fantasie: 'fantasy creatures',
    overig: 'animals',
  },
  es: {
    zoogdier: 'mamíferos',
    vogel: 'aves',
    reptiel: 'reptiles',
    insect: 'insectos',
    water: 'animales acuáticos',
    dinosaurus: 'dinosaurios',
    fantasie: 'criaturas de fantasía',
    overig: 'animales',
  },
  zh: {
    zoogdier: '哺乳动物',
    vogel: '鸟类',
    reptiel: '爬行动物',
    insect: '昆虫',
    water: '水生动物',
    dinosaurus: '恐龙',
    fantasie: '幻想生物',
    overig: '动物',
  },
  fr: {
    zoogdier: 'mammifères',
    vogel: 'oiseaux',
    reptiel: 'reptiles',
    insect: 'insectes',
    water: 'animaux aquatiques',
    dinosaurus: 'dinosaures',
    fantasie: 'créatures fantastiques',
    overig: 'animaux',
  },
}

const EXTRA_FACT_BUILDERS: Record<Locale, Array<(ctx: FactContext, categoryLabel: string) => string>> = {
  nl: [
    (ctx, categoryLabel) => `${ctx.naam} hoort bij de categorie ${categoryLabel}.`,
    (ctx) => `Over ${ctx.naam} kun je steeds meer leren door vaker te luisteren.`,
    (ctx) => `Samengevat: ${ctx.beschrijving}`,
    (ctx) => `${ctx.naam} heeft eigen kenmerken die dit dier bijzonder maken.`,
    (ctx, categoryLabel) => `${ctx.naam} kun je vergelijken met andere ${categoryLabel}.`,
    (ctx) => `Gedrag, voeding en leefgebied maken ${ctx.naam} interessant om te bestuderen.`,
    (ctx) => `Als je op ${ctx.naam} tikt, hoor je telkens een nieuw weetje.`,
  ],
  en: [
    (ctx, categoryLabel) => `${ctx.naam} belongs to the ${categoryLabel} category.`,
    (ctx) => `You can learn more about ${ctx.naam} by listening again.`,
    (ctx) => `In short: ${ctx.beschrijving}`,
    (ctx) => `${ctx.naam} has unique traits that make this animal special.`,
    (ctx, categoryLabel) => `${ctx.naam} can be compared with other ${categoryLabel}.`,
    (ctx) => `Behavior, diet and habitat make ${ctx.naam} interesting to study.`,
    (ctx) => `Tap ${ctx.naam} again to hear another fun fact.`,
  ],
  es: [
    (ctx, categoryLabel) => `${ctx.naam} pertenece a la categoría de ${categoryLabel}.`,
    (ctx) => `Puedes aprender más sobre ${ctx.naam} si vuelves a escuchar.`,
    (ctx) => `En resumen: ${ctx.beschrijving}`,
    (ctx) => `${ctx.naam} tiene rasgos únicos que lo hacen especial.`,
    (ctx, categoryLabel) => `${ctx.naam} se puede comparar con otros ${categoryLabel}.`,
    (ctx) => `El comportamiento, la dieta y el hábitat hacen interesante a ${ctx.naam}.`,
    (ctx) => `Si tocas ${ctx.naam} otra vez, escucharás otra curiosidad.`,
  ],
  zh: [
    (ctx, categoryLabel) => `${ctx.naam}属于${categoryLabel}类别。`,
    (ctx) => `多听几次，你会更了解${ctx.naam}。`,
    (ctx) => `简要介绍：${ctx.beschrijving}`,
    (ctx) => `${ctx.naam}有自己独特的特点。`,
    (ctx, categoryLabel) => `${ctx.naam}可以和其他${categoryLabel}进行比较。`,
    (ctx) => `${ctx.naam}的行为、食物和栖息地都很值得学习。`,
    (ctx) => `再次点击${ctx.naam}，会听到新的小知识。`,
  ],
  fr: [
    (ctx, categoryLabel) => `${ctx.naam} appartient à la catégorie des ${categoryLabel}.`,
    (ctx) => `Tu peux en apprendre plus sur ${ctx.naam} en réécoutant.`,
    (ctx) => `En résumé : ${ctx.beschrijving}`,
    (ctx) => `${ctx.naam} a des caractéristiques uniques.`,
    (ctx, categoryLabel) => `${ctx.naam} peut être comparé à d'autres ${categoryLabel}.`,
    (ctx) => `Le comportement, l'alimentation et l'habitat rendent ${ctx.naam} fascinant.`,
    (ctx) => `Touche encore ${ctx.naam} pour entendre une autre info.`,
  ],
}

const MIN_FACTS_PER_ANIMAL = 10

function normalizeFacts(locale: Locale, context: FactContext, baseFacts: string[]): string[] {
  const categoryLabel = CATEGORY_LABELS[locale][context.categorie]
  const extraFacts = EXTRA_FACT_BUILDERS[locale].map((builder) => builder(context, categoryLabel))
  const allFacts = [...baseFacts, ...extraFacts]
  const uniqueFacts: string[] = []

  for (const rawFact of allFacts) {
    const fact = rawFact.trim()
    if (!fact || uniqueFacts.includes(fact)) continue
    uniqueFacts.push(fact)
  }

  while (uniqueFacts.length < MIN_FACTS_PER_ANIMAL) {
    switch (locale) {
      case 'nl':
        uniqueFacts.push(`Extra weetje ${uniqueFacts.length + 1} over ${context.naam}.`)
        break
      case 'en':
        uniqueFacts.push(`Extra fact ${uniqueFacts.length + 1} about ${context.naam}.`)
        break
      case 'es':
        uniqueFacts.push(`Dato extra ${uniqueFacts.length + 1} sobre ${context.naam}.`)
        break
      case 'zh':
        uniqueFacts.push(`关于${context.naam}的补充知识 ${uniqueFacts.length + 1}。`)
        break
      case 'fr':
        uniqueFacts.push(`Info en plus ${uniqueFacts.length + 1} sur ${context.naam}.`)
        break
      default:
        uniqueFacts.push(`${context.naam} fact ${uniqueFacts.length + 1}.`)
    }
  }

  return uniqueFacts
}

/** Lijst dieren (id, emoji, categorie). Tekst komt uit LEER_CONTENT[locale]. */
export const LEER_DIEREN: LeerDierBase[] = [
  { id: 'leeuw', emoji: '🦁', categorie: 'zoogdier' },
  { id: 'olifant', emoji: '🐘', categorie: 'zoogdier' },
  { id: 'giraffe', emoji: '🦒', categorie: 'zoogdier' },
  { id: 'panda', emoji: '🐼', categorie: 'zoogdier' },
  { id: 'dolfijn', emoji: '🐬', categorie: 'zoogdier' },
  { id: 'tijger', emoji: '🐯', categorie: 'zoogdier' },
  { id: 'wolf', emoji: '🐺', categorie: 'zoogdier' },
  { id: 'aap', emoji: '🐵', categorie: 'zoogdier' },
  { id: 'koala', emoji: '🐨', categorie: 'zoogdier' },
  { id: 'nijlpaard', emoji: '🦛', categorie: 'zoogdier' },
  { id: 'zebra', emoji: '🦓', categorie: 'zoogdier' },
  { id: 'eekhoorn', emoji: '🐿️', categorie: 'zoogdier' },
  { id: 'konijn', emoji: '🐰', categorie: 'zoogdier' },
  { id: 'egel', emoji: '🦔', categorie: 'zoogdier' },
  { id: 'uil', emoji: '🦉', categorie: 'vogel' },
  { id: 'pauw', emoji: '🦚', categorie: 'vogel' },
  { id: 'pinguin', emoji: '🐧', categorie: 'vogel' },
  { id: 'flamingo', emoji: '🦩', categorie: 'vogel' },
  { id: 'kolibrie', emoji: '🐦', categorie: 'vogel' },
  { id: 'specht', emoji: '🐦', categorie: 'vogel' },
  { id: 'krokodil', emoji: '🐊', categorie: 'reptiel' },
  { id: 'slang', emoji: '🐍', categorie: 'reptiel' },
  { id: 'schildpad', emoji: '🐢', categorie: 'reptiel' },
  { id: 'kameleon', emoji: '🦎', categorie: 'reptiel' },
  { id: 'bij', emoji: '🐝', categorie: 'insect' },
  { id: 'vlinder', emoji: '🦋', categorie: 'insect' },
  { id: 'mier', emoji: '🐜', categorie: 'insect' },
  { id: 'libel', emoji: '🪲', categorie: 'insect' },
  { id: 'haai', emoji: '🦈', categorie: 'water' },
  { id: 'octopus', emoji: '🐙', categorie: 'water' },
  { id: 'zeehond', emoji: '🦭', categorie: 'water' },
  { id: 'walvis', emoji: '🐋', categorie: 'water' },
  { id: 'zeearend', emoji: '🦅', categorie: 'vogel' },
  { id: 'neushoorn', emoji: '🦏', categorie: 'zoogdier' },
  { id: 'kangoeroe', emoji: '🦘', categorie: 'zoogdier' },
  { id: 'luiaard', emoji: '🦥', categorie: 'zoogdier' },
  { id: 'trex', emoji: '🦖', categorie: 'dinosaurus' },
  { id: 'triceratops', emoji: '🦕', categorie: 'dinosaurus' },
  { id: 'brachiosaurus', emoji: '🦕', categorie: 'dinosaurus' },
  { id: 'stegosaurus', emoji: '🦕', categorie: 'dinosaurus' },
  { id: 'pteranodon', emoji: '🦅', categorie: 'dinosaurus' },
  { id: 'velociraptor', emoji: '🦖', categorie: 'dinosaurus' },
  { id: 'draak', emoji: '🐉', categorie: 'fantasie' },
  { id: 'eenhoorn', emoji: '🦄', categorie: 'fantasie' },
  { id: 'feniks', emoji: '🔥', categorie: 'fantasie' },
]

export function getLeerDierenWithLocale(locale: Locale): LeerDier[] {
  const content = LEER_CONTENT[locale] ?? LEER_CONTENT.nl
  return LEER_DIEREN.map((base) => {
    const c = content[base.id] ?? (LEER_CONTENT.nl[base.id] as (typeof content)[string])
    if (!c) return null
    return {
      ...base,
      ...c,
      weetjes: normalizeFacts(
        locale,
        { naam: c.naam, beschrijving: c.beschrijving, categorie: base.categorie },
        c.weetjes
      ),
    } as LeerDier
  }).filter(Boolean) as LeerDier[]
}
