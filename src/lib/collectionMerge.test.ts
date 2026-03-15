import { describe, it, expect } from 'vitest'
import { mergeCollectionBySoort } from './collectionMerge'
import type { CollectionItem } from '../types'

function item(name: string, times: number, soort?: string): CollectionItem {
  return {
    name,
    emoji: '🐾',
    rarity: 'Gewoon',
    times,
    soort,
    detail: undefined
  }
}

describe('mergeCollectionBySoort', () => {
  it('voegt items met dezelfde key samen en telt times op', () => {
    const getKey = () => 'neushoorn'
    const items = [
      item('Neushoorn', 1, 'neushoorn'),
      item('Rhinoceros', 2, 'rhinoceros')
    ]
    const merged = mergeCollectionBySoort(items, getKey)
    expect(merged).toHaveLength(1)
    expect(merged[0].times).toBe(3)
  })

  it('behoudt aparte items voor verschillende keys', () => {
    const items = [
      item('Tijger', 1),
      item('Gorilla', 2)
    ]
    const merged = mergeCollectionBySoort(items, (i) => i.name)
    expect(merged).toHaveLength(2)
    expect(merged.map((m) => m.times)).toEqual([1, 2])
  })

  it('geeft één item terug bij één input', () => {
    const items = [item('Hond', 3)]
    const merged = mergeCollectionBySoort(items, (i) => i.name)
    expect(merged).toHaveLength(1)
    expect(merged[0].times).toBe(3)
  })

  it('geeft lege array terug bij lege input', () => {
    const merged = mergeCollectionBySoort([], (i) => i.name)
    expect(merged).toHaveLength(0)
  })
})
