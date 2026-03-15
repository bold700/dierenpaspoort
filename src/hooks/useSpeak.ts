import { useCallback, useRef } from 'react'
import { useSettingsStore } from '../store/useSettingsStore'

const ELEVENLABS_URL = 'https://api.elevenlabs.io/v1/text-to-speech/'

/** Gedeelde ref zodat elke speak()-aanroep (van welke component dan ook) de vorige audio stopt. */
const globalAudioRef = { current: null as HTMLAudioElement | null }

export function useSpeak() {
  const speakIdRef = useRef(0)

  const stopAllSpeech = useCallback(() => {
    window.speechSynthesis.cancel()
    if (globalAudioRef.current) {
      globalAudioRef.current.pause()
      globalAudioRef.current.currentTime = 0
      globalAudioRef.current = null
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
        globalAudioRef.current = audio
        audio.onended = () => {
          URL.revokeObjectURL(url)
          if (globalAudioRef.current === audio) globalAudioRef.current = null
        }
        audio.onerror = () => {
          if (globalAudioRef.current === audio) globalAudioRef.current = null
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
