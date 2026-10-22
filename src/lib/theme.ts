export const THEMES = ['light', 'dark'] as const
export type Theme = (typeof THEMES)[number]

const STORAGE_KEY = 'theme'
const DARK_CLASS = 'dark'

export const THEME_INIT_SCRIPT = `(()=>{try{var s=localStorage.getItem('${STORAGE_KEY}');var d=s?s==='${DARK_CLASS}':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('${DARK_CLASS}',d)}catch(e){}})()`

export const isDarkTheme = (): boolean => document.documentElement.classList.contains(DARK_CLASS)

export const isDarkThemeOnServer = (): boolean => false

export const subscribeToTheme = (onChange: () => void): (() => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

const persistTheme = (theme: Theme): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
    return true
  } catch {
    return false
  }
}

export const applyTheme = (theme: Theme): boolean => {
  document.documentElement.classList.toggle(DARK_CLASS, theme === 'dark')
  return persistTheme(theme)
}
