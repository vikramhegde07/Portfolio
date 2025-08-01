'use client'

import { Menu, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { useVisibility } from './VisibilityContext'

export default function TopNav() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { changeVisibility } = useVisibility();

    return (
        <header className="fixed top-0 left-0 z-50 w-full flex justify-between items-center px-4 py-3 backdrop-blur-md bg-transparent">
            {/* Menu Trigger Button */}
            <button
                onClick={changeVisibility}
                className="p-2 rounded-full bg-white/20 dark:bg-black/20 hover:bg-green-100 dark:hover:bg-green-900 transition cursor-pointer"
                aria-label="Toggle menu"
            >
                <Menu className="h-5 w-5 text-green-900 dark:text-green-300" />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />
        </header>
    )
}
