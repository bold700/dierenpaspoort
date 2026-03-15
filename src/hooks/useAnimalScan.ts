import { useState, useCallback } from 'react'
import { useSettingsStore } from '../store/useSettingsStore'
import { getAIPromptForLocale, getDogBreedPromptForLocale } from '../constants'
import type { ScanResponse, AnimalResult, DogBreedResponse, AIProvider } from '../types'
import { isAnimalResult } from '../types'
import { mergeDogBreedRefinement, normalizeAnimalResult, shouldRefineDogBreed } from '../lib/animalResult'

function parseResponse<T>(text: string): T {
  const cleaned = text.trim().replace(/```json|```/g, '').trim()
  return JSON.parse(cleaned) as T
}

async function requestVisionResponse(
  provider: AIProvider,
  apiKey: string,
  prompt: string,
  base64: string,
  mediaType: string,
): Promise<string> {
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
    return data.choices[0].message.content
  }

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
  return data.content.map((c: { text?: string }) => c.text ?? '').join('')
}

export function useAnimalScan() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { provider, apiKey, locale } = useSettingsStore()
  const prompt = getAIPromptForLocale(locale)
  const dogBreedPrompt = getDogBreedPromptForLocale(locale)

  const scan = useCallback(
    async (base64: string, mediaType: string): Promise<AnimalResult | null> => {
      setLoading(true)
      setError(null)
      try {
        const raw = await requestVisionResponse(provider, apiKey, prompt, base64, mediaType)
        const response = parseResponse<ScanResponse>(raw)
        if (isAnimalResult(response)) {
          let animal = normalizeAnimalResult(response)

          if (shouldRefineDogBreed(animal)) {
            try {
              const dogRaw = await requestVisionResponse(provider, apiKey, dogBreedPrompt, base64, mediaType)
              const dogResponse = parseResponse<DogBreedResponse>(dogRaw)
              animal = mergeDogBreedRefinement(animal, dogResponse)
            } catch {
              // Houd het eerste resultaat als de extra ras-check mislukt.
            }
          }

          return animal
        }
        return null
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Er ging iets mis'
        setError(message)
        return null
      } finally {
        setLoading(false)
      }
    },
    [provider, apiKey, prompt, dogBreedPrompt]
  )

  return { scan, loading, error }
}
