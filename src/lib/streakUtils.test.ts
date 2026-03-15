import { describe, it, expect } from 'vitest'
import {
  getScansThisWeek,
  getScansThisMonth,
  todayISO,
  yesterdayISO
} from './streakUtils'

describe('streakUtils', () => {
  const maandag = new Date('2025-03-17')
  const volgendeMaandag = new Date('2025-03-24')

  describe('getScansThisWeek', () => {
    it('telt alleen datums in dezelfde week (ma-zo)', () => {
      const dates = ['2025-03-17', '2025-03-18', '2025-03-19', '2025-03-24']
      expect(getScansThisWeek(dates, maandag)).toBe(3)
      expect(getScansThisWeek(dates, volgendeMaandag)).toBe(1)
    })

    it('returnt 0 bij geen datums in de week', () => {
      expect(getScansThisWeek(['2025-04-01'], maandag)).toBe(0)
    })
  })

  describe('getScansThisMonth', () => {
    it('telt alleen datums in dezelfde maand', () => {
      const dates = ['2025-03-01', '2025-03-15', '2025-03-31', '2025-04-01']
      expect(getScansThisMonth(dates, new Date('2025-03-15'))).toBe(3)
    })

    it('returnt 0 bij geen datums in de maand', () => {
      expect(getScansThisMonth(['2025-04-01'], new Date('2025-03-15'))).toBe(0)
    })
  })

  describe('todayISO / yesterdayISO', () => {
    it('geeft YYYY-MM-DD terug', () => {
      expect(todayISO(maandag)).toBe('2025-03-17')
      expect(yesterdayISO(maandag)).toBe('2025-03-16')
    })
  })
})
