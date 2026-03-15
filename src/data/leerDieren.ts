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
  weetjes: [string, string, string, string, string]
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
    return { ...base, ...c } as LeerDier
  }).filter(Boolean) as LeerDier[]
}
