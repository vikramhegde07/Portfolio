'use client'

import { motion } from 'framer-motion'

export default function ProjectSlide({
    project,
    isActive,
    direction,
}: {
    project: {
        title: string
        description: string
        media: string
    }
    isActive: boolean
    direction: 'left' | 'right'
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: direction === 'right' ? 300 : -300 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center px-6 md:px-20 transition-all`}
        >
            <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Left: Media */}
                <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg">
                    {project.media.endsWith('.mp4') ? (
                        <video src={project.media} autoPlay loop muted className="w-full h-auto object-cover" />
                    ) : (
                        <img src={project.media} alt={project.title} className="w-full h-auto object-cover" />
                    )}
                </div>

                {/* Right: Text */}
                <div className="w-full md:w-1/2 space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-green-300">
                        {project.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">{project.description}</p>
                    <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">
                        Explore Project
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
