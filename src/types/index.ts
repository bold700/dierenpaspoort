export type Zeldzaamheid = 'Gewoon' | 'Bijzonder' | 'Zeldzaam' | 'Superschaars'

/** Bron van de scan: echt dier, plaatje, speelgoed of fantasie (dino/draak). */
export type ScanType = 'echt' | 'plaatje' | 'speelgoed' | 'dinosaurus' | 'fantasie'

export interface AnimalResult {
  naam: string
  emoji: string
  /** Diergroep/soort, bijv. "hond", "kat", "paard". */
  soort?: string
  /** Ras (vooral bij huisdieren), bijv. "Labrador Retriever". */
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

export function isAnimalResult(r: ScanResponse): r is AnimalResult {
  return r.gevonden === true
}

export interface CollectionItem {
  name: string
  emoji: string
  rarity: string
  times: number
  /** Soort in het Nederlands (voor groepering: zelfde dier in andere talen = één item). */
  soort?: string
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
  /** Laatste scan-datum (YYYY-MM-DD) voor streak-berekening */
  lastScanDate: string | null
  /** Unieke datums waarop gescand is (voor wekelijkse/maandelijkse doelen) */
  scanDates: string[]
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
