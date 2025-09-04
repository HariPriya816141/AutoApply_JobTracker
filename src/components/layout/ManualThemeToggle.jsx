import { useState, useEffect } from 'react'
import './manualThemeToggle.css' // separate CSS for this toggle only

const ManualThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark-mode')
      root.classList.remove('light-mode')
    } else {
      root.classList.add('light-mode')
      root.classList.remove('dark-mode')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      className="manual-toggle-btn"
      onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
    >
      {theme === 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}
    </button>
  )
}

export default ManualThemeToggle
