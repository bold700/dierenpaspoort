/**
 * Haalt dierplaatjes op via Wikipedia (eerst NL, dan EN fallback).
 * Geen API-key; gebruikt de vrije REST API met cache.
 */

const CACHE = new Map<string, string | null>()

const WIKI_NL = 'https://nl.wikipedia.org/api/rest_v1/page/summary'
const WIKI_EN = 'https://en.wikipedia.org/api/rest_v1/page/summary'

/** Nederlandse naam → Engelse Wikipedia-paginanaam (voor betere thumbnails). */
const DUTCH_TO_EN: Record<string, string> = {
  Reuzenpanda: 'Giant_panda',
  Tijger: 'Tiger',
  Wolf: 'Wolf',
  Chimpansee: 'Chimpanzee',
  Koala: 'Koala',
  Nijlpaard: 'Hippopotamus',
  Zebra: 'Zebra',
  Eekhoorn: 'Red_squirrel',
  Konijn: 'Rabbit',
  Egel: 'Hedgehog',
  Uil: 'Owl',
  Pauw: 'Peafowl',
  Pinguïn: 'Penguin',
  Flamingo: 'Flamingo',
  Kolibrie: 'Hummingbird',
  Specht: 'Woodpecker',
  Krokodil: 'Crocodile',
  Slang: 'Snake',
  Reuzenschildpad: 'Giant_tortoise',
  Kameleon: 'Chameleon',
  Honingbij: 'Western_honey_bee',
  Vlinder: 'Butterfly',
  Mier: 'Ant',
  Libel: 'Dragonfly',
  Haaai: 'Shark',
  Octopus: 'Octopus',
  Zeehond: 'Harbor_seal',
  'Blauwe vinvis': 'Blue_whale',
  Zeearend: 'White-tailed_eagle',
  Neushoorn: 'Rhinoceros',
  Kangoeroe: 'Kangaroo',
  Luiaard: 'Sloth',
  Leeuw: 'Lion',
  Olifant: 'Elephant',
  Giraffe: 'Giraffe',
  Dolfijn: 'Bottlenose_dolphin',
  // Hondenrassen (voor Wikipedia-thumbnails)
  'Golden Retriever': 'Golden_Retriever',
  Labrador: 'Labrador_Retriever',
  Beagle: 'Beagle',
  'Duitse Herder': 'German_Shepherd',
  Chihuahua: 'Chihuahua_(dog)',
  'Border Collie': 'Border_Collie',
  'Cocker Spaniël': 'Cocker_Spaniel',
  'Jack Russell': 'Jack_Russell_Terrier',
  Bulldog: 'Bulldog',
  Husky: 'Siberian_Husky',
  Dalmatiër: 'Dalmatian_(dog)',
  Poedel: 'Poodle',
  Teckel: 'Dachshund',
  Boxer: 'Boxer_(dog)',
  Rottweiler: 'Rottweiler',
  'Franse Bulldog': 'French_Bulldog',
  'Shiba Inu': 'Shiba_Inu',
  'Australische Herder': 'Australian_Shepherd',
  'Berner Sennenhond': 'Bernese_Mountain_Dog',
  'Cavalier King Charles Spaniël': 'Cavalier_King_Charles_Spaniel',
  'Maltese': 'Maltese_dog',
  'Yorkshire Terriër': 'Yorkshire_Terrier',
}

/** Geeft een grotere thumbnail (320px) als de URL een getal+px bevat. */
function largerThumb(url: string, width = 320): string {
  return url.replace(/\d+px-/, `${width}px-`)
}

async function fetchThumb(
  baseUrl: string,
  title: string
): Promise<string | null> {
  const res = await fetch(
    `${baseUrl}/${encodeURIComponent(title)}?origin=*`,
    { signal: AbortSignal.timeout(4000) }
  )
  if (!res.ok) return null
  const data = (await res.json()) as { thumbnail?: { source?: string } }
  const src = data?.thumbnail?.source
  if (!src || typeof src !== 'string') return null
  const full = src.startsWith('//') ? `https:${src}` : src
  return largerThumb(full)
}

export async function getAnimalImageUrl(naam: string): Promise<string | null> {
  const key = naam.trim().toLowerCase()
  if (CACHE.has(key)) return CACHE.get(key) ?? null

  try {
    // Eerst Nederlandse Wikipedia
    let url = await fetchThumb(WIKI_NL, naam.trim())
    // Geen plaatje of fout? Probeer Engelse Wikipedia (vaak betere thumbnails)
    if (!url && DUTCH_TO_EN[naam.trim()]) {
      url = await fetchThumb(WIKI_EN, DUTCH_TO_EN[naam.trim()])
    }
    if (!url) {
      // Laatste poging: Engelse pagina met dezelfde naam (bijv. "Leeuw" → zoek "Leeuw" op EN)
      url = await fetchThumb(WIKI_EN, naam.trim())
    }
    CACHE.set(key, url)
    return url
  } catch {
    CACHE.set(key, null)
    return null
  }
}

/** Verwijder cached URL voor dit dier (bijv. na img onError), zodat opnieuw wordt geprobeerd. */
export function invalidateAnimalImageCache(naam: string): void {
  CACHE.delete(naam.trim().toLowerCase())
}
