'use client'

import { Home, User, FolderOpen, Mail } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useVisibility } from './VisibilityContext'

const menuItems = [
    { label: 'Home', icon: Home, href: '#hero' },
    { label: 'About', icon: User, href: '#about' },
    { label: 'Projects', icon: FolderOpen, href: '#projects' },
    { label: 'Contact', icon: Mail, href: '#contact' },
]

export default function BottomMenu() {
    const { visible } = useVisibility()
    const [active, setActive] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            // Check if the user is at the very top of the page
            if (window.scrollY === 0) {
                setActive('#hero');
                return; // Exit early if we're at the top
            }

            const positions = menuItems
                .map(item => {
                    const el = document.querySelector(item.href);
                    if (!el) return null;
                    const rect = el.getBoundingClientRect();
                    return { href: item.href, top: rect.top };
                })
                .filter((pos): pos is { href: string; top: number } => pos !== null);

            // Find the element that is most in view
            const inView = positions.find(p => p.top >= 0 && p.top < window.innerHeight / 2);

            if (inView) {
                setActive(inView.href);
            } else {
                // Fallback for when no section is in the top half of the viewport.
                // This can happen when scrolling quickly between sections.
                // A better approach here might be to find the element
                // with the smallest positive `top` value.
                const nextInView = positions
                    .filter(p => p.top > 0)
                    .sort((a, b) => a.top - b.top)[0];

                if (nextInView) {
                    // This case might be less reliable, but it's a useful fallback
                    // for debugging or specific edge cases.
                }
            }
        };

        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div
            className={clsx(
                'fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full px-4 transition-transform duration-600',
                visible ? 'translate-y-0' : 'translate-y-100'
            )}
        >
            <div className="mx-auto max-w-xl rounded-full bg-green-100 dark:bg-[#14532d] px-4 p-2 shadow-lg flex justify-between items-center gap-4">
                {menuItems.map(({ label, icon: Icon, href }) => (
                    <Link
                        key={label}
                        href={href}
                        className={clsx(
                            'group flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 text-sm md:text-base w-fit',
                            active === href
                                ? 'bg-green-300 dark:bg-green-800 text-green-900 dark:text-green-100'
                                : 'hover:bg-green-200 dark:hover:bg-green-900 text-green-900 dark:text-green-100'
                        )}
                    >
                        <Icon className="h-5 w-5" />
                        <span className='text-xs md:text-base md:w-fit w-0 overflow-hidden group-hover:w-fit md:opacity-100 opacity-0 group-hover:opacity-100 transition-all duration-400'>{label}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}