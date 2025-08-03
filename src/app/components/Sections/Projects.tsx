'use client'

import { Github, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion'

const projects = [
    {
        title: 'Task Tracker',
        description: 'A private task manager with priority tagging. Used React + Vite + TS + TailwindCSS + ShadCN for Frontend and Node/Express + MongoDB + JWT for Backend',
        media: '/projects/task-manager.png',
        github: 'https://github.com/vikramhegde07/Task-Tracker',
        live: 'https://task.nodenomad.in'
    },
    {
        title: 'FAROPORT - Article Publisher',
        description: 'Builder-based CMS for articles with DOCX/PDF parsing and S3 uploads. Used React.Js + Vite for admin side, Next.Js for client/user side and used TailwindCSS and shadcn for both frontends. Backend used Node/Express, JWT for authentication,MongoDB for Database, AWS S3 for storage. Used github actions for deployments and Render for backend deployment.',
        media: '/projects/article-app.png',
        live: 'https://faroport.tech'
    },
    {
        title: 'PG Management SaaS',
        description: 'Multi-tenant SaaS for PG owners with subscription, analytics, and file storage. Currently in plannig stage, will be updated once finalized.',
        media: '/projects/pg-saas.mp4',
        // github: 'https://github.com/your/pg-saas',
        // live: 'https://pg.nodenomad.in'
    },
    {
        title: "Multi-Factor Authentication",
        description: "An example of how the MFA works and simple way to verify and add MFA to your apps. Used React.Js + Vite + TailwindCSS + ShadCN for frontend and used Node/Express for backend with speakeasy and qrcode for 'totp' QR code generation, JWT for auth, MongoDB for Database.",
        media: "/projects/MFA.png",
        github: "https://github.com/vikramhegde07/Multi-Factor-Authentication",
        live: "https://mfa.nodenomad.in"
    }
]

export default function Projects() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    })
    return (
        <section ref={ref} id="projects" className="w-full py-24 px-4 md:px-12 bg-white dark:bg-black">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 items-center">
                {/* Left Text Column */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={inView ? { opacity: 1, x: 0 } : ''}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 md:col-span-1">
                    <h2 className="text-3xl font-bold text-green-800 dark:text-green-300">My Projects</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Explore some of the real-world applications I've built, ranging from SaaS platforms to content publishing systems. Each project reflects my dedication to clean architecture and great UI.
                    </p>
                </motion.div>

                {/* Right Carousel Column */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={inView ? { opacity: 1, x: 0 } : ''}
                    transition={{ duration: 0.5 }}
                    className="md:col-span-2 relative w-full overflow-hidden p-2">
                    <Carousel opts={{ loop: true }} plugins={[
                        Autoplay({
                            delay: 5000,
                        }),
                    ]}
                    >
                        <CarouselContent>
                            {projects.map((project, i) => (
                                <CarouselItem key={i} className="px-4">
                                    <div className="grid md:grid-cols-2 gap-6 p-4 border rounded-lg bg-zinc-50 dark:bg-zinc-900 items-center">
                                        {/* Media */}
                                        <div className="w-full h-64 overflow-hidden rounded-lg">
                                            {project.media.endsWith('.mp4') ? (
                                                <video
                                                    src={project.media}
                                                    autoPlay
                                                    loop
                                                    muted
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Image
                                                    src={project.media}
                                                    alt={project.title}
                                                    width={500}
                                                    height={400}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="space-y-3 flex flex-col justify-between p-3">
                                            <div>
                                                <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">
                                                    {project.title}
                                                </h3>
                                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 text-justify">
                                                    {project.description}
                                                </p>
                                            </div>
                                            <div className="flex gap-4 mt-4">
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-3 px-8 py-2 rounded-full border border-green-700 text-green-800 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800 hover:shadow transition-all group"
                                                    >
                                                        <Github size={16} className="transition-transform duration-300 group-hover:translate-x-[2px]" />
                                                        GitHub
                                                    </a>

                                                )}
                                                {project.live && (
                                                    <a
                                                        href={project.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-3 px-8 py-2 rounded-full bg-green-700 text-white dark:bg-green-600 dark:text-white hover:bg-green-800 dark:hover:bg-green-700 hover:shadow transition-all group"
                                                    >
                                                        Live
                                                        <ExternalLink size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </motion.div>
            </div>
        </section>
    )
}