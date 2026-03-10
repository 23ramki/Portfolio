/*
  ENTRY POINT — Step 6: Adding ThemeProvider
  ==========================================
  The nesting order:
  StrictMode → BrowserRouter → ThemeProvider → App

  ThemeProvider MUST be inside BrowserRouter (so theme components can use routing)
  and OUTSIDE App (so Header and all pages can access the theme).
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import './global.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
