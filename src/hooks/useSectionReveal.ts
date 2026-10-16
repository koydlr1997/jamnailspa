import { useEffect, type RefObject } from 'react'

export default function useSectionReveal(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current
    const header = section?.querySelector('.services-header')
    if (!section || !header) return

    section.classList.add('is-reveal-ready')
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.65) return
      section.classList.add('is-revealed')
      observer.disconnect()
    }, { threshold: 0.65, rootMargin: '0px 0px -12% 0px' })
    observer.observe(header)

    return () => {
      observer.disconnect()
      section.classList.remove('is-reveal-ready', 'is-revealed')
    }
  }, [sectionRef])
}
