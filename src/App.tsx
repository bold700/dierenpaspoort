import { Routes, Route } from 'react-router-dom'
import { useAppStore } from './store/useAppStore'
import { Header } from './components/Header'
import { TabBar } from './components/TabBar'
import { ScanPanel } from './components/ScanPanel'
import { LeerPanel } from './components/LeerPanel'
import { CollectionGrid } from './components/CollectionGrid'
import { BadgeList } from './components/BadgeList'
import { SettingsPanel } from './components/SettingsPanel'

function StatsRow() {
  const totalSeen = useAppStore((s) => s.totalSeen)
  const collectionLength = useAppStore((s) => s.collection.length)
  const streak = useAppStore((s) => s.streak)
  const items = [
    { value: totalSeen, label: 'Gezien' },
    { value: collectionLength, label: 'Soorten' },
    { value: streak, label: 'Streak' },
  ]
  return (
    <div className="flex gap-1.5 sm:gap-2 mb-4 min-w-0">
      {items.map(({ value, label }) => (
        <div key={label} className="nes-container is-rounded is-dark flex-1 min-w-0 text-center py-2 sm:py-2.5">
          <div className="nes-text is-primary text-lg sm:text-xl font-bold leading-none">{value}</div>
          <div className="nes-text is-disabled text-[10px] sm:text-xs mt-0.5 truncate">{label}</div>
        </div>
      ))}
    </div>
  )
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-2 sm:mx-4 w-full min-w-0">
      <Header />
      <div className="nes-container is-rounded with-title is-dark mb-6 w-full min-w-0 overflow-hidden px-3 sm:px-4 pb-4 sm:pb-5">
        <p className="title">Scherm</p>
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
                  <p className="title">Instellingen</p>
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
