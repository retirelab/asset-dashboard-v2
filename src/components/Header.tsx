import { useTheme } from '../context/ThemeContext'

interface Props { title?: string }

export default function Header({ title = '우리집 자산' }: Props) {
  const { isDark, toggle } = useTheme()

  return (
    <header className={`sticky top-0 z-50 flex justify-between items-center px-4 py-3 border-b ${
      isDark ? 'bg-dk-bg border-dk-border' : 'bg-lt-bg border-lt-border'
    }`}>
      <div className="flex items-center gap-1.5">
        <span className={`text-[17px] font-bold ${isDark ? 'text-dk-text' : 'text-lt-text'}`}>
          {title}
        </span>
        <span className="text-accent-orange text-[10px] font-black italic">Beta</span>
      </div>
      <button
        onClick={toggle}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
          isDark
            ? 'bg-dk-card text-dk-sub hover:bg-dk-border'
            : 'bg-white text-lt-sub hover:bg-gray-100'
        }`}
      >
        {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 110 10A5 5 0 0112 7z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </header>
  )
}