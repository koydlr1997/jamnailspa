import { useState, type CSSProperties } from 'react'
import './Services_eyelash.css'

export default function ServicesEyelash() {
  const [position, setPosition] = useState(50)

  return (
    <section className="services-eyelash" aria-label="Eyelash gallery">
      <img src="/assets/eyelash/left.jpg" alt="Eyelash treatment, left view" loading="lazy" decoding="async" />
      <div className="eyelash-comparison" style={{ '--comparison-position': `${position}%` } as CSSProperties}>
        <img src="/assets/eyelash/before.png" alt="Eyelashes before treatment" loading="lazy" decoding="async" />
        <img className="eyelash-comparison-after" src="/assets/eyelash/after.png" alt="Eyelashes after treatment" loading="lazy" decoding="async" />
        {position > 0 && <span className="eyelash-comparison-label eyelash-comparison-label-before" aria-hidden="true">BEFORE</span>}
        {position < 100 && <span className="eyelash-comparison-label eyelash-comparison-label-after" aria-hidden="true">AFTER</span>}
        <span className="eyelash-comparison-divider" aria-hidden="true">
          <span className="eyelash-comparison-handle">‹ ›</span>
        </span>
        <input
          className="eyelash-comparison-slider"
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Before and after eyelash comparison"
          aria-valuetext={`${position}% before treatment, ${100 - position}% after treatment`}
        />
      </div>
      <img src="/assets/eyelash/right.jpg" alt="Eyelash treatment, right view" loading="lazy" decoding="async" />
    </section>
  )
}
