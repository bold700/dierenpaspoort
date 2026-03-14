import { useAppStore } from '../store/useAppStore'
import { NesIcon, type NesIconName } from './NesIcon'

export function BadgeList() {
  const { achievements, unlockedAchievements, getProgress } = useAppStore()

  return (
    <div>
      <p className="nes-text is-primary text-sm font-bold mb-3">Jouw badges</p>
      <div className="space-y-2">
        {achievements.map((ach) => {
          const unlocked = unlockedAchievements.includes(ach.id)
          const progress = getProgress(ach.id)
          return (
            <div
              key={ach.id}
              className="nes-container is-rounded is-dark flex flex-row items-center gap-3 p-3"
            >
              <div
                className={`w-12 h-12 nes-container is-rounded flex items-center justify-center flex-shrink-0 overflow-hidden ${
                  unlocked ? '' : 'opacity-50'
                }`}
              >
                <NesIcon name={ach.icon as NesIconName} size="2x" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="nes-text is-primary font-bold">{ach.name}</div>
                <div className="nes-text is-disabled text-xs">{ach.desc}</div>
                {!unlocked && (
                  <div className="mt-1.5">
                    <progress className="nes-progress is-primary" value={progress} max={100} />
                  </div>
                )}
              </div>
              {unlocked && <NesIcon name="check-circle" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
