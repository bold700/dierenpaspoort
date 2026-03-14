import { useCallback } from 'react'
import { useSettingsStore } from '../store/useSettingsStore'

const ELEVENLABS_URL = 'https://api.elevenlabs.io/v1/text-to-speech/'

export function useSpeak() {
  const { tts, elKey, voiceId } = useSettingsStore()

  const speakBrowser = useCallback((text: string) => {
    if (!text) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'nl-NL'
    u.rate = 0.9
    u.pitch = 1.1
    window.speechSynthesis.speak(u)
  }, [])

  const speakElevenLabs = useCallback(
    async (text: string): Promise<void> => {
      if (!elKey) {
        speakBrowser(text)
        return
      }
      try {
        const res = await fetch(`${ELEVENLABS_URL}${voiceId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': elKey
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.8,
              style: 0.4,
              use_speaker_boost: true
            }
          })
        })
        if (!res.ok) throw new Error(`Status ${res.status}`)
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audio.onended = () => URL.revokeObjectURL(url)
        await audio.play()
      } catch {
        speakBrowser(text)
      }
    },
    [elKey, voiceId, speakBrowser]
  )

  const speak = useCallback(
    async (text: string) => {
      if (!text) return
      if (tts === 'elevenlabs' && elKey) {
        await speakElevenLabs(text)
      } else {
        speakBrowser(text)
      }
    },
    [tts, elKey, speakBrowser, speakElevenLabs]
  )

  return { speak, speakBrowser, speakElevenLabs }
}
