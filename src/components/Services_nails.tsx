import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import './Services.css'
import './Services_massage.css'
import './Hero.css'

import './Services_nails.css'

// Temporary nail service copy and images.
const treatments = [
  {
    "heading": "Classic Manicure",
    "image": "/assets/services/manicure.png",
    "title": "EVERYDAY NAIL CARE",
    "description": "Refresh your nails with careful shaping, cuticle care, and a polished finish.",
    "price": "PRICE"
  },
  {
    "heading": "Gel Manicure",
    "image": "/assets/banner1.png",
    "title": "LASTING COLOR & SHINE",
    "description": "Enjoy a glossy gel finish with a fresh shade to complement your style.",
    "price": "PRICE"
  },
  {
    "heading": "Classic Pedicure",
    "image": "/assets/banner2.png",
    "title": "REFRESH & POLISH",
    "description": "Treat your toes to thoughtful nail care and a beautifully polished finish.",
    "price": "PRICE"
  },
  {
    "heading": "Gel Pedicure",
    "image": "/assets/banner3.png",
    "title": "A LITTLE EXTRA SHINE",
    "description": "Refresh your look with a smooth gel finish and your favorite color.",
    "price": "PRICE"
  },
  {
    "heading": "Soft Gel Extensions",
    "image": "/assets/services/manicure.png",
    "title": "LENGTH & SHAPE",
    "description": "Explore a new nail shape and length with a set of soft gel extensions.",
    "price": "PRICE"
  },
  {
    "heading": "Polygel Extensions",
    "image": "/assets/banner1.png",
    "title": "YOUR STYLE, YOUR SHAPE",
    "description": "Create a sculpted nail look tailored to your preferred shape and length.",
    "price": "PRICE"
  },
  {
    "heading": "Signature Nail Art",
    "image": "/assets/banner2.png",
    "title": "SMALL DETAILS, BIG STYLE",
    "description": "Add a personal touch with nail art inspired by your favorite colors and details.",
    "price": "PRICE"
  },
  {
    "heading": "French Manicure",
    "image": "/assets/banner3.png",
    "title": "TIMELESS & REFINED",
    "description": "Keep things classic with clean tips and a beautifully balanced finish.",
    "price": "PRICE"
  },
  {
    "heading": "Nail Care Ritual",
    "image": "/assets/services/manicure.png",
    "title": "RESTORE & REFRESH",
    "description": "Give your natural nails a moment of attention with gentle grooming and care.",
    "price": "PRICE"
  },
  {
    "heading": "Nail Color Refresh",
    "image": "/assets/banner1.png",
    "title": "A FRESH NEW SHADE",
    "description": "Switch up your style with a new color and a neat, polished finish.",
    "price": "PRICE"
  }
]

