import { useEffect } from 'react'

export default function useImageParallax() {
  useEffect(() => {
    const media = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".service-card-media, .eyelash-parallax",
      ) ?? [],
    );
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function updateParallax() {
      frame = 0;
      const viewportHeight = window.innerHeight;
      // Read every position before writing styles to avoid repeated layout work.
      const offsets = media.map((card) => {
        if (motionQuery.matches) return 0;
        const { top, height } = card.getBoundingClientRect();
        const progress = Math.max(
          -1,
          Math.min(
            1,
            (viewportHeight / 2 - top - height / 2) /
              ((viewportHeight + height) / 2),
          ),
        );
        return progress * Math.min(96, height * 0.2);
      });
      media.forEach((card, index) => {
        card.style.setProperty("--parallax-offset", `${offsets[index]}px`);
      });
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    }

    updateParallax();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    motionQuery.addEventListener("change", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      motionQuery.removeEventListener("change", scheduleUpdate);
      media.forEach((card) => card.style.removeProperty("--parallax-offset"));
    };
  }, []);

}
