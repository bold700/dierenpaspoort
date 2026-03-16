import { describe, expect, it } from 'vitest'
import type { Locale } from '../i18n/translations'
import { LEER_CONTENT } from './leerContent'
import { getLeerDierenWithLocale } from './leerDieren'

const LOCALES: Locale[] = ['nl', 'en', 'es', 'zh', 'fr']

describe('getLeerDierenWithLocale', () => {
  it('geeft elk dier minimaal 10 unieke weetjes in elke taal', () => {
    for (const locale of LOCALES) {
      const dieren = getLeerDierenWithLocale(locale)

      for (const dier of dieren) {
        expect(
          dier.weetjes.length,
          `locale ${locale}, dier ${dier.id} should have at least 10 facts`
        ).toBeGreaterThanOrEqual(10)

        expect(
          new Set(dier.weetjes).size,
          `locale ${locale}, dier ${dier.id} should have at least 10 unique facts`
        ).toBeGreaterThanOrEqual(10)
      }
    }
  })

  it('behoudt de originele locale-weetjes vooraan in dezelfde volgorde', () => {
    for (const locale of LOCALES) {
      const dieren = getLeerDierenWithLocale(locale)
      const content = LEER_CONTENT[locale]

      for (const dier of dieren) {
        const origineel = content[dier.id]
        expect(
          dier.weetjes.slice(0, origineel.weetjes.length),
          `locale ${locale}, dier ${dier.id} should keep original facts first`
        ).toEqual(origineel.weetjes)
      }
    }
  })
})
