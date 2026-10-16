import { useRef } from 'react'
import useSectionReveal from '../hooks/useSectionReveal'
import './Services.css'
import './Services_waxing.css'

export default function ServicesWaxing() {
  const sectionRef = useRef<HTMLElement>(null)
  useSectionReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="Services_waxing"
      className="services services-waxing"
      aria-labelledby="services-waxing-heading"
    >
      <header className="services-header">
        <p className="services-title">WE'RE CERTIFIED,</p>
        <h2 id="services-waxing-heading" className="services-heading">
          EPILATION SPECIALIST.
        </h2>
      </header>
    </section>
  )
}
