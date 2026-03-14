import { Link, useLocation } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { NesIcon } from './NesIcon'

export function Header() {
  const location = useLocation()
  const isSettings = location.pathname === '/settings'

  const level = useAppStore((s) => s.level)
  const totalXP = useAppStore((s) => s.totalXP)
  const xpInLevel = totalXP - (level - 1) * 100
  const xpForLevel = level * 100
  const pct = Math.min(100, Math.round((xpInLevel / xpForLevel) * 100))

  return (
    <header className="mb-4 w-full">
      <div className="nes-container is-rounded with-title is-dark w-full">
        <p className="title">Dierenpaspoort</p>

        <div className="flex items-center justify-between gap-3 pt-1">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <span className="flex shrink-0 items-center justify-center w-11 h-11 nes-container is-rounded overflow-hidden">
              <NesIcon name="heart" />
            </span>
            <div className="min-w-0">
              <div className="nes-text is-primary font-bold leading-tight">Level {level}</div>
              <div className="nes-text is-disabled text-xs leading-tight mt-0.5">Ontdekker</div>
            </div>
          </Link>
          {isSettings ? (
            <Link to="/" className="nes-btn shrink-0" aria-label="Sluiten">
              <NesIcon name="times" />
            </Link>
          ) : (
            <Link to="/settings" className="nes-btn shrink-0" aria-label="Instellingen">
              <NesIcon name="cog" />
            </Link>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-[#4a4f57]">
          <div className="flex justify-between items-baseline nes-text is-disabled text-xs mb-2">
            <span>XP</span>
            <span className="nes-text is-primary">{xpInLevel} / {xpForLevel}</span>
          </div>
          <progress className="nes-progress is-primary w-full" value={pct} max={100} />
        </div>
      </div>
    </header>
  )
}