export default function ServicesNails() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [selectedImage, setSelectedImage] = useState<typeof treatments[number] | null>(null)

  useEffect(() => {
    if (!selectedImage) return
    const dialog = dialogRef.current!
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [selectedImage])

  const sectionRef = useRef<HTMLElement>(null)
  const [carouselRef, carouselApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    duration: 35,
    breakpoints: {
      '(prefers-reduced-motion: reduce)': { duration: 0 },
    },
  })
  const [currentSlide, setCurrentSlide] = useState(0)


  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const textElements = Array.from(section.querySelectorAll<HTMLElement>(
      '.massage-card-heading, .massage-card-title:not(.massage-card-price)',
    ))
    let disposed = false
    let previousWidth = -1

    function fitText() {
      if (disposed) return
      // Restore the CSS size first so text can grow again on wider cards.
      textElements.forEach((element) => { element.style.fontSize = '' })
      const sizes = textElements.map((element) => {
        const baseSize = parseFloat(getComputedStyle(element).fontSize)
        const availableWidth = element.clientWidth
        return availableWidth > 0 && element.scrollWidth > availableWidth
          ? `${baseSize * (availableWidth - 1) / element.scrollWidth}px`
          : ''
      })
      textElements.forEach((element, index) => {
        element.style.fontSize = sizes[index]
      })
    }

    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width === previousWidth) return
      previousWidth = entry.contentRect.width
      fitText()
    })
    // Card width also changes when the carousel switches its visible slide count.
    const card = section.querySelector<HTMLElement>('.massage-carousel-card')
    if (card) observer.observe(card)
    fitText()
    void document.fonts.ready.then(fitText)
    document.fonts.addEventListener('loadingdone', fitText)

    return () => {
      disposed = true
      observer.disconnect()
      document.fonts.removeEventListener('loadingdone', fitText)
    }
  }, [])

  useEffect(() => {
    if (!carouselApi) return
    const updateSelection = () => setCurrentSlide(carouselApi.selectedScrollSnap())
    updateSelection()
    carouselApi.on('select', updateSelection).on('reInit', updateSelection)
    return () => {
      carouselApi.off('select', updateSelection).off('reInit', updateSelection)
    }
  }, [carouselApi])

  const designsButton = (
    <button
          type="button"
          className="hero-services-button nails-designs-button"
          aria-controls="nails-carousel-viewport"
          onClick={() => carouselApi?.scrollNext()}
        >
          VIEW OUR DESIGNS
          <ArrowUpRight
            size={18}
            strokeWidth={1.5}
            absoluteStrokeWidth
            aria-hidden="true"
            focusable="false"
            style={{ flexShrink: 0 }}
          />
        </button>
  )

  return (
    <section
      ref={sectionRef}
      id="services-nails"
      className="services services-nails"
      aria-labelledby="services-nails-heading"
    >
      <div className="services-nails-layout">
      <header className="services-header">
        <p className="services-title">YOUR NAILS,</p>
        <h2 id="services-nails-heading" className="services-heading">
          OUR PRIORITY.
        </h2>
        <div className="nails-designs-desktop">{designsButton}</div>
      </header>
      <div
        className="massage-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Nail treatments"
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault()
            if (event.key === 'ArrowLeft') carouselApi?.scrollPrev()
            else carouselApi?.scrollNext()
          }
        }}
      >
        <div
          id="nails-carousel-viewport"
          className="massage-carousel-viewport"
          ref={carouselRef}
          tabIndex={0}
          aria-label="Swipe or use the left and right arrow keys to browse treatments"
        >
          <div className="massage-carousel-track">
            {treatments.map((treatment, index) => (
              <article
                className="service-card massage-carousel-card"
                key={treatment.heading}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${treatments.length}: ${treatment.heading}`}
              >
                <button
                  type="button"
                  className="service-card-media nails-image-button"
                  aria-label={`View ${treatment.heading} image`}
                  aria-haspopup="dialog"
                  onClick={(event) => {
                    if (!event.defaultPrevented) setSelectedImage(treatment)
                  }}
                >
                  <img
                    className="service-card-image"
                    src={treatment.image}
                    alt={treatment.heading}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={800}
                  />
                </button>
                <h3 className="massage-card-heading">{treatment.heading}</h3>
                <p className="massage-card-title">{treatment.title}</p>
                <p className="service-card-description">
                  {treatment.description}
                </p>
                <p className="massage-card-title massage-card-price">{treatment.price}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="massage-carousel-controls">
          <button
            type="button"
            className="massage-carousel-arrow massage-carousel-prev"
            aria-label="Previous nail treatment"
            aria-controls="nails-carousel-viewport"
            onClick={() => carouselApi?.scrollPrev()}
          >
            <ChevronLeft size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="massage-carousel-arrow massage-carousel-next"
            aria-label="Next nail treatment"
            aria-controls="nails-carousel-viewport"
            onClick={() => carouselApi?.scrollNext()}
          >
            <ChevronRight size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        <p className="massage-carousel-status" role="status" aria-atomic="true">
          Treatment {currentSlide + 1} of {treatments.length}
        </p>
      </div>
      <div className="nails-designs-mobile">{designsButton}</div>
      </div>
      <dialog
        ref={dialogRef}
        className="nails-lightbox"
        aria-label={selectedImage ? `${selectedImage.heading} image preview` : 'Nail image preview'}
        data-lenis-prevent
        onCancel={(event) => {
          event.preventDefault()
          setSelectedImage(null)
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelectedImage(null)
        }}
      >
        {selectedImage && (
          <>
            <img src={selectedImage.image} alt={selectedImage.heading} />
            <button
              type="button"
              className="nails-lightbox-close"
              aria-label="Close image preview"
              autoFocus
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </>
        )}
      </dialog>
    </section>
  )
}
