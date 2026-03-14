/** NES-style pixel iconen als inline SVG (geen font); currentColor voor kleur */

import ban from './ban.svg?raw'
import calendar from './calendar.svg?raw'
import caretRight from './caret-right.svg?raw'
import checkCircle from './check-circle.svg?raw'
import circle from './circle.svg?raw'
import cog from './cog.svg?raw'
import comment from './comment.svg?raw'
import exclamation from './exclamation.svg?raw'
import exclamationTriangle from './exclamation-triangle.svg?raw'
import eye from './eye.svg?raw'
import eyeSlash from './eye-slash.svg?raw'
import heart from './heart.svg?raw'
import play from './play.svg?raw'
import search from './search.svg?raw'
import square from './square.svg?raw'
import star from './star.svg?raw'
import times from './times.svg?raw'
import trophy from './trophy.svg?raw'
import user from './user.svg?raw'
import users from './users.svg?raw'

export const nesIconSvgs: Record<string, string> = {
  ban,
  calendar,
  'caret-right': caretRight,
  check: checkCircle,
  'check-circle': checkCircle,
  circle,
  cog,
  comment,
  exclamation,
  'exclamation-triangle': exclamationTriangle,
  eye,
  'eye-slash': eyeSlash,
  heart,
  play,
  search,
  square,
  star,
  times,
  trophy,
  user,
  users
}

/** Alle icon-namen (voor bijv. profielicoon-kiezer) */
export const ALL_ICON_IDS = [
  'heart', 'star', 'trophy', 'user', 'users', 'circle', 'play', 'search', 'calendar',
  'caret-right', 'check', 'check-circle', 'square', 'comment', 'exclamation', 'exclamation-triangle',
  'eye', 'eye-slash', 'cog', 'times', 'ban'
] as const
export type AllIconId = (typeof ALL_ICON_IDS)[number]
