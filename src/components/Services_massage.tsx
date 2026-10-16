import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import useSectionReveal from '../hooks/useSectionReveal'
import useCarouselEdges from '../hooks/useCarouselEdges'
import './Services.css'
import './Services_massage.css'

const treatments = [
  {
    heading: 'Classic Foot Spa',
    image: '/assets/massage/Classic Foot Spa.png',
    title: 'Classic Foot Spa + Classic Foot Scrub',
    description: 'A refreshing foot soak and gentle exfoliation to leave your feet feeling clean, soft, and renewed.',
    price: '₱150.00',
  },
  {
    heading: 'Signature Premium Foot Spa',
    image: '/assets/massage/Signature Premium Foot Spa.png',
    title: 'Premium Foot Spa + Premium Foot Scrub + Foot Whitening',
    description: 'An upgraded foot care ritual featuring premium exfoliation and a brightening-focused treatment for a refreshed appearance.',
    price: '₱230.00',
  },
  {
    heading: 'Foot Paraffin',
    image: '/assets/massage/Foot Paraffin & Massage.png',
    title: 'Foot Paraffin Treatment + Foot Massage',
    description: 'A comforting paraffin treatment paired with a relaxing massage to pamper tired feet.',
    price: '₱270.00',
  },
  {
    heading: 'Foot Scrub',
    image: '/assets/massage/Foot Scrub.png',
    title: 'Focused Foot Exfoliation',
    description: 'Gently exfoliate rough skin for feet that feel smoother and softer.',
    price: '₱50.00',
  },
  {
    heading: 'Foot Massage',
    image: '/assets/massage/Foot Massage.png',
    title: '20 Minutes',
    description: 'Unwind with a soothing foot massage designed to ease everyday tension and tiredness.',
    price: '₱150.00',
  },
  {
    heading: 'Hand Spa',
    image: '/assets/massage/Hand Spa.png',
    title: 'Hand Spa Treatment + Hand Scrub + Hand Massage',
    description: 'A complete hand-pampering experience combining a soothing spa treatment, exfoliation, and massage.',
    price: '₱250.00',
  },
  {
    heading: 'Hand Paraffin & Massage',
    image: '/assets/massage/Hand Paraffin & Massage.png',
    title: 'Hand Paraffin Treatment + Hand Massage',
    description: 'Warm paraffin care paired with a relaxing massage to leave hands feeling pampered and conditioned.',
    price: '₱270.00',
  },
  {
    heading: 'Hand Massage',
    image: '/assets/massage/Hand Massage.png',
    title: '20 Minutes',
    description: 'A soothing massage to help tired hands relax after a long day.',
    price: '₱150.00',
  },
  {
    heading: 'Classic Foot Spa & Pedicure Duo',
    image: '/assets/massage/Classic Foot Spa.png',
    title: 'Foot Spa + Foot Scrub + Classic Pedicure',
    description: 'A complete foot pampering package with regular nail polish and ingrown nail removal.',
    price: '₱250.00',
  },
  {
    heading: 'Signature Premium Foot Spa & Pedicure Duo',
    image: '/assets/massage/Signature Premium Foot Spa.png',
    title: 'Premium Foot Spa + Premium Scrub + Foot Whitening + Classic Pedicure',
    description: 'An upgraded foot care package combining premium spa care, exfoliation, a brightening-focused treatment, regular polish, and ingrown nail removal.',
    price: '₱330.00',
  },
  {
    heading: 'Hand & Foot Paraffin',
    image: '/assets/massage/Hand & Foot Paraffin.png',
    title: 'Hand & Foot Paraffin + Relaxing Massage',
    description: 'A combined hand and foot pampering experience featuring warm paraffin treatments and relaxing massage.',
    price: '₱500.00',
  },
  {
    heading: 'JAM Signature Swedish Massage',
    image: '/assets/massage/JAM Signature Swedish Massage.png',
    title: 'Whole Body · Relaxing & Gentle Pressure · Eucalyptus Oil',
    description: 'A classic full-body massage using gentle, flowing strokes and eucalyptus-infused oil for a calming spa experience.',
    price: '60 min · ₱400.00',
  },
  {
    heading: 'JAM Signature Fusion Massage',
    image: '/assets/massage/JAM Signature Fusion Massage.png',
    title: 'Whole Body · Stretching, Shiatsu & Thai Techniques',
    description: 'A distinctive massage experience combining varied massage techniques with hot stone therapy and therapeutic oil.',
    price: '60 min · ₱500.00',
  },
  {
    heading: 'Swedish Back & Shoulder Massage',
    image: '/assets/massage/Swedish Back & Shoulder Massage.png',
    title: '30 Minutes · Targeted Relaxation',
    description: 'Focused massage for the back and shoulders to help ease everyday tension and fatigue.',
    price: '₱280.00',
  },
  {
    heading: 'JAM Signature Whitening Body Scrub',
    image: '/assets/massage/JAM Signature Whitening Body Scrub.png',
    title: 'Whole Body · Whitening Salt Scrub',
    description: 'A full-body salt exfoliation ritual that helps remove surface buildup and leave skin feeling smoother.',
    price: '₱500.00',
  },
  {
    heading: 'Hot Stone',
    image: '/assets/massage/Hot Stone.png',
    title: 'Enhancement · Added Warmth & Relaxation',
    description: 'Smooth, warmed stones add a comforting layer of warmth to your massage.',
    price: '₱50.00',
  },
  {
    heading: 'Ventosa Cupping',
    image: '/assets/massage/Ventosa Cupping.png',
    title: 'Traditional Cupping Ritual',
    description: 'A traditional cupping treatment offered as an additional spa experience for targeted areas.',
    price: '₱150.00',
  },
  {
    heading: 'Ear Candling',
    image: '/assets/massage/Ear Candling.png',
    title: 'Soothing Wellness Experience',
    description: 'A gentle spa ritual intended to create a calm, relaxing experience.',
    price: '₱100.00',
  },
]

