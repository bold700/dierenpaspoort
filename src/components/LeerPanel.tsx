import { useSpeak } from '../hooks/useSpeak'
import { LEER_DIEREN } from '../data/leerDieren'
import type { LeerDier } from '../data/leerDieren'
import { NesIcon } from './NesIcon'
import { AnimalImage } from './AnimalImage'

const CATEGORIE_LABEL: Record<LeerDier['categorie'], string> = {
  zoogdier: 'Zoogdieren',
  vogel: 'Vogels',
  reptiel: 'Reptielen',
  insect: 'Insecten',
  water: 'Waterdieren',
  overig: 'Overig',
}

function pickRandom<T>(arr: [T, T, T, T, T]): T {
  return arr[Math.floor(Math.random() * 5)]
}

function DierKaart({ dier }: { dier: LeerDier }) {
  const { speak } = useSpeak()
  const teZeggen = `Dit is een ${dier.naam}. ${pickRandom(dier.weetjes)}`

  return (
    <button
      type="button"
      onClick={() => speak(teZeggen)}
      className="nes-container is-rounded is-dark w-full min-w-0 py-3 px-2 text-center cursor-pointer min-h-[5rem] flex flex-col items-center justify-center gap-1 transition-[transform,filter] duration-150 ease-out hover:brightness-110 hover:scale-[1.02] active:brightness-90 active:scale-[0.96] active:bg-black/20"
      aria-label={`Luister naar ${dier.naam}`}
    >
      <AnimalImage naam={dier.naam} emoji={dier.emoji} size={64} />
      <span className="nes-text is-primary text-sm font-bold leading-tight line-clamp-2 break-words min-w-0">
        {dier.kort ?? dier.naam}
      </span>
    </button>
  )
}

export function LeerPanel() {
  const perCategorie = LEER_DIEREN.reduce<Record<LeerDier['categorie'], LeerDier[]>>(
    (acc, d) => {
      if (!acc[d.categorie]) acc[d.categorie] = []
      acc[d.categorie].push(d)
      return acc
    },
    {} as Record<LeerDier['categorie'], LeerDier[]>
  )
  const volgorde: LeerDier['categorie'][] = ['zoogdier', 'vogel', 'reptiel', 'insect', 'water', 'overig']

  return (
    <div className="space-y-6">
      <div className="nes-container is-rounded is-dark py-2 px-3 flex items-center gap-2">
        <NesIcon name="comment" size="2x" />
        <p className="nes-text is-disabled text-sm m-0">
          Tik op een dier om de naam en een leuk weetje te horen.
        </p>
      </div>

      {volgorde.map((cat) => {
        const dieren = perCategorie[cat]
        if (!dieren?.length) return null
        return (
          <section key={cat}>
            <h2 className="nes-text is-primary text-sm font-bold mb-2">
              {CATEGORIE_LABEL[cat]}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {dieren.map((d) => (
                <DierKaart key={d.id} dier={d} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
