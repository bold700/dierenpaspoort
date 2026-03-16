import { useRef, useCallback } from 'react'
import { useSpeak } from '../hooks/useSpeak'
import { useTranslations } from '../i18n/useTranslations'
import { getLeerDierenWithLocale } from '../data/leerDieren'
import type { LeerDier } from '../data/leerDieren'
import { NesIcon } from './NesIcon'
import { AnimalImage } from './AnimalImage'

const CATEGORIE_KEY: Record<LeerDier['categorie'], string> = {
  zoogdier: 'catZoogdier',
  vogel: 'catVogel',
  reptiel: 'catReptiel',
  insect: 'catInsect',
  water: 'catWater',
  dinosaurus: 'catDinosaurus',
  fantasie: 'catFantasie',
  overig: 'catOverig',
}

function DierKaart({ dier, onGetWeetje }: { dier: LeerDier; onGetWeetje: (id: string) => string }) {
  const { speak } = useSpeak()
  const { t } = useTranslations()

  const handleClick = useCallback(() => {
    const weetje = onGetWeetje(dier.id)
    speak(`${t('learnThisIs')} ${dier.naam}. ${weetje}`)
  }, [dier, onGetWeetje, speak, t])

  return (
    <button
      type="button"
      onClick={handleClick}
      className="nes-container is-rounded is-dark w-full min-w-0 py-3 px-2 text-center cursor-pointer min-h-[5rem] flex flex-col items-center justify-center gap-1 transition-[transform,filter] duration-150 ease-out hover:brightness-110 hover:scale-[1.02] active:brightness-90 active:scale-[0.96] active:bg-black/20"
      aria-label={`Luister naar ${dier.naam}`}
    >
      <AnimalImage naam={dier.naam} emoji={dier.emoji} size={64} />
      <span className="nes-text is-primary text-sm font-bold leading-tight line-clamp-2 break-words min-w-0 w-full text-center">
        {dier.kort ?? dier.naam}
      </span>
    </button>
  )
}

export function LeerPanel() {
  const { t, locale } = useTranslations()
  const dieren = getLeerDierenWithLocale(locale)

  const indexMap = useRef<Record<string, number>>({})

  const getNextWeetje = useCallback((id: string): string => {
    const dier = dieren.find((d) => d.id === id)
    if (!dier || dier.weetjes.length === 0) return ''
    const current = indexMap.current[id] ?? 0
    const weetje = dier.weetjes[current % dier.weetjes.length]
    indexMap.current[id] = current + 1
    return weetje
  }, [dieren])

  const perCategorie = dieren.reduce<Record<LeerDier['categorie'], LeerDier[]>>(
    (acc, d) => {
      if (!acc[d.categorie]) acc[d.categorie] = []
      acc[d.categorie].push(d)
      return acc
    },
    {} as Record<LeerDier['categorie'], LeerDier[]>
  )
  const volgorde: LeerDier['categorie'][] = ['zoogdier', 'vogel', 'reptiel', 'insect', 'water', 'dinosaurus', 'fantasie', 'overig']

  return (
    <div className="space-y-6">
      <div className="nes-container is-rounded is-dark py-2 px-3 flex items-center gap-2">
        <NesIcon name="comment" size="2x" />
        <p className="nes-text is-disabled text-sm m-0">
          {t('learnHint')}
        </p>
      </div>

      {volgorde.map((cat) => {
        const dieren = perCategorie[cat]
        if (!dieren?.length) return null
        return (
          <section key={cat}>
            <h2 className="nes-text is-primary text-sm font-bold mb-2">
              {t(CATEGORIE_KEY[cat])}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {dieren.map((d) => (
                <DierKaart key={d.id} dier={d} onGetWeetje={getNextWeetje} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
