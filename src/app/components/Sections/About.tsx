'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function About() {
    const [isMobile, setIsMobile] = useState(false);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    })

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    }
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 720);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section
            id="about"
            ref={ref}
            className="w-full min-h-screen px-4 py-20 flex flex-col gap-16 items-center justify-center"
        >
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 grid-cols-1 md:items-center gap-6 max-w-5xl w-full border-b  p-6" >
                <motion.h2
                    variants={fadeUp}
                    initial={{ opacity: 0, x: -100 }}
                    animate={inView ? { opacity: 1, x: 0 } : ''}
                    transition={{ duration: 0.5 }}
                    className="relative inline-block text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-800 to-green-500 dark:from-green-200 dark:to-green-400 text-transparent bg-clip-text after:block after:h-[2px] after:w-10 after:bg-green-500 dark:after:bg-green-300 after:mt-2"
                >
                    About Me
                </motion.h2>
                <motion.p
                    variants={fadeUp}
                    initial={{ opacity: 0, x: 100 }}
                    animate={inView ? { opacity: 1, x: 0 } : ''}
                    transition={{ duration: 0.5 }}
                    className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                >
                    I'm <span className="font-semibold text-green-800 dark:text-green-300">Vikram Hegde</span>, a
                    <span className="italic text-green-700 dark:text-green-200"> full-stack web developer</span> who loves turning
                    ideas into elegant, performant interfaces. I believe in
                    <span className="font-bold text-green-900 dark:text-green-100"> clean code, modular systems</span>, and
                    delivering seamless user experiences.
                </motion.p>
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 grid-cols-1 md:items-center gap-6 max-w-5xl w-full border-b p-6">
                <motion.h2
                    variants={fadeUp}
                    initial={{ opacity: 0, x: -100 }}
                    animate={inView ? { opacity: 1, x: 0 } : ''}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="relative inline-block text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-800 to-green-500 dark:from-green-200 dark:to-green-400 text-transparent bg-clip-text after:block after:h-[2px] after:w-10 after:bg-green-500 dark:after:bg-green-300 after:mt-2"
                >
                    Skills I Have
                </motion.h2>
                <motion.p
                    variants={fadeUp}
                    initial={{ opacity: 0, x: 100 }}
                    animate={inView ? { opacity: 1, x: 0 } : ''}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg order-1 md:order-none"
                >
                    I specialize in tools like{' '}
                    <span className="font-semibold text-green-700 dark:text-green-300">React</span>,{' '}
                    <span className="font-semibold text-green-700 dark:text-green-300">Next.js</span>, and{' '}
                    <span className="font-semibold text-green-700 dark:text-green-300">TypeScript</span>. I also work with
                    backend stacks like Express.js and MongoDB, and I enjoy building intuitive UI with{' '}
                    <span className="italic">Tailwind CSS</span> and component libraries like ShadCN.
                </motion.p>
            </div>

            {/* Row 3 */}
            <div className="grid md:grid-cols-2 grid-cols-1 md:items-center gap-6 max-w-5xl w-full p-6">
                <motion.h2
                    variants={fadeUp}
                    initial={{ opacity: 0, x: -100 }}
                    animate={inView ? { opacity: 1, x: 0 } : ''}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="relative inline-block text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-800 to-green-500 dark:from-green-200 dark:to-green-400 text-transparent bg-clip-text after:block after:h-[2px] after:w-10 after:bg-green-500 dark:after:bg-green-300 after:mt-2"
                >
                    My Projects
                </motion.h2>
                <motion.div
                    variants={fadeUp}
                    initial={{ opacity: 0, x: 100 }}
                    animate={inView ? { opacity: 1, x: 0 } : ''}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="flex flex-col md:items-end gap-4"
                >
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        I've built article platforms, static sites and productivity tools.I am currently building a SaaS. You can explore my work on the
                        projects page.
                    </p>
                    <Link href="#projects">
                        <Button
                            className="group bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition flex items-center gap-2"
                        >
                            View Projects
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
