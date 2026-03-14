import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const tabs = [
  { to: '/', label: 'Scannen' },
  { to: '/collectie', label: 'Collectie' },
  { to: '/badges', label: 'Badges' },
] as const

export function TabBar() {
  return (
    <nav className="tab-bar flex gap-1 sm:gap-2 min-w-0">
      {tabs.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              'nes-btn flex-1 min-w-0 text-center text-[10px] sm:text-xs md:text-sm px-1 sm:px-2',
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
