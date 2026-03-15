import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const tabs = [
  { to: '/', label: 'Scannen' },
  { to: '/leer', label: 'Leer' },
  { to: '/collectie', label: 'Collectie' },
  { to: '/badges', label: 'Badges' },
] as const

export function TabBar() {
  return (
    <nav className="tab-bar grid grid-cols-2 gap-2 sm:gap-3 min-w-0">
      {tabs.map(({ to, label }) => (
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
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
