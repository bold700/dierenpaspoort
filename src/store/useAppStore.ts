import { create } from 'zustand'
import type { AppState, Achievement } from '../types'

const ACHIEVEMENTS: Achievement[] = [
  { id: 'first', icon: 'heart', name: 'Eerste stap', desc: 'Scan je eerste dier', req: (s) => s.totalSeen >= 1 },
  { id: 'five', icon: 'star', name: 'Vijf soorten', desc: 'Ontdek 5 soorten', req: (s) => s.collection.length >= 5 },
  { id: 'ten', icon: 'trophy', name: 'Tien soorten', desc: 'Ontdek 10 soorten', req: (s) => s.collection.length >= 10 },
  { id: 'rare', icon: 'trophy', name: 'Geluksvogel', desc: 'Ontdek een zeldzaam dier', req: (s) => s.foundRare },
  { id: 'streak3', icon: 'exclamation', name: 'Op rij!', desc: '3 dagen achter elkaar', req: (s) => s.streak >= 3 },
  { id: 'xp500', icon: 'star', name: 'XP Meester', desc: 'Verdien 500 XP totaal', req: (s) => s.totalXP >= 500 }
]

const defaultState: AppState = {
  totalXP: 0,
  level: 1,
  totalSeen: 0,
  streak: 1,
  collection: [],
  foundRare: false,
  unlockedAchievements: []
}

const STORAGE_KEY = 'dp_state'

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as AppState
    return { ...defaultState, ...parsed }
  } catch {
    return defaultState
  }
}

function persist(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (_) {}
}

export const useAppStore = create<AppState & {
  achievements: Achievement[]
  addSeenAnimal: (name: string, emoji: string, rarity: string, xp: number, _isNew: boolean, isRare?: boolean) => number
  addXP: (amount: number) => void
  checkAchievements: () => string[]
  resetAll: () => void
  getProgress: (achId: string) => number
}>((set, get) => ({
  ...loadState(),
  achievements: ACHIEVEMENTS,

  addSeenAnimal(name, emoji, rarity, xp, _isNew, isRare = false) {
    const state = get()
    const existing = state.collection.find((c) => c.name === name)
    let xpGained: number
    if (existing) {
      existing.times++
      xpGained = Math.round(xp * 0.4)
    } else {
      state.collection.push({ name, emoji, rarity, times: 1 })
      xpGained = xp
    }
    const newState: AppState = {
      ...state,
      totalSeen: state.totalSeen + 1,
      totalXP: state.totalXP + xpGained,
      level: Math.floor((state.totalXP + xpGained) / 100) + 1,
      collection: [...state.collection],
      foundRare: state.foundRare || isRare
    }
    set(newState)
    persist(newState)
    return xpGained
  },

  addXP(amount) {
    const state = get()
    const newTotal = state.totalXP + amount
    const newLevel = Math.floor(newTotal / 100) + 1
    set({ totalXP: newTotal, level: newLevel })
    persist({ ...state, totalXP: newTotal, level: newLevel })
  },

  checkAchievements() {
    const state = get()
    const newlyUnlocked: string[] = []
    ACHIEVEMENTS.forEach((ach) => {
      if (!state.unlockedAchievements.includes(ach.id) && ach.req(state)) {
        newlyUnlocked.push(ach.name)
        set({
          unlockedAchievements: [...state.unlockedAchievements, ach.id]
        })
        persist({ ...state, unlockedAchievements: [...state.unlockedAchievements, ach.id] })
      }
    })
    return newlyUnlocked
  },

  resetAll() {
    set(defaultState)
    persist(defaultState)
  },

  getProgress(achId: string) {
    const state = get()
    const ach = ACHIEVEMENTS.find((a) => a.id === achId)
    if (!ach || state.unlockedAchievements.includes(achId)) return 100
    if (ach.id === 'first') return Math.min(100, state.totalSeen * 100)
    if (ach.id === 'five') return Math.min(100, Math.round((state.collection.length / 5) * 100))
    if (ach.id === 'ten') return Math.min(100, Math.round((state.collection.length / 10) * 100))
    if (ach.id === 'streak3') return Math.min(100, Math.round((state.streak / 3) * 100))
    if (ach.id === 'xp500') return Math.min(100, Math.round((state.totalXP / 500) * 100))
    return 0
  }
}))

