/**
 * Canonieke soortnamen: meerdere talen/varianten → één Nederlandse sleutel.
 * Zelfde dier in andere taal (bijv. rhinoceros / neushoorn) telt als één in de collectie.
 *
 * Later te vervangen door: bestand, API of taxonomy-service voor betere schaalbaarheid.
 */
function normalizeSoort(soort: string | undefined): string {
  return (soort ?? '').toLowerCase().trim()
}

export const SOORT_CANONICAL: Record<string, string> = {
  rhinoceros: 'neushoorn',
  rhino: 'neushoorn',
  rinocerus: 'neushoorn',
  rhinocero: 'neushoorn',
  neushoorn: 'neushoorn',
  tiger: 'tijger',
  gorilla: 'gorilla',
  salamander: 'salamander',
  'fire salamander': 'vuursalamander',
  vuursalamander: 'vuursalamander',
  cobra: 'cobra',
  'king cobra': 'koning cobra',
  dinosaur: 'dinosaurus',
  pachyrhinosaurus: 'pachyrhinosaurus',
  dilophosaurus: 'dilophosaurus'
}

export function canonicalSoort(soort: string | undefined): string {
  const n = normalizeSoort(soort)
  if (SOORT_CANONICAL[n]) return SOORT_CANONICAL[n]
  if (n.includes('rhino') || n.includes('neushoorn')) return 'neushoorn'
  return n
}
