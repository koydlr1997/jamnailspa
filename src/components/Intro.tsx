import { useEffect, useRef, useState, type CSSProperties } from 'react'
import './Intro.css'

const brandName = 'jam nail spa'
const letters = Array.from(brandName)
const letterDuration = 950
const letterStagger = 120
const iconDelay = letterDuration + (letters.length - 1) * letterStagger + 100
const iconDuration = 725
const holdDuration = 210
const exitDuration = 850

type IntroProps = {
  onExitStart: () => void
  onComplete: () => void
}

export default function Intro({ onExitStart, onComplete }: IntroProps) {
  const iconRef = useRef<HTMLImageElement>(null)
  const [phase, setPhase] = useState<'loading' | 'playing' | 'exiting'>('loading')
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    let cancelled = false
    let started = false
    function start() {
      if (cancelled || started) return
      started = true
      setPhase('playing')
    }

    // Let the brand assets load before revealing them, with a bounded wait.
    const fallback = window.setTimeout(start, 1200)
    void Promise.allSettled([
      document.fonts.load('400 32px "Ngetic Modern"'),
      iconRef.current?.decode(),
    ]).then(() => {
      window.clearTimeout(fallback)
      start()
    })

    return () => {
      cancelled = true
      window.clearTimeout(fallback)
    }
  }, [])

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    function handleMotionChange(event: MediaQueryListEvent) {
      setReducedMotion(event.matches)
      if (event.matches) onComplete()
    }
    motionQuery.addEventListener('change', handleMotionChange)
    return () => motionQuery.removeEventListener('change', handleMotionChange)
  }, [onComplete])

  useEffect(() => {
    if (phase === 'loading') return

    if (phase === 'playing') {
      const timer = window.setTimeout(
        () => setPhase('exiting'),
        reducedMotion ? 350 : iconDelay + iconDuration + holdDuration,
      )
      return () => window.clearTimeout(timer)
    }

    onExitStart()
    // Also finish if the browser suppresses the animationend event.
    const fallback = window.setTimeout(onComplete, (reducedMotion ? 180 : exitDuration) + 100)
    return () => window.clearTimeout(fallback)
  }, [phase, reducedMotion, onExitStart, onComplete])

  return (
    <section
      id="intro"
      className={`intro is-${phase}`}
      aria-labelledby="intro-heading"
      data-lenis-prevent
      style={{
        '--intro-letter-duration': `${letterDuration}ms`,
        '--intro-letter-stagger': `${letterStagger}ms`,
        '--intro-icon-delay': `${iconDelay}ms`,
        '--intro-icon-duration': `${iconDuration}ms`,
        '--intro-exit-duration': `${reducedMotion ? 180 : exitDuration}ms`,
      } as CSSProperties}
      onAnimationEnd={(event) => {
        if (phase === 'exiting' && event.target === event.currentTarget) onComplete()
      }}
    >
      <div
        className={`intro-brand${phase !== 'loading' ? ' is-revealed' : ''}`}
      >
        <h2 id="intro-heading" className="intro-heading" aria-label={brandName}>
          {letters.map((letter, index) => (
            <span
              key={index}
              className={letter === ' ' ? 'intro-letter-space' : 'intro-letter-mask'}
              aria-hidden="true"
            >
              {letter === ' ' ? '\u00a0' : (
                <span
                  className="intro-letter"
                  style={{ '--letter-index': index } as CSSProperties}
                >
                  {letter}
                </span>
              )}
            </span>
          ))}
        </h2>
        <img ref={iconRef} className="intro-icon" src="/assets/jamicon.png" alt="" width={64} height={64} />
      </div>
    </section>
  )
}
