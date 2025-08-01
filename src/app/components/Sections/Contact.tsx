'use client'

import { Mail, Send, Github, Linkedin, Loader2, Check, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion';

type ButtonState = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
    const [buttonState, setButtonState] = useState<ButtonState>('idle');

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const name = formData.get('name')
        const email = formData.get('email')
        const message = formData.get('message')

        // Set the state to 'sending' before the API call
        setButtonState('sending');

        try {
            await axios.post('https://formsubmit.co/vikramhegde4037@gmail.com', {
                name,
                email,
                message,
            })
            // On success, set the state to 'sent'
            setButtonState('sent');
            form.reset()
            setTimeout(() => setButtonState('idle'), 4000);
        } catch (error) {
            console.error('Message sending failed:', error)
            // On failure, set the state to 'error'
            setButtonState('error');
            // Reset the state back to 'idle' after a few seconds
            setTimeout(() => setButtonState('idle'), 4000);
        }
    }

    // Variants for the button and its content
    const buttonVariants = {
        idle: {
            backgroundColor: '#3cb043',
            color: '#ffffff',
            scale: 1,
        },
        sending: {
            backgroundColor: '#3b82f6', // blue-500
            color: '#ffffff',
            scale: 1.05,
        },
        sent: {
            backgroundColor: '#10b981', // green-500
            color: '#ffffff',
            scale: 1,
        },
        error: {
            backgroundColor: '#ef4444', // red-500
            color: '#ffffff',
            scale: 1.05,
        },
    };

    return (
        <section id="contact" className="w-full py-24 px-4 md:px-12 bg-white dark:bg-black">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
                {/* Info Column */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-green-800 dark:text-green-300">Let's Connect</h2>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                        Have a project in mind or want to collaborate? Drop me a message or reach out through my socials below.
                    </p>

                    <div
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 py-4 border-b"
                    >
                        <Mail size={22} />
                        <a
                            href="mailto:vikramhegde4037@gmail.com"
                            target="_blank"
                        >
                            vikramhegde4037@gmail.com
                        </a>
                    </div>

                    <div className="flex gap-4 mt-4 py-4 border-b">
                        <a
                            href="https://github.com/vikramhegde07"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-700 dark:hover:text-green-300"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/vikramhegde07/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-700 dark:hover:text-green-300"
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>

                {/* Form Column */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-green-800 dark:text-green-300">Get in Touch</h2>
                    <form className="space-y-4" onSubmit={handleSendMessage}>
                        <Input placeholder="Your Name" name="name" required className="bg-white dark:bg-zinc-900" />
                        <Input placeholder="Your Email" name="email" type="email" required className="bg-white dark:bg-zinc-900" />
                        <Textarea placeholder="Your Message" name="message" rows={6} required className="bg-white dark:bg-zinc-900" />


                        <motion.div
                            className="relative w-full h-12" // Wrapper div to keep a consistent button height
                        >
                            <motion.button
                                type="submit"
                                disabled={buttonState === 'sending'}
                                className={cn(
                                    'w-full h-12 rounded-full px-4 text-base font-medium flex items-center justify-center gap-2',
                                    'text-white transition-all duration-300',
                                    'focus:outline-none focus:ring-2 focus:ring-offset-2',
                                    'absolute top-0 left-0'
                                )}
                                variants={buttonVariants}
                                animate={buttonState}
                            >
                                <AnimatePresence mode="wait">
                                    {buttonState === 'idle' && (
                                        <motion.div key="send-icon" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }} exit={{ opacity: 0, scale: 0.8 }}>
                                            <Send size={16} />
                                            <span>Send Message</span>
                                        </motion.div>
                                    )}
                                    {buttonState === 'sending' && (
                                        <motion.div key="loading-icon" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }} exit={{ opacity: 0, scale: 0.8 }}>
                                            <Loader2 size={16} className="animate-spin" />
                                            <span>Sending...</span>
                                        </motion.div>
                                    )}
                                    {buttonState === 'sent' && (
                                        <motion.div key="sent-icon" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }} exit={{ opacity: 0, scale: 0.8 }}>
                                            <Check size={16} />
                                            <span>Sent!</span>
                                        </motion.div>
                                    )}
                                    {buttonState === 'error' && (
                                        <motion.div key="error-icon" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }} exit={{ opacity: 0, scale: 0.8 }}>
                                            <X size={16} />
                                            <span>Error</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </motion.div>
                    </form>
                </div>
            </div>
        </section>
    )
}