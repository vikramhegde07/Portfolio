'use client'

import { useEffect, useState } from 'react'

const FINAL_TEXT = 'VIKRAM HEGDE'
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export default function RollingName() {
    const [letters, setLetters] = useState<string[]>(Array(FINAL_TEXT.length).fill(''))
    const [done, setDone] = useState(false)

    useEffect(() => {
        const interval = 50 // speed per frame
        const stopDelays = FINAL_TEXT.split('').map((_, i) => 1000 + i * 100) // staggered stop

        let intervalId: NodeJS.Timeout
        const startTime = Date.now()

        intervalId = setInterval(() => {
            const now = Date.now()
            const updated = letters.map((_, i) => {
                if (now - startTime > stopDelays[i]) {
                    return FINAL_TEXT[i]
                }

                const randomLetter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
                return FINAL_TEXT[i] === ' ' ? ' ' : randomLetter
            })

            setLetters(updated)

            // Check if all letters are complete
            if (updated.join('') === FINAL_TEXT) {
                clearInterval(intervalId)
                setDone(true)
            }
        }, interval)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <h1 className="text-3xl md:text-4xl font-bold tracking-widest text-green-800 dark:text-green-200 font-mono">
            {letters.map((char, i) => (
                <span
                    key={i}
                    className={`inline-block transition-all duration-200 ${char === "M" ? 'me-4' : ''}`}
                    style={{ color: char === FINAL_TEXT[i] ? '' : '#22c55e' }}
                >
                    {char}
                </span>
            ))}
        </h1>
    )
}
