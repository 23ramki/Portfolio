/*
  THEME CONTEXT
  =============
  Provides dark/light theme state to the entire app.

  KEY CONCEPTS:

  1. createContext<T | undefined>(undefined):
     Creates a "broadcast channel." The generic type tells TS what
     shape the data has. We initialize with `undefined` because there's
     no default value until the Provider is rendered.

  2. Provider Pattern:
     <ThemeProvider> wraps the app and supplies the context value.
     Any component inside can call useTheme() to access it.

     Think of it like a radio station:
     - ThemeProvider is the radio tower (broadcasts the signal)
     - useTheme() is the radio receiver (tunes into the signal)
     - Any component can have a receiver, no matter how deeply nested

  3. Type narrowing with union types:
     `type Theme = 'light' | 'dark'` restricts the value to exactly
     two strings. TypeScript will error if you try theme = 'blue'.

  4. Lazy initializer for useState:
     `useState<Theme>(() => { ... })` — passing a FUNCTION to useState
     means the initialization code only runs once (on first render),
     not on every re-render. This is important because reading from
     localStorage is slow compared to a simple value.
*/

import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

// Union type — theme can ONLY be 'light' or 'dark', nothing else
type Theme = 'light' | 'dark'

// The shape of the context value
interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

// Create the context. undefined = "no value yet" (before Provider renders)
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

// ─── Provider Component ───────────────────────────────────
// Wraps the app and manages theme state + localStorage persistence
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Lazy initializer: this function runs ONCE on first render
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage for a saved preference
    const saved = localStorage.getItem('portfolio-theme')
    if (saved === 'light' || saved === 'dark') return saved

    // Otherwise, respect the OS-level preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  // useEffect: runs AFTER every render where `theme` changed
  // Sets the data-theme attribute on <html> so CSS variables switch
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme]) // The [theme] dependency array means "only run when theme changes"

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  // The Provider supplies { theme, toggleTheme } to all descendants
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ─── Custom Hook ──────────────────────────────────────────
// A convenience wrapper so consumers don't need to import both
// useContext and ThemeContext. Also adds a safety check.
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
