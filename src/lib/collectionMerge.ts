import type { CollectionItem } from '../types'

/**
 * Groepeer collectie op een sleutel en tel keren bij elkaar op (één kaart per sleutel).
 * getKey(item) bepaalt de groep (bijv. canonieke soort).
 */
export function mergeCollectionBySoort(
  items: CollectionItem[],
  getKey: (item: CollectionItem) => string
): CollectionItem[] {
  const byKey = new Map<string, CollectionItem[]>()
  for (const item of items) {
    const key = getKey(item)
    const group = byKey.get(key) ?? []
    group.push(item)
    byKey.set(key, group)
  }
  const merged: CollectionItem[] = []
  for (const group of byKey.values()) {
    if (group.length === 0) continue
    const totalTimes = group.reduce((s, i) => s + i.times, 0)
    const best = group.reduce((a, b) => (a.times >= b.times ? a : b))
    merged.push({
      ...best,
      times: totalTimes,
      name: best.name,
      emoji: best.emoji,
      detail: best.detail,
      soort: best.soort ?? group[0].soort
    })
  }
  return merged
}
