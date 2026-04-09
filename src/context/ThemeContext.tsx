import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'
interface ThemeCtx { theme: Theme; toggle: () => void; isDark: boolean }

const Ctx = createContext<ThemeCtx>({ theme: 'dark', toggle: () => {}, isDark: true })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem('theme') as Theme) || 'dark'
  )

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.remove('light')
    } else {
      document.body.classList.add('light')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <Ctx.Provider value={{ theme, toggle, isDark: theme === 'dark' }}>
      {children}
    </Ctx.Provider>
  )
}

export const useTheme = () => useContext(Ctx)