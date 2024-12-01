// import { useState } from 'react'
import { ThemeProvider } from './components/theme-provider.tsx'
import { ModeToggle } from "./components/mode-toggle"

function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <div className="flex items-center justify-center">
        <h1>HELLO RESUME BUILDER</h1>
        <ModeToggle />
      </div>
    </ThemeProvider>
  )
}

export default App
