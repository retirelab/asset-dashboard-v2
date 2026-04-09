import { useTheme } from '../context/ThemeContext'

interface Props { active: number; onChange: (i: number) => void }

const tabs = [
  {
    label: '자산',
    icon: (active: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>
    ),
  },
  {
    label: '포트폴리오',
    icon: (active: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    label: '목표·은퇴',
    icon: (active: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
      </svg>
    ),
  },
]

export default function BottomNav({ active, onChange }: Props) {
  const { isDark } = useTheme()

  return (
    <nav
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-50 border-t flex ${
        isDark ? 'bg-dk-card border-dk-border' : 'bg-white border-lt-border'
      }`}
      style={{ maxWidth: 430 }}
    >
      {tabs.map((tab, i) => {
        const isActive = active === i
        return (
          <button
            key={tab.label}
            onClick={() => onChange(i)}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors"
          >
            <span className={isActive ? 'text-accent-blue' : isDark ? 'text-dk-muted' : 'text-lt-muted'}>
              {tab.icon(isActive)}
            </span>
            <span className={`text-[10px] font-medium ${
              isActive ? 'text-accent-blue' : isDark ? 'text-dk-muted' : 'text-lt-muted'
            }`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}