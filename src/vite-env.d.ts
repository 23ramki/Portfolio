/// <reference types="vite/client" />

// View Transitions API (Chrome 111+, progressive enhancement)
interface Document {
  startViewTransition?: (callback: () => void) => {
    finished: Promise<void>
    ready: Promise<void>
    updateCallbackDone: Promise<void>
  }
}