export default function ServicesMassage() {
  const sectionRef = useRef<HTMLElement>(null)
  useSectionReveal(sectionRef)
  const [carouselRef, carouselApi] = useEmblaCarousel({
    loop: true,
    align: (viewSize, slideSize) => {
      const gap = Math.min(24, Math.max(12, viewSize * 0.015))
      return slideSize / 8 + gap
    },
    slidesToScroll: 1,
    duration: 35,
    breakpoints: {
      '(prefers-reduced-motion: reduce)': { duration: 0 },
    },
  })
  const [currentSlide, setCurrentSlide] = useState(0)

  useCarouselEdges(carouselApi)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const image = section?.querySelector<HTMLElement>('.service-card-media')
    if (!section || !image) return

    // Keep carousel arrows centered as the image expands to fill the section.
    const observer = new ResizeObserver(() => {
      section.style.setProperty('--massage-image-height', `${image.offsetHeight}px`)
    })
    observer.observe(image)
    return () => observer.disconnect()
  }, [])


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
    const updateSelection = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap())
    }
    updateSelection()
    carouselApi.on('select', updateSelection).on('reInit', updateSelection)
    return () => {
      carouselApi.off('select', updateSelection).off('reInit', updateSelection)
    }
  }, [carouselApi])

  return (
    <section
      ref={sectionRef}
      id="services-massage"
      className="services services-massage"
      aria-labelledby="services-massage-heading"
    >
      <header className="services-header">
        <p className="services-title">YOUR BODY IS THE TEMPLE OF YOUR SOUL,</p>
        <h2 id="services-massage-heading" className="services-heading">
          TAKE CARE OF IT.
        </h2>
      </header>
      <div
        className="massage-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Massage treatments"
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault()
            if (event.key === 'ArrowLeft') carouselApi?.scrollPrev()
            else carouselApi?.scrollNext()
          }
        }}
      >
        <div
          id="massage-carousel-viewport"
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
                <div className="service-card-media">
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
                </div>
                <h3 className="massage-card-heading">{treatment.heading}</h3>
                <p className="massage-card-title">{treatment.title}</p>
                <p className="service-card-description">
                  {treatment.description}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="massage-carousel-controls">
          <button
            type="button"
            className="massage-carousel-arrow massage-carousel-prev"
            aria-label="Previous massage treatment"
            aria-controls="massage-carousel-viewport"
            onClick={() => carouselApi?.scrollPrev()}
          >
            <ChevronLeft size={38} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="massage-carousel-arrow massage-carousel-next"
            aria-label="Next massage treatment"
            aria-controls="massage-carousel-viewport"
            onClick={() => carouselApi?.scrollNext()}
          >
            <ChevronRight size={38} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <p className="massage-carousel-status" role="status" aria-atomic="true">
          Treatment {currentSlide + 1} of {treatments.length}
        </p>
      </div>
    </section>
  )
}
