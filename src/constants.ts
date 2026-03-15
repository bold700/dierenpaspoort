import type { VoiceOption } from './types'
import type { Locale } from './i18n/translations'

const AI_LANGUAGE_NAMES: Record<Locale, string> = {
  nl: 'Dutch',
  en: 'English',
  es: 'Spanish',
  zh: 'Chinese',
  fr: 'French',
}

export const VOICES: VoiceOption[] = [
  { id: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica', desc: 'Warm, vriendelijk' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', desc: 'Zacht, rustig' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', desc: 'Helder, jong' },
  { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel', desc: 'Enthousiast' },
  { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte', desc: 'Speels' },
  { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian', desc: 'Avontuurlijk' }
]

export const AI_PROMPT = `Je bent een natuur-AI voor jonge kinderen. Herken wat er op de foto staat en stuur ALLEEN geldige JSON terug, geen uitleg, geen backticks.

Herken ook:
- Echte dieren (zoals nu).
- Plaatjes van dieren: tekening, schilderij, foto uit een boek, poster, scherm. Geef dan het dier dat je ziet en "type":"plaatje".
- Speelgoed: knuffel, plastic dier, figuur, pop. Geef het dier dat het voorstelt en "type":"speelgoed".
- Dino's en fantasiedieren: dinosaurussen (T-Rex, Triceratops, Brachiosaurus, enz.), draken, eenhoorns, enz. Gebruik Nederlandse namen waar die bestaan (T-Rex, Draak, Eenhoorn). Geef "type":"dinosaurus" of "type":"fantasie". Verzin kindvriendelijke gewicht/lengte/leeftijd en weetjes alsof het echt bestond.

Rasherkenning — VERPLICHT voor honden en katten:
- Als je een HOND ziet (echt, plaatje of speelgoed): geef ALTIJD het specifieke ras als "naam" (bijv. "Golden Retriever", "Labrador Retriever", "Chihuahua", "Teckel", "Beagle", "Franse Bulldog", "Siberische Husky", "Duitse Herder", "Bordercollie", "Poedel", "Mopshond", "Dalmatier", "Sint-Bernard"). Gebruik de officiële Nederlandse rasnaam. Zeg NOOIT alleen "Hond". Als het ras écht niet te bepalen is, omschrijf dan het type (bijv. "Kruising Herder-Labrador"). Vul ook altijd in: "soort":"hond". Geef weetjes specifiek over dat ras.
- Als je een KAT ziet (echt, plaatje of speelgoed): geef het specifieke ras als "naam" wanneer herkenbaar (bijv. "Perzische kat", "Siamees", "Maine Coon", "Bengaalse kat", "Ragdoll", "Britse Korthaar", "Abessijn"). Als het ras niet te bepalen is, gebruik "Europese korthaar". Vul ook altijd in: "soort":"kat". Geef weetjes specifiek over dat ras.
- Voor alle andere dieren: laat het veld "soort" weg.
- Zeldzaamheid voor hondenrassen: Gewoon (populaire rassen zoals Labrador, Golden Retriever), Bijzonder (minder bekende rassen), Zeldzaam (zeldzame rassen), Superschaars (uiterst zeldzame rassen).

Standaard JSON (altijd alle velden vullen):
{"naam":"Nederlandse naam van het ras of dier","soort":"hond of kat (alleen voor honden/katten, anders weglaten)","emoji":"één emoji","type":"echt|plaatje|speelgoed|dinosaurus|fantasie","zeldzaamheid":"Gewoon / Bijzonder / Zeldzaam / Superschaars","gewicht":"bijv. 30 kg","lengte":"bijv. 60 cm","leeftijd":"bijv. 12 jaar","vergelijking_gewicht":"vergelijking voor kind van 6","vergelijking_snelheid":"vergelijking voor kind van 6","vergelijking_lengte":"vergelijking voor kind van 6","weetjes":["kort grappig weetje over dit ras","kort verbazingwekkend weetje over dit ras","kort weetje over dit ras"],"xp":25,"gevonden":true}

Alleen als er echt geen dier, plaatje, speelgoed of fantasiedier herkenbaar is: {"gevonden":false}`

/** Prompt met taalinstructie: alle tekst in de gekozen taal. */
export function getAIPromptForLocale(locale: Locale): string {
  const lang = AI_LANGUAGE_NAMES[locale]
  return `${AI_PROMPT}

IMPORTANT: Return ALL text in ${lang}. Every JSON string field must be in ${lang} only: naam, zeldzaamheid, gewicht, lengte, leeftijd, vergelijking_gewicht, vergelijking_snelheid, vergelijking_lengte, and each item in weetjes. Use ${lang} for units and comparisons (e.g. "kg", "meters" or "m", "years" or local equivalent). Keep the JSON structure and keys unchanged.`
}