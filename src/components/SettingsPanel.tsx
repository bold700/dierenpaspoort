import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from '../store/useSettingsStore'
import { useAppStore } from '../store/useAppStore'
import { useSpeak } from '../hooks/useSpeak'
import { VOICES } from '../constants'
import { ALL_ICON_IDS } from '../assets/nes-icons'
import { NesIcon } from './NesIcon'

export function SettingsPanel() {
  const navigate = useNavigate()
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [elKeyInput, setElKeyInput] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [showElKey, setShowElKey] = useState(false)

  const {
    provider,
    apiKey,
    tts,
    elKey,
    voiceId,
    profileIcon,
    setProvider,
    setApiKey,
    setTTS,
    setElKey,
    setVoiceId,
    setProfileIcon,
    hasElKey,
  } = useSettingsStore()

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
      showToast('Vul eerst een sleutel in')
      return
    }
    setApiKey(v)
    setApiKeyInput('')
    showToast('AI-sleutel opgeslagen')
  }

  const handleSaveElevenLabs = () => {
    const v = elKeyInput.trim()
    if (!v) {
      showToast('Vul eerst je ElevenLabs key in')
      return
    }
    setElKey(v)
    setElKeyInput('')
    setTTS('elevenlabs')
    showToast('ElevenLabs opgeslagen – voorlezen gebruikt nu ElevenLabs')
  }

  const handleTestElevenLabs = async () => {
    if (!hasElKey()) {
      showToast('Sla eerst je ElevenLabs key op')
      return
    }
    await speakElevenLabs('Wauw! Je hebt een tijger gevonden! Dat is een zeldzaam dier!')
  }

  const handleReset = () => {
    if (!window.confirm('Weet je zeker? Alle voortgang wordt gewist.')) return
    resetAll()
    showToast('Collectie gereset')
    navigate('/')
  }

  const keyMask = (k: string) => (k ? `${k.slice(0, 6)}••••${k.slice(-4)}` : '')

  return (
    <div className="space-y-4 pb-8">
      <div className="nes-container is-rounded is-dark">
        <p className="nes-text is-primary text-xs font-bold mb-3">Profielicoon</p>
        <div className="flex flex-wrap gap-2">
          {ALL_ICON_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setProfileIcon(id)}
              className={`nes-container is-rounded is-dark flex items-center justify-center w-10 h-10 p-0 cursor-pointer ${
                profileIcon === id ? 'ring-2 ring-[#209cee]' : ''
              }`}
              aria-label={`Icoon ${id}`}
            >
              <NesIcon name={id} />
            </button>
          ))}
        </div>
      </div>

      <div className="nes-container is-rounded is-dark">
        <p className="nes-text is-primary text-xs font-bold mb-2">AI-provider</p>
        <div className="flex flex-nowrap gap-2 mb-4 min-w-0">
          <button
            type="button"
            onClick={() => setProvider('anthropic')}
            className={`nes-btn flex-1 min-w-0 text-xs sm:text-base ${provider === 'anthropic' ? 'is-primary' : ''}`}
          >
            Anthropic
          </button>
          <button
            type="button"
            onClick={() => setProvider('openai')}
            className={`nes-btn flex-1 min-w-0 text-xs sm:text-base ${provider === 'openai' ? 'is-primary' : ''}`}
          >
            OpenAI
          </button>
        </div>
        <p className="nes-text is-primary text-xs font-bold mb-2">API-sleutel</p>
        <div className="relative mb-2">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            placeholder={apiKey ? 'Nieuwe sleutel...' : 'Plak je API-sleutel...'}
            className="nes-input is-dark w-full"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-2 top-1/2 -translate-y-1/2"
            aria-label={showKey ? 'Verberg' : 'Toon'}
          >
            <NesIcon name={showKey ? 'eye-slash' : 'eye'} />
          </button>
        </div>
        <p className={`text-xs mt-1 ${apiKey ? 'nes-text is-success' : 'nes-text is-disabled'}`}>{apiKey ? keyMask(apiKey) : 'Geen sleutel'}</p>
        <button type="button" onClick={handleSaveKey} className="nes-btn is-primary w-full mt-3">
          Opslaan
        </button>
      </div>

      <div className="nes-container is-rounded is-dark">
        <p className="nes-text is-primary text-xs font-bold mb-2">Stem (voorlezen)</p>
        <div className="flex flex-nowrap gap-2 mb-4 min-w-0">
          <button
            type="button"
            onClick={() => setTTS('browser')}
            className={`nes-btn flex-1 min-w-0 text-xs sm:text-base whitespace-nowrap ${tts === 'browser' ? 'is-primary' : ''}`}
          >
            <NesIcon name="cog" className="mr-1 shrink-0" /> Browser
          </button>
          <button
            type="button"
            onClick={() => setTTS('elevenlabs')}
            className={`nes-btn flex-1 min-w-0 text-xs sm:text-base whitespace-nowrap ${tts === 'elevenlabs' ? 'is-primary' : ''}`}
          >
            <NesIcon name="star" className="mr-1 shrink-0" /> ElevenLabs
          </button>
        </div>

        {tts === 'elevenlabs' && (
          <div className="mt-3">
            <p className="nes-text is-primary text-xs font-bold mb-2">ElevenLabs API-sleutel</p>
            <div className="relative mb-2">
              <input
                type={showElKey ? 'text' : 'password'}
                value={elKeyInput}
                onChange={(e) => setElKeyInput(e.target.value)}
                placeholder={elKey ? 'Nieuwe sleutel...' : 'Plak je key...'}
                className="nes-input is-dark w-full"
              />
              <button
                type="button"
                onClick={() => setShowElKey(!showElKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
                aria-label={showElKey ? 'Verberg' : 'Toon'}
              >
                <NesIcon name={showElKey ? 'eye-slash' : 'eye'} />
              </button>
            </div>
            <p className={`text-xs mt-1 ${elKey ? 'nes-text is-success' : 'nes-text is-disabled'}`}>{elKey ? keyMask(elKey) : 'Geen sleutel'}</p>
            <p className="nes-text is-primary text-xs font-bold mt-3 mb-2">Kies een stem</p>
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
              <NesIcon name="play" className="mr-1" /> Test stem
            </button>
            <button type="button" onClick={handleSaveElevenLabs} className="nes-btn is-primary w-full mt-2">
              Opslaan
            </button>
          </div>
        )}
      </div>

      <div className="nes-container is-rounded is-dark">
        <p className="nes-text is-primary text-xs font-bold mb-2">Info</p>
        <p className="nes-text is-disabled text-sm">Sleutels worden alleen lokaal opgeslagen. Nooit gedeeld.</p>
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
        <p className="nes-text is-error text-xs font-bold mb-2">Gevaarlijke zone</p>
        <button type="button" onClick={handleReset} className="nes-btn is-error w-full">
          <NesIcon name="times" className="mr-1" /> Reset collectie & XP
        </button>
      </div>
    </div>
  )
}
