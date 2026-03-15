import type { Locale } from '../i18n/translations'
import { contentNl } from './leerContentNl'
import { contentEn } from './leerContentEn'
import { contentEs } from './leerContentEs'
import { contentZh } from './leerContentZh'
import { contentFr } from './leerContentFr'

export type LeerContentItem = {
  naam: string
  kort?: string
  beschrijving: string
  weetjes: [string, string, string, string, string]
}

export type LeerContentLocale = Record<string, LeerContentItem>

export const LEER_CONTENT: Record<Locale, LeerContentLocale> = {
  nl: contentNl,
  en: contentEn,
  es: contentEs,
  zh: contentZh,
  fr: contentFr,
}
