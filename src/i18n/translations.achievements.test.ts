import { describe, it, expect } from 'vitest'
import { ACHIEVEMENTS } from '../store/useAppStore'
import { translations } from './translations'

const LOCALES = ['nl', 'en', 'es', 'zh', 'fr'] as const

describe('achievement i18n', () => {
  it('heeft voor elke achievement id een _name en _desc in elke taal', () => {
    for (const locale of LOCALES) {
      const t = translations[locale]
      for (const ach of ACHIEVEMENTS) {
        expect(
          t[`achievement_${ach.id}_name`],
          `locale ${locale}, achievement ${ach.id} name`
        ).toBeDefined()
        expect(
          t[`achievement_${ach.id}_desc`],
          `locale ${locale}, achievement ${ach.id} desc`
        ).toBeDefined()
      }
    }
  })
})
