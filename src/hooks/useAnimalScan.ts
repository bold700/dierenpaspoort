import { useState, useCallback } from 'react'
import { useSettingsStore } from '../store/useSettingsStore'
import { AI_PROMPT } from '../constants'
import type { ScanResponse, AnimalResult } from '../types'
import { isAnimalResult } from '../types'

function parseResponse(text: string): ScanResponse {
  const cleaned = text.trim().replace(/```json|```/g, '').trim()
  return JSON.parse(cleaned) as ScanResponse
}

export function useAnimalScan() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { provider, apiKey } = useSettingsStore()

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
                    { type: 'text', text: AI_PROMPT }
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
                    { type: 'text', text: AI_PROMPT }
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
        if (isAnimalResult(response)) return response
        return null
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Er ging iets mis'
        setError(message)
        return null
      } finally {
        setLoading(false)
      }
    },
    [provider, apiKey]
  )

  return { scan, loading, error }
}
