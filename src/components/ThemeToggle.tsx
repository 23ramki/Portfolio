/*
  THEME TOGGLE COMPONENT
  ======================
  A button that switches between light and dark mode.

  KEY CONCEPT — useTheme():
  This component doesn't receive theme as a prop!
  Instead, it calls useTheme() to read from Context directly.

  Before Context (prop drilling):
    App (owns theme) → Header (passes theme) → ThemeToggle (uses theme)

  After Context:
    App wraps in ThemeProvider
    ThemeToggle calls useTheme() — no intermediaries needed
*/

import { useTheme } from '../context/ThemeContext'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className={`${styles.icon} ${styles.moon}`} aria-hidden="true">
        &#9790;
      </span>
      <span className={`${styles.icon} ${styles.sun}`} aria-hidden="true">
        &#9728;
      </span>
    </button>
  )
}
