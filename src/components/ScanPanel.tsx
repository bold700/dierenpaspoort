import { useRef, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from '../store/useSettingsStore'
import { useAppStore } from '../store/useAppStore'
import { useSpeak } from '../hooks/useSpeak'
import { useTranslations } from '../i18n/useTranslations'
import { useAnimalScan } from '../hooks/useAnimalScan'
import { ResultCard } from './ResultCard'
import { NesIcon } from './NesIcon'
import type { AnimalResult } from '../types'

export function ScanPanel() {
  const { t } = useTranslations()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [result, setResult] = useState<{ animal: AnimalResult; xpGained: number; isNew: boolean } | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

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

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setCameraActive(false)
    setCameraError(null)
  }, [])

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  const runScan = useCallback(
    async (base64: string, mediaType: string) => {
      setResult(null)
      setPreviewUrl(`data:${mediaType};base64,${base64}`)

      const animal = await scan(base64, mediaType)
      setPreviewUrl(null)

      if (!animal) {
        if (error) showToast(t('scanError', { error }))
        else speak(t('scanNoAnimal'))
        showToast(t('scanNoAnimal'))
        return
      }

      const levelBefore = useAppStore.getState().level
      const { xpGained, isNew } = addSeenAnimal(
        animal.naam,
        animal.emoji,
        animal.zeldzaamheid,
        animal.xp ?? 25,
        false,
        animal.zeldzaamheid === 'Zeldzaam' || animal.zeldzaamheid === 'Superschaars',
        animal
      )
      const levelAfter = useAppStore.getState().level
      if (levelAfter > levelBefore) {
        setTimeout(() => {
          speak(t('scanLevelReached', { n: levelAfter }))
          showToast(t('scanLevelToast', { n: levelAfter }))
        }, 800)
      }
      setResult({ animal, xpGained, isNew })

      const newlyUnlocked = checkAchievements()
      if (newlyUnlocked.length) {
        const badgeName = t(`achievement_${newlyUnlocked[0]}_name`)
        setTimeout(() => {
          speak(t('scanBadgeUnlocked', { name: badgeName }))
          showToast(`${badgeName}!`)
        }, 1200)
      }
    },
    [scan, error, speak, showToast, addSeenAnimal, checkAchievements, t]
  )

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
      e.target.value = ''
      await runScan(base64, mediaType)
    },
    [runScan]
  )

  const startCamera = useCallback(async () => {
    setCameraError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } }
      })
      streamRef.current = stream
      setCameraActive(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : t('scanCameraDenied')
      setCameraError(msg)
    }
  }, [t])

  // Koppel stream aan video zodra het element in de DOM staat (na setCameraActive(true))
  useEffect(() => {
    if (!cameraActive || !streamRef.current || !videoRef.current) return
    const video = videoRef.current
    video.srcObject = streamRef.current
    video.play().catch(() => {})
  }, [cameraActive])

  const capturePhoto = useCallback(() => {
    const video = videoRef.current
    if (!video || !streamRef.current || !video.videoWidth) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(video, 0, 0)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
    const base64 = dataUrl.split(',')[1] ?? ''
    stopCamera()
    runScan(base64, 'image/jpeg')
  }, [stopCamera, runScan])

  const speakIntro = useCallback(() => {
    if (!result) return
    const a = result.animal
    const type = a.type
    if (type === 'dinosaurus') speak(`${a.naam}! ${t('speakIntroDino')}`)
    else if (type === 'fantasie') speak(`${a.naam}! ${t('speakIntroFantasie')}`)
    else if (type === 'plaatje') speak(t('speakIntroPlaatje', { name: a.naam }))
    else if (type === 'speelgoed') speak(t('speakIntroSpeelgoed', { name: a.naam }))
    else speak(`${a.naam}!`)
  }, [result, speak, t])

  const speakAll = useCallback(() => {
    if (!result) return
    const a = result.animal
    const typeKey = a.type === 'dinosaurus' ? 'speakTypeDino' : a.type === 'fantasie' ? 'speakTypeFantasie' : 'speakTypeDier'
    const rarityKey =
      (a.zeldzaamheid ?? '').toLowerCase().includes('super') ? 'raritySuperschaars'
      : (a.zeldzaamheid ?? '').toLowerCase().includes('zeldzaam') ? 'rarityZeldzaam'
      : (a.zeldzaamheid ?? '').toLowerCase().includes('bijzonder') ? 'rarityBijzonder'
      : 'rarityGewoon'
    speak(
      `${a.naam}! ${t(rarityKey)} ${t(typeKey)}. ${a.vergelijking_gewicht}. ${a.vergelijking_snelheid}. ${a.weetjes?.[0] ?? ''}`
    )
  }, [result, speak, t])

  if (!hasApiKey) {
    return (
      <div className="nes-container is-rounded is-dark text-center py-6">
        <p className="nes-text is-warning mb-4">{t('scanNoApiKey')}</p>
        <button type="button" onClick={() => navigate('/settings')} className="nes-btn is-primary">
          {t('scanGoToSettings')}
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="nes-container is-rounded py-6 px-4 select-none">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
        {cameraActive && !loading ? (
          <div className="text-center">
            <div className="relative w-full max-h-64 bg-black rounded-lg overflow-hidden mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            </div>
            {cameraError && (
              <p className="nes-text is-error text-xs mb-2">{cameraError}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                className="nes-btn is-primary"
                onClick={capturePhoto}
              >
                <NesIcon name="search" className="mr-1 shrink-0" /> {t('scanTakePhoto')}
              </button>
              <button type="button" className="nes-btn" onClick={stopCamera}>
                {t('scanCancel')}
              </button>
            </div>
          </div>
        ) : !loading ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 nes-container is-rounded mb-4">
              <NesIcon name="search" size="4x" />
            </div>
            <p className="nes-text is-primary text-lg font-bold mb-1">{t('scanTitle')}</p>
            <p className="nes-text is-disabled text-sm mb-4">{t('scanSubtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                className="nes-btn is-primary"
                onClick={() => fileInputRef.current?.click()}
              >
                {t('scanChoosePhoto')}
              </button>
              <button
                type="button"
                className="nes-btn"
                onClick={startCamera}
              >
                <NesIcon name="cog" className="mr-1 shrink-0" /> {t('scanUseCamera')}
              </button>
            </div>
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
            <p className="nes-text is-primary mb-2">{t('scanRecognizing')}</p>
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
          onSpeakIntro={speakIntro}
        />
      )}
    </div>
  )
}
