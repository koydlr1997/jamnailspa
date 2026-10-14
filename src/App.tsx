import { useCallback, useLayoutEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import ServicesMarquee from './components/Services_marquee'
import ServicesMassage from './components/Services_massage'
import ServicesNails from './components/Services_nails'
import Intro from './components/Intro'
import useSmoothScroll from './hooks/useSmoothScroll'

export default function App() {
  const [introPhase, setIntroPhase] = useState<'playing' | 'exiting' | 'complete'>('playing')
  const introVisible = introPhase !== 'complete'
  const startIntroExit = useCallback(() => {
    // Recheck before the curtain lifts in case an initial anchor moved the page.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setIntroPhase('exiting')
  }, [])
  const finishIntro = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setIntroPhase('complete')
  }, [])

  useSmoothScroll(!introVisible)

  useLayoutEffect(() => {
    if (!introVisible) return

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const previousBodyOverflow = document.body.style.overflow
    const previousRootOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousRootOverflow
    }
  }, [introVisible])

  return (
    <div className="min-h-screen bg-white">
      {introVisible && <Intro onExitStart={startIntroExit} onComplete={finishIntro} />}
      <div
        className={`site-content${introPhase === 'playing' ? ' is-intro-pending' : ''}`}
        inert={introVisible}
        aria-hidden={introVisible || undefined}
      >
        <Navbar />
        <main>
          <Hero paused={introVisible} />
          <Services />
          <ServicesMarquee />
          <ServicesMassage />
          <ServicesNails />
        </main>
      </div>
    </div>
  )
}
