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

Belangrijk voor specifiek herkennen:
- Vul altijd "soort" met de diersoort in het NEDERLANDS (bijv. "hond", "kat", "paard", "neushoorn", "tijger"). Gebruik alleen Nederlandse soortnamen, zodat hetzelfde dier in elke taal als één dier in de collectie telt.
- Vul "ras" alleen in als dat zinvol is (vooral huisdieren en sommige landbouwdieren), anders een lege string.
- Als het een hond is: geef het ras zo specifiek mogelijk. Zet bij honden in "naam" ook het ras (dus niet alleen "hond"). Voorbeeld: "Labrador Retriever", "Border Collie", "Franse Bulldog".
- Als ras niet zeker is, geef de beste gok in "ras" met een korte nuance zoals "waarschijnlijk", maar blijf specifiek.

Standaard JSON (altijd alle velden vullen):
{"naam":"Nederlandse naam","emoji":"één emoji","soort":"diersoort","ras":"ras of lege string","type":"echt|plaatje|speelgoed|dinosaurus|fantasie","zeldzaamheid":"Gewoon / Bijzonder / Zeldzaam / Superschaars","gewicht":"bijv. 300 kg","lengte":"bijv. 3 meter","leeftijd":"bijv. 15 jaar","vergelijking_gewicht":"vergelijking voor kind van 6","vergelijking_snelheid":"vergelijking voor kind van 6","vergelijking_lengte":"vergelijking voor kind van 6","weetjes":["kort grappig weetje","kort verbazingwekkend weetje","kort weetje"],"xp":25,"gevonden":true}

Alleen als er echt geen dier, plaatje, speelgoed of fantasiedier herkenbaar is: {"gevonden":false}`

/** Prompt met taalinstructie: alle tekst in de gekozen taal; soort blijft Nederlands voor groepering. */
export function getAIPromptForLocale(locale: Locale): string {
  const lang = AI_LANGUAGE_NAMES[locale]
  return `${AI_PROMPT}

IMPORTANT: Return ALL text in ${lang} EXCEPT the field "soort". Keep "soort" always in DUTCH (e.g. neushoorn, tijger, hond, gorilla), so the same animal counts as one in the collection regardless of language. All other JSON string fields in ${lang}: naam, ras, zeldzaamheid, gewicht, lengte, leeftijd, vergelijking_gewicht, vergelijking_snelheid, vergelijking_lengte, and each item in weetjes. Use ${lang} for units and comparisons. Keep the JSON structure and keys unchanged.`
}