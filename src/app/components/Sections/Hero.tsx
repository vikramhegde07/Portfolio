'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Send } from 'lucide-react';

// A simple reusable component for text generation effect
// It animates each word to fade in and rise up
const TextReveal = ({
    text,
    className,
}: {
    text: string;
    className?: string;
}) => {
    const [visible, setVisible] = useState(false);
    const words = text.split(' ');

    useEffect(() => {
        setVisible(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2 * i,
            },
        }),
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={visible ? 'visible' : 'hidden'}
            className={cn('inline', className)}
        >
            {words.map((word, i) => (
                <motion.span
                    key={word + i}
                    variants={itemVariants}
                    className="inline-block"
                >
                    {word + '\u00A0'} {/* Add a non-breaking space after each word */}
                </motion.span>
            ))}
        </motion.div>
    );
};

// Canvas-based particle effect component for the background
const ParticleEffect = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationFrameId = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        if (!canvas) return;

        const ctx = canvas.getContext('2d')!;
        if (!ctx) return;

        let particles: Particle[] = [];
        let isDarkMode = false;
        let particleColor = '#94a3b8'; // Updated light theme color for better contrast
        let lineColor = 'rgba(148, 163, 184, 0.2)'; // Updated light theme line color for better contrast

        // Function to check for dark mode
        const checkTheme = () => {
            isDarkMode = document.documentElement.classList.contains('dark');
            particleColor = isDarkMode ? '#1e2b3c' : '#94a3b8';
            lineColor = isDarkMode ? 'rgba(30, 43, 60, 0.2)' : 'rgba(148, 163, 184, 0.2)';
        };

        // Particle class for the animation
        class Particle {
            x: number;
            y: number;
            radius: number;
            speedX: number;
            speedY: number;
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 2.5 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();
                ctx.closePath();
            }

            update() {
                if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                    this.speedX = -this.speedX;
                }
                if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                    this.speedY = -this.speedY;
                }
                this.x += this.speedX;
                this.y += this.speedY;
            }
        }

        // Initialize particles
        const init = () => {
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        // Draw lines between particles that are close to each other
        const connect = () => {
            const maxDistance = 100;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 0.2;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        };

        // The animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });
            connect();
            animationFrameId.current = requestAnimationFrame(animate);
        };

        // Handle window resize to make the canvas responsive
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('DOMContentLoaded', handleResize);
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        checkTheme();
        handleResize(); // Initial setup
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('DOMContentLoaded', handleResize);
            observer.disconnect();
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 w-full h-full"
        />
    );
};

const HeroSection = () => {
    const { ref } = useInView({
        threshold: 0.8
    })
    return (
        <section ref={ref} className="relative w-full min-h-screen flex items-center justify-center p-4 overflow-hidden bg-background">
            {/* Canvas background for the particle effect */}
            <ParticleEffect />

            {/* Main content container, centered and responsive */}
            <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-center text-center md:text-left gap-12 p-4 max-w-6xl mx-auto">
                {/* Left side: Text and buttons */}
                <div className="flex flex-col items-center md:items-start max-w-xl">
                    {/* Animated profile image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="md:hidden mb-8"
                    >
                        <img
                            src="/me2.jpg"
                            alt="Vikram Hegde"
                            className="w-40 h-40 rounded-full border-4 border-gray-300 dark:border-gray-700 object-cover"
                        />
                    </motion.div>

                    {/* Animated Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-center md:text-left">
                        <AnimatePresence>
                            <TextReveal
                                text="Hello, I'm Vikram Hegde"
                                className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 dark:from-primary dark:via-primary dark:to-secondary"
                            />
                        </AnimatePresence>
                    </h1>

                    {/* Animated Subtitle */}
                    <div className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8 text-center md:text-left">
                        <AnimatePresence>
                            <TextReveal
                                text="Crafting powerful web solutions from design to database."
                                className="text-muted-foreground"
                            />
                        </AnimatePresence>
                    </div>

                    {/* Call-to-Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Button
                            size="lg"
                            className="
          h-12 px-8 text-base
          bg-green-600 hover:bg-green-700
          text-white font-semibold
          rounded-full shadow-lg
          transition-colors duration-300
          flex items-center gap-3
          group
          dark:bg-green-700 dark:hover:bg-green-800
        "
                            onClick={() => (window.location.href = '#contact')}
                        >
                            <span className="relative">
                                {/* The icon has a subtle transition to create a "bouncing" effect */}
                                <Send
                                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1  group-hover:-translate-y-1"
                                />
                            </span>
                            Send Message
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="
          h-12 px-8 text-base
          bg-transparent border-2 border-green-600 hover:bg-green-600
          text-green-600 hover:text-white
          font-semibold rounded-full shadow-md
          transition-all duration-300
          flex items-center gap-3
          group
          dark:border-green-700 dark:text-green-700 dark:hover:bg-green-700 dark:hover:text-white
        "
                        >
                            <span className="relative">
                                <Download
                                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5"
                                />
                            </span>
                            Download CV
                        </Button>
                    </motion.div>
                </div>

                {/* Right side: Profile image (desktop) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="hidden md:block"
                >
                    <img
                        src="/me2.jpg" // Placeholder image for Vikram Hegde
                        alt="Vikram Hegde"
                        className="w-64 h-64 rounded-full border-4 border-gray-300 dark:border-gray-700 object-cover shadow-lg"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
