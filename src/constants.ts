import type { VoiceOption } from './types'

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

Standaard JSON (altijd alle velden vullen):
{"naam":"Nederlandse naam","emoji":"één emoji","type":"echt|plaatje|speelgoed|dinosaurus|fantasie","zeldzaamheid":"Gewoon / Bijzonder / Zeldzaam / Superschaars","gewicht":"bijv. 300 kg","lengte":"bijv. 3 meter","leeftijd":"bijv. 15 jaar","vergelijking_gewicht":"vergelijking voor kind van 6","vergelijking_snelheid":"vergelijking voor kind van 6","vergelijking_lengte":"vergelijking voor kind van 6","weetjes":["kort grappig weetje","kort verbazingwekkend weetje","kort weetje"],"xp":25,"gevonden":true}

Alleen als er echt geen dier, plaatje, speelgoed of fantasiedier herkenbaar is: {"gevonden":false}`