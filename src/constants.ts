import type { VoiceOption } from './types'

export const VOICES: VoiceOption[] = [
  { id: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica', desc: 'Warm, vriendelijk' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', desc: 'Zacht, rustig' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', desc: 'Helder, jong' },
  { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel', desc: 'Enthousiast' },
  { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte', desc: 'Speels' },
  { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian', desc: 'Avontuurlijk' }
]

export const AI_PROMPT = `Je bent een natuur-AI voor jonge kinderen. Herken het dier en stuur ALLEEN geldige JSON terug, geen uitleg, geen backticks.

{"naam":"Nederlandse naam","emoji":"één emoji","zeldzaamheid":"Gewoon / Bijzonder / Zeldzaam / Superschaars","gewicht":"bijv. 300 kg","lengte":"bijv. 3 meter","leeftijd":"bijv. 15 jaar","vergelijking_gewicht":"vergelijking voor kind van 6, bijv: zo zwaar als 10 kinderen samen","vergelijking_snelheid":"vergelijking voor kind van 6, bijv: zo snel als een brommer","vergelijking_lengte":"vergelijking voor kind van 6, bijv: zo lang als 3 bedden achter elkaar","weetjes":["kort grappig weetje max 10 woorden","kort verbazingwekkend weetje max 10 woorden","kort weetje over gevaar max 10 woorden"],"xp":25,"gevonden":true}

Als er geen dier is: {"gevonden":false}`