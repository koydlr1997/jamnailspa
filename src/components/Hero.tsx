import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import "./Hero.css";

const banners = [
  "/assets/banner1.png",
  "/assets/banner2.png",
  "/assets/banner3.png",
];
const slides = [...banners, ...banners];

export default function Hero() {
  const [position, setPosition] = useState(0);
  const [moving, setMoving] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const movingRef = useRef(false);
  const activeSlide = position % banners.length;

  const advance = useCallback((targetSlide?: number) => {
    if (!movingRef.current) {
      movingRef.current = true;
      setMoving(true);
      setPosition((current) => {
        const steps =
          targetSlide === undefined
            ? 1
            : (targetSlide - (current % banners.length) + banners.length) %
              banners.length;
        return current + steps;
      });
    }
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    function updateMotion(event: MediaQueryListEvent) {
      setReducedMotion(event.matches);
    }
    function updateVisibility() {
      setHidden(document.hidden);
    }
    motionQuery.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      motionQuery.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (hidden || reducedMotion) return;
    const timer = window.setInterval(advance, 2500);
    return () => window.clearInterval(timer);
  }, [advance, hidden, reducedMotion]);

  useEffect(() => {
    if (!moving) return;
    // Duplicated slides allow dot selections and looping to keep moving left.
    const timer = window.setTimeout(
      () => {
        setPosition((current) =>
          current >= banners.length ? current - banners.length : current,
        );
        setMoving(false);
        movingRef.current = false;
      },
      reducedMotion ? 0 : 850,
    );
    return () => window.clearTimeout(timer);
  }, [moving, reducedMotion]);

  return (
    <section
      id="home"
      aria-label="Featured treatments"
      aria-roledescription="carousel"
      className="hero"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          advance();
        }
      }}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={(event) => {
        const touch = event.changedTouches[0];
        if (touchStart.current) {
          const deltaX = touchStart.current.x - touch.clientX;
          const deltaY = touchStart.current.y - touch.clientY;
          if (deltaX > 50 && deltaX > Math.abs(deltaY)) advance();
        }
        touchStart.current = null;
      }}
      onTouchCancel={() => {
        touchStart.current = null;
      }}
    >
      <div
        className={`hero-track${moving ? " is-moving" : ""}`}
        style={{ transform: `translateX(-${position * 100}%)` }}
      >
        {slides.map((banner, index) => (
          <div
            key={`${banner}-${index}`}
            className="hero-slide"
            style={{ backgroundImage: `url('${banner}')` }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${(index % banners.length) + 1} of ${banners.length}`}
            aria-hidden={index >= banners.length || index !== activeSlide}
          />
        ))}
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content">
        <h1 className="hero-tagline">BEAUTY IN EVERY DETAIL.</h1>
        <p className="hero-subtext">
          From perfectly polished nails to moments of relaxation, discover
          beauty and care made just for you.
        </p>
        <a className="hero-services-button" href="#services">
          EXPLORE OUR SERVICES
          <ArrowUpRight
            size={18}
            strokeWidth={1.5}
            absoluteStrokeWidth
            aria-hidden="true"
            focusable="false"
            style={{ flexShrink: 0 }}
          />
        </a>
      </div>
      <div className="hero-dots" role="group" aria-label="Choose banner">
        {banners.map((banner, index) => (
          <button
            key={banner}
            type="button"
            className={`hero-dot${index === activeSlide ? " is-active" : ""}`}
            aria-label={`Show banner ${index + 1}`}
            aria-current={index === activeSlide ? "true" : undefined}
            onClick={() => {
              if (index !== activeSlide) advance(index);
            }}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
