import { Routes, Route } from 'react-router-dom'
import { useAppStore } from './store/useAppStore'
import { useTranslations } from './i18n/useTranslations'
import { Header } from './components/Header'
import { TabBar } from './components/TabBar'
import { ScanPanel } from './components/ScanPanel'
import { LeerPanel } from './components/LeerPanel'
import { CollectionGrid } from './components/CollectionGrid'
import { BadgeList } from './components/BadgeList'
import { SettingsPanel } from './components/SettingsPanel'

function StatsRow() {
  const { t } = useTranslations()
  const totalSeen = useAppStore((s) => s.totalSeen)
  const collectionLength = useAppStore((s) => s.collection.length)
  const streak = useAppStore((s) => s.streak)
  const items = [
    { value: totalSeen, label: t('statsSeen'), labelShort: t('statsSeenShort') },
    { value: collectionLength, label: t('statsSpecies'), labelShort: t('statsSpeciesShort') },
    { value: streak, label: t('statsStreak'), labelShort: t('statsStreakShort') },
  ]
  return (
    <div className="flex gap-0 mb-4 min-w-0">
      {items.map(({ value, label, labelShort }) => (
        <div key={label} className="nes-container is-rounded is-dark flex-1 min-w-0 text-center py-2 sm:py-2.5">
          <div className="nes-text is-primary text-lg sm:text-xl font-bold leading-none">{value}</div>
          <div className="nes-text is-disabled text-[10px] sm:text-xs mt-0.5 leading-tight">
            <span className="sm:hidden">{labelShort}</span>
            <span className="hidden sm:inline">{label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function SettingsTitle() {
  const { t } = useTranslations()
  return <p className="title">{t('appSettings')}</p>
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslations()
  return (
    <div className="mx-2 sm:mx-4 w-full min-w-0">
      <Header />
      <div className="nes-container is-rounded with-title is-dark mb-6 w-full min-w-0 overflow-hidden px-3 sm:px-4 pb-4 sm:pb-5">
        <p className="title">{t('appScreen')}</p>
        <div className="pt-1">
          <StatsRow />
          <TabBar />
          <div className="mt-6 sm:mt-8 min-w-0">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="app-shell w-full flex flex-col items-center">
      <div className="w-full max-w-xl flex flex-col items-center">
        <Routes>
          <Route path="/" element={<MainLayout><ScanPanel /></MainLayout>} />
          <Route path="/leer" element={<MainLayout><div className="px-1"><LeerPanel /></div></MainLayout>} />
          <Route path="/collectie" element={<MainLayout><div className="px-1"><CollectionGrid /></div></MainLayout>} />
          <Route path="/badges" element={<MainLayout><div className="px-1"><BadgeList /></div></MainLayout>} />
          <Route
            path="/settings"
            element={
              <div className="mx-2 sm:mx-4 w-full min-w-0">
                <Header />
                <div className="nes-container is-rounded with-title is-dark mb-6 w-full">
                  <SettingsTitle />
                  <SettingsPanel />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
      <div id="toast" className="nes-btn is-primary" />
    </div>
  )
}
