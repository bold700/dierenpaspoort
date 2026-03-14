import { useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from '../store/useSettingsStore'
import { useAppStore } from '../store/useAppStore'
import { useSpeak } from '../hooks/useSpeak'
import { useAnimalScan } from '../hooks/useAnimalScan'
import { ResultCard } from './ResultCard'
import { NesIcon } from './NesIcon'
import type { AnimalResult } from '../types'

export function ScanPanel() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [result, setResult] = useState<{ animal: AnimalResult; xpGained: number; isNew: boolean } | null>(null)

  const hasApiKey = useSettingsStore((s) => s.hasApiKey())
  const addSeenAnimal = useAppStore((s) => s.addSeenAnimal)
  const checkAchievements = useAppStore((s) => s.checkAchievements)

  const { speak } = useSpeak()
  const { scan, loading, error } = useAnimalScan()

  const showToast = useCallback((msg: string) => {
    const el = document.getElementById('toast')
    if (el) {
      el.textContent = msg
      el.classList.add('show')
      setTimeout(() => el.classList.remove('show'), 2800)
    }
  }, [])

  const handleFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const data = (reader.result as string).split(',')[1]
          resolve(data ?? '')
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
      const mediaType = file.type || 'image/jpeg'
      setPreviewUrl(URL.createObjectURL(file))
      setResult(null)

      const animal = await scan(base64, mediaType)
      setPreviewUrl(null)

      if (!animal) {
        if (error) showToast(`Fout: ${error}`)
        else speak('Geen dier gevonden. Probeer een andere foto!')
        showToast('Geen dier herkend')
        e.target.value = ''
        return
      }

      const levelBefore = useAppStore.getState().level
      const isNew = !useAppStore.getState().collection.some((c) => c.name === animal.naam)
      const xpGained = addSeenAnimal(
        animal.naam,
        animal.emoji,
        animal.zeldzaamheid,
        animal.xp ?? 25,
        isNew,
        animal.zeldzaamheid === 'Zeldzaam' || animal.zeldzaamheid === 'Superschaars'
      )
      const levelAfter = useAppStore.getState().level
      if (levelAfter > levelBefore) {
        setTimeout(() => {
          speak(`Wauw! Level ${levelAfter} bereikt!`)
          showToast(`Level ${levelAfter}!`)
        }, 800)
      }
      setResult({ animal, xpGained, isNew })

      const newlyUnlocked = checkAchievements()
      if (newlyUnlocked.length) {
        setTimeout(() => {
          speak(`Gefeliciteerd! Badge behaald: ${newlyUnlocked[0]}`)
          showToast(`${newlyUnlocked[0]}!`)
        }, 1200)
      }

      e.target.value = ''
    },
    [scan, error, speak, showToast, addSeenAnimal, checkAchievements]
  )

  const speakAll = useCallback(() => {
    if (!result) return
    const a = result.animal
    speak(
      `${a.naam}! ${a.zeldzaamheid} dier. ${a.vergelijking_gewicht}. ${a.vergelijking_snelheid}. ${a.weetjes[0]}`
    )
  }, [result, speak])

  if (!hasApiKey) {
    return (
      <div className="nes-container is-rounded is-dark text-center py-6">
        <p className="nes-text is-warning mb-4">Voeg eerst een API-sleutel toe in de instellingen.</p>
        <button type="button" onClick={() => navigate('/settings')} className="nes-btn is-primary">
          Naar instellingen
        </button>
      </div>
    )
  }

  return (
    <div>
      <div
        className="nes-container is-rounded py-6 px-4 cursor-pointer select-none"
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFile}
        />
        {!loading ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 nes-container is-rounded mb-4">
              <NesIcon name="search" size="4x" />
            </div>
            <p className="nes-text is-primary text-lg font-bold mb-1">Maak een foto van een dier</p>
            <p className="nes-text is-disabled text-sm mb-4">Hond, vogel, insect — alles telt!</p>
            <button
              type="button"
              className="nes-btn is-primary"
              onClick={(e) => {
                e.stopPropagation()
                fileInputRef.current?.click()
              }}
            >
              Foto kiezen
            </button>
          </div>
        ) : (
          <div className="text-center">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full max-h-48 object-cover mb-4 nes-container is-rounded"
              />
            )}
            <p className="nes-text is-primary mb-2">AI herkent het dier...</p>
            <progress className="nes-progress is-primary" value={70} max={100} />
          </div>
        )}
      </div>

      {result && (
        <ResultCard
          animal={result.animal}
          xpGained={result.xpGained}
          isNew={result.isNew}
          onSpeakAll={speakAll}
        />
      )}
    </div>
  )
}
