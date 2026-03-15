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

BELANGRIJK — Wees zo specifiek mogelijk:
- Herken bij honden altijd het RAS (bijv. "Golden Retriever", "Duitse Herder", "Labrador", "Franse Bulldog", "Chihuahua"). Gebruik NOOIT alleen "Hond".
- Herken bij katten altijd het RAS als dat zichtbaar is (bijv. "Siamese Kat", "Maine Coon", "Britse Korthaar"). Als het ras onduidelijk is, gebruik "Huiskat".
- Herken bij vogels de SOORT (bijv. "Koolmees", "Merel", "Blauwborst", niet alleen "Vogel").
- Herken bij vissen, reptielen, insecten etc. ook de specifieke soort (bijv. "Kardinaalvis", "Baardagaam", "Lieveheersbeestje").
- Herken bij paarden het RAS (bijv. "Fries Paard", "Shetlander", "Arabier").
- Geef in het veld "soort" de overkoepelende diercategorie (bijv. "Hond", "Kat", "Vogel", "Paard", "Vis", "Spin", "Dinosaurus", "Draak").

Herken ook:
- Echte dieren (zoals hierboven).
- Plaatjes van dieren: tekening, schilderij, foto uit een boek, poster, scherm. Geef dan het dier dat je ziet en "type":"plaatje".
- Speelgoed: knuffel, plastic dier, figuur, pop. Geef het dier dat het voorstelt en "type":"speelgoed".
- Dino's en fantasiedieren: dinosaurussen (T-Rex, Triceratops, Brachiosaurus, enz.), draken, eenhoorns, enz. Gebruik Nederlandse namen waar die bestaan (T-Rex, Draak, Eenhoorn). Geef "type":"dinosaurus" of "type":"fantasie". Verzin kindvriendelijke gewicht/lengte/leeftijd en weetjes alsof het echt bestond.

Standaard JSON (altijd alle velden vullen):
{"naam":"Specifieke naam (ras/soort)","soort":"Overkoepelende diercategorie","emoji":"één emoji","type":"echt|plaatje|speelgoed|dinosaurus|fantasie","zeldzaamheid":"Gewoon / Bijzonder / Zeldzaam / Superschaars","gewicht":"bijv. 300 kg","lengte":"bijv. 3 meter","leeftijd":"bijv. 15 jaar","vergelijking_gewicht":"vergelijking voor kind van 6","vergelijking_snelheid":"vergelijking voor kind van 6","vergelijking_lengte":"vergelijking voor kind van 6","weetjes":["kort grappig weetje","kort verbazingwekkend weetje","kort weetje"],"xp":25,"gevonden":true}

Voorbeelden van "naam" en "soort":
- naam:"Golden Retriever", soort:"Hond"
- naam:"Siamese Kat", soort:"Kat"
- naam:"Koolmees", soort:"Vogel"
- naam:"T-Rex", soort:"Dinosaurus"
- naam:"Fries Paard", soort:"Paard"
- naam:"Lieveheersbeestje", soort:"Insect"

Alleen als er echt geen dier, plaatje, speelgoed of fantasiedier herkenbaar is: {"gevonden":false}`

/** Prompt met taalinstructie: alle tekst in de gekozen taal. */
export function getAIPromptForLocale(locale: Locale): string {
  const lang = AI_LANGUAGE_NAMES[locale]
  return `${AI_PROMPT}

IMPORTANT: Return ALL text in ${lang}. Every JSON string field must be in ${lang} only: naam, soort, zeldzaamheid, gewicht, lengte, leeftijd, vergelijking_gewicht, vergelijking_snelheid, vergelijking_lengte, and each item in weetjes. Use ${lang} for units and comparisons (e.g. "kg", "meters" or "m", "years" or local equivalent). Keep the JSON structure and keys unchanged.`
}