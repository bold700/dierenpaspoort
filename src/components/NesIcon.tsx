/** NES-style iconen als inline SVG (geen font) – altijd scherp, geen laadproblemen */

import { nesIconSvgs } from '@/assets/nes-icons'

export type NesIconName =
  | 'cog' | 'eye' | 'eye-slash' | 'play' | 'search' | 'calendar' | 'heart' | 'star' | 'trophy'
  | 'check' | 'check-circle' | 'square' | 'circle' | 'caret-right' | 'caret-down'
  | 'exclamation' | 'exclamation-triangle' | 'comment' | 'times' | 'ban' | 'user' | 'users'

const sizeMap = { '2x': 24, '3x': 32, '4x': 48, '5x': 64 } as const

interface NesIconProps {
  name: NesIconName
  size?: '2x' | '3x' | '4x' | '5x'
  className?: string
}

export function NesIcon({ name, size, className = '' }: NesIconProps) {
  const svg = nesIconSvgs[name]
  if (!svg) return null

  const px = size ? sizeMap[size] : 16
  const markup = svg.replace(
    /<svg ([^>]*)>/,
    `<svg $1 width="${px}" height="${px}" class="nes-icon-svg" style="display:inline-block;vertical-align:middle">`
  )

  return (
    <span
      className={`inline-flex items-center justify-center [&_.nes-icon-svg]:flex-shrink-0 ${className}`.trim()}
      style={{ width: px, height: px }}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
