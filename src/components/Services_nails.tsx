import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import useSectionReveal from '../hooks/useSectionReveal'
import useCarouselEdges from '../hooks/useCarouselEdges'
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
    "price": "PRICE"
  },
  {
    "heading": "Gel Manicure",
    "image": "/assets/banner1.png",
    "title": "LASTING COLOR & SHINE",
    "price": "PRICE"
  },
  {
    "heading": "Classic Pedicure",
    "image": "/assets/banner2.png",
    "title": "REFRESH & POLISH",
    "price": "PRICE"
  },
  {
    "heading": "Gel Pedicure",
    "image": "/assets/banner3.png",
    "title": "A LITTLE EXTRA SHINE",
    "price": "PRICE"
  },
  {
    "heading": "Soft Gel Extensions",
    "image": "/assets/services/manicure.png",
    "title": "LENGTH & SHAPE",
    "price": "PRICE"
  },
  {
    "heading": "Polygel Extensions",
    "image": "/assets/banner1.png",
    "title": "YOUR STYLE, YOUR SHAPE",
    "price": "PRICE"
  },
  {
    "heading": "Signature Nail Art",
    "image": "/assets/banner2.png",
    "title": "SMALL DETAILS, BIG STYLE",
    "price": "PRICE"
  },
  {
    "heading": "French Manicure",
    "image": "/assets/banner3.png",
    "title": "TIMELESS & REFINED",
    "price": "PRICE"
  },
  {
    "heading": "Nail Care Ritual",
    "image": "/assets/services/manicure.png",
    "title": "RESTORE & REFRESH",
    "price": "PRICE"
  },
  {
    "heading": "Nail Color Refresh",
    "image": "/assets/banner1.png",
    "title": "A FRESH NEW SHADE",
    "price": "PRICE"
  }
]

export default function ServicesNails() {
  const sectionRef = useRef<HTMLElement>(null)
  useSectionReveal(sectionRef)
  const [carouselRef, carouselApi] = useEmblaCarousel({
    loop: true,
    align: (viewSize, slideSize) => slideSize / 8 + Math.min(24, Math.max(12, viewSize * 0.015)),
    duration: 35,
    active: false,
    breakpoints: {
      '(max-width: 767px)': { active: true },
      '(prefers-reduced-motion: reduce)': { duration: 0 },
    },
  })
  useCarouselEdges(carouselApi, true)
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

  const designsButton = (
    <a
          className="hero-services-button nails-designs-button"
          href="#nails-grid"
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
        </a>
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
      <div className="nails-cards-container" onKeyDown={(event) => {
        if (!window.matchMedia('(max-width: 767px)').matches) return
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          if (event.key === 'ArrowLeft') carouselApi?.scrollPrev()
          else carouselApi?.scrollNext()
        }
      }}>
      <div className="nails-cards-viewport" ref={carouselRef}>
      <div id="nails-grid" className="nails-grid" aria-label="Nail treatments">
            {treatments.map((treatment) => (
              <article
                className="service-card nails-card"
                key={treatment.heading}
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
                  <span className="service-card-caption">
                    <span className="massage-card-price">{treatment.price}</span>
                  </span>
                </button>
                <h3 className="massage-card-heading">{treatment.heading}</h3>
                <p className="massage-card-title">{treatment.title}</p>
              </article>
            ))}
      </div>
      </div>
      <div className="massage-carousel-controls nails-carousel-controls">
        <button type="button" className="massage-carousel-arrow massage-carousel-prev"
          aria-label="Previous nail treatment" aria-controls="nails-grid"
          onClick={() => carouselApi?.scrollPrev()}>
          <ChevronLeft size={38} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <button type="button" className="massage-carousel-arrow massage-carousel-next"
          aria-label="Next nail treatment" aria-controls="nails-grid"
          onClick={() => carouselApi?.scrollNext()}>
          <ChevronRight size={38} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
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
