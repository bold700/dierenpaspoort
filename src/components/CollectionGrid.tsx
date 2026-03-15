import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { useSpeak } from '../hooks/useSpeak'
import { useTranslations } from '../i18n/useTranslations'
import { ResultCard } from './ResultCard'
import { AnimalImage } from './AnimalImage'
import type { CollectionItem } from '../types'

function slugify(r: string): string {
  const s = r.toLowerCase().replace(/\s/g, '')
  if (s.includes('super')) return 'superschaars'
  if (s.includes('zeldzaam')) return 'zeldzaam'
  if (s.includes('bijzonder')) return 'bijzonder'
  return 'gewoon'
}

const dotColor: Record<string, string> = {
  gewoon: '#66bb6a',
  bijzonder: '#209cee',
  zeldzaam: '#f7b731',
  superschaars: '#e74c3c',
}

export function CollectionGrid() {
  const { t } = useTranslations()
  const collection = useAppStore((s) => s.collection)
  const { speak } = useSpeak()
  const [selected, setSelected] = useState<CollectionItem | null>(null)

  const rarityToKey = useCallback((r: string) => {
    const s = (r ?? '').toLowerCase()
    if (s.includes('super')) return 'raritySuperschaars'
    if (s.includes('zeldzaam')) return 'rarityZeldzaam'
    if (s.includes('bijzonder')) return 'rarityBijzonder'
    return 'rarityGewoon'
  }, [])

  const speakAllFor = useCallback(
    (item: CollectionItem) => {
      if (item.detail) {
        const a = item.detail
        const typeKey = a.type === 'dinosaurus' ? 'speakTypeDino' : a.type === 'fantasie' ? 'speakTypeFantasie' : 'speakTypeDier'
        const rarityKey = rarityToKey(a.zeldzaamheid)
        speak(
          `${a.naam}! ${t(rarityKey)} ${t(typeKey)}. ${a.vergelijking_gewicht}. ${a.vergelijking_snelheid}. ${a.weetjes?.[0] ?? ''}`
        )
      } else {
        speak(t('collectionSpeakTimes', { name: item.name, times: item.times }))
      }
    },
    [speak, t, rarityToKey]
  )

  if (!collection.length) {
    return (
      <div className="nes-container is-rounded text-center py-8 px-4">
        <div className="flex justify-center mb-3">
          <i className="nes-icon search size-4x" aria-hidden />
        </div>
        <p className="nes-text is-primary font-bold mb-2">{t('collectionEmptyTitle')}</p>
        <p className="nes-text is-disabled text-sm mb-4">{t('collectionEmptySubtitle')}</p>
        <Link to="/" className="nes-btn is-primary">
          {t('tabsScan')}
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {selected && (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="nes-btn is-primary"
          >
            {t('collectionBack')}
          </button>
          {selected.detail ? (
            <ResultCard
              animal={selected.detail}
              xpGained={0}
              isNew={false}
              onSpeakAll={() => speakAllFor(selected)}
              fromCollection
              times={selected.times}
            />
          ) : (
            <div className="nes-container is-rounded is-dark with-title">
              <p className="title">{selected.name}</p>
              <div className="flex flex-col items-center gap-2 py-4">
                <AnimalImage naam={selected.name} emoji={selected.emoji} size={80} />
                <span className="nes-badge is-primary">{t(rarityToKey(selected.rarity))}</span>
                <p className="nes-text is-disabled text-sm m-0">{selected.times} {t('collectionTimesSeen')}</p>
                <p className="nes-text is-disabled text-xs m-0 text-center">
                  {t('collectionRescanHint')}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {collection.map((a) => {
          const slug = slugify(a.rarity)
          return (
            <button
              key={a.name}
              type="button"
              onClick={() => setSelected(a)}
              className="nes-container is-rounded py-3 px-2 text-center relative cursor-pointer min-h-[5rem] min-w-0"
            >
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-sm"
                style={{ backgroundColor: dotColor[slug] ?? dotColor.gewoon }}
              />
              <div className="flex justify-center mb-0.5">
                <AnimalImage naam={a.name} emoji={a.emoji} size={52} />
              </div>
              <div className="nes-text is-primary text-[11px] font-bold truncate break-words min-w-0">{a.name}</div>
              {a.detail?.soort && a.detail.soort.toLowerCase() !== a.name.toLowerCase() && (
                <div className="nes-text is-disabled text-[9px] truncate">{a.detail.soort}</div>
              )}
              <div className="nes-text is-disabled text-[10px]">{a.times} {t('collectionTimesSeen')}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
