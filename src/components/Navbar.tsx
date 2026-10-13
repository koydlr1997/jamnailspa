import { useEffect, useRef, useState } from 'react'
import './Navbar.css'

const socialLinks = [
  { name: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/' },
  { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/' },
  { name: 'TikTok', icon: 'tiktok', href: 'https://www.tiktok.com/' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 8)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 1023px)').matches)
  const navbarRef = useRef<HTMLElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)

  function closeNavigation() {
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    function updateScrollState() {
      setIsScrolled(window.scrollY > 8)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 1023px)')

    function handleViewportChange(event: MediaQueryListEvent) {
      setIsMobile(event.matches)
      setMobileMenuOpen(false)
    }

    mobileQuery.addEventListener('change', handleViewportChange)
    return () => mobileQuery.removeEventListener('change', handleViewportChange)
  }, [])

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (!navbarRef.current?.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [])

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}${isMobile && mobileMenuOpen ? ' is-menu-open' : ''}`}>
      <nav
        ref={navbarRef}
        aria-label="Main navigation"
        className="navbar font-montserrat"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            closeNavigation()
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && mobileMenuOpen) {
            event.preventDefault()
            closeNavigation()
            mobileMenuButtonRef.current?.focus()
          }
        }}
      >
        <button
          ref={mobileMenuButtonRef}
          type="button"
          className={`navbar-burger${mobileMenuOpen ? ' is-open' : ''}`}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="navbar-menu"
          onClick={() => {
            setMobileMenuOpen((open) => !open)
          }}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <div
          id="navbar-menu"
          className={`navbar-menu${mobileMenuOpen ? ' is-open' : ''}`}
          inert={isMobile && !mobileMenuOpen}
        >
          <div className="navbar-menu-inner">
            <ul className="navbar-links">
              <li><a className="navbar-link" href="#home" onClick={closeNavigation}>HOME</a></li>
              <li><a className="navbar-link" href="#services" onClick={closeNavigation}>SERVICES</a></li>
              <li><a className="navbar-link" href="#about-us" onClick={closeNavigation}>ABOUT US</a></li>
              <li><a className="navbar-link" href="#gallery" onClick={closeNavigation}>GALLERY</a></li>
            </ul>
          </div>
        </div>

        <a href="#home" className="navbar-brand font-ngetic" aria-label="Jam Nail Spa home" onClick={closeNavigation}>
          <span>jam nail spa</span>
          <img className="navbar-brand-icon" src="/assets/jamicon.png" alt="" width="38" height="38" />
        </a>

        <div className="navbar-socials" aria-label="Social media">
          {socialLinks.map((social) => (
            <a
              key={social.icon}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.name} (opens in a new tab)`}
              className="navbar-social-link"
            >
              <img src={`/assets/social/${social.icon}.svg`} alt="" width="19" height="19" />
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
