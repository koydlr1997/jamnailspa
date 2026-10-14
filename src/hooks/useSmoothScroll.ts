import { useEffect } from 'react'
import Lenis from 'lenis'

export default function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      lerp: 0.1,
      anchors: true,
      allowNestedScroll: true,
      respectReducedMotion: true,
    })

    return () => lenis.destroy()
  }, [enabled])
}
