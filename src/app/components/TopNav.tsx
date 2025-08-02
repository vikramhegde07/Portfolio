'use client'

import { Home, User, FolderOpen, Mail, Menu } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';

const menuItems = [
    { label: 'Home', icon: Home, href: '#hero' },
    { label: 'About', icon: User, href: '#about' },
    { label: 'Projects', icon: FolderOpen, href: '#projects' },
    { label: 'Contact', icon: Mail, href: '#contact' },
]

export default function TopNav() {
    const [visible, setVisible] = useState(false);

    return (
        <header className="fixed top-0 left-0 z-50 w-full flex justify-between items-center px-4 py-3 backdrop-blur-md bg-transparent">
            {/* Menu Trigger Button */}
            <button
                onClick={() => { setVisible(!visible) }}
                className="p-2 rounded-full bg-white/20 dark:bg-black/20 hover:bg-green-100 dark:hover:bg-green-900 transition cursor-pointer"
                aria-label="Toggle menu"
            >
                <Menu className="h-5 w-5 text-green-900 dark:text-green-300" />
            </button>

            <div className={`${visible ? 'w-full' : 'w-0'} flex md:gap-4 gap-1 items-center justify-center overflow-hidden transition-all duration-500`}>
                {menuItems.map(({ label, icon: Icon, href }) => (
                    <Link
                        key={label}
                        href={href}
                        className={'group flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 text-sm md:text-base w-fit hover:text-green-600'}
                    >
                        <Icon className="h-5 w-5" />
                        <span className='text-xs md:text-base md:w-fit w-0 overflow-hidden group-hover:w-fit md:opacity-100 opacity-0 group-hover:opacity-100 transition-all duration-1000'>{label}</span>
                    </Link>
                ))}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
        </header>
    )
}
