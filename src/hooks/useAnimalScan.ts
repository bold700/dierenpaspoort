import { useState, useCallback } from 'react'
import { useSettingsStore } from '../store/useSettingsStore'
import { getAIPromptForLocale } from '../constants'
import type { ScanResponse, AnimalResult } from '../types'
import { isAnimalResult } from '../types'

const GENERIC_DOG_NAMES = new Set([
  'hond',
  'dog',
  'perro',
  'chien',
  '狗',
  '犬',
])

const UNKNOWN_BREED_HINTS = [
  'onbekend',
  'unknown',
  'niet zeker',
  'onzeker',
  'mix',
  'kruising',
  'mongrel',
  'mestizo',
  'croise',
  'croisé',
  '杂交',
  '未知',
  '不确定',
]

function parseResponse(text: string): ScanResponse {
  const cleaned = text.trim().replace(/```json|```/g, '').trim()
  return JSON.parse(cleaned) as ScanResponse
}

function normalizeText(value: string | undefined): string {
  return (value ?? '').replace(/\s+/g, ' ').trim()
}

function isDogSpecies(species: string): boolean {
  const s = species.toLowerCase()
  return ['hond', 'dog', 'perro', 'chien', '狗', '犬'].some((v) => s === v || s.includes(v))
}

function isGenericDogName(name: string): boolean {
  return GENERIC_DOG_NAMES.has(name.toLowerCase())
}

function isUnknownBreed(breed: string): boolean {
  const b = breed.toLowerCase()
  return UNKNOWN_BREED_HINTS.some((hint) => b.includes(hint))
}

function normalizeAnimalResult(animal: AnimalResult): AnimalResult {
  const name = normalizeText(animal.naam)
  const species = normalizeText(animal.soort)
  let breed = normalizeText(animal.ras)
  const dog = isDogSpecies(species) || isGenericDogName(name)

  if (dog && !breed && name && !isGenericDogName(name)) {
    // Model zette het ras soms in "naam" maar liet "ras" leeg.
    breed = name
  }

  const normalized: AnimalResult = {
    ...animal,
    naam: name || animal.naam,
  }

  if (species) normalized.soort = species
  if (breed) normalized.ras = breed

  if (dog && breed && !isUnknownBreed(breed)) {
    normalized.naam = breed
  }

  return normalized
}

export function useAnimalScan() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { provider, apiKey, locale } = useSettingsStore()
  const prompt = getAIPromptForLocale(locale)

  const scan = useCallback(
    async (base64: string, mediaType: string): Promise<AnimalResult | null> => {
      setLoading(true)
      setError(null)
      try {
        let raw: string
        if (provider === 'openai') {
          const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'gpt-4o',
              max_tokens: 1000,
              messages: [
                {
                  role: 'user',
                  content: [
                    {
                      type: 'image_url',
                      image_url: { url: `data:${mediaType};base64,${base64}` }
                    },
                    { type: 'text', text: prompt }
                  ]
                }
              ]
            })
          })
          const data = await res.json()
          if (data.error) throw new Error(data.error.message ?? 'OpenAI error')
          raw = data.choices[0].message.content
        } else {
          const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
              model: 'claude-sonnet-4-20250514',
              max_tokens: 1000,
              messages: [
                {
                  role: 'user',
                  content: [
                    {
                      type: 'image',
                      source: {
                        type: 'base64',
                        media_type: mediaType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
                        data: base64
                      }
                    },
                    { type: 'text', text: prompt }
                  ]
                }
              ]
            })
          })
          const data = await res.json()
          if (data.error) throw new Error(data.error.message ?? 'Anthropic error')
          raw = data.content.map((c: { text?: string }) => c.text ?? '').join('')
        }
        const response = parseResponse(raw)
        if (isAnimalResult(response)) return normalizeAnimalResult(response)
        return null
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Er ging iets mis'
        setError(message)
        return null
      } finally {
        setLoading(false)
      }
    },
    [provider, apiKey, prompt]
  )

  return { scan, loading, error }
}
