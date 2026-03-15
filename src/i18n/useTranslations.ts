import { useCallback } from 'react'
import { useSettingsStore } from '../store/useSettingsStore'
import { translations } from './translations'

export function useTranslations() {
  const locale = useSettingsStore((s) => s.locale)

  const t = useCallback(
    (key: string, replacements?: Record<string, string | number>) => {
      const str = translations[locale][key] ?? translations.nl[key] ?? key
      if (!replacements) return str
      return Object.entries(replacements).reduce(
        (acc, [k, v]) => acc.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v)),
        str
      )
    },
    [locale]
  )

  return { t, locale }
}
