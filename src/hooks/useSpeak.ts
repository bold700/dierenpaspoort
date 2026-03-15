import { useCallback, useRef } from 'react'
import { useSettingsStore } from '../store/useSettingsStore'

const ELEVENLABS_URL = 'https://api.elevenlabs.io/v1/text-to-speech/'

export function useSpeak() {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)
  const speakIdRef = useRef(0)

  const stopAllSpeech = useCallback(() => {
    window.speechSynthesis.cancel()
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current.currentTime = 0
      currentAudioRef.current = null
    }
  }, [])

  const speakBrowser = useCallback(
    (text: string) => {
      if (!text) return
      stopAllSpeech()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'nl-NL'
      u.rate = 0.9
      u.pitch = 1.1
      window.speechSynthesis.speak(u)
    },
    [stopAllSpeech]
  )

  const speakElevenLabsWithKeys = useCallback(
    async (text: string, elKey: string, voiceId: string): Promise<void> => {
      if (!elKey) {
        speakBrowser(text)
        return
      }
      stopAllSpeech()
      const myId = ++speakIdRef.current
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
        if (myId !== speakIdRef.current) return
        if (!res.ok) throw new Error(`Status ${res.status}`)
        const blob = await res.blob()
        if (myId !== speakIdRef.current) return
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        currentAudioRef.current = audio
        audio.onended = () => {
          URL.revokeObjectURL(url)
          if (currentAudioRef.current === audio) currentAudioRef.current = null
        }
        audio.onerror = () => {
          if (currentAudioRef.current === audio) currentAudioRef.current = null
        }
        await audio.play()
      } catch {
        if (myId === speakIdRef.current) speakBrowser(text)
      }
    },
    [speakBrowser, stopAllSpeech]
  )

  /** Gebruikt altijd actuele TTS-instelling uit de store (ook bij vertraagde aanroep, bv. level-up). */
  const speak = useCallback(
    async (text: string) => {
      if (!text) return
      stopAllSpeech()
      const { tts, elKey, voiceId } = useSettingsStore.getState()
      if (tts === 'elevenlabs' && elKey) {
        await speakElevenLabsWithKeys(text, elKey, voiceId)
      } else {
        speakBrowser(text)
      }
    },
    [speakBrowser, speakElevenLabsWithKeys, stopAllSpeech]
  )

  const speakElevenLabs = useCallback(
    async (text: string) => {
      const { elKey, voiceId } = useSettingsStore.getState()
      await speakElevenLabsWithKeys(text, elKey, voiceId)
    },
    [speakElevenLabsWithKeys]
  )

  return { speak, speakBrowser, speakElevenLabs }
}
