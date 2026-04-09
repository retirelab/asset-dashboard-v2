import { useState } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import DashboardTab from './tabs/DashboardTab'
import PortfolioTab from './tabs/PortfolioTab'
import GoalTab from './tabs/GoalTab'

function AppInner() {
  const [tab, setTab] = useState(0)
  const { isDark } = useTheme()
  const tabs = [<DashboardTab />, <PortfolioTab />, <GoalTab />]

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dk-bg' : 'bg-lt-bg'}`}>
      <div className="mx-auto relative min-h-screen" style={{ maxWidth: 430 }}>
        <Header />
        <main
          className="overflow-y-auto hide-scroll"
          style={{ minHeight: 'calc(100vh - 52px - 64px)' }}
        >
          {tabs[tab]}
        </main>
        <BottomNav active={tab} onChange={setTab} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}