import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const tabs = [
  { to: '/', label: 'Scannen' },
  { to: '/collectie', label: 'Collectie' },
  { to: '/badges', label: 'Badges' },
] as const

export function TabBar() {
  return (
    <nav className="flex gap-2">
      {tabs.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn('nes-btn flex-1 text-center', isActive && 'is-primary')
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
