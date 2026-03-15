import { useEffect } from 'react'
import type { AnimalResult } from '../types'
import { useSpeak } from '../hooks/useSpeak'
import { NesIcon } from './NesIcon'

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
  const { speak } = useSpeak()
  const slug = slugify(animal.zeldzaamheid)

  useEffect(() => {
    if (fromCollection) return
    const sayFirst = onSpeakIntro ?? onSpeakAll
    const t = setTimeout(sayFirst, 600)
    return () => clearTimeout(t)
  }, [animal.naam, onSpeakAll, onSpeakIntro, fromCollection])

  const weightSpeech = `Dit dier weegt ${animal.gewicht}. ${animal.vergelijking_gewicht}`
  const lengthSpeech = `Dit dier is ${animal.lengte} lang. ${animal.vergelijking_lengte}`
  const ageSpeech = `Dit dier wordt ${animal.leeftijd} oud.`

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
        <p className="title"><span className="nes-text is-primary">{animal.naam}</span></p>
        <div className="flex flex-wrap items-center justify-center gap-2 relative py-2">
          <button
            type="button"
            onClick={onSpeakAll}
            className="nes-btn absolute top-2 right-2"
            style={{ padding: '0.25rem 0.5rem', minHeight: 'auto' }}
            aria-label="Alles voorlezen"
          >
            <NesIcon name="play" />
          </button>
          <span className="text-5xl leading-none">{animal.emoji}</span>
          <span className={`nes-badge ${rarityBadgeClass[slug] ?? 'is-success'}`}>
            <span>{animal.zeldzaamheid}</span>
          </span>
        </div>
      </div>

      <div className="nes-container is-rounded is-dark with-title mt-2">
        <p className="title">Tik om te horen</p>
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
          <span className="nes-text is-disabled">{times}x gezien</span>
        ) : (
          <>
            <span className="nes-text is-success">+{xpGained} XP</span>
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
