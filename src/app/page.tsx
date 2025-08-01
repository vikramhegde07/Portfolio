'use client'

import About from './components/Sections/About'
import Projects from './components/Sections/Projects'
import Contact from './components/Sections/Contact'
import HeroSection from './components/Sections/Hero'

export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <Projects />
      <Contact />
    </>
  )
}
