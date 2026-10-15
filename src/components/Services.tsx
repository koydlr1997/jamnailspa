import { useEffect, useRef } from "react";
import "./Services.css";

const services = [
  {
    title: "MASSAGE",
    image: "/assets/services/massage.png",
    alt: "Relaxing massage treatment",
    description:
      "Take a moment to unwind with a soothing massage that eases tension and leaves you feeling refreshed.",
  },
  {
    title: "NAILS",
    image: "/assets/services/manicure.png",
    alt: "Manicure and nail care treatment",
    description:
      "From everyday essentials to a fresh new look, give your hands and feet the care they deserve.",
  },
  {
    title: "LASHES & BROWS",
    image: "/assets/services/lashes.png",
    alt: "Lash enhancement treatment",
    description:
      "Bring out your eyes with beautifully styled lashes, tailored to complement your natural look.",
  },
  {
    title: "WAXING",
    image: "/assets/services/waxing.png",
    alt: "Professional waxing treatment",
    description:
      "Enjoy smooth, soft skin with attentive waxing services designed to help you feel your best.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);


  useEffect(() => {
    const media = Array.from(
      sectionRef.current?.querySelectorAll<HTMLElement>(
        ".service-card-media",
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
        return progress * Math.min(48, height * 0.1);
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

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="services"
    >
      <header className="services-header">
        <p className="services-title">IT'S NOT JUST NAILS,</p>
        <h2 id="services-heading" className="services-heading">
          WHAT WE OFFER.
        </h2>
      </header>

      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <div className="service-card-media">
              <img
                className="service-card-image"
                src={service.image}
                alt={service.alt}
                loading="lazy"
                decoding="async"
                width={600}
                height={800}
              />
            </div>
            <h3 className="service-card-title">{service.title}</h3>
            <p className="service-card-description">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
