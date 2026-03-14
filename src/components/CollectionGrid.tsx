import { Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { useSpeak } from '../hooks/useSpeak'

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
  const collection = useAppStore((s) => s.collection)
  const { speak } = useSpeak()

  if (!collection.length) {
    return (
      <div className="nes-container is-rounded text-center py-8 px-4">
        <div className="flex justify-center mb-3">
          <i className="nes-icon search size-4x" aria-hidden />
        </div>
        <p className="nes-text is-primary font-bold mb-2">Nog geen dieren gevonden.</p>
        <p className="nes-text is-disabled text-sm mb-4">Ga naar buiten en scan je eerste dier!</p>
        <Link to="/" className="nes-btn is-primary">
          Scannen
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {collection.map((a) => {
        const slug = slugify(a.rarity)
        return (
          <button
            key={a.name}
            type="button"
            onClick={() => speak(`${a.name}! ${a.times} keer gezien.`)}
            className="nes-container is-rounded py-3 px-2 text-center relative cursor-pointer min-h-[5rem]"
          >
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-sm"
              style={{ backgroundColor: dotColor[slug] ?? dotColor.gewoon }}
            />
            <div className="text-2xl mb-0.5">{a.emoji}</div>
            <div className="nes-text is-primary text-[11px] font-bold truncate">{a.name}</div>
            <div className="nes-text is-disabled text-[10px]">{a.times}x</div>
          </button>
        )
      })}
    </div>
  )
}
