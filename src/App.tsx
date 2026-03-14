import { Routes, Route } from 'react-router-dom'
import { useAppStore } from './store/useAppStore'
import { Header } from './components/Header'
import { TabBar } from './components/TabBar'
import { ScanPanel } from './components/ScanPanel'
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
    <div className="flex gap-3 mb-4">
      {items.map(({ value, label }) => (
        <div key={label} className="nes-container is-rounded is-dark flex-1 text-center py-3">
          <div className="nes-text is-primary text-2xl font-bold leading-none">{value}</div>
          <div className="nes-text is-disabled text-xs mt-1">{label}</div>
        </div>
      ))}
    </div>
  )
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-4 w-full">
      <Header />
      <div className="nes-container is-rounded with-title is-dark mb-6 w-full">
        <p className="title">Scherm</p>
        <StatsRow />
        <TabBar />
        <div className="mt-4">{children}</div>
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
          <Route path="/collectie" element={<MainLayout><div className="px-1"><CollectionGrid /></div></MainLayout>} />
          <Route path="/badges" element={<MainLayout><div className="px-1"><BadgeList /></div></MainLayout>} />
          <Route
            path="/settings"
            element={
              <div className="mx-4 w-full">
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
