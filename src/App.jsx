import { useEffect, useState } from 'react'

import About from './components/About'
import Contact from './components/Contact'
import CursorFollower from './components/CursorFollower'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Preloader from './components/Preloader'
import Projects from './components/Projects'
import ScrollProgress from './components/ScrollProgress'
import SideNav from './components/SideNav'
import Skills from './components/Skills'
import Stats from './components/Stats'

/**
 * True only for devices that actually have a pointer to replace. Mounting the
 * custom cursor on a phone costs an animation frame loop forever and shows
 * nothing, so we simply don't.
 */
function useHasFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setFine(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return fine
}

export default function App() {
  const hasFinePointer = useHasFinePointer()

  return (
    <>
      <Preloader />
      <ScrollProgress />
      {hasFinePointer && <CursorFollower />}

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SideNav />

      <main id="main">
        <Hero />
        <Stats />
        <Experience />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
