'use client'

import { useEffect, useRef } from 'react'

export default function CanvasBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let width = (canvas.width = window.innerWidth)
        let height = (canvas.height = window.innerHeight)

        const dots = Array.from({ length: 60 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
        }))

        const render = () => {
            ctx.clearRect(0, 0, width, height)

            ctx.fillStyle = 'rgba(22, 101, 52, 0.5)' // dark green-ish

            dots.forEach((dot) => {
                ctx.beginPath()
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
                ctx.fill()

                dot.x += dot.dx
                dot.y += dot.dy

                // Bounce off edges
                if (dot.x < 0 || dot.x > width) dot.dx *= -1
                if (dot.y < 0 || dot.y > height) dot.dy *= -1
            })

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        const resize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }

        window.addEventListener('resize', resize)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0"
        />
    )
}
