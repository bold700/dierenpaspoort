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

Wees zo specifiek mogelijk. Gebruik dus niet alleen een algemene diernaam als een ras, ondersoort of duidelijke variant zichtbaar is.

Herken ook:
- Echte dieren (zoals nu).
- Plaatjes van dieren: tekening, schilderij, foto uit een boek, poster, scherm. Geef dan het dier dat je ziet en "type":"plaatje".
- Speelgoed: knuffel, plastic dier, figuur, pop. Geef het dier dat het voorstelt en "type":"speelgoed".
- Dino's en fantasiedieren: dinosaurussen (T-Rex, Triceratops, Brachiosaurus, enz.), draken, eenhoorns, enz. Gebruik Nederlandse namen waar die bestaan (T-Rex, Draak, Eenhoorn). Geef "type":"dinosaurus" of "type":"fantasie". Verzin kindvriendelijke gewicht/lengte/leeftijd en weetjes alsof het echt bestond.

Specifiek voor honden:
- Als er een hond op de foto staat, probeer altijd het meest waarschijnlijke hondenras of de meest waarschijnlijke mix te noemen.
- Zet "soort" op de algemene diersoort (bijvoorbeeld "Hond").
- Zet "ras" op het ras of de mix als dat herkenbaar is.
- Gebruik in "naam" de meest specifieke naam die je kunt geven. Dus liever "Labrador retriever", "Teckel" of "Kruising herder" dan alleen "Hond".
- Alleen als het echt niet specifieker kan, gebruik je een eerlijke fallback zoals "Hond (onbekend ras)" en laat je "ras" leeg.

Standaard JSON (altijd alle velden vullen):
{"naam":"meest specifieke Nederlandse naam","emoji":"één emoji","soort":"algemene diersoort of lege string","ras":"ras/mix of lege string","type":"echt|plaatje|speelgoed|dinosaurus|fantasie","zeldzaamheid":"Gewoon / Bijzonder / Zeldzaam / Superschaars","gewicht":"bijv. 300 kg","lengte":"bijv. 3 meter","leeftijd":"bijv. 15 jaar","vergelijking_gewicht":"vergelijking voor kind van 6","vergelijking_snelheid":"vergelijking voor kind van 6","vergelijking_lengte":"vergelijking voor kind van 6","weetjes":["kort grappig weetje","kort verbazingwekkend weetje","kort weetje"],"xp":25,"gevonden":true}

Alleen als er echt geen dier, plaatje, speelgoed of fantasiedier herkenbaar is: {"gevonden":false}`

/** Prompt met taalinstructie: alle tekst in de gekozen taal. */
export function getAIPromptForLocale(locale: Locale): string {
  const lang = AI_LANGUAGE_NAMES[locale]
  return `${AI_PROMPT}

IMPORTANT: Return ALL text in ${lang}. Every JSON string field must be in ${lang} only: naam, soort, ras, zeldzaamheid, gewicht, lengte, leeftijd, vergelijking_gewicht, vergelijking_snelheid, vergelijking_lengte, and each item in weetjes. Use ${lang} for units and comparisons (e.g. "kg", "meters" or "m", "years" or local equivalent). Keep the JSON structure and keys unchanged.`
}

export function getDogBreedPromptForLocale(locale: Locale): string {
  const lang = AI_LANGUAGE_NAMES[locale]
  return `You are a careful animal expert for young children. Focus only on this image.

The image most likely contains a dog. Identify the most likely dog breed or the most likely mix. Be as specific as reasonably possible, but do not pretend to be more certain than the photo allows.

Return ONLY valid JSON with exactly this shape:
{"naam":"most specific breed or honest fallback","emoji":"one emoji","soort":"dog species name","ras":"dog breed or mix, or empty string","gevonden":true}

Rules:
- Never answer with only a generic word like "dog" if you can reasonably estimate a breed or mix.
- If the dog appears mixed, return an honest mix label such as "shepherd mix" or "mixed breed".
- If the breed truly cannot be estimated, use a fallback like "dog (unknown breed)" and leave "ras" empty.
- If there is no dog visible after all, return {"gevonden":false}.

IMPORTANT: Return ALL text in ${lang}. Every JSON string field must be in ${lang} only: naam, soort, ras. Keep the JSON keys unchanged.`
}