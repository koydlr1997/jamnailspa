import { useLayoutEffect } from 'react'
import type { EmblaCarouselType } from 'embla-carousel'

export default function useCarouselEdges(carouselApi: EmblaCarouselType | undefined, mobileOnly = false) {
  useLayoutEffect(() => {
    if (!carouselApi) return
    let frame = 0
    const slides = carouselApi.slideNodes()

    function updateVisibleCopy() {
      frame = 0
      if (!carouselApi) return
      if (mobileOnly && !window.matchMedia('(max-width: 767px)').matches) {
        slides.forEach((slide) => {
          slide.classList.remove('is-fully-visible', 'is-edge-left', 'is-edge-right')
          slide.style.removeProperty('--card-presence')
        })
        return
      }
      const viewport = carouselApi.rootNode().getBoundingClientRect()
      // Measure all cards first, including the ones repositioned by infinite looping.
      const positions = slides.map((slide) => {
        const rect = slide.getBoundingClientRect()
        const visibleWidth = Math.max(0, Math.min(rect.right, viewport.right) - Math.max(rect.left, viewport.left))
        const fullyVisible = rect.left >= viewport.left - 1 && rect.right <= viewport.right + 1
        return {
          fullyVisible,
          leftEdge: rect.left < viewport.left - 1,
          rightEdge: rect.right > viewport.right + 1,
          presence: fullyVisible ? 1 : Math.max(0, Math.min(1, (visibleWidth / rect.width - 0.125) / 0.875)),
        }
      })
      slides.forEach((slide, index) => {
        const position = positions[index]
        slide.classList.toggle('is-fully-visible', position.fullyVisible)
        slide.classList.toggle('is-edge-left', position.leftEdge)
        slide.classList.toggle('is-edge-right', position.rightEdge)
        slide.style.setProperty('--card-presence', position.presence.toFixed(4))
      })
      carouselApi.rootNode().classList.add('is-positioned')
    }

    function scheduleCopyUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateVisibleCopy)
    }

    updateVisibleCopy()
    carouselApi.on('scroll', scheduleCopyUpdate).on('settle', scheduleCopyUpdate).on('reInit', scheduleCopyUpdate)
    return () => {
      window.cancelAnimationFrame(frame)
      carouselApi.off('scroll', scheduleCopyUpdate).off('settle', scheduleCopyUpdate).off('reInit', scheduleCopyUpdate)
      carouselApi.rootNode().classList.remove('is-positioned')
      slides.forEach((slide) => {
        slide.classList.remove('is-fully-visible', 'is-edge-left', 'is-edge-right')
        slide.style.removeProperty('--card-presence')
      })
    }
  }, [carouselApi, mobileOnly])

}
