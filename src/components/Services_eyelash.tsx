import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import './Services_eyelash.css'

const lashRows = [
  [{ name: 'Classic (Natural)', price: '₱390' }, { name: 'Light Volume', price: '₱430' }, { name: 'Mega Volume', price: '₱500' }],
  [{ name: 'Ombre (Mermaid)', price: '₱500' }, { name: 'Wispy', price: '₱500' }, { name: 'Cat Eye', price: '₱550' }, { name: 'Anime', price: '₱550' }],
  [{ name: 'Lash Perm', price: '₱350' }, { name: 'Lash Lift', price: '₱350' }, { name: 'Lift + Tint', price: '₱430' }, { name: 'Brow Lamination', price: '₱400' }],
]

export default function ServicesEyelash() {
  const [position, setPosition] = useState(50)
  const menuRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    const items = Array.from(menu.querySelectorAll<HTMLElement>(
      '.eyelash-menu-header, .eyelash-menu-row li, .eyelash-menu-note',
    ))
    // Shuffle the reveal order without changing the menu's reading order.
    const shuffled = [...items]
    for (let index = shuffled.length - 1; index > 0; index--) {
      const swap = Math.floor(Math.random() * (index + 1))
      ;[shuffled[index], shuffled[swap]] = [shuffled[swap], shuffled[index]]
    }
    shuffled.forEach((item, index) => {
      item.style.setProperty('--entrance-delay', `${index * 100}ms`)
    })
    menu.classList.add('is-entrance-ready')

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      menu.classList.add('is-revealed')
      observer.disconnect()
    }, { threshold: 0.1 })
    observer.observe(menu)

    return () => {
      observer.disconnect()
      menu.classList.remove('is-entrance-ready', 'is-revealed')
      items.forEach((item) => item.style.removeProperty('--entrance-delay'))
    }
  }, [])

  return (
    <section className="services-eyelash" aria-label="Eyelash gallery">
      <div className="eyelash-parallax">
        <img src="/assets/eyelash/left.jpg" alt="Eyelash treatment, left view" loading="lazy" decoding="async" />
      </div>
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
      <div className="eyelash-parallax">
        <img src="/assets/eyelash/right.jpg" alt="Eyelash treatment, right view" loading="lazy" decoding="async" />
      </div>
      <div ref={menuRef} className="eyelash-menu" aria-labelledby="eyelash-menu-heading">
        <header className="eyelash-menu-header">
          <h2 id="eyelash-menu-heading">Human Hair Eyelash Extensions</h2>
        </header>
        {lashRows.map((row, index) => (
          <ul className={`eyelash-menu-row eyelash-menu-row-${index + 1}`} key={index}>
            {row.map((item) => (
              <li key={item.name}>
                <span>{item.name}</span>
                <span className="eyelash-menu-price">{item.price}</span>
              </li>
            ))}
          </ul>
        ))}
        <p className="eyelash-menu-note">Eyelash Retouch / Removal <span>₱100</span></p>
      </div>
    </section>
  )
}
