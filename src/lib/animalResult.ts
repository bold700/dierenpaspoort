import type { AnimalResult, DogBreedResponse } from '../types'
import { isDogBreedResult } from '../types'

const GENERIC_DOG_TERMS = new Set([
  'dog',
  'doggo',
  'chien',
  'hond',
  'honden',
  'perro',
  'perra',
  'puppy',
  'welp',
  '狗',
  '犬',
])

function cleanText(value?: string): string | undefined {
  const cleaned = value?.trim().replace(/\s+/g, ' ')
  return cleaned ? cleaned : undefined
}

function normalizeDogToken(value?: string): string {
  return value
    ?.trim()
    .toLowerCase()
    .replace(/[()!.,:;'"-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() ?? ''
}

export function isGenericDogName(value?: string): boolean {
  const normalized = normalizeDogToken(value)
  if (!normalized) return false
  if (GENERIC_DOG_TERMS.has(normalized)) return true
  return normalized.startsWith('dog ') || normalized.startsWith('hond ') || normalized.startsWith('chien ') || normalized.startsWith('perro ')
}

export function isDogLikeResult(result: Pick<AnimalResult, 'naam' | 'soort' | 'ras' | 'emoji'>): boolean {
  return Boolean(
    cleanText(result.ras)
    || isGenericDogName(result.naam)
    || isGenericDogName(result.soort)
    || result.emoji === '🐶'
  )
}

export function normalizeAnimalResult(result: AnimalResult): AnimalResult {
  const naam = cleanText(result.naam) ?? result.naam
  const soort = cleanText(result.soort)
  let ras = cleanText(result.ras)

  if (isDogLikeResult({ naam, soort, ras, emoji: result.emoji })) {
    if (!ras && !isGenericDogName(naam)) ras = naam
    if (ras && (isGenericDogName(naam) || naam === soort)) {
      return { ...result, naam: ras, soort, ras }
    }
  }

  return { ...result, naam, soort, ras }
}

export function shouldRefineDogBreed(result: AnimalResult): boolean {
  const normalized = normalizeAnimalResult(result)
  return isDogLikeResult(normalized) && (isGenericDogName(normalized.naam) || !cleanText(normalized.ras))
}

export function mergeDogBreedRefinement(base: AnimalResult, refinement: DogBreedResponse): AnimalResult {
  if (!isDogBreedResult(refinement)) return normalizeAnimalResult(base)

  return normalizeAnimalResult({
    ...base,
    naam: cleanText(refinement.naam) ?? base.naam,
    emoji: cleanText(refinement.emoji) ?? base.emoji,
    soort: cleanText(refinement.soort) ?? cleanText(base.soort),
    ras: cleanText(refinement.ras) ?? cleanText(base.ras),
  })
}
