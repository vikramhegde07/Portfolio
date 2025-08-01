'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

    useEffect(() => {
        const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (stored) {
            setTheme(stored)
            document.documentElement.classList.toggle('dark', stored === 'dark')
        } else {
            setTheme(prefersDark ? 'dark' : 'light')
            document.documentElement.classList.toggle('dark', prefersDark)
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/20 dark:bg-black/20 hover:bg-green-100 dark:hover:bg-green-900 transition cursor-pointer"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-green-300" />
            ) : (
                <Moon className="h-5 w-5 text-green-900" />
            )}
        </button>
    )
}
