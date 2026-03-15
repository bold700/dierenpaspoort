import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useTranslations } from '../i18n/useTranslations'

const tabKeys = [
  { to: '/', key: 'tabsScan' as const },
  { to: '/leer', key: 'tabsLearn' as const },
  { to: '/collectie', key: 'tabsCollection' as const },
  { to: '/badges', key: 'tabsBadges' as const },
] as const

export function TabBar() {
  const { t } = useTranslations()
  return (
    <nav className="tab-bar grid grid-cols-2 gap-2 sm:gap-3 min-w-0">
      {tabKeys.map(({ to, key }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              'nes-btn w-full min-w-0 text-center text-xs sm:text-sm px-2 sm:px-3 py-2.5',
              isActive && 'is-primary'
            )
          }
        >
          {t(key)}
        </NavLink>
      ))}
    </nav>
  )
}
