import { useState, useEffect } from 'react'
import { getAnimalImageUrl, invalidateAnimalImageCache } from '../lib/animalImage'

interface AnimalImageProps {
  /** Nederlandse diernaam (gebruikt voor Wikipedia-zoekopdracht). */
  naam: string
  /** Fallback emoji als er geen plaatje is of tijdens laden. */
  emoji: string
  /** CSS class voor de wrapper (bijv. grootte). */
  className?: string
  /** Grootte van het vierkante plaatje in pixels (zelfde voor breedte/hoogte). */
  size?: number
  /** Of de afbeelding afgeronde hoeken moet hebben. */
  rounded?: boolean
}

export function AnimalImage({ naam, emoji, className = '', size = 80, rounded = true }: AnimalImageProps) {
  const [src, setSrc] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!naam.trim() || failed) return
    let cancelled = false
    getAnimalImageUrl(naam).then((url) => {
      if (!cancelled && url) setSrc(url)
      if (!cancelled && !url) setFailed(true)
    })
    return () => {
      cancelled = true
    }
  }, [naam, failed])

  const sizeClass =
    size <= 24 ? 'w-6 h-6' : size <= 40 ? 'w-10 h-10' : size <= 56 ? 'w-14 h-14' : size <= 72 ? 'w-[4.5rem] h-[4.5rem]' : size <= 80 ? 'w-20 h-20' : size <= 88 ? 'w-[5.5rem] h-[5.5rem]' : 'w-24 h-24'

  const handleError = () => {
    invalidateAnimalImageCache(naam)
    setSrc(null)
    setFailed(true)
  }

  if (src) {
    return (
      <img
        src={src}
        alt={naam}
        className={`${sizeClass} object-cover flex-shrink-0 ${rounded ? 'rounded-lg' : ''} ${className}`}
        loading="lazy"
        decoding="async"
        onError={handleError}
      />
    )
  }

  const emojiSize =
    size <= 24 ? '1.5rem' : size <= 40 ? '2.25rem' : size <= 56 ? '3rem' : size <= 72 ? '3.5rem' : size <= 80 ? '4rem' : size <= 88 ? '4.25rem' : '4.5rem'

  return (
    <span
      className={`${sizeClass} inline-flex items-center justify-center leading-none flex-shrink-0 ${className}`}
      style={{ fontSize: emojiSize }}
      aria-hidden
    >
      {emoji}
    </span>
  )
}
