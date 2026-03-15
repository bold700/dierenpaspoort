import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from '../store/useSettingsStore'
import { useAppStore } from '../store/useAppStore'
import { useSpeak } from '../hooks/useSpeak'
import { useTranslations } from '../i18n/useTranslations'
import { LOCALE_NAMES, type Locale } from '../i18n/translations'
import { VOICES } from '../constants'
import { ALL_ICON_IDS } from '../assets/nes-icons'
import { NesIcon } from './NesIcon'

const LOCALES: Locale[] = ['nl', 'en', 'es', 'zh', 'fr']

export function SettingsPanel() {
  const { t } = useTranslations()
  const navigate = useNavigate()
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [elKeyInput, setElKeyInput] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [showElKey, setShowElKey] = useState(false)

  const {
    locale,
    setLocale,
    provider,
    apiKey,
    tts,
    elKey,
    voiceId,
    profileIcon,
    profilePhoto,
    setProvider,
    setApiKey,
    setTTS,
    setElKey,
    setVoiceId,
    setProfileIcon,
    setProfilePhoto,
    hasElKey,
  } = useSettingsStore()

  const profilePhotoInputRef = useRef<HTMLInputElement>(null)

  const resetAll = useAppStore((s) => s.resetAll)
  const { speakElevenLabs } = useSpeak()

  const showToast = (msg: string) => {
    const el = document.getElementById('toast')
    if (el) {
      el.textContent = msg
      el.classList.add('show')
      setTimeout(() => el.classList.remove('show'), 2800)
    }
  }

  const handleSaveKey = () => {
    const v = apiKeyInput.trim()
    if (!v) {
      showToast(t('toastFillKey'))
      return
    }
    setApiKey(v)
    setApiKeyInput('')
    showToast(t('toastKeySaved'))
  }

  const handleSaveElevenLabs = () => {
    const v = elKeyInput.trim()
    if (!v) {
      showToast(t('toastFillElKey'))
      return
    }
    setElKey(v)
    setElKeyInput('')
    setTTS('elevenlabs')
    showToast(t('toastElSaved'))
  }

  const handleTestElevenLabs = async () => {
    if (!hasElKey()) {
      showToast(t('toastSaveElFirst'))
      return
    }
    await speakElevenLabs('Wauw! Je hebt een tijger gevonden! Dat is een zeldzaam dier!')
  }

  const handleReset = () => {
    if (!window.confirm(t('confirmReset'))) return
    resetAll()
    showToast(t('toastResetDone'))
    navigate('/')
  }

  const keyMask = (k: string) => (k ? `${k.slice(0, 6)}••••${k.slice(-4)}` : '')

  const resizeImageToDataUrl = (file: File, maxSize: number): Promise<string> =>
    new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        URL.revokeObjectURL(url)
        const size = Math.min(img.naturalWidth || img.width, img.naturalHeight || img.height, maxSize)
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas not supported'))
          return
        }
        const w = img.naturalWidth || img.width
        const h = img.naturalHeight || img.height
        const scale = size / Math.min(w, h)
        const dw = w * scale
        const dh = h * scale
        const dx = (size - dw) / 2
        const dy = (size - dh) / 2
        ctx.drawImage(img, 0, 0, w, h, dx, dy, dw, dh)
        resolve(canvas.toDataURL('image/jpeg', 0.92))
      }
      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('Image load failed'))
      }
      img.src = url
    })

  const handleProfilePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file?.type.startsWith('image/')) return
    e.target.value = ''
    try {
      const dataUrl = await resizeImageToDataUrl(file, 192)
      setProfilePhoto(dataUrl)
    } catch {
      showToast(t('settingsProfilePhotoError'))
    }
  }

  return (
    <div className="space-y-4 pb-8">
      <div className="nes-container is-rounded is-dark">
        <p className="nes-text is-primary text-xs font-bold mb-2">{t('settingsLanguage')}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {LOCALES.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => setLocale(loc)}
              className={`nes-btn text-sm ${locale === loc ? 'is-primary' : ''}`}
            >
              {LOCALE_NAMES[loc]}
            </button>
          ))}
        </div>
      </div>

      <div className="nes-container is-rounded is-dark">
        <p className="nes-text is-primary text-xs font-bold mb-3">{t('settingsProfileIcon')}</p>
        <input
          ref={profilePhotoInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfilePhotoChange}
        />
        <div className="flex flex-col sm:flex-row items-start gap-3 mb-3">
          <div className="relative flex shrink-0 items-center justify-center w-16 h-16 min-w-[4rem] min-h-[4rem] nes-container is-rounded overflow-hidden bg-[#212529] p-0">
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            ) : (
              <NesIcon name={profileIcon} size="4x" />
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="nes-btn is-primary"
              onClick={() => profilePhotoInputRef.current?.click()}
            >
              {t('settingsProfilePhotoChoose')}
            </button>
            {profilePhoto && (
              <button
                type="button"
                className="nes-btn"
                onClick={() => setProfilePhoto(null)}
              >
                {t('settingsProfilePhotoRemove')}
              </button>
            )}
          </div>
        </div>
        <p className="nes-text is-disabled text-xs mb-2">{t('settingsProfileIconOr')}</p>
        <div className="flex flex-wrap gap-2">
          {ALL_ICON_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setProfileIcon(id)}
              className={`nes-container is-rounded is-dark flex items-center justify-center w-10 h-10 p-0 cursor-pointer ${
                !profilePhoto && profileIcon === id ? 'ring-2 ring-[#209cee]' : ''
              }`}
              aria-label={`Icoon ${id}`}
            >
              <NesIcon name={id} />
            </button>
          ))}
        </div>
      </div>

      <div className="nes-container is-rounded is-dark">
        <p className="nes-text is-primary text-xs font-bold mb-2">{t('settingsAiProvider')}</p>
        <div className="flex flex-col gap-2 mb-4">
          <button
            type="button"
            onClick={() => setProvider('anthropic')}
            className={`nes-btn w-full text-xs sm:text-base ${provider === 'anthropic' ? 'is-primary' : ''}`}
          >
            Anthropic
          </button>
          <button
            type="button"
            onClick={() => setProvider('openai')}
            className={`nes-btn w-full text-xs sm:text-base ${provider === 'openai' ? 'is-primary' : ''}`}
          >
            OpenAI
          </button>
        </div>
        <p className="nes-text is-primary text-xs font-bold mb-2">{t('settingsApiKey')}</p>
        <div className="relative mb-2">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            placeholder={apiKey ? t('settingsPlaceholderNewKey') : t('settingsPlaceholderKey')}
            className="nes-input is-dark w-full"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-2 top-1/2 -translate-y-1/2"
            aria-label={showKey ? t('settingsHide') : t('settingsShow')}
          >
            <NesIcon name={showKey ? 'eye-slash' : 'eye'} />
          </button>
        </div>
        <p className={`text-xs mt-1 ${apiKey ? 'nes-text is-success' : 'nes-text is-disabled'}`}>{apiKey ? keyMask(apiKey) : t('settingsNoKey')}</p>
        <button type="button" onClick={handleSaveKey} className="nes-btn is-primary w-full mt-3">
          {t('settingsSave')}
        </button>
      </div>

      <div className="nes-container is-rounded is-dark">
        <p className="nes-text is-primary text-xs font-bold mb-2">{t('settingsVoice')}</p>
        <div className="flex flex-col gap-2 mb-4">
          <button
            type="button"
            onClick={() => setTTS('browser')}
            className={`nes-btn w-full text-xs sm:text-base whitespace-nowrap ${tts === 'browser' ? 'is-primary' : ''}`}
          >
            <NesIcon name="cog" className="mr-1 shrink-0" /> Browser
          </button>
          <button
            type="button"
            onClick={() => setTTS('elevenlabs')}
            className={`nes-btn w-full text-xs sm:text-base whitespace-nowrap ${tts === 'elevenlabs' ? 'is-primary' : ''}`}
          >
            <NesIcon name="star" className="mr-1 shrink-0" /> ElevenLabs
          </button>
        </div>

        {tts === 'elevenlabs' && (
          <div className="mt-3">
            <p className="nes-text is-primary text-xs font-bold mb-2">{t('settingsElKey')}</p>
            <div className="relative mb-2">
              <input
                type={showElKey ? 'text' : 'password'}
                value={elKeyInput}
                onChange={(e) => setElKeyInput(e.target.value)}
                placeholder={elKey ? t('settingsPlaceholderNewKey') : t('settingsPlaceholderElKey')}
                className="nes-input is-dark w-full"
              />
              <button
                type="button"
                onClick={() => setShowElKey(!showElKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
                aria-label={showElKey ? t('settingsHide') : t('settingsShow')}
              >
                <NesIcon name={showElKey ? 'eye-slash' : 'eye'} />
              </button>
            </div>
            <p className={`text-xs mt-1 ${elKey ? 'nes-text is-success' : 'nes-text is-disabled'}`}>{elKey ? keyMask(elKey) : t('settingsNoKey')}</p>
            <p className="nes-text is-primary text-xs font-bold mt-3 mb-2">{t('settingsChooseVoice')}</p>
            <div className="grid grid-cols-2 gap-2">
              {VOICES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVoiceId(v.id)}
                  className={`voice-option nes-btn text-left text-sm min-w-0 overflow-hidden ${voiceId === v.id ? 'is-primary' : ''}`}
                >
                  <div className="nes-text is-primary font-bold truncate">{v.name}</div>
                  <div className="nes-text is-disabled text-[10px] truncate mt-0.5">{v.desc}</div>
                </button>
              ))}
            </div>
            <button type="button" onClick={handleTestElevenLabs} className="nes-btn mt-3 w-full">
              <NesIcon name="play" className="mr-1" /> {t('settingsTestVoice')}
            </button>
            <button type="button" onClick={handleSaveElevenLabs} className="nes-btn is-primary w-full mt-2">
              {t('settingsSave')}
            </button>
          </div>
        )}
      </div>

      <div className="nes-container is-rounded is-dark">
        <p className="nes-text is-primary text-xs font-bold mb-2">{t('settingsInfo')}</p>
        <p className="nes-text is-disabled text-sm">{t('settingsInfoText')}</p>
        <hr className="my-3 border-[#4a4f57]" />
        <p className="nes-text is-disabled text-xs">
          Mogelijk gemaakt door{' '}
          <a
            href="https://www.bold700.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nes-text is-primary hover:underline"
          >
            BOLD700
          </a>
        </p>
      </div>

      <div className="nes-container is-rounded is-dark">
        <p className="nes-text is-error text-xs font-bold mb-2">{t('settingsDangerZone')}</p>
        <button type="button" onClick={handleReset} className="nes-btn is-error w-full">
          <NesIcon name="times" className="mr-1" /> {t('settingsReset')}
        </button>
      </div>
    </div>
  )
}
