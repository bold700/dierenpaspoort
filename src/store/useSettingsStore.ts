import { create } from 'zustand'
import type { AIProvider, TTSProvider } from '../types'
import { VOICES } from '../constants'
import type { AllIconId } from '../assets/nes-icons'
import type { Locale } from '../i18n/translations'

export type ProfileIconName = AllIconId

export interface SettingsState {
  locale: Locale
  provider: AIProvider
  apiKey: string
  tts: TTSProvider
  elKey: string
  voiceId: string
  profileIcon: ProfileIconName
}

const STORAGE_KEY = 'dp_settings'

function load(): SettingsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefault()
    const parsed = JSON.parse(raw) as Partial<SettingsState>
    return { ...getDefault(), ...parsed }
  } catch {
    return getDefault()
  }
}

function getDefault(): SettingsState {
  return {
    locale: 'nl',
    provider: 'anthropic',
    apiKey: '',
    tts: 'browser',
    elKey: '',
    voiceId: VOICES[0].id,
    profileIcon: 'heart'
  }
}

function save(s: SettingsState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch (_) {}
}

export const useSettingsStore = create<SettingsState & {
  setLocale: (l: Locale) => void
  setProvider: (p: AIProvider) => void
  setApiKey: (k: string) => void
  setTTS: (t: TTSProvider) => void
  setElKey: (k: string) => void
  setVoiceId: (id: string) => void
  setProfileIcon: (icon: ProfileIconName) => void
  hasApiKey: () => boolean
  hasElKey: () => boolean
}>((set, get) => ({
  ...load(),

  setLocale(locale) {
    set({ locale })
    save({ ...get(), locale })
  },
  setProvider(provider) {
    set({ provider })
    save({ ...get(), provider })
  },
  setApiKey(apiKey) {
    set({ apiKey })
    save({ ...get(), apiKey })
  },
  setTTS(tts) {
    set({ tts })
    save({ ...get(), tts })
  },
  setElKey(elKey) {
    set({ elKey })
    save({ ...get(), elKey })
  },
  setVoiceId(voiceId) {
    set({ voiceId })
    save({ ...get(), voiceId })
  },
  setProfileIcon(profileIcon) {
    set({ profileIcon })
    save({ ...get(), profileIcon })
  },
  hasApiKey() {
    return !!get().apiKey
  },
  hasElKey() {
    return !!get().elKey
  }
}))
