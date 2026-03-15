import { useEffect } from 'react'
import type { AnimalResult } from '../types'
import { useSpeak } from '../hooks/useSpeak'
import { useTranslations } from '../i18n/useTranslations'
import { NesIcon } from './NesIcon'
import { AnimalImage } from './AnimalImage'

function slugify(z: string): string {
  const s = z.toLowerCase().replace(/\s/g, '')
  if (s.includes('super')) return 'superschaars'
  if (s.includes('zeldzaam')) return 'zeldzaam'
  if (s.includes('bijzonder')) return 'bijzonder'
  return 'gewoon'
}

const rarityBadgeClass: Record<string, string> = {
  superschaars: 'is-error',
  zeldzaam: 'is-warning',
  bijzonder: 'is-primary',
  gewoon: 'is-success',
}

const RARITY_KEYS: Record<string, string> = {
  gewoon: 'rarityGewoon',
  bijzonder: 'rarityBijzonder',
  zeldzaam: 'rarityZeldzaam',
  superschaars: 'raritySuperschaars',
}

const TYPE_KEYS: Record<string, string> = {
  plaatje: 'typePlaatje',
  speelgoed: 'typeSpeelgoed',
  dinosaurus: 'typeDinosaurus',
  fantasie: 'typeFantasie',
}

interface ResultCardProps {
  animal: AnimalResult
  xpGained: number
  isNew: boolean
  onSpeakAll: () => void
  /** Alleen bij scan: eerste automatische zin (bijv. alleen diernaam); anders onSpeakAll */
  onSpeakIntro?: () => void
  /** Vanuit collectie: geen auto-speak, toon "Nx gezien" i.p.v. XP/Nieuw */
  fromCollection?: boolean
  times?: number
}

export function ResultCard({ animal, xpGained, isNew, onSpeakAll, onSpeakIntro, fromCollection, times }: ResultCardProps) {
  const { t } = useTranslations()
  const { speak } = useSpeak()
  const slug = slugify(animal.zeldzaamheid)

  useEffect(() => {
    if (fromCollection) return
    const sayFirst = onSpeakIntro ?? onSpeakAll
    const timeoutId = setTimeout(sayFirst, 600)
    return () => clearTimeout(timeoutId)
  }, [animal.naam, onSpeakAll, onSpeakIntro, fromCollection])

  const weightSpeech = `${t('resultWeightPrefix')} ${animal.gewicht}. ${animal.vergelijking_gewicht}`
  const lengthSpeech = `${t('resultLengthPrefix')} ${animal.lengte} ${t('resultLengthSuffix')}. ${animal.vergelijking_lengte}`
  const ageSpeech = `${t('resultAgePrefix')} ${animal.leeftijd} ${t('resultAgeSuffix')}.`

  const compareItems: { icon: 'caret-right' | 'square' | 'check'; text: string }[] = [
    { icon: 'caret-right', text: animal.vergelijking_snelheid },
    { icon: 'square', text: animal.vergelijking_gewicht },
    { icon: 'check', text: animal.vergelijking_lengte },
  ]
  const weetjes = animal.weetjes ?? []
  const wicon: ('exclamation' | 'comment' | 'exclamation-triangle')[] = ['exclamation', 'comment', 'exclamation-triangle']

  return (
    <div className="animate-fade-up mb-6">
      <div className="nes-container is-rounded with-title is-dark mb-0">
        <p className="title flex flex-wrap items-center justify-center gap-2">
          <span className="nes-text is-primary">{animal.naam}</span>
          {animal.type && TYPE_KEYS[animal.type.toLowerCase()] && (
            <span className="nes-badge is-warning text-[10px]">{t(TYPE_KEYS[animal.type.toLowerCase()])}</span>
          )}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 relative py-2">
          <button
            type="button"
            onClick={onSpeakAll}
            className="nes-btn absolute top-2 right-2 min-h-[2.75rem] min-w-[2.75rem] flex items-center justify-center"
            style={{ padding: '0.5rem 0.75rem' }}
            aria-label={t('resultReadAll')}
          >
            <NesIcon name="play" size="2x" />
          </button>
          <AnimalImage naam={animal.naam} emoji={animal.emoji} size={88} className="shrink-0" />
          <span className={`nes-badge ${rarityBadgeClass[slug] ?? 'is-success'}`}>
            <span>{t(RARITY_KEYS[slug] ?? 'rarityGewoon')}</span>
          </span>
        </div>
      </div>

      <div className="nes-container is-rounded is-dark with-title mt-2">
        <p className="title">{t('resultTapToHear')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          <button
            type="button"
            onClick={() => speak(weightSpeech)}
            className="nes-container is-rounded is-dark py-3 px-2 text-center cursor-pointer"
          >
            <NesIcon name="circle" size="2x" />
            <div className="nes-text is-primary text-xs mt-1">{animal.gewicht}</div>
          </button>
          <button
            type="button"
            onClick={() => speak(lengthSpeech)}
            className="nes-container is-rounded is-dark py-3 px-2 text-center cursor-pointer"
          >
            <NesIcon name="caret-right" size="2x" />
            <div className="nes-text is-primary text-xs mt-1">{animal.lengte}</div>
          </button>
          <button
            type="button"
            onClick={() => speak(ageSpeech)}
            className="nes-container is-rounded is-dark py-3 px-2 text-center cursor-pointer"
          >
            <NesIcon name="calendar" size="2x" />
            <div className="nes-text is-primary text-xs mt-1">{animal.leeftijd}</div>
          </button>
        </div>

        <div className="space-y-2">
          {compareItems.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => speak(item.text)}
              className="nes-container is-rounded is-dark w-full py-2 px-3 flex items-center gap-2 text-left cursor-pointer"
            >
              <NesIcon name={item.icon} />
              <span className="nes-text is-disabled text-sm">{item.text}</span>
            </button>
          ))}
        </div>

        {weetjes.length > 0 && (
          <div className="mt-4 space-y-2">
            {weetjes.map((w, i) => (
              <button
                key={i}
                type="button"
                onClick={() => speak(w)}
                className="nes-container is-rounded is-dark w-full py-2 px-3 flex items-center gap-2 text-left cursor-pointer"
              >
                <NesIcon name={wicon[i % 3]} />
                <span className="nes-text is-disabled text-sm">{w}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="nes-container is-rounded is-dark mt-2 py-2 px-3 flex flex-wrap items-center justify-center gap-2">
        {fromCollection && times != null ? (
          <span className="nes-text is-disabled">{times} {t('resultTimesSeen')}</span>
        ) : (
          <>
            <span className="nes-text is-success">{t('resultXpGained', { n: xpGained })}</span>
            {isNew && (
              <span className="nes-badge is-primary">
                <span>Nieuw!</span>
              </span>
            )}
          </>
        )}
      </div>
    </div>
  )
}
