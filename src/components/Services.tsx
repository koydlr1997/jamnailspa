import { useRef } from "react";
import "./Services.css";
import useSectionReveal from "../hooks/useSectionReveal";

const services = [
  {
    title: "MASSAGE",
    image: "/assets/services/massage.png",
    alt: "Relaxing massage treatment",
  },
  {
    title: "NAILS",
    image: "/assets/services/manicure.png",
    alt: "Manicure and nail care treatment",
  },
  {
    title: "LASHES & BROWS",
    image: "/assets/services/lashes.png",
    alt: "Lash enhancement treatment",
  },
  {
    title: "WAXING",
    image: "/assets/services/waxing.png",
    alt: "Professional waxing treatment",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

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
              <div className="service-card-caption">
                <h3 className="service-card-title">{service.title}</h3>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
