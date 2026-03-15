export type Zeldzaamheid = 'Gewoon' | 'Bijzonder' | 'Zeldzaam' | 'Superschaars'

/** Bron van de scan: echt dier, plaatje, speelgoed of fantasie (dino/draak). */
export type ScanType = 'echt' | 'plaatje' | 'speelgoed' | 'dinosaurus' | 'fantasie'

export interface AnimalResult {
  naam: string
  emoji: string
  /** Algemene diersoort of diergroep, bijvoorbeeld "Hond". */
  soort?: string
  /** Specifieke rasnaam of mix als die herkenbaar is, bijvoorbeeld "Labrador retriever". */
  ras?: string
  /** Optioneel: plaatje, speelgoed, dinosaurus of fantasie (draak, eenhoorn, etc.). */
  type?: ScanType
  zeldzaamheid: Zeldzaamheid
  gewicht: string
  lengte: string
  leeftijd: string
  vergelijking_gewicht: string
  vergelijking_snelheid: string
  vergelijking_lengte: string
  weetjes: [string, string, string]
  xp: number
  gevonden: true
}

export interface AnimalNotFound {
  gevonden: false
}

export type ScanResponse = AnimalResult | AnimalNotFound

export interface DogBreedResult {
  naam: string
  emoji?: string
  soort?: string
  ras?: string
  gevonden: true
}

export type DogBreedResponse = DogBreedResult | AnimalNotFound

export function isAnimalResult(r: ScanResponse): r is AnimalResult {
  return r.gevonden === true
}

export function isDogBreedResult(r: DogBreedResponse): r is DogBreedResult {
  return r.gevonden === true && typeof r.naam === 'string'
}

export interface CollectionItem {
  name: string
  emoji: string
  rarity: string
  times: number
  /** Volledige scaninfo om in collectie weer te geven (vanaf eerste/laatste scan). */
  detail?: AnimalResult
}

export interface Achievement {
  id: string
  icon: string
  name: string
  desc: string
  req: (state: AppState) => boolean
}

export interface AppState {
  totalXP: number
  level: number
  totalSeen: number
  streak: number
  collection: CollectionItem[]
  foundRare: boolean
  unlockedAchievements: string[]
}

export type AIProvider = 'anthropic' | 'openai'
export type TTSProvider = 'browser' | 'elevenlabs'

export interface VoiceOption {
  id: string
  name: string
  desc: string
}

export interface SettingsState {
  provider: AIProvider
  apiKey: string
  tts: TTSProvider
  elKey: string
  voiceId: string
}
