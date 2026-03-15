import { create } from 'zustand'
import type { AppState, Achievement, AnimalResult } from '../types'
import { canonicalSoort } from '../lib/speciesCanonical'
import { mergeCollectionBySoort as mergeByKey } from '../lib/collectionMerge'
import {
  todayISO,
  yesterdayISO,
  getScansThisWeek,
  getScansThisMonth
} from '../lib/streakUtils'

function findExistingInCollection(
  collection: AppState['collection'],
  name: string,
  detail: AnimalResult | undefined
): typeof collection[0] | undefined {
  const canon = canonicalSoort(detail?.soort)
  if (canon) {
    const bySoort = collection.find((c) => c.soort && canonicalSoort(c.soort) === canon)
    if (bySoort) return bySoort
  }
  return collection.find((c) => c.name === name)
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first', icon: 'heart', name: 'Eerste stap', desc: 'Scan je eerste dier', req: (s) => s.totalSeen >= 1 },
  { id: 'five', icon: 'star', name: 'Vijf soorten', desc: 'Ontdek 5 soorten', req: (s) => s.collection.length >= 5 },
  { id: 'ten', icon: 'trophy', name: 'Tien soorten', desc: 'Ontdek 10 soorten', req: (s) => s.collection.length >= 10 },
  { id: 'rare', icon: 'trophy', name: 'Geluksvogel', desc: 'Ontdek een zeldzaam dier', req: (s) => s.foundRare },
  { id: 'streak3', icon: 'exclamation', name: 'Op rij!', desc: '3 dagen achter elkaar', req: (s) => s.streak >= 3 },
  { id: 'streak7', icon: 'exclamation', name: 'Weekkampioen', desc: '7 dagen achter elkaar', req: (s) => s.streak >= 7 },
  { id: 'streak30', icon: 'trophy', name: 'Maandkampioen', desc: '30 dagen achter elkaar', req: (s) => s.streak >= 30 },
  { id: 'week5', icon: 'star', name: 'Actieve week', desc: 'Scan 5 dagen deze week', req: (s) => getScansThisWeek(s.scanDates) >= 5 },
  { id: 'month10', icon: 'trophy', name: 'Actieve maand', desc: 'Scan 10 dagen deze maand', req: (s) => getScansThisMonth(s.scanDates) >= 10 },
  { id: 'xp500', icon: 'star', name: 'XP Meester', desc: 'Verdien 500 XP totaal', req: (s) => s.totalXP >= 500 }
]

const defaultState: AppState = {
  totalXP: 0,
  level: 1,
  totalSeen: 0,
  streak: 0,
  lastScanDate: null,
  scanDates: [],
  collection: [],
  foundRare: false,
  unlockedAchievements: []
}

const STORAGE_KEY = 'dp_state'

function loadState(): AppState {
  if (typeof localStorage === 'undefined') return defaultState
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as Partial<AppState>
    const withSoort = Array.isArray(parsed.collection)
      ? parsed.collection.map((item) => ({
          ...item,
          soort: item.soort ?? (item.detail?.soort ? canonicalSoort(item.detail.soort) : undefined)
        }))
      : defaultState.collection
    const collection = mergeByKey(withSoort, (item) =>
      item.soort ? canonicalSoort(item.soort) : canonicalSoort(item.name)
    )
    const state: AppState = {
      ...defaultState,
      ...parsed,
      collection,
      lastScanDate: parsed.lastScanDate ?? defaultState.lastScanDate,
      scanDates: Array.isArray(parsed.scanDates) ? parsed.scanDates : defaultState.scanDates,
      streak: typeof parsed.streak === 'number' ? parsed.streak : defaultState.streak
    }
    if (collection.length !== withSoort.length) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      } catch (_) {}
    }
    return state
  } catch {
    return defaultState
  }
}

function persist(state: AppState) {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (_) {}
}

export const useAppStore = create<AppState & {
  achievements: Achievement[]
  addSeenAnimal: (name: string, emoji: string, rarity: string, xp: number, _isNew: boolean, isRare?: boolean, detail?: AnimalResult) => { xpGained: number; isNew: boolean }
  addXP: (amount: number) => void
  checkAchievements: () => string[]
  resetAll: () => void
  getProgress: (achId: string) => number
  /** Of dit dier al in de collectie zit (op naam of soort). */
  hasInCollection: (name: string, detail?: AnimalResult) => boolean
}>((set, get) => ({
  ...loadState(),
  achievements: ACHIEVEMENTS,

  hasInCollection(name, detail) {
    return !!findExistingInCollection(get().collection, name, detail)
  },

  addSeenAnimal(name, emoji, rarity, xp, _isNew, isRare = false, detail) {
    const state = get()
    const existing = findExistingInCollection(state.collection, name, detail)
    const isNew = !existing
    let xpGained: number
    let newCollection: AppState['collection']
    if (existing) {
      newCollection = state.collection.map((c) =>
        c === existing
          ? { ...c, times: c.times + 1, name, emoji, detail: detail ?? c.detail }
          : c
      )
      xpGained = Math.round(xp * 0.4)
    } else {
      newCollection = [
        ...state.collection,
        {
          name,
          emoji,
          rarity,
          times: 1,
          detail,
          soort: detail?.soort ? canonicalSoort(detail.soort) : undefined
        }
      ]
      xpGained = xp
    }
    const today = todayISO()
    const yesterday = yesterdayISO()
    const newScanDates = state.scanDates.includes(today)
      ? state.scanDates
      : [...state.scanDates, today].sort()
    let newStreak = state.streak
    if (!state.lastScanDate) {
      newStreak = 1
    } else if (state.lastScanDate === yesterday) {
      newStreak = state.streak + 1
    } else if (state.lastScanDate !== today) {
      newStreak = 1
    }
    const newState: AppState = {
      ...state,
      totalSeen: state.totalSeen + 1,
      totalXP: state.totalXP + xpGained,
      level: Math.floor((state.totalXP + xpGained) / 100) + 1,
      collection: newCollection,
      foundRare: state.foundRare || isRare,
      lastScanDate: today,
      scanDates: newScanDates,
      streak: newStreak
    }
    set(newState)
    persist(newState)
    return { xpGained, isNew }
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
        newlyUnlocked.push(ach.id)
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
    if (ach.id === 'streak7') return Math.min(100, Math.round((state.streak / 7) * 100))
    if (ach.id === 'streak30') return Math.min(100, Math.round((state.streak / 30) * 100))
    if (ach.id === 'week5') return Math.min(100, Math.round((getScansThisWeek(state.scanDates) / 5) * 100))
    if (ach.id === 'month10') return Math.min(100, Math.round((getScansThisMonth(state.scanDates) / 10) * 100))
    if (ach.id === 'xp500') return Math.min(100, Math.round((state.totalXP / 500) * 100))
    return 0
  }
}))

