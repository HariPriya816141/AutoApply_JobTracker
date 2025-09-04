// import { useState, useEffect } from 'react'

// const ThemeToggle = () => {
//   const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

//   useEffect(() => {
//     const root = document.documentElement
//     if (theme === 'dark') {
//       root.classList.add('dark')
//     } else {
//       root.classList.remove('dark')
//     }
//     localStorage.setItem('theme', theme)
//   }, [theme])

//   return (
//     <button
//       onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
//       aria-label="Toggle theme"
//       className="flex items-center gap-2
//         px-4 py-2
//         rounded-full
//         border-2 border-theme-border
//         bg-theme-bg
//         text-theme-text
//         hover:bg-theme-hover-bg
//         transition-colors duration-300
//         shadow-sm dark:shadow-md"
//     >
//       {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
//     </button>
//   )
// }

// export default ThemeToggle

